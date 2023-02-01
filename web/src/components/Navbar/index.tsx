import { useStore } from "effector-react";
import React from "react";

import {
  $navbarSelected,
  navbarSelect,
  toggleNavbar,
} from "../../models/navbar";
import { signOut } from "../../models/session";

import { NavbarItem, NavbarItemProps } from "../NavbarItem";
import { Pane } from "../Pane";

import "./index.css";

interface NavbarLinkProps extends Omit<NavbarItemProps, "onClick"> {
  link: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ link, name, icon }) => {
  const selected = useStore(
    $navbarSelected.map((selected) => selected === link)
  );

  return (
    <NavbarItem
      className={`Navbar-Link ${selected ? "Navbar-Link_selected" : ""}`}
      onClick={() => navbarSelect(link)}
      name={name}
      icon={icon}
    />
  );
};

export const Navbar: React.FC = () => {
  return (
    <Pane className="Navbar">
      <NavbarItem
        className="Navbar-Button Navbar-Header"
        onClick={toggleNavbar}
        icon="fa-chess-queen"
        name="restify.two"
      />
      <div className="Navbar-Links">
        <NavbarLink link="account" icon="fa-user" name="Account" />
        <NavbarLink
          link="reservations"
          icon="fa-calendar-check"
          name="Reservations"
        />
        <NavbarLink link="restaurants" icon="fa-building" name="Restaurants" />
      </div>
      <NavbarItem
        className="Navbar-Button Navbar-SignOut"
        onClick={signOut}
        icon="fa-circle-xmark"
        name="Sign out"
      />
    </Pane>
  );
};
