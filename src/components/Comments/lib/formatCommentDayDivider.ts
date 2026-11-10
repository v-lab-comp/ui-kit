/**
 * Подпись разделителя календарного дня в ленте комментариев:
 * «Сегодня» / «Вчера» / локализованная дата (DD.MM.YYYY для `ru-RU`).
 *
 * Строки «сегодня / вчера» передаёт приложение — кит не подключает библиотеки перевода.
 */
function sameLocalCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatCalendarDate(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export type FormatCommentDayDividerLabels = {
  today: string
  yesterday: string
}

export type FormatCommentDayDividerOptions = FormatCommentDayDividerLabels & {
  /** Локаль для даты, когда это не сегодня и не вчера (по умолчанию `ru-RU`) */
  dateLocale?: string
}

/**
 * @param iso — дата комментария (ISO-строка или `Date`)
 * @returns подпись для чипа между группами комментариев за разные дни
 */
export function formatCommentDayDivider(
  iso: string | Date | null | undefined,
  options: FormatCommentDayDividerOptions
): string {
  const { today, yesterday, dateLocale = 'ru-RU' } = options
  if (iso == null || iso === '') return '—'
  const d = typeof iso === 'string' ? new Date(iso) : iso
  if (Number.isNaN(d.getTime())) return '—'

  const now = new Date()
  if (sameLocalCalendarDay(d, now)) return today

  const y = new Date(now)
  y.setDate(y.getDate() - 1)
  if (sameLocalCalendarDay(d, y)) return yesterday

  return formatCalendarDate(d, dateLocale)
}
