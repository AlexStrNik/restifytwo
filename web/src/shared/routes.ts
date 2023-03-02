import { createRoute } from "atomic-router";

export const routes = {
  restaurants: {
    list: createRoute(),
    single: createRoute<{ restaurantId: number }>(),
  },
  admin: createRoute(),
  account: createRoute(),
  reservations: {
    list: createRoute(),
    single: createRoute<{ reservationId: number }>(),
  },
  preferences: createRoute(),
};
