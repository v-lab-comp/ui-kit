import { modalContract } from '@/theme/contracts/modal'

/** Animation variants for Modal entrance animation */
export const MODAL_ANIMATIONS = modalContract.attributes.animation
export type ModalAnimation = (typeof MODAL_ANIMATIONS)[number]

/** Size presets for Modal width */
export const MODAL_SIZES = {
  small: { width: 400 },
  medium: { width: 520 },
  large: { width: 720 },
  fullWidth: { width: '100%', maxWidth: 'calc(100vw - 40px)' },
} as const
export type ModalSize = keyof typeof MODAL_SIZES
