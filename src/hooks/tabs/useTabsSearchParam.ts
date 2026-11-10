import { useCallback, useEffect, useState } from 'react'
import { readSearchParam, writeSearchParam } from './tabsSearchParams'

export interface UseTabsSearchParamOptions {
  /** Значение, если в URL нет параметра или оно не из `validValues` */
  defaultValue?: string
  /** `true` (по умолчанию) — `replaceState`, `false` — `pushState` (отдельные шаги «Назад») */
  replace?: boolean
  /**
   * Список допустимых `value` вкладок. Если задан — значение из URL вне списка игнорируется.
   */
  validValues?: readonly string[]
}

export interface UseTabsSearchParamResult {
  /** Текущее значение активной вкладки */
  value: string
  /** Установить вкладку и записать в URL */
  setTab: (next: string) => void
  /** Алиас для `<Tabs onChange={…}>` */
  onChange: (next: string) => void
  /** Снять значение из `location.search` (актуальный query, без ожидания рендера) */
  getTabFromUrl: () => string | null
}

function initialFromUrl(
  paramName: string,
  defaultValue: string,
  validValues?: readonly string[]
): string {
  if (typeof window === 'undefined') return defaultValue
  const raw = readSearchParam(paramName)
  if (raw && (!validValues?.length || validValues.includes(raw))) return raw
  return defaultValue
}

function pickValidFromUrl(paramName: string, validValues?: readonly string[]): string | null {
  const raw = readSearchParam(paramName)
  if (!raw) return null
  if (validValues?.length && !validValues.includes(raw)) return null
  return raw
}

/**
 * Синхронизация активной вкладки с query (`?tab=…`) без react-router.
 * **`Tabs`** остаётся чистым UI — передайте в него `value` и `onChange` (или `setTab`) из этого хука.
 *
 * - **`value`** — состояние для `<Tabs value={…}>`
 * - **`setTab` / `onChange`** — смена вкладки + запись в URL
 * - **`getTabFromUrl`** — прочитать текущее значение параметра из адреса (без React state)
 */
export function useTabsSearchParam(
  paramName: string,
  options: UseTabsSearchParamOptions = {}
): UseTabsSearchParamResult {
  const { defaultValue = '', replace = true, validValues } = options

  const [value, setValue] = useState(() => initialFromUrl(paramName, defaultValue, validValues))

  useEffect(() => {
    const onPop = () => {
      const next = initialFromUrl(paramName, defaultValue, validValues)
      setValue((prev) => (prev === next ? prev : next))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [paramName, defaultValue, validValues])

  const setTab = useCallback(
    (next: string) => {
      if (validValues?.length && !validValues.includes(next)) return
      setValue(next)
      writeSearchParam(paramName, next, replace)
    },
    [paramName, replace, validValues]
  )

  const getTabFromUrl = useCallback(
    () => pickValidFromUrl(paramName, validValues),
    [paramName, validValues]
  )

  return { value, setTab, onChange: setTab, getTabFromUrl }
}
