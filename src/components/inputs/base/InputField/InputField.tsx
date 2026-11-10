import { forwardRef, useId } from 'react'
import clsx from 'clsx'
import { RiInformationFill } from '@remixicon/react'
import { contractPart } from '@/theme/contract'
import { inputFieldContract } from '@/theme/contracts/input-field'
import type { InputFieldProps } from './InputField.types'
import { resolveCompletedBorderColor } from './resolveCompletedBorderColor'

/**
 * Shared field wrapper: label, prefix/suffix, hint/error.
 * Renders `children` (e.g. BaseInput) inside the styled wrapper.
 */
export const InputField = forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      label,
      required,
      requiredMarker = '*',
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      filled,
      prefix,
      suffix,
      startBlock,
      endBlock,
      size = 'medium',
      disabled,
      id: idProp,
      className,
      wrapperClassName,
      wrapperStyle,
      children,
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const optionalText = typeof optional === 'string' ? optional : 'Optional'
    const showCompletedChrome = !!(completed && !error && !disabled)
    const resolvedCompletedBorder =
      showCompletedChrome && completedColor
        ? resolveCompletedBorderColor(completedColor)
        : undefined
    const mergedWrapperStyle =
      resolvedCompletedBorder !== undefined
        ? { ...wrapperStyle, ['--input-completed-border']: resolvedCompletedBorder }
        : wrapperStyle

    return (
      <div ref={ref} className={clsx(inputFieldContract.className, className)}>
        {label && (
          <div className={contractPart(inputFieldContract, 'label-row')}>
            <label
              htmlFor={id}
              className={contractPart(inputFieldContract, 'label')}
              data-disabled={disabled || undefined}
            >
              {label}
              {required && (
                <span className={contractPart(inputFieldContract, 'required')}>
                  {requiredMarker}
                </span>
              )}
              {optional && (
                <span className={contractPart(inputFieldContract, 'optional')}>
                  ({optionalText})
                </span>
              )}
            </label>
            {labelTooltip && (
              <span className={contractPart(inputFieldContract, 'label-tooltip')}>
                {labelTooltip}
              </span>
            )}
          </div>
        )}

        <div
          className={clsx(contractPart(inputFieldContract, 'wrapper'), wrapperClassName)}
          style={mergedWrapperStyle}
          data-size={size}
          data-error={error || undefined}
          data-disabled={disabled || undefined}
          data-filled={filled || undefined}
          data-completed={showCompletedChrome ? true : undefined}
          data-custom-completed-border={showCompletedChrome && completedColor ? true : undefined}
        >
          {startBlock && (
            <span className={contractPart(inputFieldContract, 'block-start')}>{startBlock}</span>
          )}
          {prefix && (
            <span className={contractPart(inputFieldContract, 'addon-start')}>{prefix}</span>
          )}
          {typeof children === 'function' ? children(id) : children}
          {suffix && (
            <span className={contractPart(inputFieldContract, 'addon-end')}>{suffix}</span>
          )}
          {endBlock && (
            <span className={contractPart(inputFieldContract, 'block-end')}>{endBlock}</span>
          )}
        </div>

        {(error || hint) && (
          <div
            className={contractPart(inputFieldContract, 'hint-row')}
            data-error={error || undefined}
          >
            <RiInformationFill
              size={16}
              className={contractPart(inputFieldContract, 'hint-icon')}
              aria-hidden
            />
            <span className={contractPart(inputFieldContract, 'hint-text')}>{error || hint}</span>
          </div>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
