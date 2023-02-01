import React, { ReactNode } from "react";

import "./index.css";

export interface NavbarProps {
  className?: string;
  children?: ReactNode;
}

export const Pane: React.FC<NavbarProps> = ({ children, className }) => {
  return <div className={`Pane ${className || ""}`}>{children}</div>;
};
