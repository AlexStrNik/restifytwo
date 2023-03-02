import {
  Input,
  Paper,
  Text,
  Stack,
  Title,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useStore } from "effector-react";

import { routes } from "../shared/routes";
import { $restaurant, loadRestaurantFx } from "../models/restaurants";
import { chainRoute } from "atomic-router";
import { useState } from "react";
import dayjs from "dayjs";
import Floorplan from "../components/Floorplan";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("lg");

  return {
    wrapper: {
      display: "flex",
      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },
    aside: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderLeft: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
      [BREAKPOINT]: {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        border: "none",
      },
      minHeight: "100vh",
    },
  };
});

const RestaurantPage = () => {
  const { classes } = useStyles();
  const restaurant = useStore($restaurant);
  const theme = useMantineTheme();

  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className={classes.wrapper}>
      <Stack style={{ flexGrow: 1 }} p="xl" maw={700} pos="relative">
        <Title style={{ marginTop: 0 }} order={1}>
          {restaurant!.name}
        </Title>
        <Text>{restaurant!.about}</Text>
      </Stack>
      <Stack style={{ flexGrow: 1 }} maw={700} className={classes.aside} p="xl">
        <Floorplan
          publishableToken={restaurant!.archilogic_token}
          floorId={restaurant!.floor_id}
        />
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
    </div>
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
  view: RestaurantPage,
};
