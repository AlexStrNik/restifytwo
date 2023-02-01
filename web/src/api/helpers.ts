import { BASE_URL } from "./constants";

export const post = <T0, T1>(
  pathComponent: string,
  data: T0,
  session?: string
): Promise<T1> => {
  return fetch(`${BASE_URL}${pathComponent}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.status !== 200) {
      throw await res.json();
    }
    return await res.json();
  });
};

export const get = <T0>(
  pathComponent: string,
  session?: string
): Promise<T0> => {
  return fetch(`${BASE_URL}${pathComponent}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  }).then(async (res) => {
    if (res.status !== 200) {
      throw await res.json();
    }
    return await res.json();
  });
};
