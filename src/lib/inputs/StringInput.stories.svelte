<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import StringInput from './StringInput.svelte';

	let value = '';
</script>

<Meta
	title="Inputs/StringInput"
	component={StringInput}
	argTypes={{
		pattern: { control: { type: 'select' }, options: ['^[a-z]*$'] },
		label: { control: { type: 'text' } },
		required: { control: { type: 'boolean' } },
		patternErrorMessage: { control: { type: 'text' } },
		requiredErrorMessage: { control: { type: 'text' } },
		externalErrorMessage: { control: { type: 'text' } }
	}}
/>

<Template let:args>
	<StringInput {...args} pattern={new RegExp(args.pattern)} bind:value />
	<StringInput {...args} pattern={new RegExp(args.pattern)} bind:value />
	<div>
		{value}
	</div>
</Template>

<Story name="Primary" />
