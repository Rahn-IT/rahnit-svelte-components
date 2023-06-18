<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ToggleButton from './ToggleButton.svelte';
	import MenuIcon from '@iconify-icons/mdi/menu';
	import CloseIcon from '@iconify-icons/mdi/close';
</script>

<Meta title="Actions/ToggleButton" component={ToggleButton} />

<Template let:args>
	<div class="h-screen">
		<ToggleButton {...args} />
	</div>
</Template>

<Story name="Primary" args={{ on_icon: CloseIcon, off_icon: MenuIcon }} />
