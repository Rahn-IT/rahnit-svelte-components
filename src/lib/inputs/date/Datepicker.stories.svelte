<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import DatePicker from './DatePicker.svelte';

	let date: string | null = null;
</script>

<Meta title="Inputs/Date/DatePicker" component={DatePicker} />

<Template let:args>
	<div>
		Datum: {date}
	</div>
	<DatePicker {...args} bind:value={date} />
</Template>

<Story name="Primary" />
