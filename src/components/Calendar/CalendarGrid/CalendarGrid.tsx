import clsx from 'clsx'
import { CalendarDay } from '../CalendarDay'
import { getCalendarDays, isSameDay, isToday, startOfDay } from '../calendarUtils'
import { defaultLocale } from '../calendarLocales'
import type { CalendarGridProps } from './CalendarGrid.types'
import { contractAttrs, contractPart } from '@/theme/contract'
import { calendarGridContract } from '@/theme/contracts/calendar-grid'

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
  className,
}: CalendarGridProps) => {
  const days = getCalendarDays(year, month)

  // Границы диапазона в мс начала дня. При наведении (когда выбрана только
  // начальная дата) показываем превью от start до hovered.
  const startMs = rangeStart ? startOfDay(rangeStart) : null
  let endMs = rangeEnd ? startOfDay(rangeEnd) : null
  if (mode === 'range' && startMs != null && endMs == null && previewDate) {
    endMs = startOfDay(previewDate)
  }
  const lo = startMs != null && endMs != null ? Math.min(startMs, endMs) : startMs
  const hi = startMs != null && endMs != null ? Math.max(startMs, endMs) : null

  return (
    <div
      className={clsx(calendarGridContract.className, className)}
      {...contractAttrs(calendarGridContract, {})}
      onMouseLeave={onDayHover ? () => onDayHover(null) : undefined}
    >
      {locale.weekdays.map((wd) => (
        <span key={wd} className={contractPart(calendarGridContract, 'weekday')}>
          {wd}
        </span>
      ))}
      {days.map(({ date, isOutsideMonth }) => {
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const t = startOfDay(date)

        const isSelected =
          mode === 'range'
            ? t === lo || (hi != null && t === hi)
            : selectedDate
              ? isSameDay(date, selectedDate)
              : false
        const inRange = mode === 'range' && lo != null && hi != null && t >= lo && t <= hi

        return (
          <CalendarDay
            key={key}
            day={date.getDate()}
            isSelected={isSelected}
            inRange={inRange}
            isToday={isToday(date)}
            isOutsideMonth={isOutsideMonth}
            hasDot={getDotDays ? getDotDays(date) : false}
            onClick={() => onDayClick?.(date)}
            onMouseEnter={onDayHover ? () => onDayHover(date) : undefined}
          />
        )
      })}
    </div>
  )
}

CalendarGrid.displayName = 'CalendarGrid'
