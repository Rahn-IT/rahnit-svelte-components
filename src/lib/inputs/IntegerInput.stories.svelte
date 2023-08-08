<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import IntegerInput from './IntegerInput.svelte';

	let value: number = 0;
</script>

<Meta
	title="Inputs/IntegerInput"
	component={IntegerInput}
	argTypes={{
		label: { control: { type: 'text' } },
		min: { control: { type: 'number' } },
		max: { control: { type: 'number' } },
		required: { control: { type: 'boolean' } },
		patternErrorMessage: { control: { type: 'text' } },
		requiredErrorMessage: { control: { type: 'text' } }
	}}
/>

<Template let:args>
	<IntegerInput {...args} bind:value />
	<IntegerInput {...args} bind:value />
	<div>
		{value}
	</div>
</Template>

<Story name="Primary" />
