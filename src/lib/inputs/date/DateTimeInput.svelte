<script lang="ts">
	export let label = '';
	export let id = '';
	export let value: string | null = '';
	export let required = false;
	export let disabled = false;
	export let autocomplete = 'off';

	let hasFocus = false;
</script>

<div class="relative pt-2">
	<input
		{id}
		name={id}
		bind:value
		type="datetime-local"
		{required}
		{disabled}
		{autocomplete}
		class="text-text border-secondary focus:border-secondary-focus block w-full border-b-2 bg-transparent py-1.5 pl-3 pr-5 placeholder-transparent outline-none"
		placeholder={hasFocus ? '' : ' '}
		on:focus={() => (hasFocus = true)}
		on:blur={() => (hasFocus = false)}
		on:change
	/>
	<label
		for={id}
		class="text-text pointer-events-none absolute left-3 top-0 text-xs transition-all"
	>
		{label}
	</label>
</div>
