<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ToggleButton from './ToggleButton.svelte';
	import MenuIcon from '@iconify-icons/mdi/menu.js';
	import CloseIcon from '@iconify-icons/mdi/close.js';
</script>

<Meta
	title="Actions/ToggleButton"
	component={ToggleButton}
	args={{ on_icon: CloseIcon, off_icon: MenuIcon }}
/>

<Template let:args>
	<div class="h-screen">
		<ToggleButton {...args} />
	</div>
</Template>

<Story name="Primary" />
