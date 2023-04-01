import { createEffect, sample, createEvent, restore } from "effector";

import { APIUserSign, APIUserRegister } from "../api/types";
import { login, regsiter } from "../api/auth";
import { pageMounted } from "./page";
import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from "atomic-router";

export const signInFx = createEffect(async (data: APIUserSign) => {
  const auth = await login(data);
  localStorage.setItem("session", auth.jwt);
  return auth;
});

export const signUpFx = createEffect(async (data: APIUserRegister) => {
  const auth = await regsiter(data);
  localStorage.setItem("session", auth.jwt);
  return auth;
});

const signOutFx = createEffect(() => {
  localStorage.removeItem("session");
});

const loadUserFx = createEffect(() => {
  const source = localStorage.getItem("session");

  return source;
});

export const $session = restore(loadUserFx, null);

export const authorized = <P extends RouteParams>(route: RouteInstance<P>) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<P>>();

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    filter: $session.map((s) => s !== null),
  });

  return chainRoute({
    route: route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, loadUserFx.doneData],
  });
};

export const signIn = createEvent<APIUserSign>();
export const signUp = createEvent<APIUserRegister>();
export const signOut = createEvent();

sample({
  clock: pageMounted,
  target: loadUserFx,
});

sample({
  clock: signIn,
  target: signInFx,
});

sample({
  clock: signInFx.doneData,
  fn: (auth) => auth.jwt,
  target: $session,
});

sample({
  clock: signInFx.fail,
  fn: () => null,
  target: $session,
});

sample({
  clock: signUp,
  target: signUpFx,
});

sample({
  clock: signUpFx.doneData,
  fn: (auth) => auth.jwt,
  target: $session,
});

sample({
  clock: signUpFx.fail,
  fn: () => null,
  target: $session,
});

sample({
  clock: signOut,
  target: signOutFx,
});

sample({
  clock: signOutFx.doneData,
  fn: () => null,
  target: $session,
});
