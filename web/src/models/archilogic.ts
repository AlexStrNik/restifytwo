import { attach, createEffect, createEvent, restore } from "effector";

import { floors } from "../api/archilogic";
import { $session } from "./session";

const _loadFloorsFx = createEffect(floors);
export const loadFloorsFx = attach({
  source: $session,
  effect: _loadFloorsFx,
  mapParams: (_, session) => session as string,
});

export const $myFloors = restore(loadFloorsFx, []);
