import { createEffect, createEvent, createStore, sample } from "effector";

import { addRestaurant, restaurants } from "../api/admin";
import { APIRestaurant, APIRestaurantCreate } from "../api/types";
import { $session } from "./session";

export const loadRestaurants = createEvent();
export const loadRestaurantsFx = createEffect(restaurants);

export const createRestaurant = createEvent<APIRestaurantCreate>();
export const createRestaurantFx = createEffect(
  (params: { session: string; data: APIRestaurantCreate }) =>
    addRestaurant(params.session, params.data)
);

export const $myRestaurants = createStore<APIRestaurant[]>([]);
export const $selectedRestaurant = createStore(null);

sample({
  clock: loadRestaurants,
  source: $session,
  fn: (session) => session as string,
  target: loadRestaurantsFx,
});

sample({
  clock: loadRestaurantsFx.doneData,
  target: $myRestaurants,
});

sample({
  clock: loadRestaurantsFx.fail,
  fn: (_) => [],
  target: $myRestaurants,
});

sample({
  clock: createRestaurant,
  source: $session,
  fn: (session, data) => ({ data, session: session as string }),
  target: createRestaurantFx,
});
