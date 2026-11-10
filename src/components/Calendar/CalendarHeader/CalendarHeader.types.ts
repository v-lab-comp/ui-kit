import type { CalendarLocale } from '../calendarLocales'

export interface CalendarHeaderProps {
  month: number
  year: number
  /** Locale for month names. Pass a built-in locale or a custom CalendarLocale object. Defaults to `calendarLocales.en`. */
  locale?: CalendarLocale
  /** Overrides the default «{month} {year}» label (e.g. year or year range). */
  title?: string
  /** When provided, the label becomes a button (e.g. to open month/year picker). */
  onLabelClick?: () => void
  onPrev?: () => void
  onNext?: () => void
  className?: string
}
