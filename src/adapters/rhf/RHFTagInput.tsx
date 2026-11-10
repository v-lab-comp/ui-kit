import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { TagInput } from '@/components/inputs/TagInput'
import type { TagInputProps } from '@/components/inputs/TagInput'
import { createRHFAdapter } from './createRHFAdapter'

export type RHFTagInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TagInputProps, 'value' | 'defaultValue' | 'name'>

export const RHFTagInput = createRHFAdapter<TagInputProps>(
  TagInput,
  (field, fieldState) => ({
    value: Array.isArray(field.value) ? field.value : [],
    error: fieldState.error?.message,
  }),
  'RHFTagInput'
)
