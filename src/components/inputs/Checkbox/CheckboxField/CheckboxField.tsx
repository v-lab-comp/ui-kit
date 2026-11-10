import { forwardRef, useId } from 'react'
import { BaseCheckbox as Checkbox } from '../../base/BaseCheckbox'
import { CheckboxLabelRow } from '../CheckboxLabelRow'
import { contractAttrs, contractPart } from '@/theme/contract'
import { checkboxFieldContract } from '@/theme/contracts/checkbox-field'
import type { CheckboxFieldProps } from '../Checkbox.types'

const joinIds = (...ids: (string | false | undefined)[]): string | undefined =>
  ids.filter(Boolean).join(' ') || undefined

/**
 * Чекбокс с подписью. Доступное имя — только строка label / sublabel / tag (`<label for>`);
 * description, link, hint и error лежат вне `<label>` и связаны с чекбоксом через `aria-describedby`.
 */
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
      id: idProp,
      'aria-describedby': ariaDescribedBy,
      ...checkboxProps
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const hasContent = !!(label || sublabel || tag || description || link || hint || error)
    const errorId = error ? `${id}-error` : undefined
    const descriptionId = !error && description ? `${id}-description` : undefined
    const linkId = !error && link ? `${id}-link` : undefined
    const hintId = !error && hint ? `${id}-hint` : undefined

    return (
      <div
        className={checkboxFieldContract.className}
        {...contractAttrs(checkboxFieldContract, { flip: Boolean(flip), error: Boolean(error) })}
      >
        <div
          className={contractPart(checkboxFieldContract, 'label')}
          data-flipped={flip || undefined}
        >
          <Checkbox
            ref={ref}
            id={id}
            size={size}
            aria-invalid={error ? true : undefined}
            aria-describedby={joinIds(ariaDescribedBy, errorId, descriptionId, linkId, hintId)}
            {...checkboxProps}
          />
          {hasContent && (
            <span className={contractPart(checkboxFieldContract, 'label-content')}>
              <CheckboxLabelRow label={label} sublabel={sublabel} tag={tag} htmlFor={id} />
              {error ? (
                <span id={errorId} className={contractPart(checkboxFieldContract, 'error')}>
                  {error}
                </span>
              ) : (
                <>
                  {description && (
                    <span
                      id={descriptionId}
                      className={contractPart(checkboxFieldContract, 'description')}
                    >
                      {description}
                    </span>
                  )}
                  {link && (
                    <span id={linkId} className={contractPart(checkboxFieldContract, 'link')}>
                      {link}
                    </span>
                  )}
                  {hint && (
                    <span id={hintId} className={contractPart(checkboxFieldContract, 'hint')}>
                      {hint}
                    </span>
                  )}
                </>
              )}
            </span>
          )}
        </div>
      </div>
    )
  }
)

CheckboxField.displayName = 'CheckboxField'
