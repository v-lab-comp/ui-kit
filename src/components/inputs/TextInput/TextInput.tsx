import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputField, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { textInputContract } from '@/theme/contracts/text-input'
import type { TextInputProps } from './TextInput.types'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const [field, inputProps] = splitInputFieldProps(props)
  return (
    <InputField {...field} className={clsx(textInputContract.className, field.className)}>
      {(_id, control) => (
        <BaseInput
          ref={ref}
          {...control}
          size={field.size}
          hasError={!!field.error}
          disabled={field.disabled}
          className={contractPart(textInputContract, 'input-inner')}
          {...inputProps}
        />
      )}
    </InputField>
  )
})

TextInput.displayName = 'TextInput'
