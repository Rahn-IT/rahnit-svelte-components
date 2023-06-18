<script lang="ts">
	import ToggleButton from '../actions/ToggleButton.svelte';
	import MenuIcon from '@iconify-icons/mdi/menu';
	import OpenIcon from '@iconify-icons/mdi/close';

	let leftOpen = false;
	let rightOpen = false;
</script>

<div class="h-full w-full">
	<div class="flex h-full w-full flex-row overflow-hidden">
		{#if $$slots.left}
			<div class="ease relative h-full transition-all duration-500 {leftOpen ? 'w-1/4' : 'w-0'}">
				<div class="direction-ltr absolute h-full w-full overflow-x-hidden overflow-y-scroll">
					<slot name="left" />
				</div>

				<div class="absolute -right-16 top-4 z-10">
					<ToggleButton bind:value={leftOpen} off_icon={MenuIcon} on_icon={OpenIcon} />
				</div>
			</div>
		{/if}

		<div class="flex-1">
			<slot />
		</div>

		{#if $$slots.right}
			<div class="ease relative h-full transition-all duration-500 {rightOpen ? 'w-1/4' : 'w-0'}">
				<div class="absolute h-full w-full overflow-x-hidden overflow-y-scroll">
					<slot name="right" />
				</div>

				<div class="absolute -left-16 top-4 z-10">
					<ToggleButton bind:value={rightOpen} off_icon={MenuIcon} on_icon={OpenIcon} />
				</div>
			</div>
		{/if}
	</div>
</div>
