import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Overlays/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Playground: Story = {
  render: function Render(args) {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div style={{ position: 'relative', padding: '60px' }}>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        >
          {isOpen ? 'Close' : 'Open'} Popover
        </button>

        <Popover {...args} open={isOpen} anchorRef={triggerRef}>
          <div style={{ padding: '16px', minWidth: '200px' }}>
            <p style={{ margin: 0 }}>This is a popover content</p>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>
              Click outside to close
            </p>
          </div>
        </Popover>
      </div>
    )
  },
  args: {
    placement: 'bottom',
    offset: 6,
  },
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
          gap: '60px',
          padding: '80px',
        }}
      >
        {placements.map((placement) => {
          const [isOpen, setIsOpen] = useState(false)
          const triggerRef = useRef<HTMLButtonElement>(null)

          return (
            <div key={placement} style={{ position: 'relative' }}>
              <button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                }}
              >
                {placement}
              </button>

              <Popover open={isOpen} anchorRef={triggerRef} placement={placement}>
                <div style={{ padding: '12px 16px', minWidth: '180px', fontSize: '14px' }}>
                  Popover on <strong>{placement}</strong>
                </div>
              </Popover>
            </div>
          )
        })}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
