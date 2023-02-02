import { Store } from "effector";
import { useStoreMap } from "effector-react";
import React, { HTMLInputTypeAttribute } from "react";

import { FormStore } from "../../models/form";

import "./index.css";

export interface TextareaProps {
  label: string;
  name: string;
  form: FormStore<any>;

  rows?: number;
  placeholder?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  rows,
  form,
  name,
}) => {
  const value = useStoreMap({
    store: form.$store as Store<{ [key: string]: string }>,
    keys: [name],
    fn: (values) => values[name] || "",
  });

  return (
    <label className="Textarea-Wrap">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        rows={rows}
        onChange={form.handleChange}
        className="Input-Input"
      ></textarea>
      <p className="Input-Label">{label}</p>
    </label>
  );
};
