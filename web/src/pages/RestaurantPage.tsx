import {
  Input,
  Paper,
  Text,
  Stack,
  Title,
  useMantineTheme,
  createStyles,
  Flex,
  Button,
  SimpleGrid,
  Collapse,
  LoadingOverlay,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useStore } from "effector-react";
import { createForm, useForm } from "effector-forms";
import { chainRoute } from "atomic-router";
import dayjs from "dayjs";

import { routes } from "../shared/routes";
import Floorplan from "../components/Floorplan";
import {
  $reservationsForTable,
  $restaurant,
  loadReservationsForTableFx as _loadReservationsForTableFx,
  loadRestaurantFx,
} from "../models/restaurants";
import { attach, forward } from "effector";
import { GuestsInput } from "../components/GuestsInput";

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

const bookingForm = createForm({
  fields: {
    table: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value: string) => Boolean(value),
        },
      ],
    },
    time: {
      init: dayjs(new Date()).startOf("day").toDate(),
      rules: [
        {
          name: "required",
          validator: (value: Date) => Boolean(value),
        },
      ],
    },
  },
});

const loadReservationsForTableFx = attach({
  source: $restaurant,
  effect: _loadReservationsForTableFx,
  mapParams: (params: string, states) => ({
    restaurant: states?.id as number,
    table: params,
  }),
});

forward({
  from: bookingForm.fields.table.onChange,
  to: loadReservationsForTableFx,
});

const RestaurantPage = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const restaurant = useStore($restaurant);
  const reservations = useStore($reservationsForTable);
  const reservationsLoading = useStore(loadReservationsForTableFx.pending);
  const { fields, eachValid } = useForm(bookingForm);

  return (
    <div className={classes.wrapper}>
      <Stack style={{ flexGrow: 1 }} p="lg" maw={700} pos="relative">
        <Title style={{ marginTop: 0 }} order={1}>
          {restaurant!.name}
        </Title>
        <Text>{restaurant!.about}</Text>
      </Stack>
      <Stack style={{ flexGrow: 1 }} maw={700} className={classes.aside} p="lg">
        <Floorplan
          publishableToken={restaurant!.archilogic_token}
          floorId={restaurant!.floor_id}
          tableChanged={fields.table.onChange}
        />
        <Collapse in={reservations != null}>
          <Stack>
            <SimpleGrid
              cols={2}
              spacing="md"
              breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
              pos="relative"
            >
              <LoadingOverlay visible={reservationsLoading} overlayBlur={2} />
              <Input.Wrapper labelElement="div" label={"Select date"}>
                <Paper
                  bg={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.white
                  }
                  display="flex"
                  style={{ justifyContent: "center" }}
                  shadow="xs"
                  p="md"
                  withBorder
                >
                  <Calendar
                    minDate={new Date()}
                    maxDate={dayjs(new Date())
                      .add(1, "month")
                      .endOf("month")
                      .toDate()}
                    getDayProps={(date) => ({
                      selected: dayjs(date).isSame(fields.time.value, "date"),
                      onClick: () => fields.time.onChange(date),
                    })}
                    maxLevel="month"
                  />
                </Paper>
              </Input.Wrapper>
              <Input.Wrapper
                style={{ flexGrow: 1 }}
                labelElement="div"
                label={"Select time"}
              >
                <Flex wrap="wrap" gap="xs" justify="stretch">
                  {[...Array(24).keys()]
                    .map((i) =>
                      dayjs(fields.time.value).startOf("day").add(i, "hour")
                    )
                    .map((time) => (
                      <Button
                        key={time.toString()}
                        style={{ flexGrow: 1 }}
                        variant={
                          time.isSame(fields.time.value) ? "filled" : "default"
                        }
                        onClick={() => fields.time.onChange(time.toDate())}
                      >
                        {time.format("HH:mm")}
                      </Button>
                    ))}
                </Flex>
              </Input.Wrapper>
              <Input.Wrapper labelElement="div" label={"Enter guests count"}>
                <GuestsInput />
              </Input.Wrapper>
            </SimpleGrid>
          </Stack>
        </Collapse>
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
