"use client";
import { useEffect, useState } from "react";

export const useLocal = (
  key: any,
  defaultValue?: any
): [any, (key: any) => any] => {
  const [_data, set_data] = useState<any>(null);
  useEffect(() => {
    let data = localStorage.getItem(key);
    try {
      if (data !== null) set_data(JSON.parse(data));
      else set_data(defaultValue);
    } catch (e) {
      set_data(data);
    }
  }, []);

  function setLocal(data: any) {
    if (typeof data === "object") {
      const _data = JSON.stringify(data);
      localStorage.setItem(key, _data);
      set_data(data);
    } else {
      localStorage.setItem(key, data);
      set_data(data);
    }
    return;
  }
  return [_data, setLocal];
};
