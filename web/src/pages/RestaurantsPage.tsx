import { chainRoute } from "atomic-router";
import { useList } from "effector-react";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { $restaurants, loadRestaurantsFx } from "../models/restaurants";
import { APIRestaurant } from "../api/types";
import { routes } from "../shared/routes";

const RestaurantsPage = () => {
  const restaurants = useList($restaurants, (restaurant: APIRestaurant) => (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      display="flex"
      style={{ flexDirection: "column" }}
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{restaurant.name}</Text>
        <Badge variant="light">New</Badge>
      </Group>

      <Text style={{ flexGrow: 1 }} size="sm" color="dimmed" lineClamp={4}>
        {restaurant.about}
      </Text>

      <Button variant="light" fullWidth mt="md" radius="md">
        Book now
      </Button>
    </Card>
  ));
  return (
    <Stack p="lg">
      <Title style={{ marginTop: 0 }} order={1}>
        Restaurants
      </Title>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1300, cols: 2, spacing: "md" },
          { maxWidth: 800, cols: 1, spacing: "sm" },
        ]}
      >
        {restaurants}
      </SimpleGrid>
    </Stack>
  );
};

const route = chainRoute({
  route: routes.restaurants.list,
  beforeOpen: {
    effect: loadRestaurantsFx,
    mapParams: () => null,
  },
});

export default {
  route,
  view: RestaurantsPage,
};
