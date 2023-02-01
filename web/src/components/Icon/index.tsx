import React from "react";

import "./index.css";

export interface IconButtonProps {
  className?: string;
  icon: string;
}

export const Icon: React.FC<IconButtonProps> = ({ icon, className }) => {
  return (
    <div className={`IconButton ${className || ""}`}>
      <i className={`fa-regular ${icon}`}></i>
    </div>
  );
};
