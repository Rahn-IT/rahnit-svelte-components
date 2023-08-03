<script lang="ts">
	import ToggleButton from '../actions/ToggleButton.svelte';
	import MenuIcon from '@iconify-icons/mdi/menu.js';
	import CloseIcon from '@iconify-icons/mdi/close.js';

	let leftOpen = false;
	let rightOpen = false;
	export let allowLeft = true;
	export let allowRight = true;
</script>

<div class="h-full w-full">
	<div class="flex h-full w-full flex-row overflow-hidden">
		{#if $$slots.left}
			<div
				class="ease relative h-full transition-all duration-500 {leftOpen && allowLeft
					? 'w-1/4'
					: 'w-0'}"
			>
				<div class="direction-ltr absolute h-full w-full overflow-x-hidden overflow-y-scroll">
					<slot name="left" />
				</div>

				{#if allowLeft}
					<div class="absolute -right-16 top-4 z-10">
						<ToggleButton bind:value={leftOpen} off_icon={MenuIcon} on_icon={CloseIcon} />
					</div>
				{/if}
			</div>
		{/if}

		<div class="flex-1">
			<slot />
		</div>

		{#if $$slots.right}
			<div
				class="ease relative h-full transition-all duration-500 {rightOpen && allowRight
					? 'w-1/4'
					: 'w-0'}"
			>
				<div class="absolute h-full w-full overflow-x-hidden overflow-y-scroll">
					<slot name="right" />
				</div>

				{#if allowRight}
					<div class="absolute -left-16 top-4 z-10">
						<ToggleButton bind:value={rightOpen} off_icon={MenuIcon} on_icon={CloseIcon} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
