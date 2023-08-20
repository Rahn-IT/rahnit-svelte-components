<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext, onDestroy } from 'svelte';
	import type { Validator } from '../inputs/types.js';

	export let errorMessage: string;
	export let skipPadding = false;
	$: displayError = errorMessage.trim();

	// Form validation start
	const validator: Validator | undefined = getContext<{ getValidator: () => Validator }>(
		'validator'
	)?.getValidator();
	$: validator?.validate(!displayError.length);
	onDestroy(() => validator?.unsubscribe());
	// Form validation stop
</script>

<div class="relative w-full" class:pb-6={!skipPadding}>
	<div class="w-full p-0">
		<slot />
	</div>
	{#if displayError.length > 0}
		<span
			transition:fade={{ duration: 150 }}
			class="pointer-events-none absolute bottom-0 left-4 h-5 rounded bg-error px-1.5 pb-1 text-xs text-error-content"
		>
			{displayError}
		</span>
	{/if}
</div>
