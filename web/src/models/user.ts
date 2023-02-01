import { createStore, createEffect, sample, createEvent } from "effector";
import { me } from "../api/auth";
import { APIUser } from "../api/types";

import { $session } from "./session";

const fetchUserFx = createEffect(me);
const sessionChanged = createEvent<string | null>();

export const $user = createStore<APIUser | null>(null);

sample({
  clock: fetchUserFx.doneData,
  target: $user,
});

sample({
  clock: fetchUserFx.failData,
  fn: () => null,
  target: $user,
});

sample({
  clock: sessionChanged,
  filter: (session: string | null) => session !== null,
  fn: (session) => session as string,
  target: fetchUserFx,
});

$session.watch(sessionChanged);
