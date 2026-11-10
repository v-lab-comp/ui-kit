import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CalendarGrid } from './CalendarGrid'
import type { CalendarGridProps } from './CalendarGrid.types'
import { calendarLocales } from '../calendarLocales'

const meta: Meta<typeof CalendarGrid> = {
  component: CalendarGrid,
  title: 'Calendar/CalendarGrid',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'inline-flex' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    year: { control: { type: 'number' } },
    month: { control: { type: 'number', min: 0, max: 11 } },
    locale: { control: false },
    onDayClick: { control: false },
    getDotDays: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof CalendarGrid>

function PlaygroundStory(args: CalendarGridProps) {
  const [selected, setSelected] = useState<Date | null>(null)
  return <CalendarGrid {...args} selectedDate={selected} onDayClick={setSelected} />
}

function WithDotsStory() {
  const [selected, setSelected] = useState<Date | null>(new Date(2024, 0, 11))
  const dotDays = [6, 11, 16, 22]
  return (
    <CalendarGrid
      year={2024}
      month={0}
      locale={calendarLocales.en}
      selectedDate={selected}
      onDayClick={setSelected}
      getDotDays={(date) => date.getMonth() === 0 && dotDays.includes(date.getDate())}
    />
  )
}

function RussianStory() {
  const [selected, setSelected] = useState<Date | null>(null)
  return (
    <CalendarGrid
      year={2024}
      month={0}
      locale={calendarLocales.ru}
      selectedDate={selected}
      onDayClick={setSelected}
    />
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundStory {...args} />,
  args: { year: 2024, month: 0, locale: calendarLocales.en },
}

export const WithDots: Story = {
  render: () => <WithDotsStory />,
  parameters: { controls: { disable: true } },
}

export const Russian: Story = {
  render: () => <RussianStory />,
  parameters: { controls: { disable: true } },
}
