import { contractPart } from '@/theme/contract'
import { calendarContract } from '@/theme/contracts/calendar'

interface CalendarOptionGridProps {
  options: Array<{ key: string | number; label: string | number; active: boolean }>
  onPick: (index: number) => void
}

/** Сетка выбора месяца или года; текущий вариант отмечен `aria-pressed`. */
export const CalendarOptionGrid = ({ options, onPick }: CalendarOptionGridProps) => (
  <div className={contractPart(calendarContract, 'option-grid')}>
    {options.map((option, i) => (
      <button
        key={option.key}
        type="button"
        className={contractPart(calendarContract, 'option')}
        data-active={option.active || undefined}
        aria-pressed={option.active}
        onClick={() => onPick(i)}
      >
        {option.label}
      </button>
    ))}
  </div>
)

CalendarOptionGrid.displayName = 'CalendarOptionGrid'
