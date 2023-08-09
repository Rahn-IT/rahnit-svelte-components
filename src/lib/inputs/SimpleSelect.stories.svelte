<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SimpleSelect from './SimpleSelect.svelte';
	import type { Option } from './types.js';

	const numberOptions: Option<number>[] = [
		{
			name: 'Eins',
			value: 1
		},
		{
			name: 'Zwei',
			value: 2
		},
		{
			name: 'Drei',
			value: 3
		}
	];

	const textOptions: Option<string>[] = [
		{
			name: 'A',
			value: 'a'
		},
		{
			name: 'B',
			value: 'b'
		},
		{
			name: 'C',
			value: 'c'
		},
		{
			name: 'a',
			value: 'a'
		}
	];

	let selected: Option<number> | Option<string> | null = null;

	const allOptions: (number | string | null)[] = (
		numberOptions.map((o) => o.value) as (number | string | null)[]
	)
		.concat(textOptions.map((o) => o.value))
		.concat([null]);
</script>

<Meta
	title="Inputs/SimpleSelect"
	component={SimpleSelect}
	argTypes={{
		selected: {
			options: allOptions,
			control: { type: 'select' }
		},
		options: {
			options: ['numbers', 'text'],
			mapping: {
				numbers: numberOptions,
				text: textOptions
			},
			control: { type: 'select' }
		}
	}}
	args={{
		options: 'numbers'
	}}
/>

<Template let:args>
	<SimpleSelect {...args} bind:selected />
	<SimpleSelect {...args} bind:selected />
	{selected}
</Template>

<Story name="Primary" />
