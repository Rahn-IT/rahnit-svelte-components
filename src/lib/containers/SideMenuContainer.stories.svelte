<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SideMenuContainer from './SideMenuContainer.svelte';
</script>

<Meta title="Containers/SideMenuContainer" component={SideMenuContainer} />

<Template>
	<div class="h-screen">
		<SideMenuContainer>
			<div slot="left">Left Slot</div>
			<div>Main content</div>
			<div slot="right">Right Slot</div>
		</SideMenuContainer>
	</div>
</Template>

<Story name="Primary" />
