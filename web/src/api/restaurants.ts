import { get } from "./helpers";
import { APIRestaurant } from "./types";

export const restaurants = (): Promise<APIRestaurant[]> => get("/restaurants");

export const restaurant = (id: number): Promise<APIRestaurant> =>
  get(`/restaurants/${id}`);
