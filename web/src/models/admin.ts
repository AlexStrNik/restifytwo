import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { addRestaurant, restaurants } from "../api/admin";
import { APIRestaurant, APIRestaurantCreate } from "../api/types";
import { $session } from "./session";

export const loadRestaurants = createEvent();
const _loadRestaurantsFx = createEffect(restaurants);
export const loadRestaurantsFx = attach({
  source: $session,
  effect: _loadRestaurantsFx,
});

export const createRestaurant = createEvent<APIRestaurantCreate>();
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

export const $myRestaurants = createStore<APIRestaurant[]>([]);
export const $selectedRestaurant = createStore(null);

sample({
  clock: loadRestaurants,
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
  target: createRestaurantFx,
});

sample({
  clock: createRestaurantFx.done,
  target: loadRestaurants,
});
