import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'

export type ShareLinkInputProps = Omit<InputFieldProps, 'children'> &
  Omit<BaseInputProps, 'prefix' | 'size' | 'id' | 'disabled' | 'className'> & {
    /**
     * Callback при успешном копировании кнопкой. Получает скопированное значение.
     * Нативный `onCopy` (Ctrl+C в поле) передаётся на `<input>` как обычно.
     */
    onCopied?: (value: string) => void
  }
