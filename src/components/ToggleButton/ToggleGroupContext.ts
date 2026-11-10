import { createContext, useContext } from 'react'
import type { ToggleButtonSize, ToggleButtonShape } from './ToggleButton.types'

export interface ToggleGroupContextValue {
  type: 'single' | 'multiple'
  pressedValues: Set<string>
  toggle: (value: string) => void
  size?: ToggleButtonSize
  shape?: ToggleButtonShape
  disabled?: boolean
  /** Элементы участвуют в roving tabindex (Composite из floating-ui). */
  rovingFocus: boolean
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

export function useToggleGroupContext() {
  return useContext(ToggleGroupContext)
}
