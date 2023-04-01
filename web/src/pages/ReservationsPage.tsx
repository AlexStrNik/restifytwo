import dayjs from "dayjs";
import { Link } from "atomic-router-react";
import { chainRoute } from "atomic-router";
import { useList } from "effector-react";
import {
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconLink, IconUsers } from "@tabler/icons-react";

import { $myReservations, loadMyReservationsFx } from "../models/reservations";
import { APIReservation } from "../api/types";
import { routes } from "../shared/routes";
import { authorized } from "../models/session";

const useStyles = createStyles((theme) => {
  return {
    textWithIcon: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };
});

const ReservationsPage = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const reservations = useList(
    $myReservations,
    (reservation: APIReservation) => (
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Group position="apart" mb="xs">
          <Link
            to={routes.restaurants.single}
            params={{ restaurantId: reservation.restaurant.id }}
            style={{ display: "contents", color: "inherit" }}
          >
            <Title className={classes.textWithIcon} order={3}>
              <IconLink /> {reservation.restaurant.name}
            </Title>
          </Link>
          <Badge>{dayjs(reservation.date).format("DD MMMM HH:mm")}</Badge>
        </Group>
        <Text className={classes.textWithIcon}>
          <IconUsers size={theme.fontSizes.md} /> Guests:{" "}
          {reservation.guests_count}
        </Text>
      </Paper>
    )
  );

  return (
    <Stack p="lg">
      <Title order={1}>Reservations</Title>
      <Stack maw={700} spacing="lg">
        {reservations}
      </Stack>
    </Stack>
  );
};

const route = chainRoute({
  route: authorized(routes.reservations.list),
  beforeOpen: {
    effect: loadMyReservationsFx,
    mapParams: () => null,
  },
});

export default {
  route,
  view: ReservationsPage,
};
