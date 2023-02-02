import React, { ReactNode } from "react";
import { Button } from "../Button";

import { Icon } from "../Icon";
import { Pane } from "../Pane";

import "./index.css";

export interface SideFormProps {
  title: ReactNode;
  onClose: () => void;
  description?: string;
  children: ReactNode;
}

export const SideForm: React.FC<SideFormProps> = ({
  title,
  onClose,
  description,
  children,
}) => {
  return (
    <div className="SideForm inverse">
      <Pane className="SideForm-Header">
        <h1 className="SideForm-Title">
          {title}
          <Button className="SideForm-Close" onClick={onClose}>
            <Icon icon="fa-circle-xmark" />
          </Button>
        </h1>
        {description && <p className="SideForm-Description">{description}</p>}
      </Pane>
      <div className="SideForm-Content">{children}</div>
    </div>
  );
};
