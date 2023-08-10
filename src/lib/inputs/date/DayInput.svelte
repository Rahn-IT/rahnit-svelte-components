<script lang="ts">
	import AdvancedSelect from '../AdvancedSelect.svelte';
	import { fly } from 'svelte/transition';

	export let value: number | null = null;
	export let required = false;
	export let requiredErrorMessage = 'Required';

	function guessDay(query: string): number[] {
		let queryNumber = parseInt(query);
		if (queryNumber < 1) {
			queryNumber = 1;
			query = queryNumber.toString();
		}
		switch (query.length) {
			case 1:
				return [
					queryNumber,
					queryNumber + 10,
					queryNumber + 20,
					...(queryNumber < 2 ? [queryNumber + 30] : [])
				];

			case 2:
				return [queryNumber];

			default:
				return Array.from({ length: 31 }, (_, index) => index + 1);
		}
	}

	async function search(query: string): Promise<number[]> {
		const guesses = guessDay(query);
		return guesses;
	}

	const offset = 100;

	let lastSelected: null | number;
	let xDir: number = offset;
	$: updateDirection(value);
	function updateDirection(value: number | null) {
		if (value === null || lastSelected === null) {
			xDir = -offset;
		} else if (lastSelected > value) {
			xDir = -offset;
		} else {
			xDir = offset;
		}
		lastSelected = value;
	}
</script>

<AdvancedSelect
	on:change
	bind:selected={value}
	{search}
	let:item
	{required}
	placeholder="DD"
	{requiredErrorMessage}
>
	{#key item}
		<div in:fly={{ x: xDir, duration: 300 }}>
			{item.toString().padStart(2, '0')}
		</div>
	{/key}
</AdvancedSelect>
