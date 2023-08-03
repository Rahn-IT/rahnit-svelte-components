/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['light']
	},
	theme: {
		colors: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
