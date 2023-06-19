<script lang="ts">
	import { transform } from 'lodash';

	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import RemoveIcon from '@iconify-icons/mdi/minus';
	import AddIcon from '@iconify-icons/mdi/plus';
	import DragIcon from '@iconify-icons/mdi/reorder-horizontal';
	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';

	const [send, receive] = crossfade({});

	type T = $$Generic<any>;
	export let items: T[];
	export let itemKey: (item: T) => string = (item: T) => JSON.stringify(item);
	export let title = '';
	export let create: () => Promise<T>;

	function removeItem(index: number) {
		items.splice(index, 1);
		items = items;
	}

	async function addItem() {
		items.push(await create());
		items = items;
	}

	let dragging: number | null = null;
	let lastDragging: number | null = null;
	let offsetX = 0;
	let offsetY = 0;
	let posX = 0;
	let posY = 0;

	let draggingHeight: number;
	let draggingWidth: number;

	async function grab(index: number, event: MouseEvent) {
		if (event.currentTarget === null || dragging !== null) {
			return;
		}

		if (event.currentTarget instanceof Element) {
			const div = event.currentTarget.closest('div');
			if (div !== null) {
				const rect: DOMRect = div.getBoundingClientRect();
				draggingHeight = rect.height;
				draggingWidth = rect.width;
				dragging = index;
				lastDragging = dragging;
				offsetX = event.x - rect.x;
				offsetY = event.y - rect.y;
				console.log(offsetX, offsetY);
				follow(event);
			}
		}
	}

	function follow(event: MouseEvent) {
		posX = event.x - offsetX;
		posY = event.y - offsetY;
	}

	function switchWith(index: number) {
		if (dragging === null || index === dragging) {
			return;
		}

		[items[index], items[dragging], dragging] = [items[dragging], items[index], index];
		items = items;
	}

	function letGo() {
		dragging = null;
	}
</script>

<svelte:window on:mouseup={letGo} on:mousemove={follow} />
<div class="w-full">
	<!-- Title -->
	<div class="h-8 w-full rounded-t-xl bg-base-300 px-4 py-1 font-semibold">
		{title}
	</div>

	<!-- Drag-Display -->
	{#if dragging !== null}
		<div
			class="fixed flex cursor-grabbing flex-row border-t border-base-300 py-1"
			in:receive={{ key: dragging }}
			out:send={{ key: lastDragging }}
			style:height={draggingHeight + 'px'}
			style:width={draggingWidth + 'px'}
			style:left="{posX}px"
			style:top="{posY}px"
		>
			<button class="w-12 cursor-grabbing p-1 opacity-30">
				<Icon icon={DragIcon} class="h-auto w-full" />
			</button>
			<div class="flex-1 pl-2">
				<slot item={items[dragging]} index={dragging} />
			</div>
			<button class="w-12 cursor-pointer p-1 hover:text-error">
				<Icon icon={RemoveIcon} class="h-auto w-full" />
			</button>
		</div>
	{/if}

	<!-- Items -->
	{#each items as item, index (itemKey(item))}
		<div animate:flip={{ duration: 200 }} on:mouseenter={() => switchWith(index)}>
			{#if index !== dragging}
				<div
					class="flex flex-row border-t border-base-300 py-1"
					in:receive={{ key: index }}
					out:send={{ key: index }}
				>
					<button
						class="w-12 cursor-grab p-1 opacity-30"
						on:mousedown={(event) => grab(index, event)}
					>
						<Icon icon={DragIcon} class="h-auto w-full" />
					</button>
					<div class="flex flex-1 items-center justify-start pl-2">
						<slot {item} {index} />
					</div>
					<button
						class="w-12 cursor-pointer p-1 hover:text-error"
						on:click={() => removeItem(index)}
					>
						<Icon icon={RemoveIcon} class="h-auto w-full" />
					</button>
				</div>
			{:else}
				<div style:height={draggingHeight + 'px'} style:width={draggingWidth + 'px'}>a</div>
			{/if}
		</div>
	{/each}
	<div class="flex border-t border-base-300">
		<div class="flex-1 py-3 pl-2">
			<div class="flex w-full items-center justify-center">
				<button
					class="flex h-10 w-32 cursor-pointer justify-center rounded-md border border-secondary transition-all duration-500 hover:w-full hover:text-secondary-focus"
					on:click={() => addItem()}
				>
					<Icon icon={AddIcon} class="h-full w-auto" />
				</button>
			</div>
		</div>
		<div class="w-12 p-1" />
	</div>
</div>
