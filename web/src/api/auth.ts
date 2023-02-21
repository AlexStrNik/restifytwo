import { post, get } from "./helpers";
import {
  APIUserRegister,
  APIUserSign,
  APIAuth,
  APIUser,
  APIUserUpdate,
} from "./types";

export const login = (data: APIUserSign): Promise<APIAuth> =>
  post("/auth/login", data);

export const regsiter = (data: APIUserRegister): Promise<APIAuth> =>
  post("/auth/register", data);

export const me = (session: string): Promise<APIUser> =>
  get("/auth/me", session);

export const updateMe = (
  session: string,
  data: APIUserUpdate
): Promise<APIUser> => post("/auth/me", data, session);
