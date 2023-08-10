<script lang="ts">
	import { fade } from 'svelte/transition';

	export let display: boolean = false;
</script>

{#if display}
	<div class="z-50" transition:fade>
		<slot />
	</div>
{/if}
