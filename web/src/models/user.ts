import {
  createStore,
  createEffect,
  sample,
  createEvent,
  attach,
} from "effector";
import { me, updateMe } from "../api/auth";
import { APIUser, APIUserUpdate } from "../api/types";

import { $session } from "./session";

const fetchUserFx = createEffect(me);

export const updateAccount = createEvent<APIUserUpdate>();
const _updateAccountFx = createEffect(
  (params: { session: string; data: APIUserUpdate }) =>
    updateMe(params.session, params.data)
);
export const updateAccountFx = attach({
  source: $session,
  effect: _updateAccountFx,
  mapParams: (data: APIUserUpdate, session) => ({
    data,
    session: session as string,
  }),
});

const sessionChanged = createEvent<string | null>();

export const $user = createStore<APIUser | null>(null);

sample({
  clock: updateAccount,
  target: updateAccountFx,
});

sample({
  clock: updateAccountFx.doneData,
  target: $user,
});

sample({
  clock: updateAccountFx.failData,
  fn: () => null,
  target: $user,
});

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
