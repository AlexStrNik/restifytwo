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
}

export interface APIAuth {
  jwt: string;
}
