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
  archilogic_token: string;
}

export interface APIAuth {
  jwt: string;
}

export interface APIRestaurant {
  id: number;
  name: string;
  about: string;
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
