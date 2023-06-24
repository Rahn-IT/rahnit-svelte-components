<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import YearInput from './YearInput.svelte';
</script>

<Meta title="Inputs/Date/YearInput" component={YearInput} />

<Template let:args>
	<YearInput {...args} />
</Template>

<Story name="Primary" />
