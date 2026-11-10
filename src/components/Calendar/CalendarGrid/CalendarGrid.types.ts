import type { CalendarLocale } from '../calendarLocales'

export interface CalendarGridProps {
  year: number
  month: number
  selectedDate?: Date | null
  /** Selection mode. `range` highlights the span between start and end. */
  mode?: 'single' | 'range'
  rangeStart?: Date | null
  rangeEnd?: Date | null
  /** Hovered day for live range preview (only when range is half-selected) */
  previewDate?: Date | null
  onDayClick?: (date: Date) => void
  onDayHover?: (date: Date | null) => void
  /** Return true for dates that should show a dot */
  getDotDays?: (date: Date) => boolean
  locale?: CalendarLocale
  className?: string
}
