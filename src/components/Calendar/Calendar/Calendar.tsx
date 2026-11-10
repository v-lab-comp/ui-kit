import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { CalendarHeader } from '../CalendarHeader'
import { CalendarGrid } from '../CalendarGrid'
import { defaultLocale } from '../calendarLocales'
import type { CalendarProps } from './Calendar.types'
import { applyRangeClick, normalizeCalendarValue } from './calendarValue'
import { useCalendarView, YEARS_PER_PAGE } from './useCalendarView'
import { CalendarOptionGrid } from './CalendarOptionGrid'
import { contractAttrs } from '@/theme/contract'
import { calendarContract } from '@/theme/contracts/calendar'

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const { getDotDays, locale = defaultLocale, className, autoFocus } = props
  const mode = props.mode ?? 'single'
  const value = normalizeCalendarValue(props)
  const nav = useCalendarView(value.anchor, locale)
  const [hovered, setHovered] = useState<Date | null>(null)
  const [focusedDate, setFocusedDate] = useState<Date | null>(null)

  const handleDayClick = (date: Date) => {
    if (props.mode === 'range') props.onChange?.(applyRangeClick(props.value, date))
    else props.onChange?.(date)
  }

  // Клавиатура увела фокус в другой месяц — листаем вид за ним.
  const handleFocusedDateChange = (date: Date) => {
    setFocusedDate(date)
    if (date.getMonth() !== nav.month || date.getFullYear() !== nav.year) nav.showDate(date)
  }

  return (
    <div
      ref={ref}
      className={clsx(calendarContract.className, className)}
      {...contractAttrs(calendarContract, {})}
    >
      <CalendarHeader
        month={nav.month}
        year={nav.year}
        locale={locale}
        title={nav.title}
        onLabelClick={nav.cycleView}
        onPrev={() => nav.step(-1)}
        onNext={() => nav.step(1)}
      />

      {nav.view === 'days' && (
        <CalendarGrid
          year={nav.year}
          month={nav.month}
          mode={mode}
          selectedDate={value.selected}
          rangeStart={value.rangeStart}
          rangeEnd={value.rangeEnd}
          previewDate={hovered}
          onDayClick={handleDayClick}
          onDayHover={mode === 'range' ? setHovered : undefined}
          getDotDays={getDotDays}
          locale={locale}
          focusedDate={focusedDate}
          onFocusedDateChange={handleFocusedDateChange}
          autoFocus={autoFocus}
        />
      )}

      {nav.view === 'months' && (
        <CalendarOptionGrid
          options={locale.months.map((m, i) => ({ key: m, label: m, active: i === nav.month }))}
          onPick={nav.pickMonth}
        />
      )}

      {nav.view === 'years' && (
        <CalendarOptionGrid
          options={Array.from({ length: YEARS_PER_PAGE }, (_, i) => {
            const y = nav.yearPage + i
            return { key: y, label: y, active: y === nav.year }
          })}
          onPick={(i) => nav.pickYear(nav.yearPage + i)}
        />
      )}
    </div>
  )
})

Calendar.displayName = 'Calendar'
