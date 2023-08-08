<script lang="ts">
	import { afterUpdate } from 'svelte';

	import StringInput from './StringInput.svelte';
	export let label = '';
	export let id = (Math.random() * 16).toString(16);
	export let value: number;
	export let min: number = Number.MIN_SAFE_INTEGER;
	export let max: number = Number.MAX_SAFE_INTEGER;

	export let patternErrorMessage: string = 'Must be a whole number'; // Error message when regex doesn't match
	export let requiredErrorMessage: string = 'Required'; // Error message when empty
	export let rangeErrorMessage: string = 'Must be between {min} and {max}'; // Error message when regex doesn't match

	let stringValue = value.toString();

	let ignoreUpdate = false;
	afterUpdate(() => (ignoreUpdate = false));

	$: updateFromInput(stringValue);
	function updateFromInput(stringValue: string) {
		if (ignoreUpdate) return;
		ignoreUpdate = true;
		const newValue = parseInt(stringValue);
		value = Number.isNaN(newValue) ? 0 : newValue;
	}

	$: updateFromValue(value);
	function updateFromValue(value: number) {
		if (ignoreUpdate) return;
		ignoreUpdate = true;
		stringValue = value.toString();
	}

	let errorMessage: string = '';

	$: updateErrorMessage(value, min, max, rangeErrorMessage);
	function updateErrorMessage(value: number, min: number, max: number, rangeErrorMessage: string) {
		if (value > max || value < min) {
			errorMessage = rangeErrorMessage
				.replaceAll('{min}', min.toString())
				.replaceAll('{max}', max.toString());
		} else {
			errorMessage = '';
		}
	}
</script>

<StringInput
	{label}
	{id}
	bind:value={stringValue}
	placeholder="0"
	{patternErrorMessage}
	{requiredErrorMessage}
	pattern={/^[0-9]+$/}
	externalErrorMessage={errorMessage}
/>
