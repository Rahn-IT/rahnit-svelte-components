import { writable, type Writable } from 'svelte/store';

const storeMap: { [key: string]: Writable<any> } = {};

export function createPersistentStore<T>(key: string, initialValue: T) {
	if (storeMap[key] !== undefined) {
		return storeMap[key];
	}

	const store = writable(initialValue);

	// check if there is a value in localStorage

	if (localStorage.getItem(key) !== null) {
		store.set(JSON.parse(localStorage.getItem(key)!));
	}

	// write the value to localStorage when the store is updated
	store.subscribe((value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});

	return store;
}
