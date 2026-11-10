import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { CheckboxField } from '@/components/inputs/Checkbox'
import type { CheckboxFieldProps } from '@/components/inputs/Checkbox'
import { createRHFAdapter } from './createRHFAdapter'

export type RHFCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxFieldProps, 'checked' | 'defaultChecked' | 'name'>

export const RHFCheckbox = createRHFAdapter<CheckboxFieldProps>(
  CheckboxField,
  (field, fieldState) => ({
    checked: !!field.value,
    error: fieldState.error?.message,
  }),
  'RHFCheckbox'
)
