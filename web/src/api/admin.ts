import { get, post, upload } from "./helpers";
import {
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
