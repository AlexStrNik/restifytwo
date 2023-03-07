import { createEffect, restore } from "effector";

import { reservationsForTable } from "../api/reservations";

export const loadReservationsForTableFx = createEffect(reservationsForTable);

export const $reservationsForTable = restore(loadReservationsForTableFx, null);
