import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { RiLockLine, RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { InputField } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { passwordInputContract } from '@/theme/contracts/password-input'
import type { PasswordInputProps } from './PasswordInput.types'

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
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
      ...inputProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const defaultPrefix = prefix ?? <RiLockLine size={20} />

    const defaultSuffix = suffix ?? (
      <button
        type="button"
        className={contractPart(passwordInputContract, 'eye-btn')}
        onClick={() => setShowPassword((v) => !v)}
        disabled={disabled}
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
      </button>
    )

    return (
      <InputField
        label={label}
        required={required}
        requiredMarker={requiredMarker}
        optional={optional}
        labelTooltip={labelTooltip}
        hint={hint}
        error={error}
        completed={completed}
        completedColor={completedColor}
        prefix={defaultPrefix}
        suffix={defaultSuffix}
        size={size}
        disabled={disabled}
        className={clsx(passwordInputContract.className, className)}
        id={id}
      >
        {(fieldId) => (
          <BaseInput
            ref={ref}
            id={fieldId}
            type={showPassword ? 'text' : 'password'}
            size={size}
            hasError={!!error}
            disabled={disabled}
            className={contractPart(passwordInputContract, 'input-inner')}
            {...inputProps}
            autoComplete={inputProps.autoComplete ?? 'current-password'}
          />
        )}
      </InputField>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
