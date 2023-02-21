import { createEffect, createEvent, createStore, sample } from "effector";

import { restaurant, restaurants } from "../api/restaurants";
import { APIRestaurant } from "../api/types";

export const loadRestaurants = createEvent();
export const loadRestaurantsFx = createEffect(restaurants);

export const loadRestaurant = createEvent<number>();
export const loadRestaurantFx = createEffect(restaurant);

export const $restaurants = createStore<APIRestaurant[]>([]);
export const $selectedRestaurant = createStore<APIRestaurant | null>(null);

sample({
  clock: loadRestaurants,
  target: loadRestaurantsFx,
});

sample({
  clock: loadRestaurantsFx.doneData,
  target: $restaurants,
});

sample({
  clock: loadRestaurantsFx.fail,
  fn: (_) => [],
  target: $restaurants,
});

sample({
  clock: loadRestaurant,
  target: loadRestaurantFx,
});

sample({
  clock: loadRestaurantFx.doneData,
  target: $selectedRestaurant,
});

sample({
  clock: loadRestaurantFx.fail,
  fn: (_) => null,
  target: $selectedRestaurant,
});
