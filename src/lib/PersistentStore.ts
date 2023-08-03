import { writable, type Writable } from 'svelte/store';

const storeMap: { [key: string]: Writable<any> } = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

export function createPersistentStore<T>(key: string, initialValue: T) {
	if (storeMap[key] !== undefined) {
		return storeMap[key];
	}

	// check if there is a value in localStorage

	const storeValue = localStorage.getItem(key);
	if (storeValue !== null) {
		initialValue = JSON.parse(storeValue);
	}

	const store = writable(initialValue);

	// write the value to localStorage when the store is updated
	store.subscribe((value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});

	return store;
}
