<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Form from './Form.svelte';
	import StringInput from './StringInput.svelte';

	let valid = true;
	let value: string = '';
</script>

<Meta title="Inputs/Form" component={Form} />

<Template let:args>
	<Form bind:valid>
		<StringInput
			label="test"
			bind:value
			pattern={/^[a-z]*$/}
			errorMessage="Only small characters allowed!"
		/>
		<StringInput
			label="test"
			bind:value
			pattern={/^[a-z]*$/}
			errorMessage="Only small characters allowed!"
		/>
	</Form>
	{#if valid}
		Form is valid
	{:else}
		Form is NOT valid
	{/if}
</Template>

<Story name="Primary" argTypes={{}} />
