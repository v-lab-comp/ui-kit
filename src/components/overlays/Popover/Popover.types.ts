import type { Placement } from '@floating-ui/react'
import type { CSSProperties, ReactNode } from 'react'

export interface PopoverProps {
  /** Whether the popover is open */
  open: boolean

  /** Reference to the anchor element (trigger) */
  anchorRef: React.RefObject<Element | null>

  /** Placement of the popover relative to anchor */
  placement?: Placement

  /** Gap between anchor and popover (default: 6) */
  offset?: number

  /** Content to render inside the popover */
  children: ReactNode

  /** Optional CSS class name */
  className?: string

  /** Optional inline styles */
  style?: CSSProperties

  /** Optional z-index override */
  zIndex?: number
}
