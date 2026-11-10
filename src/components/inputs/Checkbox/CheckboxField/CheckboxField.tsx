import { forwardRef } from 'react'
import { BaseCheckbox as Checkbox } from '../../base/BaseCheckbox'
import { CheckboxLabelRow } from '../CheckboxLabelRow'
import { contractAttrs, contractPart } from '@/theme/contract'
import { checkboxFieldContract } from '@/theme/contracts/checkbox-field'
import type { CheckboxFieldProps } from '../Checkbox.types'

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      label,
      sublabel,
      tag,
      description,
      link,
      hint,
      error,
      size = 'medium',
      flip,
      ...checkboxProps
    },
    ref
  ) => {
    const hasContent = !!(label || sublabel || tag || description || link || hint || error)

    return (
      <div
        className={checkboxFieldContract.className}
        {...contractAttrs(checkboxFieldContract, { flip: Boolean(flip) })}
      >
        <label
          className={contractPart(checkboxFieldContract, 'label')}
          data-flipped={flip || undefined}
        >
          <Checkbox ref={ref} size={size} {...checkboxProps} />
          {hasContent && (
            <span className={contractPart(checkboxFieldContract, 'label-content')}>
              <CheckboxLabelRow label={label} sublabel={sublabel} tag={tag} />
              {error ? (
                <span className={contractPart(checkboxFieldContract, 'error')}>{error}</span>
              ) : (
                <>
                  {description && (
                    <span className={contractPart(checkboxFieldContract, 'description')}>
                      {description}
                    </span>
                  )}
                  {link && (
                    <span
                      className={contractPart(checkboxFieldContract, 'link')}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link}
                    </span>
                  )}
                  {hint && (
                    <span className={contractPart(checkboxFieldContract, 'hint')}>{hint}</span>
                  )}
                </>
              )}
            </span>
          )}
        </label>
      </div>
    )
  }
)

CheckboxField.displayName = 'CheckboxField'
