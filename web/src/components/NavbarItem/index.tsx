import { useStore } from "effector-react";
import React from "react";

import { $navbarExpanded } from "../../models/navbar";

import { Button } from "../Button";
import { Icon } from "../Icon";

import "./index.css";

export interface NavbarItemProps {
  icon: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  icon,
  name,
  onClick,
  className,
}) => {
  const navbarExpanded = useStore($navbarExpanded);

  return (
    <Button className={`NavbarItem ${className || ""}`} onClick={onClick}>
      <Icon className="NavbarItem-Icon" icon={icon} />
      {navbarExpanded && <h2 className="NavbarItem-Label">{name}</h2>}
    </Button>
  );
};
