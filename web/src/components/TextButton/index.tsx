import React, { ReactNode } from "react";

import "./index.css";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const TextButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="TextButton">
      {children}
    </button>
  );
};
