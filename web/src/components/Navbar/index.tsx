import { useStore } from "effector-react";
import React from "react";

import { toggleNavbar } from "../../models/navbar";
import { $route, navigateTo } from "../../models/router";
import { signOut } from "../../models/session";
import { $theme, toggleTheme } from "../../models/theme";
import { $user } from "../../models/user";

import { NavbarItem, NavbarItemProps } from "../NavbarItem";
import { Pane } from "../Pane";

import "./index.css";

interface NavbarLinkProps extends Omit<NavbarItemProps, "onClick"> {
  link: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ link, name, icon }) => {
  const selected = useStore(
    $route.map((selected) => selected.startsWith(link))
  );

  return (
    <NavbarItem
      className={`Navbar-Link ${selected ? "Navbar-Link_selected" : ""}`}
      onClick={() => navigateTo(link)}
      name={name}
      icon={icon}
    />
  );
};

export const Navbar: React.FC = () => {
  const theme = useStore($theme);
  const user = useStore($user);

  return (
    <Pane className="Navbar">
      <NavbarItem
        className="Navbar-Button Navbar-Header"
        onClick={toggleNavbar}
        icon="fa-chess-queen"
        name="restify.two"
      />
      <div className="Navbar-Group">
        <NavbarLink link="/account" icon="fa-user" name="Account" />
        {user?.is_admin && (
          <NavbarLink link="/admin" icon="fa-id-badge" name="Admin" />
        )}
        <NavbarLink
          link="/reservations"
          icon="fa-calendar-check"
          name="Reservations"
        />
        <NavbarLink link="/restaurants" icon="fa-building" name="Restaurants" />
      </div>
      <div className="Navbar-Group">
        <NavbarItem
          className="Navbar-Button Navbar-Theme"
          onClick={toggleTheme}
          icon={theme === "dark" ? "fa-sun" : "fa-moon"}
          name="Toggle theme"
        />
        <NavbarItem
          className="Navbar-Button Navbar-SignOut"
          onClick={signOut}
          icon="fa-circle-xmark"
          name="Sign out"
        />
      </div>
    </Pane>
  );
};
