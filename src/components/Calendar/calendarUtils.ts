export interface DayCell {
  date: Date
  isOutsideMonth: boolean
}

export function getCalendarDays(year: number, month: number): DayCell[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Mon-start: Mon=0 ... Sun=6
  const startOffset = (firstDay.getDay() + 6) % 7

  const days: DayCell[] = []

  // Trailing days from previous month
  const prevLastDay = new Date(year, month, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, prevLastDay - i), isOutsideMonth: true })
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), isOutsideMonth: false })
  }

  // Leading days from next month to complete the last row
  const remaining = days.length % 7
  if (remaining > 0) {
    for (let d = 1; d <= 7 - remaining; d++) {
      days.push({ date: new Date(year, month + 1, d), isOutsideMonth: true })
    }
  }

  return days
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/** Date → метка времени начала дня (для сравнения дат без учёта времени). */
export function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/** Дата + n дней (n может быть отрицательным). */
export function addDays(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n)
}

/** Дата + n месяцев; число дня прижимается к длине целевого месяца (31 янв + 1 → 28/29 фев). */
export function addMonths(date: Date, n: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + n, 1)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay))
}

/** Индекс дня недели с понедельника: Пн=0 … Вс=6. */
export function weekdayIndex(date: Date): number {
  return (date.getDay() + 6) % 7
}

/**
 * Цель клавиатурной навигации по сетке дней (WAI-ARIA APG Date Picker Dialog):
 * стрелки — день/неделя, Home/End — начало/конец недели,
 * PageUp/PageDown — месяц, с Shift — год. `null` — клавиша не навигационная.
 */
export function getKeyboardTargetDate(date: Date, key: string, shiftKey: boolean): Date | null {
  switch (key) {
    case 'ArrowLeft':
      return addDays(date, -1)
    case 'ArrowRight':
      return addDays(date, 1)
    case 'ArrowUp':
      return addDays(date, -7)
    case 'ArrowDown':
      return addDays(date, 7)
    case 'Home':
      return addDays(date, -weekdayIndex(date))
    case 'End':
      return addDays(date, 6 - weekdayIndex(date))
    case 'PageUp':
      return addMonths(date, shiftKey ? -12 : -1)
    case 'PageDown':
      return addMonths(date, shiftKey ? 12 : 1)
    default:
      return null
  }
}

/**
 * Доступное имя дня — полная дата. При `code` в локали — через `Intl.DateTimeFormat`
 * (с днём недели), иначе из названий месяцев локали.
 */
const dayLabelFormatters = new Map<string, Intl.DateTimeFormat | null>()

function getDayLabelFormatter(code: string): Intl.DateTimeFormat | null {
  if (!dayLabelFormatters.has(code)) {
    let formatter: Intl.DateTimeFormat | null = null
    try {
      formatter = new Intl.DateTimeFormat(code, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      // Неизвестный тег — имя соберём из строк локали.
    }
    dayLabelFormatters.set(code, formatter)
  }
  return dayLabelFormatters.get(code) ?? null
}

export function formatDayLabel(date: Date, locale: { months: readonly string[]; code?: string }) {
  const formatter = locale.code ? getDayLabelFormatter(locale.code) : null
  if (formatter) return formatter.format(date)
  return `${date.getDate()} ${locale.months[date.getMonth()]} ${date.getFullYear()}`
}
