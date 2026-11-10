import { createContext, useContext } from 'react'

export type DrawerContextValue = {
  titleId: string
  onClose: () => void
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

const FALLBACK: DrawerContextValue = { titleId: '', onClose: () => {} }

export function useDrawerContext() {
  return useContext(DrawerContext) ?? FALLBACK
}
