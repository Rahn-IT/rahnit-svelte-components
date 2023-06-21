import type { IconifyIcon } from '@iconify/types';

export type Action<T> = {
	name: string;
	icon: string | IconifyIcon;
	key: string;
	run: () => Promise<T>;
};

export type Option<T> = {
	value: T;
	name: string;
	icon?: string | IconifyIcon;
};

export type KeyedItem<T> = {
	key: string | number;
	value: T;
};
