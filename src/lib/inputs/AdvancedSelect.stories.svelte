<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import AdvancedSelect from './AdvancedSelect.svelte';
	import AddIcon from '@iconify-icons/mdi/plus';
	import type { Action } from './types.js';

	let items: number[] = [];

	async function search(searchString: string) {
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
		await new Promise(function (resolve, reject) {
			setTimeout(resolve, 1000);
		});
		return act;
	}

	let selected: number | null = null;
</script>

<Meta title="Inputs/AdvancedSelect" component={AdvancedSelect} />

<Template let:args>
	<div class="h-screen">
		<AdvancedSelect bind:selected {actions} {search} {...args} let:item>
			{item.toString()}
		</AdvancedSelect>
	</div>
</Template>

<Story name="Primary" />
