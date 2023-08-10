<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import DateInput from './DateInput.svelte';

	let date: string | null = null;
</script>

<Meta title="Inputs/Date/DateInput" component={DateInput} />

<Template let:args>
	<div>
		Datum: {date}
	</div>
	<DateInput {...args} bind:value={date} />
</Template>

<Story name="Primary" />
