import type { IconifyIcon } from "@iconify/types";

export type Action<T> = {
  name: string;
  icon: string | IconifyIcon;
  key: string;
  run: () => Promise<T>;
};

export type StringOptions = {
  [key: string]: {
    name: string;
    icon: string | IconifyIcon | null;
  };
};

export type Option<T> = {
  value: T;
  name: string;
  icon: string | IconifyIcon | null;
};

export type KeyedItem<T> = {
  key: string | number;
  value: T;
};
