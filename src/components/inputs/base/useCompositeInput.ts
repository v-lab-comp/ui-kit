import { createElement, useCallback, useState } from 'react'

/**
 * Генерирует скрытые `<input type="hidden">` для отправки данных в форму.
 * Простая альтернатива `useCompositeInput` — без split/join, без хука.
 *
 * @example
 * {formFields({ phone: '+998 901234567', countryCode: '+998' })}
 */
export function formFields(fields: Record<string, string>) {
  const entries = Object.entries(fields)
  if (entries.length === 0) return null
  return createElement(
    'span',
    { hidden: true },
    ...entries.map(([key, val]) =>
      createElement('input', {
        type: 'hidden',
        key,
        name: key,
        value: val,
        readOnly: true,
      })
    )
  )
}

/**
 * Хук для составных инпутов, где несколько подзначений собираются
 * в одну строку для форм (протокол + путь, код страны + телефон и т.д.).
 *
 * Управляет controlled/uncontrolled состоянием и отдаёт `hiddenInputs` —
 * готовые `<input type="hidden">` для отправки в форму.
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

  // Скрытые инпуты для нативной формы
  const hiddenInputs = name
    ? createElement(
        'span',
        { hidden: true },
        createElement('input', {
          type: 'hidden',
          name,
          value: composedValue,
          readOnly: true,
        }),
        ...(formNames ?? []).map((formName, i) =>
          formName
            ? createElement('input', {
                type: 'hidden',
                key: formName,
                name: formName,
                value: String(parts[i] ?? ''),
                readOnly: true,
              })
            : null
        )
      )
    : null

  return { composedValue, parts, notify, notifyParts, hiddenInputs }
}
