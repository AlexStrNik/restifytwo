import { get } from "./helpers";
import { APIPlacesItem } from "./types";

export const suggest = (query: string): Promise<APIPlacesItem[]> =>
  get(`/places/search?query=${query}`);
