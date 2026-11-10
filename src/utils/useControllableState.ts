import { useCallback, useState } from 'react'

export type UseControllableStateParams<T, A extends unknown[]> = {
  /** Значение снаружи. `undefined` — неконтролируемый режим (значение хранится внутри). */
  value: T | undefined
  /** Начальное значение неконтролируемого режима */
  defaultValue: T | (() => T)
  /** Вызывается при каждом `setValue`, с дополнительными аргументами сеттера */
  onChange?: (next: T, ...args: A) => void
}

/**
 * Контролируемое / неконтролируемое состояние одним хуком.
 *
 * Возвращает текущее значение и сеттер. Сеттер обновляет внутреннее состояние
 * только в неконтролируемом режиме и всегда вызывает `onChange` — вместе с
 * дополнительными аргументами (например выбранной опцией).
 * Режим определяется на каждом рендере: `value !== undefined` — контролируемый.
 *
 * @example
 * const [value, setValue] = useControllableState<string, [SelectOption | null]>({
 *   value: props.value,
 *   defaultValue: props.defaultValue ?? '',
 *   onChange: props.onChange,
 * })
 * setValue('uz', option)
 */
export function useControllableState<T, A extends unknown[] = []>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T, A>): [T, (next: T, ...args: A) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internalValue

  const setValue = useCallback(
    (next: T, ...args: A) => {
      // Функциональная форма: значение может само быть функцией
      if (!isControlled) setInternalValue(() => next)
      onChange?.(next, ...args)
    },
    [isControlled, onChange]
  )

  return [current, setValue]
}
