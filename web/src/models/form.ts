import { createEvent, createStore, Store } from "effector";
import { ChangeEvent, ChangeEventHandler } from "react";

interface SetField {
  key: string;
  value: string;
}

export interface FormStore<T> {
  $store: Store<T>;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const createFormStore = <T extends object>(): FormStore<T> => {
  const setField = createEvent<SetField>();

  const $store = createStore<T>({} as T).on(
    setField,
    (form, { key, value }) => ({
      ...form,
      [key]: value,
    })
  );

  const handleChange = setField.prepend(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => ({
      key: e.target.name,
      value: e.target.value,
    })
  );

  return {
    $store,
    handleChange,
  };
};
