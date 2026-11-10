import type { HTMLAttributes, ReactNode } from 'react'
import type { ToggleButtonSize, ToggleButtonShape } from './ToggleButton.types'

interface ToggleGroupBaseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Propagated to all items that don't specify their own size. */
  size?: ToggleButtonSize
  /** Propagated to all items that don't specify their own shape. */
  shape?: ToggleButtonShape
  /** Disables all items in the group. */
  disabled?: boolean
  /**
   * Enable roving tabindex: only one item has tabIndex=0, arrow keys move focus.
   * Matches Radix ToggleGroup behaviour. Default: true.
   */
  rovingFocus?: boolean
  /**
   * Wrap around when reaching the first/last item with arrow keys.
   * Only relevant when rovingFocus=true. Default: true.
   */
  loop?: boolean
  /** Determines which arrow keys are used for navigation. Default: 'horizontal'. */
  orientation?: 'horizontal' | 'vertical'
}

interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  type: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
}

interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps
