import { createContext, useContext } from 'react'
import type { ToggleButtonSize, ToggleButtonShape } from './ToggleButton.types'

export interface ToggleGroupContextValue {
  type: 'single' | 'multiple'
  pressedValues: Set<string>
  toggle: (value: string) => void
  size?: ToggleButtonSize
  shape?: ToggleButtonShape
  disabled?: boolean
  /** Which item currently holds tabIndex=0 (roving focus rover). */
  rovingValue: string | undefined
  setRovingValue: (value: string) => void
  rovingFocus: boolean
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

export function useToggleGroupContext() {
  return useContext(ToggleGroupContext)
}
