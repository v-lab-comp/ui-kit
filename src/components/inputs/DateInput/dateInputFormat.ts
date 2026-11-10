import IMask from 'imask'

/** Текст плейсхолдера по умолчанию (показывается серым, когда поле пустое). */
export const DATE_INPUT_PLACEHOLDER = 'DD / MM / YYYY'

/** Маска IMask для отображения (как в DateInput). */
export const DATE_INPUT_MASK = {
  mask: 'DD{ / }MM{ / }YYYY',
  // lazy: пустое поле не показывает символы маски — виден серый placeholder,
  // как у обычных текстовых полей. Подсказка маски появляется по мере ввода.
  lazy: true,
  blocks: {
    DD: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2, placeholderChar: 'D' },
    MM: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2, placeholderChar: 'M' },
    YYYY: { mask: IMask.MaskedRange, from: 1900, to: 2100, maxLength: 4, placeholderChar: 'Y' },
  },
} as const

/** «DD / MM / YYYY» → Date (локальное время, без сдвига TZ). */
export function parseMaskedDateString(masked: string): Date | null {
  const clean = masked.replace(/\s/g, '')
  const [dd, mm, yyyy] = clean.split('/')
  if (
    !dd ||
    !mm ||
    !yyyy ||
    yyyy.length !== 4 ||
    dd.includes('D') ||
    mm.includes('M') ||
    yyyy.includes('Y')
  )
    return null
  return new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10))
}

/** Date → «DD / MM / YYYY». */
export function formatDateToMasked(date: Date | null): string {
  if (!date) return ''
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = String(date.getFullYear())
  return `${dd} / ${mm} / ${yyyy}`
}

/** «YYYY-MM-DD» → «DD / MM / YYYY» для маски. */
export function formatIsoToMasked(iso: string): string {
  if (!iso) return ''
  const [yyyy, mm, dd] = iso.split('-')
  if (!yyyy || !mm || !dd) return ''
  return `${dd} / ${mm} / ${yyyy}`
}

/**
 * «DD / MM / YYYY» → «YYYY-MM-DD» для API / RHF.
 * Возвращает `null`, если дата неполная или невалидна.
 */
export function formatMaskedToIso(masked: string): string | null {
  const d = parseMaskedDateString(masked)
  if (!d) return null
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
