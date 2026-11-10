import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'

export type ShareLinkInputProps = Omit<InputFieldProps, 'children'> &
  Omit<BaseInputProps, 'prefix' | 'size' | 'id' | 'disabled' | 'className'> & {
    /** Callback при успешном копировании. Получает скопированное значение. */
    onCopy?: (value: string) => void
  }
