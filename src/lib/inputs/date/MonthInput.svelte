<script lang="ts">
	import AdvancedSelect from '../AdvancedSelect.svelte';
	import { fly } from 'svelte/transition';

	type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

	export let allowedMonths: Month[] = Array.from(Array(12).keys());
	export let value: Month | null = null;
	const date = new Date();
	$: months = allowedMonths.reduce((result, month) => {
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
			return months[monthNumber - 1] !== undefined ? [monthNumber - 1] : [];
		}

		query = query.toLocaleLowerCase();
		return Object.entries(months)
			.filter(([key, value]) => value.toLocaleLowerCase().includes(query))
			.map(([key, value]) => key);
	}

	const offset = 100;

	let lastSelected: null | Month;
	let xDir: number = offset;
	$: updateDirection(value);
	function updateDirection(value) {
		if (lastSelected !== null && lastSelected > value) {
			xDir = -offset;
		} else {
			xDir = offset;
		}
		lastSelected = value;
	}
</script>

<AdvancedSelect bind:selected={value} {search} let:item>
	{#key item}
		<div in:fly={{ x: xDir, duration: 300 }}>
			{months[item]}
		</div>
	{/key}
</AdvancedSelect>
