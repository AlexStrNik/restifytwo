import { createRoute } from "atomic-router";

export const routes = {
  restaurants: {
    list: createRoute(),
    new: createRoute(),
    single: createRoute<{ restaurantId: number }>(),
    edit: createRoute<{ restaurantId: number }>(),
    reservations: createRoute<{ restaurantId: number }>(),
  },
  admin: createRoute(),
  account: createRoute(),
  reservations: {
    list: createRoute(),
  },
  preferences: createRoute(),
};
