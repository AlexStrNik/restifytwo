export interface ApiOk {
  status: "ok";
}

export interface APIUserSign {
  email: string;
  password: string;
}

export interface APIUserRegister extends APIUserSign {
  name: string;
}

export interface APIUser {
  id: number;
  email: string;
  name: string;
  is_admin: boolean;
  archilogic_secret_token: string;
  archilogic_public_token: string;
}

export interface APIAuth {
  jwt: string;
}

export interface APIRestaurant {
  id: number;
  name: string;
  about: string;
  floor_id: string;
  archilogic_token: string;
}

export interface APIRestaurantImage {
  id: number;
  path: string;
}

export interface APIRestaurantFull extends APIRestaurant {
  images: APIRestaurantImage[];
  reviews: APIReviewLight[];
}

export interface APIRestaurantCreate {
  name: string;
  about: string;
  floor_id: string;
}

export interface APIUserUpdate extends Partial<APIUser> {}

export interface APIFloor {
  id: string;
  name: string;
}

export interface APIReservation {
  id: number;
  guest_id?: number;
  table_id: string;
  restaurant: APIRestaurant;
  guests_count: number;
  date: string;
}

export interface APIReservationCreate {
  restaurant: number;
  table: string;
  guests_count: number;
  date: string;
}

export interface APIReviewLight {
  rating: number;
}

export interface APIReviewAuthor {
  name: string;
}

export interface APIReview {
  id: number;
  author: APIReviewAuthor;
  review: string;
  rating: number;
}

export interface APIReviewCreate {
  review: string;
  rating: number;
}

export type { FileWithPath } from "@mantine/dropzone";
