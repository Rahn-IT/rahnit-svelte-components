<script lang="ts">
	import AdvancedSelect from '../AdvancedSelect.svelte';
	import { fly } from 'svelte/transition';

	export let prefixes: number[] = [20, 19, 18, 17];
	export let pastOnly = false;
	export let value: number | null = null;
	const digits = Array.from(Array(10).keys());
	const currentYear = new Date().getFullYear();
	const mistypeDigits = Array.from(Array(5).keys());

	function guessYear(query: string): number[] {
		const queryNumber = parseInt(query);
		switch (query.length) {
			// display the last 10 years by default
			case 0:
				return digits.map((digit) => currentYear - digit);

			// guess the year using the prefixes
			case 2:
				return prefixes.map((prefix) => prefix * 100 + queryNumber);

			// guess the last number of that year
			case 3:
				return digits.map((digit) => digit + 10 * queryNumber);

			// allow selecting the given year
			case 4:
				return [queryNumber];

			// probably a mistype, guess by removing one digit
			case 5:
				return [
					...new Set(
						mistypeDigits.map((digit) => parseInt(query.slice(0, digit) + query.slice(digit + 1)))
					)
				].sort();

			default:
				return [];
		}
	}

	async function search(query: string): Promise<number[]> {
		const guesses = guessYear(query);
		if (pastOnly) {
			return guesses.filter((year) => year <= currentYear);
		}
		return guesses;
	}

	const offset = 100;

	let lastSelected: null | number;
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

<AdvancedSelect on:change bind:selected={value} {search} let:item>
	{#key item}
		<div in:fly={{ x: xDir, duration: 300 }}>
			{item}
		</div>
	{/key}
</AdvancedSelect>
