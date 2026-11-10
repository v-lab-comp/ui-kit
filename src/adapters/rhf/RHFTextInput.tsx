import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { TextInput } from '@/components/inputs/TextInput'
import type { TextInputProps } from '@/components/inputs/TextInput'
import { createRHFAdapter } from './createRHFAdapter'

export type RHFTextInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextInputProps, 'value' | 'defaultValue' | 'name'>

export const RHFTextInput = createRHFAdapter<TextInputProps>(
  TextInput,
  (field, fieldState) => ({
    value: field.value ?? '',
    error: fieldState.error?.message,
  }),
  'RHFTextInput'
)
