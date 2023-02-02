import { createEffect, createEvent, createStore, sample } from "effector";
import { pageMounted } from "./page";

export const toggleNavbar = createEvent();

const loadNavbarFx = createEffect(() => {
  const navbarExpanded = localStorage.getItem("navbar");

  return navbarExpanded === "expanded";
});

const saveNavbarFx = createEffect((expanded: boolean) => {
  localStorage.setItem("navbar", expanded ? "expanded" : "collapsed");
});

export const $navbarExpanded = createStore(false);

sample({
  clock: pageMounted,
  target: loadNavbarFx,
});

sample({
  clock: loadNavbarFx.doneData,
  target: $navbarExpanded,
});

sample({
  clock: toggleNavbar,
  fn: (expanded) => !expanded,
  source: $navbarExpanded,
  target: $navbarExpanded,
});

$navbarExpanded.watch(toggleNavbar, saveNavbarFx);
