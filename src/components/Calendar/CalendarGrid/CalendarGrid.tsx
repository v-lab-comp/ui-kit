import { useEffect, useRef, type KeyboardEvent } from 'react'
import clsx from 'clsx'
import { CalendarDay } from '../CalendarDay'
import {
  formatDayLabel,
  getCalendarDays,
  getKeyboardTargetDate,
  isSameDay,
  isToday,
  startOfDay,
  type DayCell,
} from '../calendarUtils'
import { defaultLocale } from '../calendarLocales'
import type { CalendarGridProps } from './CalendarGrid.types'
import { contractAttrs, contractPart } from '@/theme/contract'
import { calendarGridContract } from '@/theme/contracts/calendar-grid'
import { useControllableState } from '@/utils/useControllableState'

// Строка таблицы не должна менять CSS-grid раскладку скинов: дети участвуют в сетке напрямую.
const ROW_STYLE = { display: 'contents' } as const

type Bounds = { lo: number | null; hi: number | null }

/** Границы подсветки диапазона в мс начала дня; при половине диапазона — превью до наведённого дня. */
function getRangeBounds({
  mode,
  rangeStart,
  rangeEnd,
  previewDate,
}: Pick<CalendarGridProps, 'mode' | 'rangeStart' | 'rangeEnd' | 'previewDate'>): Bounds {
  const startMs = rangeStart ? startOfDay(rangeStart) : null
  let endMs = rangeEnd ? startOfDay(rangeEnd) : null
  if (mode === 'range' && startMs != null && endMs == null && previewDate) {
    endMs = startOfDay(previewDate)
  }
  if (startMs == null || endMs == null) return { lo: startMs, hi: null }
  return { lo: Math.min(startMs, endMs), hi: Math.max(startMs, endMs) }
}

/** День, который держит tabindex=0: фокус → выбранный → сегодня → 1-е число месяца. */
function getTabbableDate(
  days: DayCell[],
  candidates: Array<Date | null | undefined>,
  year: number,
  month: number
): Date {
  const inMonth = days.filter((d) => !d.isOutsideMonth)
  for (const candidate of candidates) {
    const hit = candidate && inMonth.find((d) => isSameDay(d.date, candidate))
    if (hit) return hit.date
  }
  return new Date(year, month, 1)
}

function chunkWeeks(days: DayCell[]): DayCell[][] {
  const weeks: DayCell[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

/**
 * Сетка дней по WAI-ARIA APG (Date Picker Dialog): `role="grid"` с неделями-строками,
 * дни — `gridcell` с полным именем даты и roving tabindex.
 */
export const CalendarGrid = ({
  year,
  month,
  selectedDate,
  mode = 'single',
  rangeStart,
  rangeEnd,
  previewDate,
  onDayClick,
  onDayHover,
  getDotDays,
  locale = defaultLocale,
  focusedDate: focusedDateProp,
  onFocusedDateChange,
  autoFocus,
  className,
}: CalendarGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  // Перевести DOM-фокус на новый tabbable-день после следующего рендера (клавиатура / autoFocus).
  const pendingFocusRef = useRef(Boolean(autoFocus))
  const [focusedDate, setFocusedDate] = useControllableState<Date | null>({
    value: focusedDateProp,
    defaultValue: null,
    onChange: (date) => date && onFocusedDateChange?.(date),
  })

  const days = getCalendarDays(year, month)
  const { lo, hi } = getRangeBounds({ mode, rangeStart, rangeEnd, previewDate })
  const tabbable = getTabbableDate(
    days,
    [focusedDate, selectedDate, rangeStart, new Date()],
    year,
    month
  )
  const tabbableKey = startOfDay(tabbable)

  useEffect(() => {
    if (!pendingFocusRef.current) return
    pendingFocusRef.current = false
    gridRef.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus()
  }, [tabbableKey])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = getKeyboardTargetDate(tabbable, e.key, e.shiftKey)
    if (!target) return
    e.preventDefault()
    pendingFocusRef.current = true
    setFocusedDate(target)
  }

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-multiselectable={mode === 'range' || undefined}
      className={clsx(calendarGridContract.className, className)}
      {...contractAttrs(calendarGridContract, {})}
      onKeyDown={handleKeyDown}
      onMouseLeave={onDayHover ? () => onDayHover(null) : undefined}
    >
      <div role="row" style={ROW_STYLE}>
        {locale.weekdays.map((wd) => (
          <span
            key={wd}
            role="columnheader"
            className={contractPart(calendarGridContract, 'weekday')}
          >
            {wd}
          </span>
        ))}
      </div>
      {chunkWeeks(days).map((week) => (
        <div key={startOfDay(week[0].date)} role="row" style={ROW_STYLE}>
          {week.map(({ date, isOutsideMonth }) => {
            const t = startOfDay(date)
            const isSelected =
              mode === 'range'
                ? t === lo || (hi != null && t === hi)
                : Boolean(selectedDate && isSameDay(date, selectedDate))
            const inRange = mode === 'range' && lo != null && hi != null && t >= lo && t <= hi

            return (
              <CalendarDay
                key={t}
                role="gridcell"
                aria-label={formatDayLabel(date, locale)}
                tabIndex={t === tabbableKey ? 0 : -1}
                day={date.getDate()}
                isSelected={isSelected}
                inRange={inRange}
                isToday={isToday(date)}
                isOutsideMonth={isOutsideMonth}
                hasDot={getDotDays ? getDotDays(date) : false}
                onClick={() => {
                  setFocusedDate(date)
                  onDayClick?.(date)
                }}
                onMouseEnter={onDayHover ? () => onDayHover(date) : undefined}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

CalendarGrid.displayName = 'CalendarGrid'
