import { createContext, useContext } from 'react'

export interface TabsContextValue {
  /** Активная вкладка */
  value: string
  onChange: (value: string) => void
  /** Значения зарегистрированных `Tabs.Tab` в порядке монтирования */
  values: string[]
  /** Регистрирует вкладку; возвращает функцию снятия регистрации */
  register: (value: string) => () => void
  /** Unique ID prefix for generating tab/panel aria IDs */
  id: string
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs.List, Tabs.Tab and Tabs.Panel must be used within Tabs')
  }
  return ctx
}
