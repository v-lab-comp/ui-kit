import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDay } from './CalendarDay'

const meta: Meta<typeof CalendarDay> = {
  component: CalendarDay,
  title: 'Calendar/CalendarDay',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    day: { control: { type: 'number', min: 1, max: 31 } },
    isSelected: { control: 'boolean' },
    isActive: { control: 'boolean' },
    isToday: { control: 'boolean' },
    hasDot: { control: 'boolean' },
    isOutsideMonth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof CalendarDay>

// ── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { day: 11 },
}

// ── All states ────────────────────────────────────────────────────────────

const COLUMNS = ['Default', 'Selected', 'Outside month', 'Disabled']

export const AllStates: Story = {
  name: '📋 All States',
  decorators: [
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {COLUMNS.map((label) => (
            <div
              key={label}
              style={{ width: 40, fontSize: 10, color: '#999', textAlign: 'center' }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Normal */}
        <div style={{ display: 'flex', gap: 8 }}>
          <CalendarDay day={1} />
          <CalendarDay day={1} isSelected />
          <CalendarDay day={1} isOutsideMonth />
          <CalendarDay day={1} disabled />
        </div>

        {/* With dot */}
        <div style={{ display: 'flex', gap: 8 }}>
          <CalendarDay day={1} hasDot />
          <CalendarDay day={1} hasDot isSelected />
          <CalendarDay day={1} hasDot isOutsideMonth />
          <CalendarDay day={1} hasDot disabled />
        </div>

        {/* Active (primary text) */}
        <div style={{ display: 'flex', gap: 8 }}>
          <CalendarDay day={1} isActive />
          <CalendarDay day={1} isActive isSelected />
          <CalendarDay day={1} isActive isOutsideMonth />
          <CalendarDay day={1} isActive disabled />
        </div>

        {/* Active + dot */}
        <div style={{ display: 'flex', gap: 8 }}>
          <CalendarDay day={1} isActive hasDot />
          <CalendarDay day={1} isActive hasDot isSelected />
          <CalendarDay day={1} isActive hasDot isOutsideMonth />
          <CalendarDay day={1} isActive hasDot disabled />
        </div>
      </div>
    ),
  ],
  render: () => <></>,
  parameters: { controls: { disable: true } },
}

// ── Individual ────────────────────────────────────────────────────────────

export const Default: Story = { args: { day: 15 } }
export const Selected: Story = { args: { day: 11, isSelected: true } }
export const WithDot: Story = { args: { day: 16, hasDot: true } }
export const SelectedWithDot: Story = { args: { day: 16, hasDot: true, isSelected: true } }
export const Active: Story = { args: { day: 5, isActive: true } }
export const ActiveWithDot: Story = { args: { day: 5, isActive: true, hasDot: true } }
export const TodayAccessibility: Story = {
  args: { day: 5, isToday: true },
  name: 'Today (aria only)',
}
export const OutsideMonth: Story = { args: { day: 2, isOutsideMonth: true } }
export const Disabled: Story = { args: { day: 8, disabled: true } }
