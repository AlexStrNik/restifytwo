import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { floors } from "../api/archilogic";
import { APIFloor } from "../api/types";
import { $session } from "./session";

export const loadFloors = createEvent();
const _loadFloorsFx = createEffect(floors);
export const loadFloorsFx = attach({
  source: $session,
  effect: _loadFloorsFx,
  mapParams: (_, session) => session as string,
});

export const $myFloors = createStore<APIFloor[]>([]);

sample({
  clock: loadFloors,
  target: loadFloorsFx,
});

sample({
  clock: loadFloorsFx.doneData,
  target: $myFloors,
});

sample({
  clock: loadFloorsFx.fail,
  fn: (_) => [],
  target: $myFloors,
});
