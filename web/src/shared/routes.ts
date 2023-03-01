import { createRoute } from "atomic-router";

export const routes = {
  restaurants: {
    list: createRoute(),
    single: createRoute<{ restaurantId: string }>(),
  },
  admin: createRoute(),
  account: createRoute(),
  reservations: {
    list: createRoute(),
    single: createRoute<{ reservationId: string }>(),
  },
  preferences: createRoute(),
};
