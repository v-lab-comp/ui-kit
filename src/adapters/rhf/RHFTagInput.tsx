import type { FieldValues } from 'react-hook-form'
import { TagInput } from '@/components/inputs/TagInput'
import type { TagInputProps } from '@/components/inputs/TagInput'
import { createRHFAdapter, type RHFAdapterProps } from './createRHFAdapter'

type Controlled = 'defaultValue'

export type RHFTagInputProps<T extends FieldValues> = RHFAdapterProps<TagInputProps, T, Controlled>

export const RHFTagInput = createRHFAdapter<TagInputProps, Controlled>(
  TagInput,
  (field, fieldState) => ({
    ...field,
    value: Array.isArray(field.value) ? field.value : [],
    error: fieldState.error?.message,
  }),
  'RHFTagInput'
)
