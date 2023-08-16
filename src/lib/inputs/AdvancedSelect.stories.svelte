<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import AdvancedSelect from './AdvancedSelect.svelte';
	import AddIcon from '@iconify-icons/mdi/plus.js';
	import type { Action } from './types.js';

	let items: number[] = [];

	async function search(searchString: string): Promise<number[]> {
		return searchString.length === 0
			? items
			: items.filter((item) => item.toString().includes(searchString));
	}

	async function actions(searchString: string): Promise<Action<number | null>[]> {
		const act = [];
		const num = parseFloat(searchString);
		if (!isNaN(num)) {
			act.push({
				name: 'Add',
				icon: AddIcon,
				key: 'random',
				run: async () => {
					items.push(num);
					return num;
				}
			});
		}
		await new Promise(function (resolve) {
			setTimeout(resolve, 1000);
		});
		return act;
	}

	let selected: number | null = null;
</script>

<Meta
	title="Inputs/AdvancedSelect"
	component={AdvancedSelect}
	argTypes={{
		label: { control: { type: 'text' } },
		required: { control: { type: 'boolean' } },
		requiredErrorMessage: { control: { type: 'text' } }
	}}
/>

<Template let:args>
	<div class="h-screen">
		<AdvancedSelect bind:selected {actions} {search} display_loading {...args} let:item>
			{item.toString()}
		</AdvancedSelect>
		<AdvancedSelect bind:selected {actions} {search} display_loading {...args} let:item>
			{item.toString()}
		</AdvancedSelect>
	</div>
</Template>

<Story name="Primary" />
