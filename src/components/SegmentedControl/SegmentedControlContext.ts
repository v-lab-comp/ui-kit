import { createContext, useContext } from 'react'
import type { SegmentedControlSize } from './SegmentedControl.types'

export interface SegmentedControlContextValue {
  selectedValue: string | undefined
  select: (value: string) => void
  size: SegmentedControlSize
  disabled?: boolean
  /** Notifies the root that an item mounted/updated so it can reposition the thumb. */
  notifyMount: () => void
}

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null)

export function useSegmentedControlContext() {
  const ctx = useContext(SegmentedControlContext)
  if (!ctx) throw new Error('SegmentedControlItem must be used inside SegmentedControl')
  return ctx
}
