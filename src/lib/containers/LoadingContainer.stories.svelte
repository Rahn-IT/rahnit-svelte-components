<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import LoadingContainer from './LoadingContainer.svelte';
</script>

<Meta
	title="Containers/LoadingContainer"
	component={LoadingContainer}
	argTypes={{
		loading: {
			control: { type: 'boolean' }
		}
	}}
/>

<Template let:args>
	<div class="h-screen">
		<LoadingContainer {...args}>Loading finished!</LoadingContainer>
	</div>
</Template>

<Story name="Primary" />
