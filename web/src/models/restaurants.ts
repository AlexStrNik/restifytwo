import { createEffect, restore } from "effector";

import { restaurant, restaurants } from "../api/restaurants";

export const loadRestaurantsFx = createEffect(restaurants);
export const loadRestaurantFx = createEffect(restaurant);

export const $restaurants = restore(loadRestaurantsFx, []);
export const $restaurant = restore(loadRestaurantFx, null);
