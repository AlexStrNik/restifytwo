import { createStore, createEffect, sample, createEvent } from "effector";

import { APIUserSign, APIUserRegister, APIAuth } from "../api/types";
import { login, regsiter } from "../api/auth";
import { pageMounted } from "./page";

const signInFx = createEffect(async (data: APIUserSign) => {
  const auth = await login(data);
  localStorage.setItem("session", auth.jwt);
  return auth;
});

const signUpFx = createEffect(async (data: APIUserRegister) => {
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

export const $session = createStore<string | null>(null).on(
  loadUserFx.doneData,
  (_, user) => user
);

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
