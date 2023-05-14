import { get, post } from "./helpers";
import { APIReviewCreate, APIReview } from "./types";

export const reviews = (restaurantId: number): Promise<APIReview[]> =>
  get(`/restaurants/${restaurantId}/reviews`);

export const postReview = (
  session: string,
  restaurantId: number,
  data: APIReviewCreate
): Promise<APIReview> =>
  post(`/restaurants/${restaurantId}/reviews`, data, session);
