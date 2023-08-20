<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from '../Icon.js';
	import LockIcon from '@iconify-icons/mdi/lock.js';

	let classes = '';
	export { classes as class };
	export let locked: boolean;
</script>

<div class="relative {classes}" class:locked {...$$restProps}>
	{#if locked}
		<div
			transition:fade={{ duration: 100 }}
			class="lockdisplay absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral p-1 opacity-30 hover:opacity-40"
		>
			<Icon icon={LockIcon} class="z-50 h-full max-h-16 w-full text-neutral-content" />
		</div>
	{/if}
	<slot />
</div>

<style>
	.locked {
		cursor: not-allowed;
	}

	.locked > :global(*:not(.lockdisplay)) {
		pointer-events: none;
	}
</style>
