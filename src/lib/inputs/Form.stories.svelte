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
		<StringInput bind:value pattern={/^[a-z]*$/} />
	</Form>
	{#if valid}
		Form is valid
	{:else}
		Form is NOT valid
	{/if}
</Template>

<Story name="Primary" argTypes={{}} />
