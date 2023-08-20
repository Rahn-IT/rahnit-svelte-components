<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import LockingContainer from './LockingContainer.svelte';
</script>

<Meta
	title="Containers/LockingContainer"
	component={LockingContainer}
	argTypes={{
		locked: {
			control: { type: 'boolean' }
		}
	}}
/>

<Story name="Primary" let:args>
	<LockingContainer class="p-2" {...args}>
		<button class="btn btn-primary" on:click={() => alert('Button clicked')}> Alert </button>
	</LockingContainer>
</Story>

<Story name="Bigger" let:args>
	<LockingContainer class="overflow-hidden rounded-xl p-2" {...args}>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
		<button class="btn btn-primary block" on:click={() => alert('Button clicked')}> Alert </button>
	</LockingContainer>
</Story>
