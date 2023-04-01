import {
  Card,
  Image,
  Text,
  Button,
  useMantineTheme,
  Stack,
  SimpleGrid,
  Title,
  Group,
} from "@mantine/core";
import { Link } from "atomic-router-react";
import { chainRoute } from "atomic-router";
import { useList } from "effector-react";

import { $myRestaurants, loadRestaurantsFx } from "../models/admin";
import { APIRestaurant } from "../api/types";
import { routes } from "../shared/routes";
import { adminOnly } from "../models/user";

export const AdminPage = () => {
  const theme = useMantineTheme();

  const restaurants = useList($myRestaurants, (restaurant: APIRestaurant) => (
    <Card
      shadow="sm"
      padding="xs"
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

      <Text weight={500}>{restaurant.name}</Text>

      <Text style={{ flexGrow: 1 }} size="sm" color="dimmed" lineClamp={4}>
        {restaurant.about}
      </Text>

      <Link
        to={routes.restaurants.single}
        params={{ restaurantId: restaurant.id }}
        style={{ display: "contents" }}
      >
        <Button variant="light" fullWidth mt="md" radius="md">
          Edit
        </Button>
      </Link>
    </Card>
  ));

  return (
    <Stack p="lg">
      <Group position="apart" mt="md" mb="xs">
        <Title order={1}>Restaurants</Title>
        <Link to={routes.restaurants.new} style={{ display: "contents" }}>
          <Button variant="light" mt="md" radius="md">
            Create new
          </Button>
        </Link>
      </Group>

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
  route: adminOnly(routes.admin),
  beforeOpen: {
    effect: loadRestaurantsFx,
    mapParams: () => null,
  },
});

export default {
  route: route,
  view: AdminPage,
};
