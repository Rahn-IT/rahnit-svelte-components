<script lang="ts">
	import { afterUpdate } from 'svelte';
	import AdvancedSelect from './AdvancedSelect.svelte';
	import type { Option, StringOptions } from './types.d.ts';

	type T = $$Generic<any>;

	export let options: Option<T>[];
	export let selected: T | null = null;
	let selectedOption: Option<T> | null = null;
	export let label = '';
	export let optionKey: (option: T) => string = (option: T) => {
		console.log(JSON.stringify(option));
		return JSON.stringify(option);
	};

	let optionMap: { [key: string]: Option<T> };
	$: {
		optionMap = options.reduce((result: { [key: string]: Option<T> }, option: Option<T>) => {
			result[optionKey(option.value)] = option;
			return result;
		}, {});
		recheckSelected();
		console.log(optionMap);
	}

	// functions for synchronizing the input and internals

	function recheckSelected() {
		if (ignoreUpdate) {
			return;
		}
		ignoreUpdate = true;

		if (selected === null) {
			selectedOption = null;
			return;
		}

		const key = optionKey(selected);
		console.log('key', key);
		console.log('key', options[key]);
		if (options[key] === undefined) {
			selected = null;
			selectedOption = null;
		}
	}

	let ignoreUpdate = false;
	afterUpdate(() => (ignoreUpdate = false));

	function updateSelectedFromUserInput(selectedOption: Option<T> | null) {
		if (!ignoreUpdate) {
			ignoreUpdate = true;
			selected = selectedOption !== null ? selectedOption.value : null;
		}
	}

	function updateSelectedOptionFromExternal(newSelected: T | null) {
		if (ignoreUpdate) {
			return;
		}
		ignoreUpdate = true;

		if (newSelected === null) {
			selectedOption = null;
			return;
		}

		const key = optionKey(newSelected);
		if (optionMap[key] === undefined) {
			// this value isnt allowed
			selected = null;
			selectedOption = null;
		}

		selectedOption = optionMap[key];
	}

	$: updateSelectedOptionFromExternal(selected);
	$: updateSelectedFromUserInput(selectedOption);

	async function search(query: string): Promise<Option<T>[]> {
		if (query.length === 0) {
			return options;
		}
		query = query.toLocaleLowerCase();
		return options.filter((opt: Option<T>) => opt.name.toLocaleLowerCase().includes(query));
	}
</script>

<AdvancedSelect {label} {search} bind:selected={selectedOption} let:item>
	<div class="flex h-full w-full items-center justify-start">
		{item.name}
	</div>
</AdvancedSelect>
