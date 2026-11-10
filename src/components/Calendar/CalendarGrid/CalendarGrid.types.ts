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
  /**
   * День с фокусом (roving tabindex). Если он вне показанного месяца — фокус получает
   * выбранный день, затем сегодня, затем 1-е число. Без пропа хранится внутри.
   */
  focusedDate?: Date | null
  /** Клавиатура перевела фокус на другой день — в т.ч. в соседний месяц (родитель листает месяц). */
  onFocusedDateChange?: (date: Date) => void
  /** Сфокусировать день при монтировании (например, при открытии попапа с календарём). */
  autoFocus?: boolean
  className?: string
}
