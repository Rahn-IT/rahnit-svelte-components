<script lang="ts">
	export let files: FileList;
	export let label = '';
</script>

<div class="relative pt-5">
	<input type="file" bind:files class="file-input-secondary file-input top-5" />

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="text-text pointer-events-none absolute left-3 top-0 text-xs transition-all">
		{label}
	</label>
</div>
