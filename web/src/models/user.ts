import {
  createStore,
  createEffect,
  sample,
  createEvent,
  attach,
} from "effector";
import { me, updateMe } from "../api/auth";
import { APIUser, APIUserUpdate } from "../api/types";

import { $session, authorized } from "./session";
import {
  RouteParams,
  RouteInstance,
  RouteParamsAndQuery,
  chainRoute,
} from "atomic-router";

const fetchUserFx = createEffect(me);

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

export const adminOnly = <P extends RouteParams>(route: RouteInstance<P>) => {
  const userLoadStarted = createEvent<RouteParamsAndQuery<P>>();

  const alreadyAuthorized = sample({
    clock: userLoadStarted,
    filter: $user.map((s) => s !== null),
  });

  const notAnAdmin = $user.map((user) => user !== null && !user?.is_admin);

  return chainRoute({
    route: authorized(route),
    beforeOpen: userLoadStarted,
    openOn: [alreadyAuthorized, fetchUserFx.doneData],
    cancelOn: [notAnAdmin],
  });
};

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
