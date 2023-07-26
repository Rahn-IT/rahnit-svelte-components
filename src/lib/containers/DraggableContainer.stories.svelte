<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import DraggableContainer from './DraggableContainer.svelte';

	let items: number[] = [];
	for (let i = 1; i <= 100; i++) {
		items.push(i);
	}
	items = items;

	function click(event: MouseEvent) {
		const target = event.target;
		if (target instanceof HTMLElement) {
			container.panTo(target);
		}
	}

	let buttonTop: HTMLElement;
	let buttonBottom: HTMLElement;
	let container: DraggableContainer;
</script>

<Meta title="Containers/DraggableContainer" component={DraggableContainer} />

<Template let:args>
	<div class="h-screen">
		<DraggableContainer bind:this={container}>
			<button class="btn" bind:this={buttonTop} on:click={click}>to Bottom</button>
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
			<button class="btn" bind:this={buttonBottom} on:click={click}>to Top</button>
		</DraggableContainer>
	</div>
</Template>

<Story name="Primary" />
