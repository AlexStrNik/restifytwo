import React, { ReactNode } from "react";

import "./index.css";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`Button ${className || ""}`}
    >
      {children}
    </button>
  );
};
