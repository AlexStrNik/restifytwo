import { ApiOk, FileWithPath } from "./types";
import { API_URL, UPLOADS_URL } from "./constants";

const DELAY = 500;
const delayed = <T>(promise: Promise<T>) =>
  new Promise((res) => setTimeout(res, DELAY)).then(() => promise);

export const post = <T0, T1>(
  pathComponent: string,
  data: T0,
  session?: string
): Promise<T1> => {
  return delayed(
    fetch(`${API_URL}${pathComponent}`, {
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

export const upload = (
  pathComponent: string,
  files: FileWithPath[],
  session?: string
): Promise<ApiOk> => {
  if (files.length == 0) {
    return Promise.resolve({ status: "ok" });
  }

  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  return delayed(
    fetch(`${API_URL}${pathComponent}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: formData,
    }).then(async (res) => {
      if (res.status !== 200) {
        throw await res.json();
      }
      return await res.json();
    })
  );
};

export const download = (
  pathComponent: string,
  session?: string
): Promise<void> => {
  return delayed(
    fetch(`${API_URL}${pathComponent}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }).then(async (res) => {
      if (res.status !== 200) {
        throw await res.json();
      }

      let filename = "";
      const disposition = res.headers.get("Content-Disposition")!;
      filename = disposition.split(/;(.+)/)[1].split(/=(.+)/)[1];
      if (filename.toLowerCase().startsWith("utf-8''"))
        filename = decodeURIComponent(filename.replace(/utf-8''/i, ""));
      else filename = filename.replace(/['"]/g, "");

      const blob = await res.blob();
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  );
};

export const uploads = (file_name: string) => `${UPLOADS_URL}/${file_name}`;

export const get = <T0>(
  pathComponent: string,
  session?: string
): Promise<T0> => {
  return delayed(
    fetch(`${API_URL}${pathComponent}`, {
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
