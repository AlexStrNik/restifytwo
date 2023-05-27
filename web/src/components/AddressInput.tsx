import { Group, Select, SelectProps, Text } from "@mantine/core";
import { useStore } from "effector-react";

import { $suggest, loadSuggestFx } from "../models/places";
import { createEvent, guard, restore } from "effector";
import { debounce } from "patronum";
import { APIPlacesItem } from "../api/types";
import { forwardRef } from "react";

type AdressInputProps = Omit<SelectProps, "data">;

const searchChanged = createEvent<string>();
const $searchValue = restore(searchChanged, "");

guard({
  clock: debounce({
    source: searchChanged,
    timeout: 500,
  }),
  filter: (query) => query.length > 5,
  target: loadSuggestFx,
});

const AddressItem = forwardRef<HTMLDivElement, APIPlacesItem>(
  ({ name, description, ...others }: APIPlacesItem, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Text size="sm">{name}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </Group>
      </div>
    );
  }
);

const AddressInput: React.FC<AdressInputProps> = (props) => {
  const suggest = useStore($suggest);
  const searchValue = useStore($searchValue);

  return (
    <Select
      data={suggest.map((item) => ({
        ...item,
        label: `${item.name} – ${item.description}`,
        value: item.id,
      }))}
      searchable
      filter={() => true}
      itemComponent={AddressItem}
      onSearchChange={searchChanged}
      searchValue={searchValue}
      {...props}
    />
  );
};

export default AddressInput;
