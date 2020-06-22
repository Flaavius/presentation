import React from "react";

import { imageCache } from "./imageCache";

export const fetchAvatar = (Component) => {
  const controller = new AbortController();
  let tmout: NodeJS.Timeout | null = null;

  const getAvatar = async (id: number, url: string, callBack: (url: string) => void) => {

    if (imageCache.isCached(id)) {
      callBack(imageCache.get(id));
    } else {

      try {
        const resp = await fetch(url, {
          method: "GET",
          signal: controller.signal,
        });

        if (resp.status !== 200) return;

        const blob: Blob = await resp.blob();
        const objURL = URL.createObjectURL(blob);
        tmout = setTimeout(() => {
         callBack(objURL);
        }, 3000);
      } catch (error) {
        console.error(error.code, error.name, error.message);
      }
    }
  };

  const abort = () => {
    if (tmout) {
      clearTimeout(tmout);
      tmout = null;
    }
    controller.abort();
  };

  return (props) => {
   return (<Component {...props} fetchAvatar={getAvatar} abortFetch={abort} />);
  };
};
