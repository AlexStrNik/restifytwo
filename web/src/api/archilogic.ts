import { get, post } from "./helpers";
import { APIFloor } from "./types";

export const floors = (session: string): Promise<APIFloor[]> =>
  get("/archilogic/floors", session);
