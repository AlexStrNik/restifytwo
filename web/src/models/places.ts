import { createEffect, restore } from "effector";
import { suggest } from "../api/places";

export const loadSuggestFx = createEffect(suggest);

export const $suggest = restore(loadSuggestFx, []);
