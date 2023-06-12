import dayjs from "dayjs";
import { Link } from "atomic-router-react";
import { chainRoute } from "atomic-router";
import { useList, useStore } from "effector-react";
import {
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconLink, IconUsers } from "@tabler/icons-react";

import {
  $myReservations,
  deleteReservationFx,
  loadMyReservationsFx,
} from "../models/reservations";
import { APIReservation } from "../api/types";
import { routes } from "../shared/routes";
import { authorized } from "../models/session";
import { forward } from "effector";

const useStyles = createStyles((theme) => {
  return {
    textWithIcon: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };
});

forward({
  from: deleteReservationFx.done,
  to: loadMyReservationsFx,
});

const ReservationsPage = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const deleteInProgress = useStore(deleteReservationFx.pending);
  const loadingInProgress = useStore(loadMyReservationsFx.pending);

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
        <Button mt="xl" onClick={() => deleteReservationFx(reservation.id)}>
          Delete reservation
        </Button>
      </Paper>
    )
  );

  return (
    <Stack p="lg">
      <LoadingOverlay visible={deleteInProgress || loadingInProgress} />
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
