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
  phone: string;
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
  address: string;
  floor_id: string;
  archilogic_token: string;
  schedules: Schedule[];
}

export interface Schedule {
  day_of_week: number;
  opens_at: number;
  closes_at: number;
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
  address: string;
  schedules: Schedule[];
}

export interface APIUserUpdate
  extends Omit<Partial<APIUser>, "id" | "is_admin"> {}

export interface APIFloor {
  id: string;
  name: string;
}

export interface APIReservation {
  id: number;
  table_id: string;
  restaurant: APIRestaurant;
  guests_count: number;
  date: string;
}

export interface APIReservationAdmin extends APIReservation {
  guest: APIUser;
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

export interface APIPlacesItem {
  name: string;
  description: string;
  id: string;
}

export type { FileWithPath } from "@mantine/dropzone";
