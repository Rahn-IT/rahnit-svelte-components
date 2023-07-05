<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import StringInput from './StringInput.svelte';

	let value = '';
</script>

<Meta title="Inputs/StringInput" component={StringInput} />

<Template let:args>
	<StringInput {...args} pattern={new RegExp(args.pattern)} bind:value let:index />
	<StringInput {...args} pattern={new RegExp(args.pattern)} bind:value let:index />
</Template>

<Story
	name="Primary"
	argTypes={{
		pattern: { control: { type: 'select' }, options: ['^[a-z]*$'] }
	}}
/>
