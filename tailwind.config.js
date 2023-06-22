/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {},
	daisyui: {
		themes: ['light']
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
