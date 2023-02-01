import { createEffect, createEvent, createStore, sample } from "effector";

import { pageMounted } from "./page";

export const toggleTheme = createEvent();

export const $theme = createStore<"dark" | "light">("light");

const loadTheme = createEffect(() => {
  const theme = localStorage.getItem("theme");

  return (theme || "light") as "dark" | "light";
});

const saveTheme = createEffect((theme: string) => {
  localStorage.setItem("theme", theme);
});

const applyTheme = createEffect((theme: string) => {
  document.getElementById("root")!.dataset.theme = theme;
});

sample({
  clock: pageMounted,
  target: loadTheme,
});

sample({
  clock: loadTheme.doneData,
  target: $theme,
});

sample({
  clock: toggleTheme,
  fn: (theme) => (theme === "light" ? "dark" : "light"),
  source: $theme,
  target: $theme,
});

$theme.watch(toggleTheme, saveTheme);
$theme.watch(applyTheme);
