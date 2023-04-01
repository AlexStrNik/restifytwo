import { get } from "./helpers";
import { APIReservation } from "./types";

export const myReservations = (session: string): Promise<APIReservation[]> =>
  get("/reservations/", session);
