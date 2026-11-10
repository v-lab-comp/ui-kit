/**
 * DateInput (маска даты через imask / react-imask).
 *   import { DateInput, formatMaskedToIso } from '@v-lab/ui-kit/date'
 *
 * Требует peer-зависимостей: imask, react-imask (см. README).
 *
 * Значение для форм/API: `valueFormat="iso"` на DateInput или `formatMaskedToIso()` для строки маски.
 */
export { DateInput } from './components/inputs/DateInput'
export type { DateInputProps, DateInputValueFormat } from './components/inputs/DateInput'
export {
  formatDateToMasked,
  formatIsoToMasked,
  formatMaskedToIso,
  parseMaskedDateString,
} from './components/inputs/DateInput'
