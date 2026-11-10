import { useState } from 'react'
import clsx from 'clsx'
import { CalendarHeader } from '../CalendarHeader'
import { CalendarGrid } from '../CalendarGrid'
import { defaultLocale } from '../calendarLocales'
import type { CalendarProps } from './Calendar.types'
import { contractAttrs, contractPart } from '@/theme/contract'
import { calendarContract } from '@/theme/contracts/calendar'

const YEARS_PER_PAGE = 12
type View = 'days' | 'months' | 'years'

export const Calendar = (props: CalendarProps) => {
  const { getDotDays, locale = defaultLocale, className } = props
  const mode = props.mode ?? 'single'

  // Начальный месяц/год выводим из текущего значения, иначе из сегодня.
  const today = new Date()
  const initial =
    (props.mode === 'range' ? (props.value?.start ?? props.value?.end) : props.value) ?? today

  const [viewMonth, setViewMonth] = useState(initial.getMonth())
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [view, setView] = useState<View>('days')
  const [yearPage, setYearPage] = useState(
    initial.getFullYear() - (initial.getFullYear() % YEARS_PER_PAGE)
  )
  const [hovered, setHovered] = useState<Date | null>(null)

  const goPrev = () => {
    if (view === 'years') {
      setYearPage((p) => p - YEARS_PER_PAGE)
    } else if (view === 'months') {
      setViewYear((y) => y - 1)
    } else if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else setViewMonth((m) => m - 1)
  }

  const goNext = () => {
    if (view === 'years') {
      setYearPage((p) => p + YEARS_PER_PAGE)
    } else if (view === 'months') {
      setViewYear((y) => y + 1)
    } else if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else setViewMonth((m) => m + 1)
  }

  // Клик по заголовку переключает уровень детализации: дни → месяцы → годы → дни.
  const cycleView = () =>
    setView((v) => (v === 'days' ? 'months' : v === 'months' ? 'years' : 'days'))

  const pickMonth = (m: number) => {
    setViewMonth(m)
    setView('days')
  }

  const pickYear = (y: number) => {
    setViewYear(y)
    setYearPage(y - (y % YEARS_PER_PAGE))
    setView('months')
  }

  const handleDayClick = (date: Date) => {
    if (props.mode === 'range') {
      const r = props.value ?? { start: null, end: null }
      if (!r.start || r.end) props.onChange?.({ start: date, end: null })
      else if (date < r.start) props.onChange?.({ start: date, end: r.start })
      else props.onChange?.({ start: r.start, end: date })
    } else {
      props.onChange?.(date)
    }
  }

  const title =
    view === 'days'
      ? `${locale.months[viewMonth]} ${viewYear}`
      : view === 'months'
        ? `${viewYear}`
        : `${yearPage} — ${yearPage + YEARS_PER_PAGE - 1}`

  return (
    <div
      className={clsx(calendarContract.className, className)}
      {...contractAttrs(calendarContract, {})}
    >
      <CalendarHeader
        month={viewMonth}
        year={viewYear}
        locale={locale}
        title={title}
        onLabelClick={cycleView}
        onPrev={goPrev}
        onNext={goNext}
      />

      {view === 'days' && (
        <CalendarGrid
          year={viewYear}
          month={viewMonth}
          mode={mode}
          selectedDate={props.mode === 'range' ? null : (props.value ?? null)}
          rangeStart={props.mode === 'range' ? (props.value?.start ?? null) : null}
          rangeEnd={props.mode === 'range' ? (props.value?.end ?? null) : null}
          previewDate={hovered}
          onDayClick={handleDayClick}
          onDayHover={mode === 'range' ? setHovered : undefined}
          getDotDays={getDotDays}
          locale={locale}
        />
      )}

      {view === 'months' && (
        <div className={contractPart(calendarContract, 'option-grid')}>
          {locale.months.map((m, i) => (
            <button
              key={m}
              type="button"
              className={contractPart(calendarContract, 'option')}
              data-active={i === viewMonth || undefined}
              onClick={() => pickMonth(i)}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {view === 'years' && (
        <div className={contractPart(calendarContract, 'option-grid')}>
          {Array.from({ length: YEARS_PER_PAGE }, (_, i) => yearPage + i).map((y) => (
            <button
              key={y}
              type="button"
              className={contractPart(calendarContract, 'option')}
              data-active={y === viewYear || undefined}
              onClick={() => pickYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

Calendar.displayName = 'Calendar'
