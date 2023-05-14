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
  Group,
  Rating,
  ScrollArea,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useStore } from "effector-react";
import { createForm, useForm } from "effector-forms";
import { chainRoute, redirect } from "atomic-router";
import dayjs from "dayjs";

import { routes } from "../shared/routes";
import Floorplan from "../components/Floorplan";
import {
  $reservationsForTable,
  $restaurant,
  createReservationFx as _createReservationFx,
  loadReservationsForTableFx as _loadReservationsForTableFx,
  loadRestaurantFx,
} from "../models/restaurants";
import { attach, createEvent, forward, sample } from "effector";
import { GuestsInput } from "../components/GuestsInput";
import { APIReservationCreate } from "../api/types";
import RestaurantImages from "../components/RestaurantImages";
import ReviewForm from "../components/ReviewForm";
import RestaurantRating from "../components/RestaurantRating";
import RestaurantReviews from "../components/RestaurantReviews";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("lg");

  return {
    wrapper: {
      display: "flex",
      height: "100vh",
      overflowY: "scroll",
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

const reservationForm = createForm({
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
    date: {
      init: dayjs(new Date()).startOf("day").toDate(),
      rules: [
        {
          name: "required",
          validator: (value: Date) => Boolean(value),
        },
      ],
    },
    guests_count: {
      init: 1,
      rules: [
        {
          name: "valid",
          validator: (value: number) => value >= 1 && value <= 4,
        },
      ],
    },
  },
  validateOn: ["change"],
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
  from: reservationForm.fields.table.onChange,
  to: loadReservationsForTableFx,
});

const reservationSubmit = createEvent();

const createReservationFx = attach({
  source: $restaurant,
  effect: _createReservationFx,
  mapParams: (params: Omit<APIReservationCreate, "restaurant">, states) => ({
    ...params,
    restaurant: states?.id as number,
  }),
});

sample({
  clock: reservationSubmit,
  source: reservationForm.$values,
  fn: (src) => ({
    ...src,
    date: dayjs(src.date).format("YYYY-MM-DD[T]HH:mm"),
  }),
  target: createReservationFx,
});

sample({
  clock: createReservationFx.doneData,
  target: reservationForm.reset,
});

redirect({
  clock: createReservationFx.doneData,
  route: routes.restaurants.list,
});

const RestaurantPage = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const restaurant = useStore($restaurant);
  const reservedDates = useStore($reservationsForTable);
  const reservationsLoading = useStore(loadReservationsForTableFx.pending);
  const reservationPending = useStore(createReservationFx.pending);
  const { fields, eachValid } = useForm(reservationForm);

  return (
    <div className={classes.wrapper}>
      <LoadingOverlay visible={reservationPending} overlayBlur={2} />
      <ScrollArea>
        <Stack style={{ flexGrow: 1 }} p="lg" maw={700} pos="relative">
          <RestaurantImages images={restaurant!.images} height={320} />
          <Group position="apart" mt="md" mb="xs">
            <Title style={{ marginTop: 0 }} order={1}>
              {restaurant!.name}
            </Title>
            <RestaurantRating reviews={restaurant!.reviews} />
          </Group>

          <Text>{restaurant!.about}</Text>

          <RestaurantReviews restaurant={restaurant!} />

          <ReviewForm restaurant={restaurant!} />
        </Stack>
      </ScrollArea>
      <Stack style={{ flexGrow: 1 }} maw={700} className={classes.aside} p="lg">
        <Floorplan
          publishableToken={restaurant!.archilogic_token}
          floorId={restaurant!.floor_id}
          tableChanged={fields.table.onChange}
        />
        <Collapse in={reservedDates != null}>
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
                      selected: dayjs(date).isSame(fields.date.value, "date"),
                      onClick: () => fields.date.onChange(date),
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
                      dayjs(fields.date.value).startOf("day").add(i, "hour")
                    )
                    .map((time) => (
                      <Button
                        key={time.toString()}
                        style={{ flexGrow: 1 }}
                        variant={
                          time.isSame(fields.date.value) ? "filled" : "default"
                        }
                        disabled={reservedDates?.some((reservation) =>
                          dayjs(reservation.date).isSame(time)
                        )}
                        onClick={() => fields.date.onChange(time.toDate())}
                      >
                        {time.format("HH:mm")}
                      </Button>
                    ))}
                </Flex>
              </Input.Wrapper>
              <Input.Wrapper labelElement="div" label={"Enter guests count"}>
                <GuestsInput
                  value={fields.guests_count.value}
                  onChange={fields.guests_count.onChange}
                />
              </Input.Wrapper>
            </SimpleGrid>
            <Button
              onClick={() => reservationSubmit()}
              disabled={!eachValid}
              fullWidth
              mt="xl"
              size="md"
            >
              Confirm reservation
            </Button>
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
