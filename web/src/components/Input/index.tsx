import { Store } from "effector";
import { useStoreMap } from "effector-react";
import React, { HTMLInputTypeAttribute } from "react";

import { FormStore } from "../../models/form";

import "./index.css";

export interface InputProps {
  label: string;
  name: string;
  form: FormStore<any>;

  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  form,
  name,
}) => {
  const value = useStoreMap({
    store: form.$store as Store<{ [key: string]: string }>,
    keys: [name],
    fn: (values) => values[name] || "",
  });

  return (
    <label className="Input-Wrap">
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={form.handleChange}
        className="Input-Input"
      ></input>
      <p className="Input-Label">{label}</p>
    </label>
  );
};
