<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import DatePicker from './DatePicker.svelte';
</script>

<Meta title="Inputs/Date/DatePicker" component={DatePicker} />

<Template let:args>
	<DatePicker {...args} />
</Template>

<Story name="Primary" />
