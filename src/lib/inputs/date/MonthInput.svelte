<script lang="ts">
	import AdvancedSelect from '../AdvancedSelect.svelte';
	import { fly } from 'svelte/transition';
	import type { Month } from './types.js';

	export let allowedMonths: Month[] = Array.from(Array(12).keys()) as Month[];
	export let value: Month | null = null;
	const date = new Date();
	let months: { [key: number]: string } = {};
	$: months = allowedMonths.reduce((result: { [key: number]: string }, month) => {
		date.setMonth(month);
		result[month] = date.toLocaleString('default', { month: 'long' });
		return result;
	}, {});

	async function search(query: string): Promise<Month[]> {
		if (query.length === 0) {
			return allowedMonths;
		}
		const monthNumber = parseInt(query);
		if (monthNumber >= 1 && monthNumber <= 12) {
			const month: Month = (monthNumber - 1) as Month;
			return months[month] !== undefined ? [month] : [];
		}

		query = query.toLocaleLowerCase();
		return Object.entries(months)
			.filter(([, value]) => value.toLocaleLowerCase().includes(query))
			.map(([key]) => Number(key)) as Month[];
	}

	const offset = 100;

	let lastSelected: null | Month;
	let xDir: number = offset;
	$: updateDirection(value);
	function updateDirection(value: Month | null) {
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

<AdvancedSelect on:change bind:selected={value} {search} let:item>
	{#key item}
		<div in:fly={{ x: xDir, duration: 300 }}>
			{months[item]}
		</div>
	{/key}
</AdvancedSelect>
