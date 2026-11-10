import { forwardRef, useId } from 'react'
import { BaseCheckbox as Checkbox } from '../../base/BaseCheckbox'
import { CheckboxLabelRow } from '../CheckboxLabelRow'
import { contractPart } from '@/theme/contract'
import { checkboxCardContract } from '@/theme/contracts/checkbox-card'
import { checkboxLabelRowContract } from '@/theme/contracts/checkbox-label-row'
import type { CheckboxCardProps } from '../Checkbox.types'

/**
 * Карточка-чекбокс: кликабельна целиком (`<label>`), но доступное имя — только строка
 * label / sublabel / tag (`aria-labelledby`), а description — описание (`aria-describedby`).
 */
export const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(
  ({ prefix, label, sublabel, tag, description, ...checkboxProps }, ref) => {
    const baseId = useId()
    const hasLabelRow = !!(label || sublabel || tag)
    const labelId = hasLabelRow ? `${baseId}-label` : undefined
    const descriptionId = description ? `${baseId}-description` : undefined

    return (
      <label className={checkboxCardContract.className}>
        {prefix && <span className={contractPart(checkboxCardContract, 'prefix')}>{prefix}</span>}
        <span className={contractPart(checkboxCardContract, 'card-content')}>
          <CheckboxLabelRow id={labelId} label={label} sublabel={sublabel} tag={tag} />
          {description && (
            <span
              id={descriptionId}
              className={contractPart(checkboxLabelRowContract, 'description')}
            >
              {description}
            </span>
          )}
        </span>
        <Checkbox
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          {...checkboxProps}
        />
      </label>
    )
  }
)

CheckboxCard.displayName = 'CheckboxCard'
