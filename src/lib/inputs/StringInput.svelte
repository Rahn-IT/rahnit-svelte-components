<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import ErrorAttachmentContainer from '../containers/ErrorAttachmentContainer.svelte';
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

	let errorMessage: string = '';
	$: {
		if (required && value.length === 0) {
			errorMessage = requiredErrorMessage;
		} else if (pattern !== null && !pattern.test(value)) {
			errorMessage = patternErrorMessage;
		} else if (externalErrorMessage.length > 0) {
			errorMessage = externalErrorMessage;
		} else {
			errorMessage = '';
		}
	}
</script>

<ErrorAttachmentContainer {errorMessage}>
	<div class="relative w-full pt-2">
		<input
			{id}
			name={id}
			bind:value
			{required}
			{placeholder}
			class="text-text block w-full border-b-2 bg-transparent pb-1 pl-4 pr-5 pt-1.5 outline-none transition-colors duration-150
			{errorMessage.length ? 'border-error' : 'border-secondary focus:border-secondary-focus'}"
			on:focus
			on:blur
		/>
		<label for={id} class="pointer-events-none absolute left-4 top-0 transition-all text-xs">
			{label}
		</label>
	</div>
</ErrorAttachmentContainer>
