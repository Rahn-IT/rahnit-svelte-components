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

	let selected;
</script>

<Meta
	title="Inputs/SimpleSelect"
	component={SimpleSelect}
	argTypes={{
		selected: {
			options: numberOptions
				.map((o) => o.value)
				.concat(textOptions.map((o) => o.value))
				.concat([null]),
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
/>

<Template let:args>
	<SimpleSelect {...args} bind:selected />
	{selected}
	<SimpleSelect {...args} bind:selected />
</Template>

<Story
	name="Primary"
	args={{
		options: 'numbers'
	}}
/>
