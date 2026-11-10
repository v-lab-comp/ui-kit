import { useCallback, useMemo } from 'react'
import { useControllableState } from '@/utils/useControllableState'
import type { SelectOption } from './SelectInput.types'

const NO_VALUES: string[] = []

/** Значение одиночного выбора */
export type SelectSingleValueConfig = {
  multiple: false
  value?: string
  defaultValue?: string
  onChange?: (value: string, option: SelectOption | null) => void
}

/** Значение `mode="multiple"` */
export type SelectMultipleValueConfig = {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[], options: SelectOption[]) => void
}

export type SelectValueConfig = SelectSingleValueConfig | SelectMultipleValueConfig

export type SelectValueState = {
  /** Выбранные значения: в одиночном режиме — ноль или одно */
  values: string[]
  /** Опции выбранных значений (значения, которых нет в списке, пропускаются) */
  selectedOptions: SelectOption[]
  /** Есть выбранное значение (даже если его нет среди опций) */
  hasValue: boolean
  isSelected: (value: string) => boolean
  /** Одиночный режим — выбрать опцию; `multiple` — переключить её */
  pick: (option: SelectOption) => void
  clear: () => void
}

/**
 * Значение селекта: контролируемое или внутреннее, одиночное или `multiple`.
 * `allOptions` — все опции без фильтра, по ним ищутся выбранные.
 */
export function useSelectValue(
  config: SelectValueConfig,
  allOptions: readonly SelectOption[]
): SelectValueState {
  const { multiple } = config
  const [single, setSingle] = useControllableState<string, [SelectOption | null]>({
    value: config.multiple ? undefined : config.value,
    defaultValue: config.multiple ? '' : (config.defaultValue ?? ''),
    onChange: config.multiple ? undefined : config.onChange,
  })
  const [several, setSeveral] = useControllableState<string[], [SelectOption[]]>({
    value: config.multiple ? config.value : undefined,
    defaultValue: config.multiple ? (config.defaultValue ?? NO_VALUES) : NO_VALUES,
    onChange: config.multiple ? config.onChange : undefined,
  })

  const values = useMemo(
    () => (multiple ? several : single ? [single] : NO_VALUES),
    [multiple, several, single]
  )

  const findOptions = useCallback(
    (list: readonly string[]) =>
      list
        .map((value) => allOptions.find((option) => option.value === value))
        .filter((option): option is SelectOption => option !== undefined),
    [allOptions]
  )

  const selectedOptions = useMemo(() => findOptions(values), [findOptions, values])

  const isSelected = useCallback((value: string) => values.includes(value), [values])

  const pick = useCallback(
    (option: SelectOption) => {
      if (!multiple) {
        // Как у нативного <select>: повторный выбор того же пункта не меняет значение
        if (option.value !== single) setSingle(option.value, option)
        return
      }
      const next = several.includes(option.value)
        ? several.filter((value) => value !== option.value)
        : [...several, option.value]
      setSeveral(next, findOptions(next))
    },
    [multiple, single, several, setSingle, setSeveral, findOptions]
  )

  const clear = useCallback(() => {
    if (multiple) setSeveral([], [])
    else setSingle('', null)
  }, [multiple, setSingle, setSeveral])

  return { values, selectedOptions, hasValue: values.length > 0, isSelected, pick, clear }
}
