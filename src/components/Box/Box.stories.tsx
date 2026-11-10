import type { Meta, StoryObj } from '@storybook/react'
import { Box } from './Box'

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Components/Box',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Box>

export const Playground: Story = {
  name: 'Playground',
  args: { children: 'Box content' },
  argTypes: {
    className: { control: 'text' },
  },
  render: (args) => <Box {...args} />,
}

export const Default: Story = {
  args: {
    children: 'Содержимое',
  },
}

export const WithStyles: Story = {
  name: 'Примеры использования',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Box style={{ padding: 16, background: 'var(--bg-weak-50)', borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 14 }}>Контейнер с паддингом и фоном</p>
      </Box>
      <Box style={{ padding: 16, border: '1px solid var(--stroke-soft-200)', borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 14 }}>Контейнер с рамкой</p>
      </Box>
      <Box
        style={{
          padding: 16,
          background: 'var(--bg-white-0)',
          boxShadow: 'var(--shadow-regular-small)',
          borderRadius: 8,
        }}
      >
        <p style={{ margin: 0, fontSize: 14 }}>Карточка с тенью</p>
      </Box>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
