import { createElement, useCallback, useState } from 'react'

/**
 * Поля формы для `formFields`: объект «имя → значение» или массив пар `[имя, значение]`.
 * Массив сохраняет порядок полей и повторяющиеся имена (объект их бы схлопнул).
 */
export type FormFieldValues = Record<string, string> | ReadonlyArray<readonly [string, string]>

const toEntries = (fields: FormFieldValues): ReadonlyArray<readonly [string, string]> =>
  Array.isArray(fields)
    ? (fields as ReadonlyArray<readonly [string, string]>)
    : Object.entries(fields as Record<string, string>)

/**
 * Генерирует скрытые `<input type="hidden">` для отправки данных в форму.
 * Простая альтернатива `useCompositeInput` — без split/join, без хука.
 *
 * @example
 * {formFields({ phone: '+998 901234567', countryCode: '+998' })}
 * {formFields([['tag', 'a'], ['tag', 'b']])}
 */
export function formFields(fields: FormFieldValues) {
  const entries = toEntries(fields)
  if (entries.length === 0) return null
  return createElement(
    'span',
    { hidden: true },
    ...entries.map(([key, val], index) =>
      createElement('input', {
        type: 'hidden',
        key: `${index}-${key}`,
        name: key,
        value: val,
        readOnly: true,
      })
    )
  )
}

/**
 * Доступное имя селекта внутри составного поля (страна у PhoneInput, протокол у SiteInput).
 * Новых текстов не добавляет: своя подпись `ariaLabel` → label поля (`labelId`) →
 * подпись выбранной опции (`fallbackLabel`, например «Узбекистан» или «HTTPS»).
 *
 * Ссылка `aria-labelledby` на сам триггер не годится: у combobox, на который ссылается
 * `aria-labelledby`, имя берётся из выбранного пункта открытого списка, а не из текста кнопки.
 */
export function compositeSelectName({
  ariaLabel,
  labelId,
  fallbackLabel,
}: {
  /** Подпись от приложения (проп поля) */
  ariaLabel?: string
  /** id элемента label поля, если label показан */
  labelId?: string
  /** Подпись выбранной опции — имя, когда нет ни `ariaLabel`, ни label */
  fallbackLabel: string
}): { 'aria-label': string } | { 'aria-labelledby': string } {
  if (ariaLabel) return { 'aria-label': ariaLabel }
  if (labelId) return { 'aria-labelledby': labelId }
  return { 'aria-label': fallbackLabel }
}

/**
 * Хук для составных инпутов, где несколько подзначений собираются
 * в одну строку для форм (протокол + путь, код страны + телефон и т.д.).
 *
 * Управляет controlled/uncontrolled состоянием и отдаёт `hiddenInputs` —
 * готовые `<input type="hidden">` для отправки в форму (через `formFields`).
 *
 * @example
 * const { parts, notifyParts, hiddenInputs } = useCompositeInput({
 *   value, defaultValue, onChange, name,
 *   split: (url) => splitProtocol(url, 'https://'),
 *   join: ([proto, path]) => proto + path,
 *   formNames: ['protocol'],
 * })
 *
 * return (
 *   <>
 *     {hiddenInputs}
 *     <InputField startBlock={...}>
 *       ...
 *     </InputField>
 *   </>
 * )
 */
export function useCompositeInput<T extends unknown[]>({
  value,
  defaultValue = '',
  onChange,
  name,
  split,
  join,
  formNames,
}: {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  /** Разобрать строку на части */
  split: (composed: string) => T
  /** Собрать части обратно в строку */
  join: (parts: T) => string
  /**
   * Имена полей формы для каждой части.
   * Индекс массива соответствует индексу части из `split`.
   * `undefined` — часть не попадает в форму отдельно.
   *
   * @example ['protocol']          // parts[0] -> name="protocol"
   * @example [undefined, 'tld']    // parts[1] -> name="tld"
   */
  formNames?: (string | undefined)[]
}) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const composedValue = isControlled ? value : internalValue
  const parts = split(composedValue)

  const notify = useCallback(
    (newComposed: string) => {
      if (!isControlled) setInternalValue(newComposed)
      onChange?.({
        target: { value: newComposed, name: name ?? '' },
      } as React.ChangeEvent<HTMLInputElement>)
    },
    [isControlled, onChange, name]
  )

  const notifyParts = useCallback((newParts: T) => notify(join(newParts)), [notify, join])

  // Скрытые инпуты для нативной формы: полное значение, затем части с именами из `formNames`
  const hiddenInputs = name
    ? formFields([
        [name, composedValue],
        ...(formNames ?? []).flatMap((formName, i) =>
          formName ? [[formName, String(parts[i] ?? '')] as const] : []
        ),
      ])
    : null

  return { composedValue, parts, notify, notifyParts, hiddenInputs }
}
