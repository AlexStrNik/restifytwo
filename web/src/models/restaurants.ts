import { createEffect, restore } from "effector";

import { reservations, restaurant, restaurants } from "../api/restaurants";

export const loadRestaurantsFx = createEffect(restaurants);
export const loadRestaurantFx = createEffect(restaurant);
export const loadReservationsForTableFx = createEffect(
  (params: { restaurant: number; table: string }) =>
    reservations(params.restaurant, params.table)
);

export const $restaurants = restore(loadRestaurantsFx, []);
export const $restaurant = restore(loadRestaurantFx, null);
export const $reservationsForTable = restore(loadReservationsForTableFx, null);
