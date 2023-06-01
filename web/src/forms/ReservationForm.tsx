import dayjs from "dayjs";
import {
  Input,
  Paper,
  Stack,
  useMantineTheme,
  Flex,
  Button,
  SimpleGrid,
  Collapse,
  LoadingOverlay,
} from "@mantine/core";
import { redirect } from "atomic-router";
import { Calendar } from "@mantine/dates";
import { useStore } from "effector-react";
import { createForm, useForm } from "effector-forms";
import { attach, createEvent, forward, sample } from "effector";

import { routes } from "../shared/routes";
import Floorplan from "../components/Floorplan";
import {
  $reservationsForTable,
  $restaurant,
  createReservationFx as _createReservationFx,
  loadReservationsForTableFx as _loadReservationsForTableFx,
} from "../models/restaurants";
import { GuestsInput } from "../components/GuestsInput";
import { APIReservationCreate, APIRestaurant, Schedule } from "../api/types";

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

interface ReservationFormProps {
  restaurant: APIRestaurant;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ restaurant }) => {
  const theme = useMantineTheme();

  const reservedDates = useStore($reservationsForTable);
  const reservationsLoading = useStore(loadReservationsForTableFx.pending);
  const { fields, eachValid } = useForm(reservationForm);

  const schedules: Record<number, Schedule> = restaurant.schedules.reduce(
    (schedules, schedule) => ({
      ...schedules,
      [schedule.day_of_week]: schedule,
    }),
    {}
  );

  return (
    <Stack align="stretch">
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
                  .map((time) => {
                    const schedule = schedules[fields.date.value.getDay()] || {
                      opens_at: 0,
                      closes_at: 23,
                    };

                    return (
                      <Button
                        key={time.toString()}
                        style={{ flexGrow: 1 }}
                        variant={
                          time.isSame(fields.date.value) ? "filled" : "default"
                        }
                        disabled={
                          reservedDates?.some((reservation) =>
                            dayjs(reservation.date).isSame(time)
                          ) ||
                          time.hour() < schedule.opens_at ||
                          time.hour() > schedule.closes_at
                        }
                        onClick={() => fields.date.onChange(time.toDate())}
                      >
                        {time.format("HH:mm")}
                      </Button>
                    );
                  })}
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
  );
};

export default ReservationForm;
