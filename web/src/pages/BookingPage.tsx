import {
  Input,
  Paper,
  Popover,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useStore } from "effector-react";

import { routes } from "../shared/routes";
import { $restaurant, loadRestaurantFx } from "../models/restaurants";
import { chainRoute } from "atomic-router";
import { useState } from "react";
import dayjs from "dayjs";

const BookingPage = () => {
  const restaurant = useStore($restaurant);
  const theme = useMantineTheme();

  const [value, setValue] = useState<Date | null>(null);

  return (
    <>
      <Stack p="lg" maw={700} pos="relative">
        <Title style={{ marginTop: 0 }} order={1}>
          {restaurant?.name}
        </Title>
        <Input.Wrapper labelElement="div" label={"Select date"}>
          <Paper
            bg={
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white
            }
            display="table-cell"
            shadow="xs"
            p="md"
            withBorder
          >
            <Calendar
              allowLevelChange={false}
              minDate={new Date()}
              maxDate={dayjs(new Date())
                .add(1, "month")
                .endOf("month")
                .toDate()}
              value={value}
              onChange={setValue}
            />
          </Paper>
        </Input.Wrapper>
      </Stack>
    </>
  );
};

export const route = chainRoute({
  route: routes.restaurants.single,
  beforeOpen: {
    effect: loadRestaurantFx,
    mapParams: ({ params }) => params.restaurantId,
  },
});

export default {
  route,
  view: BookingPage,
};
