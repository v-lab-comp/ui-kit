import { createContext, useContext } from 'react'
import type { ButtonSize } from '@/components/Button'

interface ButtonGroupContextValue {
  size: ButtonSize
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null)

export const useButtonGroup = () => useContext(ButtonGroupContext)
