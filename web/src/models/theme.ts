import { DefaultMantineColor } from "@mantine/core";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { pageMounted } from "./page";

interface Theme {
  colorScheme: "dark" | "light";
  primaryColor: DefaultMantineColor;
}

const DEFAULT_THEME: Theme = {
  colorScheme: "light",
  primaryColor: "blue",
};

export const toggleColorScheme = createEvent();

export const setPrimaryColor = createEvent<DefaultMantineColor>();

const loadThemeFx = createEffect(() => {
  const theme = localStorage.getItem("theme");

  return theme ? JSON.parse(theme) : DEFAULT_THEME;
});

const saveThemeFx = createEffect((theme: Theme) => {
  localStorage.setItem("theme", JSON.stringify(theme));
});

export const $theme = createStore<Theme>(DEFAULT_THEME);

sample({
  clock: pageMounted,
  target: loadThemeFx,
});

sample({
  clock: loadThemeFx.doneData,
  target: $theme,
});

sample({
  clock: toggleColorScheme,
  fn: (theme) =>
    ({
      primaryColor: theme.primaryColor,
      colorScheme: theme.colorScheme === "dark" ? "light" : "dark",
    } as Theme),
  source: $theme,
  target: $theme,
});

sample({
  clock: setPrimaryColor,
  fn: (theme, color) => ({
    colorScheme: theme.colorScheme,
    primaryColor: color,
  }),
  source: $theme,
  target: $theme,
});

$theme.watch(setPrimaryColor, saveThemeFx);
$theme.watch(toggleColorScheme, saveThemeFx);
