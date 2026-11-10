import type { Placement } from '@floating-ui/react'
import type { ReactElement, ReactNode } from 'react'

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode

  /** Trigger element (will be cloned with ref and interaction props) */
  children: ReactElement

  /** Placement of the tooltip */
  placement?: Placement

  /** Delay before showing tooltip (ms, default: 300) */
  delay?: number

  /** Optional z-index override */
  zIndex?: number
}
