<script lang="ts">
	import Icon from '../Icon.js';
	import type { IconifyIcon } from '@iconify/types';

	export let value = false;
	export let on_icon: string | IconifyIcon;
	export let off_icon: string | IconifyIcon;
</script>

<label class="swap-rotate btn btn-circle btn-secondary swap">
	<!-- this hidden checkbox controls the state -->
	<input bind:checked={value} type="checkbox" />

	<Icon icon={off_icon} class="swap-off h-10 w-auto fill-current" />

	<Icon icon={on_icon} class="swap-on h-10 w-auto fill-current" />
</label>
