<script lang="ts">
	import type { Action } from '../inputs/types.js';
	import { Icon } from '../index.js';
	import ActionElement from './ActionElement.svelte';

	export let actions: Action<void>[];
</script>

<div class="w-96 overflow-hidden rounded-xl border border-secondary bg-base-100 shadow-xl">
	{#each actions as action (action.key)}
		<ActionElement
			{action}
			class="flex h-12 w-full flex-row items-center justify-start py-1 text-secondary hover:bg-base-200 hover:text-secondary-focus"
		>
			<Icon class="h-full w-auto px-2" icon={action.icon} />
			<div class="text-base-content">
				{action.name}
			</div>
		</ActionElement>
	{/each}
</div>
