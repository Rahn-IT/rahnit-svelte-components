<script lang="ts">
	export let loading: boolean;
</script>

{#if loading}
	<div class="relative h-full w-full">
		<div class="h-20 w-20" />
		<div
			class="absolute top-0 flex h-full w-full flex-col flex-wrap content-center items-center justify-center gap-4 p-2"
		>
			<div
				class="box-border h-8 w-8 flex-shrink-0 animate-spin rounded-full border-2 border-t-4 border-secondary border-t-secondary-focus"
			/>
			<div>Loading</div>
		</div>
	</div>
{:else}
	<slot />
{/if}
