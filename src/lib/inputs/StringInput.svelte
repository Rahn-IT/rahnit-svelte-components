<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Validator } from './types.js';

	export let label = '';
	export let id = '';
	export let value: string;
	export let required = false;
	export let disabled = false;
	export let autocomplete = 'off';

	export let pattern: RegExp | null = null; // Regular expression for validation

	export let errorMessage: string = 'Invalid input'; // Error message when regex doesn't match

	let hasFocus = false;

	let valid: boolean = true;

	$: checkInput(value);
	function checkInput(value: string) {
		valid = pattern === null || pattern.test(value);
	}

	$: validator?.validate(valid);

	const getValidator: () => Validator | undefined = getContext('validator');
	const validator: Validator | undefined = getValidator !== undefined ? getValidator() : undefined;
</script>

<div class="w-full py-2">
	<div class="relative w-full py-2">
		<input
			{id}
			name={id}
			bind:value
			{required}
			{disabled}
			{autocomplete}
			class="text-text block w-full border-b-2 border-secondary bg-transparent pb-2.5 pl-4 pr-5 pt-1.5 placeholder-transparent outline-none transition-colors duration-150 focus:border-secondary-focus
			{valid ? 'border-secondary focus:border-secondary-focus' : 'border-error focus:border-error'}"
			placeholder={hasFocus ? '' : ' '}
			on:focus={() => (hasFocus = true)}
			on:blur={() => (hasFocus = false)}
			on:focus
			on:blur
		/>
		<label
			for={id}
			class="pointer-events-none absolute left-4 top-0 transition-all {hasFocus || value != ''
				? 'text-xs'
				: '-mt-0.5 translate-y-5 text-sm font-bold opacity-80'}"
		>
			{label}
		</label>
		{#if !valid}
			<span
				transition:fade={{ duration: 150 }}
				class="pointer-events-none absolute -bottom-2.5 left-4 rounded bg-error px-1.5 text-xs text-error-content"
			>
				{errorMessage}
			</span>
		{/if}
	</div>
</div>
