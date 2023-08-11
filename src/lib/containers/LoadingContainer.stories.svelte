<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
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

<Story name="Content Sizing" let:args>
	<div class="p-2">
		<div class="min-w-full border">
			<LoadingContainer {...args}>
				<div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
				</div>
			</LoadingContainer>
		</div>
	</div>
</Story>

<Story name="External Sizing" let:args>
	<div class="h-screen p-2">
		<div class="h-full min-w-full border">
			<LoadingContainer class="h-full" {...args}>
				<div class="h-full">
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
					<div>Loading finished!</div>
				</div>
			</LoadingContainer>
		</div>
	</div>
</Story>
