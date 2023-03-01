import { Navbar as Navbar_, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconHome2,
  IconCalendarStats,
  IconUser,
  IconLogout,
  IconDashboard,
  IconSun,
  IconMoon,
  IconSettings,
} from "@tabler/icons-react";
import { useStore } from "effector-react";
import { Link, useRouter } from "atomic-router-react";

import NavbarLink from "./NavbarLink";

import { $theme, toggleColorScheme } from "../models/theme";
import { signOut } from "../models/session";
import { routes } from "../shared/routes";

const Navbar = () => {
  const theme = useStore($theme);
  const { $activeRoutes } = useRouter();

  const activeRoutes = useStore($activeRoutes);
  const isDesktop = useMediaQuery("(min-width: 900px)");

  const width = isDesktop ? { sm: 300 } : { base: 80 };

  const links = [
    { icon: IconHome2, label: "Restaurants", route: routes.restaurants.list },
    {
      icon: IconCalendarStats,
      label: "Reservations",
      route: routes.reservations.list,
    },
    { icon: IconUser, label: "Account", route: routes.account },
    { icon: IconDashboard, label: "Admin", route: routes.admin },
    { icon: IconSettings, label: "Preferences", route: routes.preferences },
  ].map((navItem) => (
    <Link
      key={navItem.label}
      to={navItem.route}
      style={{ textDecoration: "none", display: "contents" }}
    >
      <NavbarLink {...navItem} active={activeRoutes.includes(navItem.route)} />
    </Link>
  ));

  return (
    <Navbar_ width={width} p="md">
      <Navbar_.Section grow>
        <Stack spacing="xs">{links}</Stack>
      </Navbar_.Section>
      <Navbar_.Section>
        <Stack spacing="xs">
          <NavbarLink
            icon={theme.colorScheme === "dark" ? IconSun : IconMoon}
            label="Switch theme"
            onClick={toggleColorScheme}
          />
          <NavbarLink icon={IconLogout} label="Logout" onClick={signOut} />
        </Stack>
      </Navbar_.Section>
    </Navbar_>
  );
};

export default Navbar;
