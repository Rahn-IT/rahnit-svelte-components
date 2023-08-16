<script lang="ts">
	import { fade } from 'svelte/transition';

	import { goto } from '$app/navigation';

	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	import ActionElement from '../actions/ActionElement.svelte';

	import { debounce as deb } from 'lodash';
	import type { Action } from './types.js';
	import Icon from '../Icon.js';
	import CloseIcon from '@iconify-icons/mdi/close.js';
	import LoadingContainer from '../containers/LoadingContainer.svelte';
	import ErrorAttachmentContainer from '../containers/ErrorAttachmentContainer.svelte';

	type T = $$Generic<unknown>;

	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Slots {
		// have to use any here, as generics don't yet work correctly on slots
		default: { item: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
	}

	export let selected: T | null;
	export let search: ((searchString: string) => Promise<T[]>) | null = null;
	export let actions: ((searchString: string) => Promise<Action<T | null>[]>) | null = null;
	export let debounce = false;
	export let placeholder = 'Suche';
	export let display_loading = false;
	export let required = false;
	export let requiredErrorMessage = 'Required';
	export let externalErrorMessage = '';
	export let notFoundMessage = 'No Results for Search';

	export let label = '';

	export let itemKey: (item: T) => string = (item: T) => JSON.stringify(item);

	const dispatch = createEventDispatcher();

	let items: T[] = [];
	let actionList: Action<T | null>[] = [];

	$: searchFunc = debounce ? deb(runSearch, 500) : runSearch;

	$: {
		searchString;
		if (hasFocus) {
			searchFunc();
		}
	}

	let searchString = '';
	let hasFocus = false;

	$: {
		if (!hasFocus) {
			searchString = '';
			selectedOptionIndex = null;
		} else {
			runSearch();
		}
	}

	let loading = false;

	async function runSearch() {
		loading = display_loading;
		console.log(loading);
		try {
			let itemResult: T[];
			let actionResult: Action<T | null>[];

			if (search !== null) {
				itemResult = await search(searchString);
			} else {
				itemResult = [];
			}

			if (actions !== null) {
				actionResult = await actions(searchString);
			} else {
				actionResult = [];
			}

			items = itemResult;
			actionList = actionResult;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
			console.log(loading);
			selectedOptionIndex = items.length === 1 ? 0 : null;
		}
	}

	function select(option: T | null) {
		selected = option;
		dispatch('change');
	}

	async function runAction(action: Action<T | null>) {
		if (typeof action.run === 'string') {
			goto(action.run);
			return;
		}
		let newSelected = await action.run();
		if (newSelected !== null) {
			select(newSelected);
		}
	}

	let selectedOptionIndex: number | null = null;
	$: itemCount = items.length + actionList.length;

	let itemOptions: (HTMLButtonElement | null)[] = [];
	let itemContainer: HTMLDivElement | null = null;

	let input: HTMLInputElement;

	$: {
		if (itemContainer !== null) {
			if (
				selectedOptionIndex !== null &&
				itemOptions[selectedOptionIndex] !== undefined &&
				itemOptions[selectedOptionIndex] !== null
			) {
				const element = itemOptions[selectedOptionIndex] as HTMLButtonElement;
				const p = element.offsetParent as HTMLDivElement | null;
				if (p !== null) {
					itemContainer.scrollTo({
						top: element.offsetTop + element.offsetHeight / 2 - p.offsetHeight / 2,
						behavior: 'smooth'
					});
				}
			} else {
				itemContainer.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	}

	function handleKeyBoardSelect(event: KeyboardEvent) {
		if (!hasFocus || itemCount < 1) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (selectedOptionIndex === null) {
					selectedOptionIndex = 0;
				} else {
					selectedOptionIndex = (selectedOptionIndex + 1) % itemCount;
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (selectedOptionIndex === null) {
					selectedOptionIndex = itemCount - 1;
				} else {
					selectedOptionIndex = (selectedOptionIndex - 1 + itemCount) % itemCount;
				}
				break;
			case 'Enter':
				if (selectedOptionIndex !== null) {
					if (selectedOptionIndex < items.length) {
						select(items[selectedOptionIndex]);
					} else {
						runAction(actionList[selectedOptionIndex - items.length]);
					}
				}
				input.blur();
				break;
			case 'Escape':
				input.blur();
				break;
		}
	}

	let errorMessage: string = '';
	$: {
		if (required && selected === null) {
			errorMessage = requiredErrorMessage;
		} else {
			errorMessage = externalErrorMessage;
		}
	}
</script>

<ErrorAttachmentContainer {errorMessage}>
	<div class="relative w-full pt-2">
		<!-- Label -->
		{#if label.length > 0}
			<div
				class="text-text pointer-events-none absolute left-3 top-0 z-10 bg-base-100 px-1.5 text-xs"
			>
				{label}
			</div>
		{/if}

		<div
			class="relative h-12 w-full overflow-hidden rounded-md border {errorMessage.length
				? 'border-error'
				: 'border-secondary'}"
		>
			<!-- Display Selected Item -->
			<div class="absolute h-full w-full px-4">
				{#if selected !== undefined && selected !== null}
					<div class="flex h-full w-full items-center justify-start">
						<slot item={selected} />
					</div>
				{/if}
			</div>

			<!-- Search -->
			<div class="absolute h-full w-full">
				<input
					bind:value={searchString}
					type="text"
					class="h-full w-full bg-transparent px-4 outline-none focus:bg-base-100"
					class:placeholder-transparent={selected !== undefined && selected !== null && !hasFocus}
					on:focus={() => (hasFocus = true)}
					on:blur={() => (hasFocus = false)}
					on:keydown={handleKeyBoardSelect}
					bind:this={input}
					{placeholder}
				/>
			</div>

			<!-- Empty Selected -->
			{#if !required && selected !== null}
				<button
					class="absolute right-0 h-full cursor-pointer p-1 transition-colors hover:text-error"
					on:click={() => select(null)}
				>
					<Icon class=" h-full w-auto" icon={CloseIcon} />
				</button>
			{/if}
		</div>

		<!-- Dropdown -->
		{#if hasFocus}
			<div
				class="absolute z-50 mt-1 flex w-full pl-4 transition-opacity duration-200"
				transition:fade={{ duration: 150 }}
			>
				<div
					class="flex-1 overflow-hidden rounded-md border border-secondary bg-base-100 shadow-md transition-all duration-200"
				>
					<LoadingContainer {loading}>
						<div class="max-h-60 overflow-y-scroll" bind:this={itemContainer}>
							{#if items.length > 0}
								{#each items as item, i (itemKey(item))}
									<button
										bind:this={itemOptions[i]}
										role="option"
										aria-selected={selectedOptionIndex === i ? 'true' : 'false'}
										class:bg-base-300={selectedOptionIndex === i}
										class="flex h-12 w-full cursor-pointer items-center justify-start px-4 hover:bg-base-300"
										on:mousedown={() => select(item)}
										animate:flip={{
											duration: 200
										}}
									>
										<slot {item} />
									</button>
								{/each}
							{:else}
								<div
									class="flex h-12 w-full cursor-pointer items-center justify-start px-4 hover:bg-base-300"
								>
									{notFoundMessage}
								</div>
							{/if}
						</div>
						<div class="border-t border-base-300 shadow-xl">
							{#each actionList as action, i (action.key)}
								<div
									role="option"
									aria-selected={(selectedOptionIndex ?? -1) - items.length === i
										? 'true'
										: 'false'}
									class:bg-base-300={(selectedOptionIndex ?? -1) - items.length === i}
									class="h-12 w-full cursor-pointer hover:bg-base-300"
									animate:flip={{
										duration: 200
									}}
								>
									<ActionElement
										{action}
										class="flex h-full w-full items-center justify-start px-4"
										on:mousedown={async () => runAction(action)}
									>
										{#if action.icon !== null}
											<div class="h-full p-1">
												<Icon class="h-full w-auto" icon={action.icon} />
											</div>
										{/if}
										{action.name}
									</ActionElement>
								</div>
							{/each}
						</div>
					</LoadingContainer>
				</div>
			</div>
		{/if}
	</div>
</ErrorAttachmentContainer>
