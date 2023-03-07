import { get } from "./helpers";
import { APIReservation } from "./types";

export const reservationsForTable = (
  table: string
): Promise<APIReservation[]> => get(`/reservations/table/${table}`);
