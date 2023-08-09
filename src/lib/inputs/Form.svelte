<script lang="ts">
	import { setContext } from 'svelte';
	import type { Validator } from './types.js';

	let className = '';
	export { className as class };

	export let aria_label: string;

	let validators: Validator[] = [];

	function getValidator() {
		const validator = {
			valid: true,
			validate: function (valid: boolean) {
				this.valid = valid;
				checkValidation();
			},
			unsubscribe: function () {
				this.valid = true;
				const index = validators.findIndex((obj) => obj === this);
				validators.splice(index, 1);
				checkValidation();
			}
		};
		validators.push(validator);
		return validator;
	}

	setContext('validator', { getValidator });

	export let valid = true;

	function checkValidation() {
		// Check if any validators are invalid
		const anyInvalid = validators.some((validator) => !validator.valid);

		if (anyInvalid === valid) {
			valid = !anyInvalid;
		}
	}
</script>

<form class={className} aria-label={aria_label} novalidate>
	<slot />
</form>
