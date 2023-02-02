import { get, post } from "./helpers";
import { APIRestaurant, APIRestaurantCreate } from "./types";

export const restaurants = (session: string): Promise<APIRestaurant[]> =>
  get("/admin/restaurants", session);

export const addRestaurant = (
  session: string,
  restaurant: APIRestaurantCreate
): Promise<APIRestaurant> => post("/admin/restaurants", restaurant, session);
