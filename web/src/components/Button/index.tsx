import React, { ReactNode } from "react";

import "./index.css";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={`Button ${className || ""}`}>
      {children}
    </button>
  );
};
