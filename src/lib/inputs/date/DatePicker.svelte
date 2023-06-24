<script lang="ts">
	import { afterUpdate } from 'svelte';
	import YearInput from './YearInput.svelte';
	import MonthInput from './MonthInput.svelte';
	export let pastOnly = false;

	export let value: null | Date = null;

	let ignoreUpdate = false;
	afterUpdate(() => (ignoreUpdate = false));

	let displayDate: Date = new Date();
	$: if (value !== null) displayDate = new Date(value);

	let year: number;
	let month: number;
	updateInputs(displayDate);

	$: displaySelectedDay =
		value !== null &&
		displayDate.getFullYear() === value.getFullYear() &&
		displayDate.getMonth() === value.getMonth();

	function setDay(day: number) {
		value = new Date(displayDate);
		value.setDate(day);
		value = value;
	}

	function setMonth(month: number) {
		displayDate.setMonth(month);
		displayDate = displayDate;
	}

	function incrementMonth() {
		displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
	}

	function decrementMonth() {
		displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1);
	}

	function setYear(year: number) {
		displayDate.setFullYear(year);
		displayDate = displayDate;
	}

	$: updateInputs(displayDate);
	function updateInputs(displayDate) {
		year = displayDate.getFullYear();
		month = displayDate.getMonth();
	}

	$: monthDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0);
	$: prevMonthDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), 0);
	$: prevDays = prevMonthDate.getDay();
	$: daysLastMonth = prevMonthDate.getDate();
	$: daysThisMonth = monthDate.getDate();
	$: nextDays = 7 - ((prevDays + daysThisMonth) % 7);
</script>

<div
	class="ring- absolute mt-2 rounded-md bg-base-100 text-base-content shadow-lg ring-1 ring-neutral ring-opacity-5"
>
	<div class="p-4">
		<div class="mb-2 flex items-center justify-between">
			<button class="px-2 py-1 focus:outline-none" on:click={decrementMonth}> &lt; </button>
			<div class="w-36 px-1">
				<MonthInput bind:value={month} />
			</div>
			<div class="w-24 px-1">
				<YearInput bind:value={year} {pastOnly} />
			</div>
			<button
				class="text-gray-500 hover:text-gray-700 px-2 py-1 focus:outline-none"
				on:click={incrementMonth}
			>
				&gt;
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
			{#each Array.from({ length: prevDays }, (_, index) => index + 1) as dayCount}
				{@const day = daysLastMonth - prevDays + dayCount}
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
			{#each Array.from({ length: daysThisMonth }, (_, index) => index + 1) as day}
				<button
					class="hover:text w-full rounded-md text-center transition-colors hover:bg-secondary hover:text-secondary-content focus:outline-none"
					class:bg-primary={displaySelectedDay && day === value?.getDate()}
					class:text-primary-content={displaySelectedDay && day === value?.getDate()}
					on:click={() => setDay(day)}
				>
					{day}
				</button>
			{/each}
			{#if nextDays < 7}
				{#each Array.from({ length: nextDays }, (_, index) => index + 1) as day}
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
			{/if}
		</div>
	</div>
</div>
