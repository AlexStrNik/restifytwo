import { Text, Title, Group, ScrollArea, Button, Modal } from "@mantine/core";
import { useStore } from "effector-react";
import { chainRoute } from "atomic-router";
import { useDisclosure } from "@mantine/hooks";

import { routes } from "../shared/routes";
import {
  $restaurant,
  createReservationFx as _createReservationFx,
  loadReservationsForTableFx as _loadReservationsForTableFx,
  loadRestaurantFx,
} from "../models/restaurants";
import RestaurantImages from "../components/RestaurantImages";
import ReviewForm from "../forms/ReviewForm";
import RestaurantRating from "../components/RestaurantRating";
import RestaurantReviews from "../components/RestaurantReviews";
import ReservationForm from "../forms/ReservationForm";

const RestaurantPage = () => {
  const restaurant = useStore($restaurant);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size="xl"
        title={<Title order={3}>Create reservation</Title>}
        onClose={close}
        opened={opened}
      >
        <ReservationForm restaurant={restaurant!} />
      </Modal>
      <ScrollArea p="lg" maw={700} pos="relative">
        <RestaurantImages images={restaurant!.images} height={320} />
        <Group position="apart" mt="md" mb="xs">
          <Title style={{ marginTop: 0 }} order={1}>
            {restaurant!.name}
          </Title>
          <RestaurantRating reviews={restaurant!.reviews} />
        </Group>

        <Button onClick={open} fullWidth mb="xl" size="md">
          Book now
        </Button>

        <Text>{restaurant!.about}</Text>

        <RestaurantReviews restaurant={restaurant!} />

        <ReviewForm restaurant={restaurant!} />
      </ScrollArea>
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
  view: RestaurantPage,
};
