import { forwardRef } from 'react'
import clsx from 'clsx'
import type { CalendarDayProps } from './CalendarDay.types'
import { contractAttrs, contractPart } from '@/theme/contract'
import { calendarDayContract } from '@/theme/contracts/calendar-day'

/**
 * Кнопка дня. Внутри `CalendarGrid` получает `role="gridcell"` — тогда выбор отдаётся
 * через `aria-selected`; отдельно стоящая кнопка сообщает выбор через `aria-pressed`
 * (`aria-selected` у обычной кнопки недопустим).
 */
export const CalendarDay = forwardRef<HTMLButtonElement, CalendarDayProps>(
  (
    {
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
      role,
      ...buttonProps
    },
    ref
  ) => {
    const isGridCell = role === 'gridcell'
    return (
      <button
        ref={ref}
        type="button"
        role={role}
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
        aria-selected={isGridCell ? Boolean(isSelected) : undefined}
        aria-pressed={isGridCell ? undefined : Boolean(isSelected)}
        aria-current={isToday ? 'date' : undefined}
        {...buttonProps}
      >
        <span className={contractPart(calendarDayContract, 'label')}>{day}</span>
        {hasDot && <span className={contractPart(calendarDayContract, 'dot')} aria-hidden />}
      </button>
    )
  }
)

CalendarDay.displayName = 'CalendarDay'
