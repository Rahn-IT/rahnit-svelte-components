<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ObjectList from './ObjectList.svelte';
	import StringInput from './StringInput.svelte';

	type TestItem = { id: number; name: string };

	let items: TestItem[] = [];

	let counter = 0;

	async function create(): Promise<TestItem> {
		return {
			id: counter++,
			name: ''
		};
	}

	function itemKey(item: TestItem): string {
		return item.id.toString();
	}
</script>

<Meta title="Inputs/ObjectList" component={ObjectList} />

<Template let:args>
	<ObjectList {...args} {items} {create} {itemKey} let:index>
		<div class="flex w-full flex-col items-center justify-start">
			<div>
				{items[index].id}
			</div>
			<div class="">
				<StringInput bind:value={items[index].name} />
			</div>
		</div>
	</ObjectList>
</Template>

<Story name="Primary" />
