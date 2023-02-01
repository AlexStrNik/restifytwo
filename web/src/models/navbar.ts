import { createEffect, createEvent, createStore, sample } from "effector";
import { pageMounted } from "./page";

export const toggleNavbar = createEvent();
export const navbarSelect = createEvent<string>();

const loadNavbar = createEffect(() => {
  const navbarExpanded = localStorage.getItem("navbar");

  return navbarExpanded === "expanded";
});

const saveNavbar = createEffect((expanded: boolean) => {
  localStorage.setItem("navbar", expanded ? "expanded" : "collapsed");
});

export const $navbarExpanded = createStore(false);
export const $navbarSelected = createStore("account").on(
  navbarSelect,
  (_, selected) => selected
);

sample({
  clock: pageMounted,
  target: loadNavbar,
});

sample({
  clock: loadNavbar.doneData,
  target: $navbarExpanded,
});

sample({
  clock: toggleNavbar,
  fn: (expanded) => !expanded,
  source: $navbarExpanded,
  target: $navbarExpanded,
});

$navbarExpanded.watch(toggleNavbar, saveNavbar);
