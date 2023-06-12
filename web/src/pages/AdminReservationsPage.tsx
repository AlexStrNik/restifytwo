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
import {
  IconAt,
  IconLink,
  IconPhone,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

import { APIReservationAdmin } from "../api/types";
import { routes } from "../shared/routes";
import { adminOnly } from "../models/user";
import {
  $reservations,
  downloadReservationsForRestaurantFx,
  loadReservationsForRestaurantFx,
} from "../models/admin";
import { deleteReservationFx } from "../models/reservations";
import { forward } from "effector";
import { sample } from "effector";

const useStyles = createStyles(() => {
  return {
    textWithIcon: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };
});

const AdminReservationsPage = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const restaurantId = useStore(route.$params).restaurantId;

  const deleteInProgress = useStore(deleteReservationFx.pending);
  const loadingInProgress = useStore(loadReservationsForRestaurantFx.pending);
  const downloadInProgress = useStore(
    downloadReservationsForRestaurantFx.pending
  );

  const reservations = useList(
    $reservations,
    (reservation: APIReservationAdmin) => (
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
          <IconUser size={theme.fontSizes.md} />
          Name: {reservation.guest.name}
        </Text>
        <Text className={classes.textWithIcon}>
          <IconAt size={theme.fontSizes.md} />
          E-Mail: {reservation.guest.email}
        </Text>
        <Text className={classes.textWithIcon}>
          <IconPhone size={theme.fontSizes.md} />
          Phone: {reservation.guest.phone}
        </Text>
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
      <Group position="apart" mt="md" mb="xs">
        <Title order={1}>Reservations</Title>
        <Button
          onClick={() => downloadReservationsForRestaurantFx(restaurantId)}
          variant="light"
          mt="md"
          radius="md"
          loading={downloadInProgress}
          disabled={downloadInProgress}
        >
          Export
        </Button>
      </Group>
      <Stack maw={700} spacing="lg">
        {reservations}
      </Stack>
    </Stack>
  );
};

const route = chainRoute({
  route: adminOnly(routes.restaurants.reservations),
  beforeOpen: {
    effect: loadReservationsForRestaurantFx,
    mapParams: ({ params }) => params.restaurantId,
  },
});

sample({
  clock: deleteReservationFx.done,
  source: route.$params,
  fn: (src, _) => src.restaurantId,
  target: loadReservationsForRestaurantFx,
});

export default {
  route,
  view: AdminReservationsPage,
};
