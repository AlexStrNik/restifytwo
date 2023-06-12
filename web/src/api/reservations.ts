import { delete_, get } from "./helpers";
import { APIReservation, ApiOk } from "./types";

export const myReservations = (session: string): Promise<APIReservation[]> =>
  get("/reservations/", session);

export const deleteReservation = (
  session: string,
  reservationId: number
): Promise<ApiOk> => delete_(`/reservations/${reservationId}`, session);
