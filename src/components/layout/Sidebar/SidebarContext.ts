import { createContext, useContext } from 'react'

export interface SidebarContextValue {
  collapsed: boolean
  toggle: () => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

/** Читает collapsed/toggle из ближайшего SidebarLayout. Если контекста нет — возвращает fallback. */
export function useSidebar(propCollapsed?: boolean): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (ctx) {
    return {
      collapsed: propCollapsed ?? ctx.collapsed,
      toggle: ctx.toggle,
    }
  }
  return { collapsed: propCollapsed ?? false, toggle: () => {} }
}
