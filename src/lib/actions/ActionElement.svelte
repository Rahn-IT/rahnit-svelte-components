<script lang="ts">
	import type { Action } from '../inputs/types.js';

	export let action: Action<unknown>;
	let classes = '';
	export { classes as class };
</script>

{#if typeof action.run === 'string'}
	<a class={classes} href={action.run} {...$$restProps}>
		<slot />
	</a>
{:else}
	<button class={classes} on:click on:mousedown>
		<slot />
	</button>
{/if}
