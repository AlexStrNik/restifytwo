import { createEffect, createEvent, createStore, sample } from "effector";

import { pageMounted } from "./page";

export const navigateTo = createEvent<string>();

const navigateToFx = createEffect((route: string) => {
  history.pushState(null, "", route);
});

const loadRouteFx = createEffect(() => {
  return document.location.pathname;
});

export const $route = createStore("/account");

sample({
  clock: navigateTo,
  target: $route,
});

sample({
  clock: loadRouteFx.doneData,
  target: $route,
});

sample({
  clock: pageMounted,
  target: loadRouteFx,
});

$route.watch(navigateTo, navigateToFx);
