import {
  createStyles,
  getStylesRef,
  rem,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Icon } from "@tabler/icons-react";
import React from "react";

const useStyles = createStyles((theme) => {
  const icon = getStylesRef("icon");

  return {
    linkMobile: {
      width: rem(50),
      height: rem(50),
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },

    linkDesktop: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      [`& .${icon}`]: {
        marginRight: theme.spacing.sm,
      },

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
    },

    active: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,

        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },

      [`& .${icon}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  };
});

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarMobileLink: React.FC<NavbarLinkProps> = ({
  icon: Icon,
  active,
  onClick,
}) => {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      onClick={onClick}
      className={cx(classes.linkMobile, { [classes.active]: active })}
    >
      <Icon className={cx(classes.linkIcon)} stroke={1.5} />
    </UnstyledButton>
  );
};

const NavbarDesktopLink: React.FC<NavbarLinkProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      onClick={onClick}
      className={cx(classes.linkDesktop, { [classes.active]: active })}
    >
      <Icon className={cx(classes.linkIcon)} stroke={1.5} />
      <Text>{label}</Text>
    </UnstyledButton>
  );
};

const NavbarLink: React.FC<NavbarLinkProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return isDesktop ? (
    <NavbarDesktopLink {...props} />
  ) : (
    <NavbarMobileLink {...props} />
  );
};

export default NavbarLink;
