<script lang="ts">
	import { afterUpdate } from 'svelte';
	import AdvancedSelect from './AdvancedSelect.svelte';
	import type { Option } from './types.d.ts';

	type T = $$Generic<any>;

	export let options: Option<T>[];
	export let selected: T | null = null;
	let selectedOption: Option<T> | null = null;
	export let label = '';
	export let optionKey: (option: T) => string = (option: T) => {
		return JSON.stringify(option);
	};

	let optionMap: { [key: string]: Option<T> };
	$: {
		optionMap = options.reduce((result: { [key: string]: Option<T> }, option: Option<T>) => {
			result[optionKey(option.value)] = option;
			return result;
		}, {});
	}

	// functions for synchronizing the input and internals

	let ignoreUpdate = false;
	afterUpdate(() => (ignoreUpdate = false));

	function updateSelectedFromUserInput(selectedOption: Option<T> | null) {
		if (ignoreUpdate) {
			return;
		}
		ignoreUpdate = true;
		selected = selectedOption !== null ? selectedOption.value : null;
	}

	function updateSelectedOptionFromExternal(newSelected: T | null, optionMap) {
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

	$: updateSelectedOptionFromExternal(selected, optionMap);
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
