import { BASE_URL } from "./constants";

const DELAY = 500;
const delayed = <T>(promise: Promise<T>) =>
  new Promise((res) => setTimeout(res, DELAY)).then(() => promise);

export const post = <T0, T1>(
  pathComponent: string,
  data: T0,
  session?: string
): Promise<T1> => {
  return delayed(
    fetch(`${BASE_URL}${pathComponent}`, {
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
    })
  );
};

export const get = <T0>(
  pathComponent: string,
  session?: string
): Promise<T0> => {
  return delayed(
    fetch(`${BASE_URL}${pathComponent}`, {
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
    })
  );
};
