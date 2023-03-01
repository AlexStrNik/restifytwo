import React, { ChangeEvent, ComponentType } from "react";
import { createEvent, createStore, Store, Event } from "effector";
import { useStoreMap } from "effector-react";

interface SetField {
  key: string;
  value: string;
}

export interface FormStore<T> {
  $store: Store<T>;
  clear: Event<void>;
  controlled: <P extends {}>(
    component: ComponentType<P>
  ) => React.FC<P & { name: string }>;
}

export const createFormStore = <T extends object>(): FormStore<T> => {
  const setField = createEvent<SetField>();
  const clear = createEvent();

  const $store = createStore<T>({} as T)
    .on(setField, (form, { key, value }) => ({
      ...form,
      [key]: value,
    }))
    .on(clear, () => ({} as T));

  const controlled = <P extends {}>(component: ComponentType<P>) => {
    return (props: P & { name: string }) => {
      const value = useStoreMap({
        store: $store as unknown as Store<{ [key: string]: string }>,
        keys: [props.name],
        fn: (values) => values[props.name] || "",
      });

      return React.createElement(component, {
        ...props,
        value,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          setField({ key: props.name, value: event.currentTarget.value });
        },
      });
    };
  };

  return {
    $store,
    clear,
    controlled,
  };
};
