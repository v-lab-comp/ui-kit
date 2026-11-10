import clsx from 'clsx'
import type { CalendarDayProps } from './CalendarDay.types'
import { contractAttrs, contractPart } from '@/theme/contract'
import { calendarDayContract } from '@/theme/contracts/calendar-day'

export const CalendarDay = ({
  day,
  isSelected,
  isActive,
  isToday,
  hasDot,
  isOutsideMonth,
  inRange,
  disabled,
  onClick,
  onMouseEnter,
  className,
}: CalendarDayProps) => (
  <button
    type="button"
    className={clsx(calendarDayContract.className, className)}
    {...contractAttrs(calendarDayContract, {
      selected: Boolean(isSelected),
      today: Boolean(isToday),
      active: Boolean(isActive),
      'in-range': Boolean(inRange),
      'outside-month': Boolean(isOutsideMonth),
      disabled: Boolean(disabled),
    })}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    disabled={disabled || isOutsideMonth}
    aria-selected={isSelected}
    aria-current={isToday ? 'date' : undefined}
  >
    <span className={contractPart(calendarDayContract, 'label')}>{day}</span>
    {hasDot && <span className={contractPart(calendarDayContract, 'dot')} aria-hidden />}
  </button>
)

CalendarDay.displayName = 'CalendarDay'
