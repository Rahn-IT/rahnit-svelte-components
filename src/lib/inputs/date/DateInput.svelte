<script lang="ts">
	import { afterUpdate } from 'svelte';

	import Icon from '../../Icon.js';
	import CalendarIcon from '@iconify-icons/mdi/calendar.js';
	import CloseIcon from '@iconify-icons/mdi/close.js';

	import ErrorAttachmentContainer from '../../containers/ErrorAttachmentContainer.svelte';
	import OverlayContainer from '../../containers/OverlayContainer.svelte';

	import DayInput from './DayInput.svelte';
	import MonthInput from './MonthInput.svelte';
	import YearInput from './YearInput.svelte';
	import DatePicker from './DatePicker.svelte';
	import type { Month } from './types.js';

	export let label = '';
	export let value: string | null = '';
	export let required = false;
	export let requiredErrorMessage = 'Required';
	export let invalidDayErrorMessage = 'Invalid Day';

	let day: number | null;
	let month: Month | null;
	let year: number | null;

	let ignoreUpdate = false;
	afterUpdate(() => (ignoreUpdate = false));

	$: updateFromValue(value);
	function updateFromValue(value: string | null) {
		if (ignoreUpdate) return;
		ignoreUpdate = true;

		if (value === null) return;

		const parsedDate = new Date(value);
		if (isNaN(parsedDate.getTime())) {
			day = null;
			month = null;
			year = null;
			return;
		}

		day = parsedDate.getDate();
		month = parsedDate.getMonth() as Month;
		year = parsedDate.getFullYear();
	}

	$: updateFromInput(day, month, year);
	function updateFromInput(day: number | null, month: number | null, year: number | null) {
		if (ignoreUpdate) return;
		ignoreUpdate = true;

		if (day !== null && month !== null && year !== null) {
			value =
				year.toString().padStart(4, '0') +
				'-' +
				(month + 1).toString().padStart(2, '0') +
				'-' +
				day.toString().padStart(2, '0');
		} else {
			value = null;
		}
	}

	function empty() {
		ignoreUpdate = true;
		value = null;
		day = null;
		month = null;
		year = null;
	}

	let errorMessage = '';
	$: errorMessage = required && value === null ? requiredErrorMessage : '';
</script>

<div class="w-full relative">
	<span
		class="text-text pointer-events-none absolute left-16 top-0 z-10 bg-base-100 px-1.5 text-xs"
	>
		{label}
	</span>

	<div class="flex flex-row gap-2">
		<div class="w-12 flex-shrink-0 pt-2">
			<ErrorAttachmentContainer {errorMessage}>
				<button class=" w-full text-accent hover:text-accent-focus">
					<Icon class="w-full h-auto" icon={CalendarIcon} />
				</button>
			</ErrorAttachmentContainer>
		</div>
		<DayInput
			bind:value={day}
			{month}
			{year}
			required
			requiredErrorMessage=""
			invalidErrorMessage={invalidDayErrorMessage}
		/>
		<MonthInput bind:value={month} required requiredErrorMessage="" />
		<YearInput bind:value={year} required requiredErrorMessage="" />
		{#if !required}
			<div class="w-10 flex-shrink-0 pt-3">
				<button class=" w-full text-base-content hover:text-error" on:click={() => empty()}>
					<Icon class="w-full h-auto" icon={CloseIcon} />
				</button>
			</div>
		{/if}
	</div>

	<!-- DatePicker -->
	<div class="absolute top-0">
		<OverlayContainer>
			<DatePicker bind:value />
		</OverlayContainer>
	</div>
</div>
