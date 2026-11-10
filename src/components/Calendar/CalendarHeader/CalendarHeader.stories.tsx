import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CalendarHeader } from './CalendarHeader'
import { calendarLocales } from '../calendarLocales'
import type { CalendarLocale } from '../calendarLocales'

const meta: Meta<typeof CalendarHeader> = {
  component: CalendarHeader,
  title: 'Calendar/CalendarHeader',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    month: { control: { type: 'number', min: 0, max: 11 } },
    year: { control: { type: 'number', min: 1900, max: 2100 } },
    locale: { control: false },
    onPrev: { control: false },
    onNext: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof CalendarHeader>

// ── Playground ────────────────────────────────────────────────────────────

function PlaygroundStory(args: { month?: number; year?: number; locale?: CalendarLocale }) {
  const [month, setMonth] = useState(args.month ?? 0)
  const [year, setYear] = useState(args.year ?? 2024)

  const prev = () => {
    if (month === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else setMonth((m) => m - 1)
  }
  const next = () => {
    if (month === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else setMonth((m) => m + 1)
  }

  return (
    <CalendarHeader month={month} year={year} locale={args.locale} onPrev={prev} onNext={next} />
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundStory {...args} />,
  args: { month: 0, year: 2024 },
}

// ── Locales ───────────────────────────────────────────────────────────────

const NavigableHeader = ({ locale }: { locale: CalendarLocale }) => {
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2024)

  const prev = () => {
    if (month === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else setMonth((m) => m - 1)
  }
  const next = () => {
    if (month === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else setMonth((m) => m + 1)
  }

  return <CalendarHeader month={month} year={year} locale={locale} onPrev={prev} onNext={next} />
}

export const English: Story = {
  name: 'Locale — English',
  render: () => <NavigableHeader locale={calendarLocales.en} />,
  parameters: { controls: { disable: true } },
}

export const Russian: Story = {
  name: 'Locale — Russian',
  render: () => <NavigableHeader locale={calendarLocales.ru} />,
  parameters: { controls: { disable: true } },
}

export const Uzbek: Story = {
  name: 'Locale — Uzbek',
  render: () => <NavigableHeader locale={calendarLocales.uz} />,
  parameters: { controls: { disable: true } },
}

export const AllLocales: Story = {
  name: '📋 All Locales',
  decorators: [
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NavigableHeader locale={calendarLocales.en} />
        <NavigableHeader locale={calendarLocales.ru} />
        <NavigableHeader locale={calendarLocales.uz} />
      </div>
    ),
  ],
  render: () => <></>,
  parameters: { controls: { disable: true } },
}
