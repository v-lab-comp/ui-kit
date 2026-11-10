import type { Meta, StoryObj } from '@storybook/react'
import { RiQuestionLine } from '@remixicon/react'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 440 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
    flipIcon: {
      control: 'boolean',
      description: 'true = expand icon on the left; false = expand icon on the right',
    },
    leftIcon: {
      description:
        'Icon to the left of the title (e.g. question-line). Only when flipIcon is false.',
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

const defaultDescription =
  'Insert the accordion description here. It would look better as two lines of text.'

export const Playground: Story = {
  name: 'Playground',
  args: {
    title: 'Insert your accordion title here',
    leftIcon: <RiQuestionLine size={20} />,
    flipIcon: false,
    defaultOpen: false,
    disabled: false,
    children: 'Insert the accordion description here. It would look better as two lines of text.',
  },
}

export const Default: Story = {
  name: 'With left icon (Flip Icon Off)',
  args: {
    title: 'Insert your accordion title here',
    leftIcon: <RiQuestionLine size={20} />,
    flipIcon: false,
    defaultOpen: false,
    children: defaultDescription,
  },
}

export const FlipIconOn: Story = {
  name: 'Expand icon on left (Flip Icon On)',
  args: {
    title: 'Insert your accordion title here',
    flipIcon: true,
    defaultOpen: false,
    children: defaultDescription,
  },
}

export const Expanded: Story = {
  name: 'Expanded by default',
  args: {
    title: 'Insert your accordion title here',
    leftIcon: <RiQuestionLine size={20} />,
    flipIcon: false,
    defaultOpen: true,
    children: defaultDescription,
  },
}

export const NoLeftIcon: Story = {
  name: 'No left icon, toggle on right',
  args: {
    title: 'Insert your accordion title here',
    flipIcon: false,
    defaultOpen: false,
    children: defaultDescription,
  },
}
