import { attach, createEffect, restore } from "effector";

import { myReservations } from "../api/reservations";
import { $session } from "./session";

const _loadMyReservationsFx = createEffect(myReservations);
export const loadMyReservationsFx = attach({
  source: $session,
  effect: _loadMyReservationsFx,
  mapParams: (_, session) => session as string,
});

export const $myReservations = restore(loadMyReservationsFx, []);
