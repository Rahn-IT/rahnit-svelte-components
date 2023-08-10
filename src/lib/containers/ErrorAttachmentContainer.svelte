<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext, onDestroy } from 'svelte';
	import type { Validator } from '../inputs/types.js';

	export let errorMessage: string;
	$: displayError = errorMessage.trim();

	// Form validation start
	const validator: Validator | undefined = getContext<{ getValidator: () => Validator }>(
		'validator'
	)?.getValidator();
	$: validator?.validate(!displayError.length);
	onDestroy(() => validator?.unsubscribe());
	// Form validation stop
</script>

<div class="relative pb-6 w-full">
	<div class="p-0 w-full">
		<slot />
	</div>
	{#if displayError.length > 0}
		<span
			transition:fade={{ duration: 150 }}
			class="pointer-events-none absolute h-5 bottom-0 left-4 rounded bg-error px-1.5 pb-1 text-xs text-error-content"
		>
			{displayError}
		</span>
	{/if}
</div>
