import { forwardRef } from 'react'
import { BaseCheckbox as Checkbox } from '../../base/BaseCheckbox'
import { CheckboxLabelRow } from '../CheckboxLabelRow'
import { contractPart } from '@/theme/contract'
import { checkboxCardContract } from '@/theme/contracts/checkbox-card'
import { checkboxLabelRowContract } from '@/theme/contracts/checkbox-label-row'
import type { CheckboxCardProps } from '../Checkbox.types'

export const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(
  ({ prefix, label, sublabel, tag, description, ...checkboxProps }, ref) => (
    <label className={checkboxCardContract.className}>
      {prefix && <span className={contractPart(checkboxCardContract, 'prefix')}>{prefix}</span>}
      <span className={contractPart(checkboxCardContract, 'card-content')}>
        <CheckboxLabelRow label={label} sublabel={sublabel} tag={tag} />
        {description && (
          <span className={contractPart(checkboxLabelRowContract, 'description')}>
            {description}
          </span>
        )}
      </span>
      <Checkbox ref={ref} {...checkboxProps} />
    </label>
  )
)

CheckboxCard.displayName = 'CheckboxCard'
