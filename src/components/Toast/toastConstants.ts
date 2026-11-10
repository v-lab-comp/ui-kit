/** Константы стекинга и анимаций тостов (ToastProvider). */

export const STACK_PEEK = 12
export const STACK_SCALE_STEP = 0.05
export const STACK_OPACITY_STEP = 0.15
export const STACK_MAX_VISIBLE = 3

export const SWIPE_THRESHOLD = 100

export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const DURATION = '0.35s'

export const TRANSITION = `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`
export const SLOT_TRANSITION = `top ${DURATION} ${EASE}, bottom ${DURATION} ${EASE}, ${TRANSITION}`
