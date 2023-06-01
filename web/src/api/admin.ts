import { download, get, post, upload } from "./helpers";
import { API_URL } from "./constants";
import {
  APIReservationAdmin,
  APIRestaurant,
  APIRestaurantCreate,
  APIRestaurantFull,
  ApiOk,
  FileWithPath,
} from "./types";

export const restaurants = (session: string): Promise<APIRestaurantFull[]> =>
  get("/admin/restaurants", session);

export const addRestaurant = (
  session: string,
  restaurant: APIRestaurantCreate
): Promise<APIRestaurantFull> =>
  post("/admin/restaurants", restaurant, session);

export const uploadRestaurantImages = (
  session: string,
  restuarant: APIRestaurant,
  images: FileWithPath[]
): Promise<ApiOk> =>
  upload(`/admin/restaurants/${restuarant.id}/images`, images, session);

export const reservationsForRestaurant = (
  session: string,
  restuarantId: number
): Promise<APIReservationAdmin[]> =>
  get(`/admin/restaurants/${restuarantId}/reservations`, session);

export const reservationsExport = (session: string, restaurantId: number) =>
  download(`/admin/restaurants/${restaurantId}/reservations-export`, session);
