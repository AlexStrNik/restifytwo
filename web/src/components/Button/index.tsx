import React, { ReactNode } from "react";

import { Icon } from "../Icon";

import "./index.css";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  loading,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`Button ${className || ""}`}
    >
      {loading && (
        <Icon className="NewRestaurant-Loader" icon="fa-hourglass-half" />
      )}{" "}
      {children}
    </button>
  );
};
