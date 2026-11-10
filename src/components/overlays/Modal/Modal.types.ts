import type { CSSProperties, ReactNode } from 'react'
import type { ModalAnimation, ModalSize } from './Modal.constants'

export type ModalProps = {
  /** Content: typically ModalHeader + ModalBody (or custom content) */
  children: ReactNode
  width?: number | string
  maxHeight?: number | string
  closeOnBackdropClick?: boolean
  className?: string
  panelClassName?: string
  zIndex?: number
  style?: CSSProperties
  /**
   * If there's no ModalHeader with a title inside — provide screen reader text here.
   * Otherwise, uses aria-labelledby from the header title.
   */
  ariaLabel?: string
  /**
   * Controlled mode: modal open state. If provided, component is controlled.
   * Pair with `onOpenChange` to handle open/close events.
   */
  open?: boolean
  /**
   * Controlled mode: fires on open() and close() in both controlled and uncontrolled modes.
   * In uncontrolled mode, also updates internal state. In controlled mode, caller must update prop.
   */
  onOpenChange?: (open: boolean) => void
  /** Size preset: small (400px), medium (520px), large (720px), fullWidth. Default: medium */
  size?: ModalSize
  /** Animation variant: scale (default, scale up), slide (slide from bottom), fade (fade only), none */
  animation?: ModalAnimation
  /** Animation duration in milliseconds. Default: 280 */
  animationDuration?: number
}

export type ModalHandle = {
  open: () => void
  close: () => void
}
