import { get, post } from "./helpers";
import { APIReservation, APIReservationCreate, APIRestaurant } from "./types";

export const restaurants = (): Promise<APIRestaurant[]> => get("/restaurants");

export const restaurant = (id: number): Promise<APIRestaurant> =>
  get(`/restaurants/${id}`);

export const reservations = (
  restaurant: number,
  table: string
): Promise<APIReservation[]> =>
  get(`/restaurants/${restaurant}/reservaions/${table}`);

export const reserve = (
  session: string,
  data: APIReservationCreate
): Promise<APIReservation> =>
  post(
    `/restaurants/${data.restaurant}/reservaions/${data.table}`,
    data,
    session
  );
