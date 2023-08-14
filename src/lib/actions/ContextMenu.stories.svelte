<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import AddIcon from '@iconify-icons/mdi/plus.js';
	import RemoveIcon from '@iconify-icons/mdi/remove.js';
	import YoutubeIcon from '@iconify-icons/mdi/youtube-play.js';
	import ContextMenu from './ContextMenu.svelte';
	import type { Action } from '../inputs/types.js';

	const actions: Action<void>[] = [
		{
			key: 'add',
			icon: AddIcon,
			name: 'Add',
			run: async () => {
				console.log('add');
			}
		},
		{
			key: 'remove',
			icon: RemoveIcon,
			name: 'Remove',
			run: async () => {
				console.log('remove');
			}
		},
		{
			key: 'youtube',
			icon: YoutubeIcon,
			name: 'Youtube',
			run: 'https://www.youtube.com/'
		}
	];
</script>

<Meta title="Actions/ContextMenu" component={ContextMenu} />

<Story name="Primary" let:args>
	<div class="p-2">
		<ContextMenu {actions} />
	</div>
</Story>
