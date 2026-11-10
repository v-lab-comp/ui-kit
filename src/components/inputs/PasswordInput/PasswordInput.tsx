import clsx from 'clsx'
import { forwardRef, useId, useState } from 'react'
import { RiLockLine, RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { InputField, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { passwordInputContract } from '@/theme/contracts/password-input'
import type { PasswordInputProps } from './PasswordInput.types'

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [field, inputProps] = splitInputFieldProps(props)
  const size = field.size ?? 'medium'
  const [showPassword, setShowPassword] = useState(false)
  const generatedId = useId()
  const inputId = field.id ?? generatedId

  const defaultPrefix = field.prefix ?? <RiLockLine size={20} />

  const defaultSuffix = field.suffix ?? (
    <button
      type="button"
      className={contractPart(passwordInputContract, 'eye-btn')}
      onClick={() => setShowPassword((v) => !v)}
      disabled={field.disabled}
      // Toggle button: имя постоянное, состояние — через aria-pressed
      aria-label="Show password"
      aria-pressed={showPassword}
      aria-controls={inputId}
    >
      {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
    </button>
  )

  return (
    <InputField
      {...field}
      id={inputId}
      prefix={defaultPrefix}
      suffix={defaultSuffix}
      size={size}
      className={clsx(passwordInputContract.className, field.className)}
    >
      {(_id, control) => (
        <BaseInput
          ref={ref}
          {...control}
          type={showPassword ? 'text' : 'password'}
          size={size}
          hasError={!!field.error}
          disabled={field.disabled}
          className={contractPart(passwordInputContract, 'input-inner')}
          {...inputProps}
          autoComplete={inputProps.autoComplete ?? 'current-password'}
        />
      )}
    </InputField>
  )
})

PasswordInput.displayName = 'PasswordInput'
