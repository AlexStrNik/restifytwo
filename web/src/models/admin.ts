import { attach, createEffect, createEvent, restore } from "effector";

import { addRestaurant, restaurants } from "../api/admin";
import { APIRestaurantCreate } from "../api/types";
import { $session } from "./session";

const _loadRestaurantsFx = createEffect(restaurants);
export const loadRestaurantsFx = attach({
  source: $session,
  effect: _loadRestaurantsFx,
  mapParams: (_, session) => session as string,
});

const _createRestaurantFx = createEffect(
  (params: { session: string; data: APIRestaurantCreate }) =>
    addRestaurant(params.session, params.data)
);
export const createRestaurantFx = attach({
  source: $session,
  effect: _createRestaurantFx,
  mapParams: (data: APIRestaurantCreate, session) => ({
    data,
    session: session as string,
  }),
});

export const $myRestaurants = restore(loadRestaurantsFx, []);
