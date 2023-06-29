<script lang="ts">
	import { fade } from 'svelte/transition';

	export let loading: boolean;
</script>

<div class="relative h-full min-h-[2.5rem] w-full">
	{#if loading}
		<div
			transition:fade
			class="absolute flex h-full w-full flex-col flex-wrap content-center items-center justify-center gap-4"
		>
			<div
				class="box-border h-8 w-8 flex-shrink-0 animate-spin rounded-full border-2 border-t-4 border-secondary border-t-secondary-focus"
			/>
			<div>Loading</div>
		</div>
	{:else}
		<div class="absolute h-full w-full" transition:fade>
			<slot />
		</div>
	{/if}
</div>
