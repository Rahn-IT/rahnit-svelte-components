<script lang="ts">
	import ErrorAttachmentContainer from '../../containers/ErrorAttachmentContainer.svelte';

	export let label = '';
	export let id = '';
	export let value: string | null = '';
	export let disabled = false;
	export let autocomplete = 'off';

	export let required = false;
	export let requiredErrorMessage = '';

	let hasFocus = false;

	let errorMessage = '';
	$: {
		if (required && (value === null || value.length === 0)) {
			errorMessage = requiredErrorMessage;
		} else {
			errorMessage = '';
		}
	}
</script>

<ErrorAttachmentContainer {errorMessage}>
	<div class="relative pt-2">
		<input
			{id}
			name={id}
			bind:value
			type="datetime-local"
			{required}
			{disabled}
			{autocomplete}
			class="text-text block w-full border-b-2 border-secondary bg-transparent py-1.5 pl-3 pr-5 placeholder-transparent outline-none focus:border-secondary-focus"
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
</ErrorAttachmentContainer>
