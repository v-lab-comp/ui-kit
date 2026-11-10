import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { InputField, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { emailInputContract } from '@/theme/contracts/email-input'
import type { EmailInputProps } from './EmailInput.types'
import { RiMailLine } from '@remixicon/react'

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const [field, rest] = splitInputFieldProps(props)
  const { validationMessage = 'Enter a valid email address', onBlur, ...inputProps } = rest
  const size = field.size ?? 'medium'
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

  const displayError = field.error || internalError

  return (
    <InputField
      {...field}
      error={displayError}
      prefix={field.prefix ?? <RiMailLine size={16} />}
      size={size}
      className={clsx(emailInputContract.className, field.className)}
    >
      {(_id, control) => (
        <BaseInput
          ref={ref}
          {...control}
          type="email"
          size={size}
          hasError={!!displayError}
          disabled={field.disabled}
          className={contractPart(emailInputContract, 'input-inner')}
          onBlur={handleBlur}
          {...inputProps}
          autoComplete={inputProps.autoComplete ?? 'email'}
        />
      )}
    </InputField>
  )
})

EmailInput.displayName = 'EmailInput'
