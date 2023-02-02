import React, { ReactNode } from "react";

import "./index.css";

export interface CardProps {
  title: string;
  description?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  className,
  onClick,
  loading,
}) => {
  return (
    <div
      onClick={onClick}
      className={`Card ${loading ? "Card_loading" : ""} ${className || ""}`}
    >
      <h3 className="Card-Title">{loading ? "" : title}</h3>
      <p className="Card-Description">{loading ? "" : description}</p>
    </div>
  );
};
