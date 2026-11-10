import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Calendar } from './Calendar'
import type { DateRange } from './Calendar.types'
import { calendarLocales } from '../calendarLocales'

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Calendar/Calendar',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'inline-flex', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    locale: { control: false },
    onChange: { control: false },
    getDotDays: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

function PlaygroundStory() {
  const [date, setDate] = useState<Date | null>(new Date(2024, 0, 11))
  return <Calendar value={date} onChange={setDate} locale={calendarLocales.en} />
}

function WithDotsStory() {
  const [date, setDate] = useState<Date | null>(new Date(2024, 0, 11))
  const dotDays = [6, 11, 16, 22]
  return (
    <Calendar
      value={date}
      onChange={setDate}
      locale={calendarLocales.en}
      getDotDays={(d) => d.getMonth() === 0 && dotDays.includes(d.getDate())}
    />
  )
}

function RussianStory() {
  const [date, setDate] = useState<Date | null>(null)
  return <Calendar value={date} onChange={setDate} locale={calendarLocales.ru} />
}

function UzbekStory() {
  const [date, setDate] = useState<Date | null>(null)
  return <Calendar value={date} onChange={setDate} locale={calendarLocales.uz} />
}

function RangeStory() {
  const [range, setRange] = useState<DateRange>({
    start: new Date(2024, 0, 8),
    end: new Date(2024, 0, 19),
  })
  return (
    <div>
      <Calendar mode="range" value={range} onChange={setRange} locale={calendarLocales.en} />
      <pre style={{ marginTop: 12, fontSize: 12, opacity: 0.85 }}>
        {range.start?.toLocaleDateString() ?? '—'} → {range.end?.toLocaleDateString() ?? '—'}
      </pre>
    </div>
  )
}

export const Playground: Story = {
  render: () => <PlaygroundStory />,
  parameters: { controls: { disable: true } },
}

export const WithDots: Story = {
  name: 'With dot days',
  render: () => <WithDotsStory />,
  parameters: { controls: { disable: true } },
}

export const Russian: Story = {
  name: 'Locale — Russian',
  render: () => <RussianStory />,
  parameters: { controls: { disable: true } },
}

export const Uzbek: Story = {
  name: 'Locale — Uzbek',
  render: () => <UzbekStory />,
  parameters: { controls: { disable: true } },
}

export const Range: Story = {
  name: 'Range selection',
  render: () => <RangeStory />,
  parameters: { controls: { disable: true } },
}
