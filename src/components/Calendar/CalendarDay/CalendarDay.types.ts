import type { ButtonHTMLAttributes } from 'react'

export interface CalendarDayProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'onMouseEnter' | 'disabled' | 'children' | 'type'
> {
  day: number
  isSelected?: boolean
  /** Primary color text — can be used for any visual accent reason */
  isActive?: boolean
  /** Marks the day as today for accessibility (aria-current="date") */
  isToday?: boolean
  /** Shows a small dot below the number (e.g. has events) */
  hasDot?: boolean
  isOutsideMonth?: boolean
  /** Day is inside the selected range (between start and end) */
  inRange?: boolean
  disabled?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  className?: string
}
