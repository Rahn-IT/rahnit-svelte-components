<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ColorInput from './ColorInput.svelte';

	let color = '#000000';
</script>

<Meta title="Inputs/ColorInput" component={ColorInput} />

<Template let:args>
	<div>
		<ColorInput bind:value={color} label="Color" {...args} />
	</div>
	<div>
		<input bind:value={color} />
	</div>
	<div>
		{color}
	</div>
</Template>

<Story name="Primary" />
