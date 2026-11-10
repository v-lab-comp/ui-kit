import type { CalendarProps, DateRange } from './Calendar.types'

/** Значение календаря в одном виде независимо от режима. */
export interface NormalizedCalendarValue {
  selected: Date | null
  rangeStart: Date | null
  rangeEnd: Date | null
  /** Дата, от которой показывается месяц: выбранная или начало/конец диапазона. */
  anchor: Date | null
}

export function normalizeCalendarValue(props: CalendarProps): NormalizedCalendarValue {
  if (props.mode === 'range') {
    const start = props.value?.start ?? null
    const end = props.value?.end ?? null
    return { selected: null, rangeStart: start, rangeEnd: end, anchor: start ?? end }
  }
  const selected = props.value ?? null
  return { selected, rangeStart: null, rangeEnd: null, anchor: selected }
}

/** Клик по дню в режиме диапазона: начать заново, либо закрыть диапазон (с перестановкой краёв). */
export function applyRangeClick(range: DateRange | undefined, date: Date): DateRange {
  const start = range?.start ?? null
  if (!start || range?.end) return { start: date, end: null }
  return date < start ? { start: date, end: start } : { start, end: date }
}
