import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputField } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { textInputContract } from '@/theme/contracts/text-input'
import type { TextInputProps } from './TextInput.types'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      startBlock,
      endBlock,
      id,
      size = 'medium',
      disabled,
      className,
      ...inputProps
    },
    ref
  ) => (
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
      prefix={prefix}
      suffix={suffix}
      startBlock={startBlock}
      endBlock={endBlock}
      size={size}
      disabled={disabled}
      className={clsx(textInputContract.className, className)}
      id={id}
    >
      {(fieldId) => (
        <BaseInput
          ref={ref}
          id={fieldId}
          size={size}
          hasError={!!error}
          disabled={disabled}
          className={contractPart(textInputContract, 'input-inner')}
          {...inputProps}
        />
      )}
    </InputField>
  )
)

TextInput.displayName = 'TextInput'
