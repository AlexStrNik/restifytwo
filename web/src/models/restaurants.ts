import { attach, createEffect, restore } from "effector";

import {
  reservations,
  reserve,
  restaurant,
  restaurants,
} from "../api/restaurants";
import { APIReservationCreate } from "../api/types";
import { $session } from "./session";

export const loadRestaurantsFx = createEffect(restaurants);
export const loadRestaurantFx = createEffect(restaurant);
export const loadReservationsForTableFx = createEffect(
  (params: { restaurant: number; table: string }) =>
    reservations(params.restaurant, params.table)
);
const _createReservation = createEffect(
  (params: { session: string; data: APIReservationCreate }) =>
    reserve(params.session, params.data)
);
export const createReservationFx = attach({
  source: $session,
  effect: _createReservation,
  mapParams: (data: APIReservationCreate, session) => ({
    data,
    session: session as string,
  }),
});

export const $restaurants = restore(loadRestaurantsFx, []);
export const $restaurant = restore(loadRestaurantFx, null);
export const $reservationsForTable = restore(loadReservationsForTableFx, null);
