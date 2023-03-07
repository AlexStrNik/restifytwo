import { get } from "./helpers";
import { APIReservation, APIRestaurant } from "./types";

export const restaurants = (): Promise<APIRestaurant[]> => get("/restaurants");

export const restaurant = (id: number): Promise<APIRestaurant> =>
  get(`/restaurants/${id}`);

export const reservations = (
  id: number,
  table: string
): Promise<APIReservation[]> => get(`/restaurants/${id}/reservaions/${table}`);
