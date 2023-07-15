<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import DraggableContainer from './DraggableContainer.svelte';

	let items: number[] = [];
	for (let i = 1; i <= 100; i++) {
		items.push(i);
	}
	items = items;

	function click() {
		console.log('clicked');
	}
</script>

<Meta title="Containers/DraggableContainer" component={DraggableContainer} />

<Template let:args>
	<div class="h-screen">
		<DraggableContainer>
			<button class="btn" on:click={click}>Click me!</button>
			<table>
				{#each items as i}
					<tr>
						{#each items as j}
							<td>
								{i * j}
							</td>
						{/each}
					</tr>
				{/each}
			</table>
		</DraggableContainer>
	</div>
</Template>

<Story name="Primary" />
