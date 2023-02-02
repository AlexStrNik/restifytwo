import React from "react";

import "./index.css";

export interface IconProps {
  className?: string;
  icon: string;
}

export const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return (
    <div className={`Icon ${className || ""}`}>
      <i className={`fa-regular ${icon}`}></i>
    </div>
  );
};
