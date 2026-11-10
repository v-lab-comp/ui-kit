import type { Meta, StoryObj } from '@storybook/react'
import { RiAddLine } from '@remixicon/react'
import { ContentDivider } from './ContentDivider'
import { Button } from '../Button'

const meta: Meta<typeof ContentDivider> = {
  component: ContentDivider,
  title: 'Components/ContentDivider',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ContentDivider>

export const Playground: Story = {
  name: 'Playground',
  args: { variant: 'line' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'lineSpacing', 'textAndLine', 'lineWithContent'],
    },
    text: { control: 'text' },
  },
  render: (args) => <ContentDivider {...args} />,
}

/** Простая горизонтальная линия */
export const Line: Story = {
  args: { variant: 'line' },
}

/** Линия с вертикальным отступом */
export const LineSpacing: Story = {
  args: { variant: 'lineSpacing' },
}

/** Текст по центру между двумя линиями */
export const TextAndLine: Story = {
  args: { variant: 'textAndLine', text: 'OR' },
}

/** Только текст-разделитель */
export const Text: Story = {
  args: { variant: 'text', text: 'OR' },
}

/** Текст на фоне (заголовок секции) */
export const SolidText: Story = {
  args: { variant: 'solidText', text: 'Amount & Account' },
}

/** Слот: иконка-кнопка между линиями */
export const WithSlotIconButton: Story = {
  args: { variant: 'withSlot' },
  render: (args) => (
    <ContentDivider {...args}>
      <Button
        variant="stroke"
        color="neutral"
        size="x-small"
        leftNode={<RiAddLine size={20} />}
        aria-label="Add"
      />
    </ContentDivider>
  ),
}

/** Слот: текстовая кнопка между линиями */
export const WithSlotTextButton: Story = {
  args: { variant: 'withSlot' },
  render: (args) => (
    <ContentDivider {...args}>
      <Button variant="stroke" color="neutral" size="x-small" leftNode={<RiAddLine size={20} />}>
        Add
      </Button>
    </ContentDivider>
  ),
}
