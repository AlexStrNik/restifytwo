import { createEffect, createEvent, createStore, sample } from "effector";

import { pageMounted } from "./page";

export const toggleTheme = createEvent();

export const $theme = createStore<"dark" | "light">("light");

const loadThemeFx = createEffect(() => {
  const theme = localStorage.getItem("theme");

  return (theme || "light") as "dark" | "light";
});

const saveThemeFx = createEffect((theme: string) => {
  localStorage.setItem("theme", theme);
});

const applyThemeFx = createEffect((theme: string) => {
  document.getElementById("root")!.dataset.theme = theme;
});

sample({
  clock: pageMounted,
  target: loadThemeFx,
});

sample({
  clock: loadThemeFx.doneData,
  target: $theme,
});

sample({
  clock: toggleTheme,
  fn: (theme) => (theme === "light" ? "dark" : "light"),
  source: $theme,
  target: $theme,
});

$theme.watch(toggleTheme, saveThemeFx);
$theme.watch(applyThemeFx);
