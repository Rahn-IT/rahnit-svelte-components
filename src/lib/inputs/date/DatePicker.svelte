<script lang="ts">
	import { afterUpdate } from 'svelte';
	import YearInput from './YearInput.svelte';
	import MonthInput from './MonthInput.svelte';
	import type { Month } from './types.js';
	export let pastOnly = false;
	import LeftIcon from '@iconify-icons/mdi/chevron-left.js';
	import RightIcon from '@iconify-icons/mdi/chevron-right.js';
	import Icon from '../../Icon.js';

	export let value: null | string;

	let ignoreUpdate = false;
	afterUpdate(() => (ignoreUpdate = false));

	const initDate = new Date();
	let year: number = initDate.getFullYear();
	let month: Month = initDate.getMonth() as Month;

	let selectedYear: number | null;
	let selectedMonth: Month | null;
	let selectedDay: number | null;

	$: updateFromValue(value);
	function updateFromValue(value: string | null) {
		if (ignoreUpdate) return;
		ignoreUpdate = true;

		if (value === null) return;

		const parsedDate = new Date(value);
		if (isNaN(parsedDate.getTime())) {
			selectedDay = null;
			selectedMonth = null;
			selectedYear = null;
			return;
		}

		selectedYear = parsedDate.getFullYear();
		selectedMonth = parsedDate.getMonth() as Month;
		selectedDay = parsedDate.getDate();
		month = parsedDate.getMonth() as Month;
		year = parsedDate.getFullYear();
	}

	function setDay(day: number) {
		selectedDay = day;
		selectedMonth = month;
		selectedYear = year;
		ignoreUpdate = true;
		value =
			selectedYear.toString().padStart(4, '0') +
			'-' +
			(selectedMonth + 1).toString().padStart(2, '0') +
			'-' +
			selectedDay.toString().padStart(2, '0');
	}

	function incrementMonth() {
		let newMonth = month + 1;
		if (newMonth > 11) {
			year += 1;
			newMonth -= 12;
		}
		month = newMonth as Month;
	}

	function decrementMonth() {
		let newMonth = month - 1;
		if (newMonth < 0) {
			year -= 1;
			newMonth += 12;
		}
		month = newMonth as Month;
	}

	let prevDaysArray: number[];
	let currentDaysArray: number[];
	let futureDaysArray: number[];

	$: updateDisplayVars(year, month);
	function updateDisplayVars(year: number, month: Month) {
		const prevMonthDate = new Date(year, month, 0);
		const prevDays = prevMonthDate.getDay();
		const prevMaxDay = prevMonthDate.getDate();
		prevDaysArray = Array.from(
			{ length: prevDays },
			(_, index) => prevMaxDay - prevDays + index + 1
		);

		const monthDate = new Date(year, month + 1, 0);
		const daysThisMonth = monthDate.getDate();
		currentDaysArray = Array.from({ length: daysThisMonth }, (_, index) => index + 1);

		const nextDays = 7 - ((prevDays + daysThisMonth) % 7);
		futureDaysArray = Array.from({ length: nextDays }, (_, index) => index + 1);
	}
</script>

<div
	class="ring- absolute mt-2 rounded-md bg-base-100 text-base-content shadow-lg ring-1 ring-neutral ring-opacity-5"
>
	<div class="p-4">
		<div class="mb-2 flex flex-row items-center justify-center">
			<button
				class="h-full w-8 focus:outline-none mb-3 transition-colors hover:bg-secondary-focus rounded"
				on:click={decrementMonth}
			>
				<Icon class="w-full h-auto" icon={LeftIcon} />
			</button>
			<div class="w-36 px-1">
				<MonthInput bind:value={month} required />
			</div>
			<div class="w-24 px-1">
				<YearInput bind:value={year} {pastOnly} required />
			</div>
			<button
				class="h-full w-8 focus:outline-none mb-3 transition-colors hover:bg-secondary-focus rounded"
				on:click={incrementMonth}
			>
				<Icon class="w-full h-auto" icon={RightIcon} />
			</button>
		</div>
		<div class="grid grid-cols-7 [&>*]:p-2">
			<span class="text-center">Mo</span>
			<span class="text-center">Di</span>
			<span class="text-center">Mi</span>
			<span class="text-center">Do</span>
			<span class="text-center">Fr</span>
			<span class="text-center">Sa</span>
			<span class="text-center">So</span>
			{#each prevDaysArray as day}
				<button
					class="hover:text w-full rounded-md text-center opacity-30 transition-colors hover:bg-secondary hover:text-secondary-content focus:outline-none"
					on:click={() => {
						decrementMonth();
						setDay(day);
					}}
				>
					{day}
				</button>
			{/each}
			{#each currentDaysArray as day}
				<button
					class="hover:text w-full rounded-md text-center duration-200 transition-colors hover:bg-secondary hover:text-secondary-content focus:outline-none {day ===
						selectedDay &&
					month === selectedMonth &&
					year === selectedYear
						? 'bg-primary text-primary-content hover:bg-primary hover:text-primary-content'
						: ''}"
					on:click={() => setDay(day)}
				>
					{day}
				</button>
			{/each}
			{#each futureDaysArray as day}
				<button
					class="hover:text w-full rounded-md text-center opacity-30 transition-colors hover:bg-secondary hover:text-secondary-content focus:outline-none"
					on:click={() => {
						incrementMonth();
						setDay(day);
					}}
				>
					{day}
				</button>
			{/each}
		</div>
	</div>
</div>
