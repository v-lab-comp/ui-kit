import { createContext, useContext } from 'react'

export interface TabsContextValue {
  value: string
  onChange: (value: string) => void
  values: string[]
  /** Unique ID prefix for generating tab/panel aria IDs */
  id: string
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs.Tab and Tabs.Panel must be used within Tabs')
  }
  return ctx
}
