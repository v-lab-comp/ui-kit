import type { FieldValues } from 'react-hook-form'
import { TextInput } from '@/components/inputs/TextInput'
import type { TextInputProps } from '@/components/inputs/TextInput'
import { createRHFAdapter, type RHFAdapterProps } from './createRHFAdapter'

type Controlled = 'defaultValue'

export type RHFTextInputProps<T extends FieldValues> = RHFAdapterProps<
  TextInputProps,
  T,
  Controlled
>

export const RHFTextInput = createRHFAdapter<TextInputProps, Controlled>(
  TextInput,
  (field, fieldState) => ({
    ...field,
    value: field.value ?? '',
    error: fieldState.error?.message,
  }),
  'RHFTextInput'
)
