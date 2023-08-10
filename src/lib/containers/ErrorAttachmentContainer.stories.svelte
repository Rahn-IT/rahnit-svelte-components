<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ErrorAttachmentContainer from './ErrorAttachmentContainer.svelte';

	let customError = '';
</script>

<Meta title="Containers/ErrorAttachmentContainer" component={ErrorAttachmentContainer} />

<Template let:args>
	<div class="h-screen">
		<ErrorAttachmentContainer {...args} errorMessage={customError}>
			<input class="border" bind:value={customError} />
		</ErrorAttachmentContainer>
	</div>
</Template>

<Story name="Primary" />
