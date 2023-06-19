<script lang="ts">
	export let label = '';
	export let id = '';
	export let value = '';
	export let required = false;
	export let disabled = false;
	export let autocomplete = 'off';
	let hasFocus = false;
</script>

<div class="w-full py-2">
	<div class="relative w-full py-2">
		<input
			{id}
			name={id}
			bind:value
			{required}
			{disabled}
			{autocomplete}
			class="text-text border-secondary focus:border-secondary-focus block w-full border-b-2 bg-transparent py-1.5 pl-4 pr-5 placeholder-transparent outline-none"
			placeholder={hasFocus ? '' : ' '}
			on:focus={() => (hasFocus = true)}
			on:blur={() => (hasFocus = false)}
		/>
		<label
			for={id}
			class="pointer-events-none absolute left-4 top-0 transition-all {hasFocus || value != ''
				? 'text-xs'
				: '-mt-0.5 translate-y-5 text-sm font-bold opacity-80'}"
		>
			{label}
		</label>
	</div>
</div>
