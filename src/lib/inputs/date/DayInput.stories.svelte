<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import DayInput from './DayInput.svelte';
</script>

<Meta title="Inputs/Date/DayInput" component={DayInput} />

<Template let:args>
	<DayInput {...args} />
</Template>

<Story name="Primary" />
