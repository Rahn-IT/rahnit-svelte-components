<script lang="ts">
	import AdvancedSelect from '../AdvancedSelect.svelte';
	import { fly } from 'svelte/transition';
	import type { Month } from './types.js';

	export let value: number | null = null;
	export let year: number | null = null;
	export let month: Month | null = null;
	export let required = false;
	export let requiredErrorMessage = 'Required';
	export let invalidErrorMessage = 'Invalid Day';

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

	let errorMessage = '';

	$: checkDay(value, month, year);
	function checkDay(day: number | null, month: Month | null, year: number | null) {
		if (year === null || month === null || day === null) {
			errorMessage = '';
			return;
		}
		const monthDate = new Date(year, month + 1, 0);
		const daysThisMonth = monthDate.getDate();
		console.log('daysThisMonth', daysThisMonth);
		console.log('day', day);
		if (day < 1 || day > daysThisMonth) {
			errorMessage = invalidErrorMessage;
		} else {
			errorMessage = '';
		}
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
	externalErrorMessage={errorMessage}
>
	{#key item}
		<div in:fly={{ x: xDir, duration: 300 }}>
			{item.toString().padStart(2, '0')}
		</div>
	{/key}
</AdvancedSelect>
