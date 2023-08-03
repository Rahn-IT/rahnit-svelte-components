import type { IconifyIcon } from '@iconify/types';

export type Action<T> = {
	name: string;
	icon: string | IconifyIcon;
	key: string;
	run: (() => Promise<T>) | string;
};

export type Option<T> = {
	value: T;
	name: string;
	icon?: string | IconifyIcon;
};

export type Validator = {
	valid: boolean;
	validate(valid: boolean): void;
	unsubscribe(): void;
};
