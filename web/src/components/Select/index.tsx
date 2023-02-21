import { Store } from "effector";
import { useStoreMap } from "effector-react";
import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback } from "react";

import { FormStore } from "../../models/form";
import { Icon } from "../Icon";

import "./index.css";

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  form: FormStore<any>;

  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  form,
  name,
}) => {
  const value = useStoreMap({
    store: form.$store as Store<{ [key: string]: string }>,
    keys: [name],
    fn: (values) => values[name] || "",
  });

  return (
    <label className="Select-Wrap">
      <Icon className="Select-Icon" icon="fa-chevron-down fa-solid"></Icon>
      <select
        name={name}
        value={value}
        onChange={form.handleChange}
        className="Select-Input"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="Select-Label">{label}</p>
    </label>
  );
};
