import type { Placement } from '@floating-ui/react'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

/** ARIA-роль слоя (см. useRole из @floating-ui/react) */
export type PopoverRole = 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'tooltip'

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'children'> {
  /** Whether the popover is open */
  open: boolean

  /**
   * Вызывается, когда слой просит закрыться (Escape, клик вне слоя и якоря).
   * Без него Popover не закрывается сам — состояние полностью снаружи.
   */
  onOpenChange?: (open: boolean) => void

  /** Закрытие по Escape и клику снаружи (default: true; работает при переданном onOpenChange) */
  dismissible?: boolean

  /** ARIA-роль слоя. По умолчанию роль не ставится */
  role?: PopoverRole

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
