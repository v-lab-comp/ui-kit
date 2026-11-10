import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Overlays/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  name: 'Playground',
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
    delay: 0,
  },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <Tooltip {...args}>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid var(--stroke-soft-200)',
            cursor: 'pointer',
          }}
        >
          Hover me
        </button>
      </Tooltip>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Tooltip content="This is a helpful tooltip">
        <button>Hover me</button>
      </Tooltip>
    </div>
  ),
}

export const AllPlacements: Story = {
  name: '📋 All Placements',
  render: () => {
    const placements: Array<'top' | 'bottom' | 'left' | 'right'> = [
      'top',
      'bottom',
      'left',
      'right',
    ]

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '80px',
          padding: '100px',
        }}
      >
        {placements.map((placement) => (
          <Tooltip key={placement} content={`Tooltip on ${placement}`} placement={placement}>
            <button>{placement}</button>
          </Tooltip>
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
