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
