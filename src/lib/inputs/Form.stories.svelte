<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Form from './Form.svelte';
	import StringInput from './StringInput.svelte';
	import IntegerInput from './IntegerInput.svelte';

	let valid = true;
	let value: string = '';
	let num: number = 0;
</script>

<Meta title="Inputs/Form" component={Form} argTypes={{}} />

<Template>
	<Form bind:valid aria_label="test">
		<StringInput
			label="test"
			bind:value
			pattern={/^[a-z]*$/}
			patternErrorMessage="Only small characters allowed!"
		/>
		<StringInput
			label="test"
			bind:value
			pattern={/^[a-z]*$/}
			patternErrorMessage="Only small characters allowed!"
		/>
		<IntegerInput bind:value={num} label="Number" min={5} max={10} />
	</Form>
	{#if valid}
		Form is valid
	{:else}
		Form is NOT valid
	{/if}
</Template>

<Story name="Primary" />
