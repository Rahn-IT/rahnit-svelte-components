<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Form from './Form.svelte';
	import StringInput from './StringInput.svelte';
	import IntegerInput from './IntegerInput.svelte';
	import ToggleButton from '../actions/ToggleButton.svelte';
	import MenuIcon from '@iconify-icons/mdi/menu.js';
	import CloseIcon from '@iconify-icons/mdi/close.js';
	import SimpleSelect from './SimpleSelect.svelte';
	import ErrorAttachmentContainer from '../containers/ErrorAttachmentContainer.svelte';
	import DateInput from './date/DateInput.svelte';

	let valid = true;
	let value: string = '';
	let num: number = 0;

	let showMore = false;
	let capital = '';

	let selected: string | null = null;
	let selected2: string | null = null;

	let customError = '';
</script>

<Meta title="Inputs/Form" component={Form} argTypes={{}} />

<Template>
	<Form bind:valid aria_label="test">
		<ErrorAttachmentContainer errorMessage={customError}>
			<input class="border" bind:value={customError} />
		</ErrorAttachmentContainer>
		<StringInput
			label="test"
			bind:value
			pattern={/^[a-z]*$/}
			required
			patternErrorMessage="Only small characters allowed!"
		/>
		<StringInput
			label="test"
			bind:value
			pattern={/^[a-z]*$/}
			required
			patternErrorMessage="Only small characters allowed!"
		/>
		<IntegerInput bind:value={num} label="Number" min={5} max={10} />
		<SimpleSelect
			bind:selected
			options={[
				{ name: 'a', value: 'a' },
				{ name: 'b', value: 'b' }
			]}
			label="Select Required"
			required
		/>
		<SimpleSelect
			bind:selected={selected2}
			options={[
				{ name: 'a', value: 'a' },
				{ name: 'b', value: 'b' }
			]}
			label="Select"
		/>
		<DateInput label="Date" value={null} />
		<DateInput label="Date" value={null} required />
		<div class="p-2">
			<ToggleButton bind:value={showMore} on_icon={CloseIcon} off_icon={MenuIcon} />
		</div>
		{#if showMore}
			<StringInput
				label="Capital letters"
				bind:value={capital}
				pattern={/^[A-Z]*$/}
				required
				patternErrorMessage="Only capital letters allowed!"
			/>
		{/if}
	</Form>
	{#if valid}
		Form is valid
	{:else}
		Form is NOT valid
	{/if}
</Template>

<Story name="Primary" />
