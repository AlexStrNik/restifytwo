import { attach, createEffect, createEvent, restore } from "effector";

import {
  addRestaurant,
  restaurants,
  uploadRestaurantImages,
} from "../api/admin";
import { APIRestaurant, APIRestaurantCreate, FileWithPath } from "../api/types";
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

const _uploadRestaurantImagesFx = createEffect(
  (params: {
    session: string;
    restaurant: APIRestaurant;
    images: FileWithPath[];
  }) => uploadRestaurantImages(params.session, params.restaurant, params.images)
);
export const uploadRestaurantImagesFx = attach({
  source: $session,
  effect: _uploadRestaurantImagesFx,
  mapParams: (
    data: { restaurant: APIRestaurant; images: FileWithPath[] },
    session
  ) => ({
    ...data,
    session: session as string,
  }),
});

export const $myRestaurants = restore(loadRestaurantsFx, []);
