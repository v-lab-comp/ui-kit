import { useEffect, useState } from 'react'
import type { CalendarLocale } from '../calendarLocales'

export const YEARS_PER_PAGE = 12
export type CalendarView = 'days' | 'months' | 'years'

const NEXT_VIEW: Record<CalendarView, CalendarView> = {
  days: 'months',
  months: 'years',
  years: 'days',
}

const yearPageOf = (year: number) => year - (year % YEARS_PER_PAGE)

/**
 * Навигация календаря: уровень (дни / месяцы / годы), показанный месяц и год,
 * страница лет, шаг ±1 для кнопок «назад/вперёд» и заголовок.
 * Показанный месяц следует за `anchor`, когда значение меняется снаружи и уходит из вида.
 */
export function useCalendarView(anchor: Date | null, locale: CalendarLocale) {
  const initial = anchor ?? new Date()
  const [view, setView] = useState<CalendarView>('days')
  const [month, setMonth] = useState(initial.getMonth())
  const [year, setYear] = useState(initial.getFullYear())
  const [yearPage, setYearPage] = useState(yearPageOf(initial.getFullYear()))

  /** Показать месяц даты (без смены уровня). */
  const showDate = (date: Date) => {
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setYearPage(yearPageOf(date.getFullYear()))
  }

  const anchorMs = anchor?.getTime() ?? null
  useEffect(() => {
    if (anchorMs == null) return
    const date = new Date(anchorMs)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- вид подстраивается под внешний value
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setYearPage(yearPageOf(date.getFullYear()))
  }, [anchorMs])

  const step = (dir: 1 | -1) => {
    if (view === 'years') setYearPage((p) => p + dir * YEARS_PER_PAGE)
    else if (view === 'months') setYear((y) => y + dir)
    else showDate(new Date(year, month + dir, 1))
  }

  const cycleView = () => setView((v) => NEXT_VIEW[v])

  const pickMonth = (m: number) => {
    setMonth(m)
    setView('days')
  }

  const pickYear = (y: number) => {
    setYear(y)
    setYearPage(yearPageOf(y))
    setView('months')
  }

  const titles: Record<CalendarView, string> = {
    days: `${locale.months[month]} ${year}`,
    months: `${year}`,
    years: `${yearPage} — ${yearPage + YEARS_PER_PAGE - 1}`,
  }

  return {
    view,
    month,
    year,
    yearPage,
    title: titles[view],
    showDate,
    step,
    cycleView,
    pickMonth,
    pickYear,
  }
}
