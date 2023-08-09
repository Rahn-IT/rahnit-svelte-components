<script lang="ts">
	import { fade } from 'svelte/transition';

	import { goto } from '$app/navigation';

	import { flip } from 'svelte/animate';
	import { createEventDispatcher, getContext, onDestroy } from 'svelte';

	import { debounce as deb } from 'lodash';
	import type { Action, Validator } from './types.js';
	import Icon from '../Icon.js';
	import LoadingContainer from '../containers/LoadingContainer.svelte';

	type T = $$Generic<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

	export let selected: T | null;
	export let search: ((searchString: string) => Promise<T[]>) | null = null;
	export let actions: ((searchString: string) => Promise<Action<T | null>[]>) | null = null;
	export let debounce = false;
	export let placeholder = 'Suche';
	export let display_loading = false;
	export let required = false;
	export let requiredErrorMessage = 'Required';

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
			selectedOptionIndex = -1;
		} else {
			runSearch();
		}
	}

	let loading = false;

	async function runSearch() {
		loading = display_loading;
		try {
			if (search !== null) {
				const result = await search(searchString);
				items = result;
			}
			if (actions !== null) {
				actionList = await actions(searchString);
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
			selectedOptionIndex = items.length === 1 ? 0 : -1;
		}
	}

	function select(option: T) {
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

	let selectedOptionIndex = -1;
	$: itemCount = items.length + actionList.length;

	let input: HTMLInputElement;

	function handleKeyBoardSelect(event: KeyboardEvent) {
		if (!hasFocus) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedOptionIndex = (selectedOptionIndex + 1) % itemCount;
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedOptionIndex = (selectedOptionIndex - 1 + itemCount) % itemCount;
				break;
			case 'Enter':
				if (selectedOptionIndex !== -1) {
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

	type ItemRender = {
		key: string;
		isItem: true;
		item: T;
	};

	type ActionRender = {
		key: string;
		isItem: false;
		action: Action<T | null>;
	};

	let toRender: (ItemRender | ActionRender)[] = [];
	$: {
		let irs: ItemRender[] = items.map((item: T) => {
			let ir: ItemRender = {
				key: itemKey(item),
				isItem: true,
				item: item
			};
			return ir;
		});

		let ars: ActionRender[] = actionList.map((action: Action<T | null>) => {
			let ar: ActionRender = {
				key: action.key,
				isItem: false,
				action: action
			};
			return ar;
		});

		let newRender: (ItemRender | ActionRender)[] = irs;

		toRender = newRender.concat(ars);
	}

	$: console.log(required);
	let showError: string | null = null;
	$: {
		if (required && selected === null) {
			showError = requiredErrorMessage;
		} else {
			showError = null;
		}
	}

	// Form validation start
	const validator: Validator | undefined = getContext<{ getValidator: () => Validator }>(
		'validator'
	)?.getValidator();
	$: validator?.validate(showError === null);
	onDestroy(() => validator?.unsubscribe());
	// Form validation stop
</script>

<div class="dropdown relative w-full py-2 pb-6">
	<!-- Label -->
	{#if label.length > 0}
		<div
			class="text-text pointer-events-none absolute left-3 top-0 z-10 bg-base-100 px-1.5 text-xs"
		>
			{label}
		</div>
	{/if}

	{#if showError !== null}
		<span
			transition:fade={{ duration: 150 }}
			class="pointer-events-none absolute bottom-0 left-4 rounded bg-error px-1.5 pb-1 text-xs text-error-content"
		>
			{showError}
		</span>
	{/if}

	<div
		class="relative h-12 w-full overflow-hidden rounded-md border {showError === null
			? 'border-secondary'
			: 'border-error'}"
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
	</div>

	<!-- Dropdown -->
	<div
		class="dropdown-content z-50 mt-1 flex w-full pl-4 transition-opacity duration-200 {toRender.length ||
		loading
			? ''
			: '!opacity-0'}"
	>
		<div
			class="flex-1 overflow-hidden rounded-md border border-secondary bg-base-100 shadow-md transition-all duration-200"
			style:height={loading ? '3rem' : toRender.length * 3 + 'rem'}
		>
			<LoadingContainer {loading}>
				{#each toRender as render, i (render.key)}
					<div
						class="h-12 cursor-pointer px-4 hover:bg-base-300"
						class:bg-base-300={selectedOptionIndex === i}
						animate:flip={{
							duration: 200
						}}
					>
						{#if render.isItem}
							{@const item = render.item}
							<!-- svelte-ignore a11y-interactive-supports-focus -->
							<div
								role="option"
								aria-selected={selectedOptionIndex === i ? 'true' : 'false'}
								class="flex h-full w-full items-center justify-start"
								on:mousedown={() => select(item)}
							>
								<slot {item} />
							</div>
						{:else}
							{@const action = render.action}
							<!-- svelte-ignore a11y-interactive-supports-focus -->
							<div
								role="option"
								aria-selected={selectedOptionIndex === i ? 'true' : 'false'}
								class="flex h-full w-full items-center justify-center"
								on:mousedown={async () => runAction(action)}
							>
								{#if action.icon !== null}
									<div class="h-full">
										<Icon class="h-full w-auto" icon={action.icon} />
									</div>
								{/if}
								{action.name}
							</div>
						{/if}
					</div>
				{/each}
			</LoadingContainer>
		</div>
	</div>
</div>
