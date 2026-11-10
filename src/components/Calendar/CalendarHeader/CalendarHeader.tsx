import clsx from 'clsx'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import { defaultLocale } from '../calendarLocales'
import type { CalendarHeaderProps } from './CalendarHeader.types'
import { contractAttrs, contractPart } from '@/theme/contract'
import { calendarHeaderContract } from '@/theme/contracts/calendar-header'

export const CalendarHeader = ({
  month,
  year,
  locale = defaultLocale,
  title,
  onLabelClick,
  onPrev,
  onNext,
  className,
}: CalendarHeaderProps) => {
  const label = title ?? `${locale.months[month]} ${year}`

  return (
    <div
      className={clsx(calendarHeaderContract.className, className)}
      {...contractAttrs(calendarHeaderContract, {})}
    >
      <button
        type="button"
        className={contractPart(calendarHeaderContract, 'nav-btn')}
        onClick={onPrev}
        aria-label="Previous"
      >
        <RiArrowLeftSLine size={20} aria-hidden />
      </button>
      {onLabelClick ? (
        <button
          type="button"
          className={contractPart(calendarHeaderContract, 'label')}
          data-clickable=""
          aria-live="polite"
          onClick={onLabelClick}
        >
          {label}
        </button>
      ) : (
        <span className={contractPart(calendarHeaderContract, 'label')} aria-live="polite">
          {label}
        </span>
      )}
      <button
        type="button"
        className={contractPart(calendarHeaderContract, 'nav-btn')}
        onClick={onNext}
        aria-label="Next"
      >
        <RiArrowRightSLine size={20} aria-hidden />
      </button>
    </div>
  )
}

CalendarHeader.displayName = 'CalendarHeader'
