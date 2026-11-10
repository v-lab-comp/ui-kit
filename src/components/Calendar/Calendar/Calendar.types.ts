import type { CalendarLocale } from '../calendarLocales'

/** Выбранный диапазон дат. `end` равен `null`, пока выбрана только начальная дата. */
export interface DateRange {
  start: Date | null
  end: Date | null
}

interface CalendarBaseProps {
  /** Return true for dates that should show a dot */
  getDotDays?: (date: Date) => boolean
  locale?: CalendarLocale
  /** Сфокусировать день (выбранный, иначе сегодня) при монтировании — для попапов. */
  autoFocus?: boolean
  className?: string
}

export type CalendarProps = CalendarBaseProps &
  (
    | {
        /** Одиночный выбор даты (по умолчанию). */
        mode?: 'single'
        value?: Date | null
        onChange?: (date: Date) => void
      }
    | {
        /** Выбор диапазона: первый клик — начало, второй — конец. */
        mode: 'range'
        value?: DateRange
        onChange?: (range: DateRange) => void
      }
  )
