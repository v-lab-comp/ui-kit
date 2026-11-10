import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { InputField } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { emailInputContract } from '@/theme/contracts/email-input'
import type { EmailInputProps } from './EmailInput.types'
import { RiMailLine } from '@remixicon/react'

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      prefix,
      suffix,
      id,
      size = 'medium',
      disabled,
      className,
      validationMessage = 'Enter a valid email address',
      onBlur,
      ...inputProps
    },
    ref
  ) => {
    const [internalError, setInternalError] = useState<string>()

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const val = e.target.value
      if (val && !isValidEmail(val)) {
        setInternalError(validationMessage)
      } else {
        setInternalError(undefined)
      }
      onBlur?.(e)
    }

    const displayError = error || internalError

    return (
      <InputField
        label={label}
        required={required}
        requiredMarker={requiredMarker}
        optional={optional}
        labelTooltip={labelTooltip}
        hint={hint}
        error={displayError}
        completed={completed}
        completedColor={completedColor}
        prefix={prefix ?? <RiMailLine size={16} />}
        suffix={suffix}
        size={size}
        disabled={disabled}
        className={clsx(emailInputContract.className, className)}
        id={id}
      >
        {(fieldId) => (
          <BaseInput
            ref={ref}
            id={fieldId}
            type="email"
            size={size}
            hasError={!!displayError}
            disabled={disabled}
            className={contractPart(emailInputContract, 'input-inner')}
            onBlur={handleBlur}
            {...inputProps}
            autoComplete={inputProps.autoComplete ?? 'email'}
          />
        )}
      </InputField>
    )
  }
)

EmailInput.displayName = 'EmailInput'
