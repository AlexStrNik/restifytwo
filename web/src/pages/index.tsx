import { Center, Loader } from "@mantine/core";
import { createRoutesView } from "atomic-router-react";

import { routes } from "../shared/routes";
import RestaurantsPage from "./RestaurantsPage";
import AccountPage from "./AccountPage";
import PreferencesPage from "./PreferencesPage";
import RestaurantPage from "./RestaurantPage";
import AdminPage from "./AdminPage";
import NewRestaurantPage from "./NewRestaurantPage";
import ReservationsPage from "./ReservationsPage";
import AdminReservationsPage from "./AdminReservationsPage";

export const pagesMap = [
  { path: "/", route: routes.restaurants.list },
  { path: "/restaurants", route: routes.restaurants.list },
  { path: "/restaurants/new", route: routes.restaurants.new },
  { path: "/restaurants/view/:restaurantId", route: routes.restaurants.single },
  { path: "/reservations", route: routes.reservations.list },
  {
    path: "/restaurants/reservations/:restaurantId",
    route: routes.restaurants.reservations,
  },
  { path: "/admin", route: routes.admin },
  { path: "/account", route: routes.account },
  { path: "/preferences", route: routes.preferences },
];

export const Pages = createRoutesView({
  routes: [
    AccountPage,
    RestaurantsPage,
    PreferencesPage,
    RestaurantPage,
    NewRestaurantPage,
    ReservationsPage,
    AdminPage,
    AdminReservationsPage,
  ],
  otherwise() {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  },
});
