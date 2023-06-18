import type { Meta, StoryObj } from '@storybook/svelte';

import Tailwind from './Tailwind.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
	title: 'Example/Tailwind',
	component: Tailwind,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<Tailwind>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: 'Button'
	}
};
