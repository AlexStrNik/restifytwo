import { Center, Loader } from "@mantine/core";
import { createRoutesView } from "atomic-router-react";

import { routes } from "../shared/routes";
import RestaurantsPage from "./RestaurantsPage";
import AccountPage from "./AccountPage";
import PreferencesPage from "./PreferencesPage";
import BookingPage from "./BookingPage";

export const pagesMap = [
  { path: "/", route: routes.restaurants.list },
  { path: "/restaurants", route: routes.restaurants.list },
  { path: "/restaurants/:restaurantId", route: routes.restaurants.single },
  { path: "/reservations", route: routes.reservations.list },
  { path: "/reservations/:reservationsId", route: routes.reservations.single },
  { path: "/admin", route: routes.admin },
  { path: "/account", route: routes.account },
  { path: "/preferences", route: routes.preferences },
];

export const Pages = createRoutesView({
  routes: [AccountPage, RestaurantsPage, PreferencesPage, BookingPage],
  otherwise() {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  },
});
