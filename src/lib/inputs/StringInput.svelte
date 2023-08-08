<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Validator } from './types.js';

	export let label = '';
	export let id = (Math.random() * 16).toString(16);
	export let value: string;
	export let required = false;
	export let placeholder = '';

	export let pattern: RegExp | null = null; // Regular expression for validation

	export let patternErrorMessage: string = 'Invalid input'; // Error message when regex doesn't match
	export let requiredErrorMessage: string = 'Required'; // Error message when empty
	export let externalErrorMessage: string = ''; // Error message when regex doesn't match

	const validator: Validator | undefined = getContext<{ getValidator: () => Validator }>(
		'validator'
	)?.getValidator();
	$: validator?.validate(showError === null);

	let showError: string | null = null;
	$: {
		if (required && value.length === 0) {
			showError = requiredErrorMessage;
		} else if (pattern !== null && !pattern.test(value)) {
			showError = patternErrorMessage;
		} else if (externalErrorMessage.length > 0) {
			showError = externalErrorMessage;
		} else {
			showError = null;
		}
	}
</script>

<div class="w-full py-2">
	<div class="relative w-full py-2">
		<input
			{id}
			name={id}
			bind:value
			{required}
			{placeholder}
			class="text-text block w-full border-b-2 bg-transparent pb-1 pl-4 pr-5 pt-1.5 outline-none transition-colors duration-150
			{showError === null ? 'border-secondary focus:border-secondary-focus' : 'border-error'}"
			on:focus
			on:blur
		/>
		<label for={id} class="pointer-events-none absolute left-4 top-0 transition-all text-xs">
			{label}
		</label>
		{#if showError !== null}
			<span
				transition:fade={{ duration: 150 }}
				class="pointer-events-none absolute -bottom-3.5 left-4 rounded bg-error px-1.5 pb-1 text-xs text-error-content"
			>
				{showError}
			</span>
		{/if}
	</div>
</div>
