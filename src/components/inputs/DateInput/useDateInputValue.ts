import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import type { DateInputProps } from './DateInput.types'
import {
  formatDateToMasked,
  formatIsoToMasked,
  formatMaskedToIso,
  parseMaskedDateString,
} from './dateInputFormat'

type Params = Pick<DateInputProps, 'value' | 'onChange' | 'onAccept' | 'valueFormat'>

/**
 * Значение DateInput: отображаемая маска «DD / MM / YYYY» и перевод в формат колбэков.
 * При `valueFormat="iso"` + controlled маску нельзя выводить из `value` на каждом рендере:
 * пока пользователь вводит дату, в форме часто `''`, и маска бы сбрасывалась — поэтому
 * маска хранится локально и подстраивается под `value` только при его внешней смене.
 */
export function useDateInputValue({ value, onChange, onAccept, valueFormat = 'masked' }: Params) {
  const isIso = valueFormat === 'iso'
  const isControlled = value !== undefined
  // Локальная маска нужна всем, кроме controlled+masked (там маской управляет value).
  const ownsMask = !isControlled || isIso

  const [internalMasked, setInternalMasked] = useState(() => {
    if (value === undefined) return ''
    return isIso ? formatIsoToMasked(String(value)) : String(value)
  })

  // Синхронизация маски с ISO из формы при сбросе/загрузке (value меняется снаружи).
  useEffect(() => {
    if (value === undefined || !isIso) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- намеренная подстройка отображения под контролируемый value
    setInternalMasked(formatIsoToMasked(String(value ?? '')))
  }, [value, isIso])

  const displayMasked = ownsMask ? internalMasked : String(value ?? '')
  const toOutput = useCallback(
    (masked: string) => (isIso ? (formatMaskedToIso(masked) ?? '') : masked),
    [isIso]
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const masked = e.target.value
    if (ownsMask) setInternalMasked(masked)
    if (!onChange) return
    if (!isIso) {
      onChange(e)
      return
    }
    // Для iso подменяем value в событии: колбэк получает YYYY-MM-DD (контракт onChange).
    const iso = toOutput(masked)
    onChange({
      ...e,
      target: { ...e.target, value: iso },
      currentTarget: { ...e.currentTarget, value: iso },
    } as ChangeEvent<HTMLInputElement>)
  }

  /** Маска приняла значение (ввод завершён). */
  const acceptMasked = (masked: string) => {
    if (ownsMask) setInternalMasked(masked)
    onAccept?.(toOutput(masked))
  }

  /** Дата выбрана в календаре. */
  const acceptDate = (date: Date) => acceptMasked(formatDateToMasked(date))

  return {
    displayMasked,
    calendarDate: parseMaskedDateString(displayMasked),
    handleChange,
    acceptMasked,
    acceptDate,
  }
}
