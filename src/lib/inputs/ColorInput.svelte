<script lang="ts">
	import PoundIcon from '@iconify-icons/mdi/pound.js';
	import PaletteIcon from '@iconify-icons/mdi/palette.js';
	import Icon from '../Icon.js';

	export let label = '';

	export let value: string;

	function updateFromInput(event: KeyboardEvent) {
		if (event.target === null || !(event.target instanceof HTMLInputElement)) return;

		let cursorPos: number | null = event.target.selectionStart;
		if (cursorPos === null) return;
		if (event.key.length > 1 && event.key !== 'Backspace') {
			return;
		}
		event.preventDefault();

		let key = event.key.toLowerCase();

		if (event.key === 'Backspace') {
			key = '0';
			cursorPos--;
		}

		const currentValue = event.target.value;

		const replaced =
			currentValue.substring(0, cursorPos) + key + currentValue.substring(cursorPos + 1);

		const whitelist = /^[0-9a-f]{6}$/;

		if (whitelist.test(replaced)) {
			value = '#' + replaced;
			event.target.value = replaced;

			if (event.key !== 'Backspace') {
				cursorPos++;
			}

			event.target.setSelectionRange(cursorPos, cursorPos);
		}
	}

	let display = value.substring(1);
	$: updateDisplay(value);
	function updateDisplay(value: string) {
		const newDisplay = value.substring(1);
		if (newDisplay !== display) {
			display = newDisplay;
		}
	}
</script>

<div class="flex h-14 w-full py-2">
	<Icon
		icon={PaletteIcon}
		class="h-full w-auto cursor-pointer text-accent hover:text-accent-focus"
	/>
	<div class="relative flex-1 rounded-md border border-secondary">
		<!-- Label -->
		{#if label.length > 0}
			<div
				class="text-text pointer-events-none absolute -top-2 left-3 z-10 bg-base-100 px-1.5 text-xs text-base-content"
			>
				{label}
			</div>
		{/if}
		<div class="absolute h-full w-12 items-center px-2 py-1">
			<Icon icon={PoundIcon} class="h-full w-auto" />
		</div>
		<input
			type="text"
			class="absolute h-full w-full bg-transparent px-10 outline-none"
			value={value.substring(1)}
			on:keydown={updateFromInput}
		/>
		<div class="absolute right-0 flex h-full w-12 items-center justify-center">
			<div class="h-8 w-8 border" style:background-color={value} />
		</div>
	</div>
</div>
