import { attach, createEffect, restore } from "effector";

import { deleteReservation, myReservations } from "../api/reservations";
import { $session } from "./session";
import { APIReservation } from "../api/types";

const _loadMyReservationsFx = createEffect(myReservations);
export const loadMyReservationsFx = attach({
  source: $session,
  effect: _loadMyReservationsFx,
  mapParams: (_, session) => session as string,
});

const _deleteReservationFx = createEffect(
  (params: { session: string; reservationId: number }) =>
    deleteReservation(params.session, params.reservationId)
);
export const deleteReservationFx = attach({
  source: $session,
  effect: _deleteReservationFx,
  mapParams: (reservationId: number, session) => ({
    session: session as string,
    reservationId,
  }),
});

export const $myReservations = restore(loadMyReservationsFx, []);
