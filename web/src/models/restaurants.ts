import { createEffect, createEvent, restore, sample } from "effector";

import { restaurant, restaurants } from "../api/restaurants";

export const loadRestaurants = createEvent();
export const loadRestaurantsFx = createEffect(restaurants);

export const loadRestaurant = createEvent<number>();
export const loadRestaurantFx = createEffect(restaurant);

export const $restaurants = restore(loadRestaurantsFx, []);
export const $selectedRestaurant = restore(loadRestaurantFx, null);

sample({
  clock: loadRestaurants,
  target: loadRestaurantsFx,
});

sample({
  clock: loadRestaurant,
  target: loadRestaurantFx,
});
