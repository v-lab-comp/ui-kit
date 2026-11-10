import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'

export type EmailInputProps = Omit<InputFieldProps, 'children'> &
  Omit<BaseInputProps, 'prefix' | 'size' | 'id' | 'disabled' | 'className'> & {
    /** Error message shown when email format is invalid (on blur). Default: 'Enter a valid email address' */
    validationMessage?: string
  }
