<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import MonthInput from './MonthInput.svelte';
</script>

<Meta title="Inputs/Date/MonthInput" component={MonthInput} />

<Template let:args>
	<MonthInput {...args} />
</Template>

<Story name="Primary" />
