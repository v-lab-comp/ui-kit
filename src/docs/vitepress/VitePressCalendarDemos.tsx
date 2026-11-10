import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Calendar, calendarLocales } from '@/components/Calendar'
import type { DateRange } from '@/components/Calendar'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

export function CalendarDocsDemo() {
  const [date, setDate] = useState<Date | null>(new Date(2024, 0, 11))
  const [range, setRange] = useState<DateRange>({
    start: new Date(2024, 0, 8),
    end: new Date(2024, 0, 19),
  })

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <section style={{ marginBottom: 28 }}>
        <p style={label}>Выбор даты (locale: en)</p>
        <Calendar value={date} onChange={setDate} locale={calendarLocales.en} />
      </section>
      <section style={{ marginBottom: 28 }}>
        <p style={label}>Выбор диапазона (mode: range)</p>
        <Calendar mode="range" value={range} onChange={setRange} locale={calendarLocales.en} />
      </section>
      <section>
        <p style={label}>Маркеры на днях (getDotDays)</p>
        <Calendar
          value={date}
          onChange={setDate}
          locale={calendarLocales.en}
          getDotDays={(d) => d.getMonth() === 0 && [6, 11, 16, 22].includes(d.getDate())}
        />
      </section>
    </div>
  )
}
