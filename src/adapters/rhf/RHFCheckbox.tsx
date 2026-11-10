import type { FieldValues } from 'react-hook-form'
import { CheckboxField } from '@/components/inputs/Checkbox'
import type { CheckboxFieldProps } from '@/components/inputs/Checkbox'
import { createRHFAdapter, type RHFAdapterProps } from './createRHFAdapter'

type Controlled = 'checked' | 'defaultChecked'

export type RHFCheckboxProps<T extends FieldValues> = RHFAdapterProps<
  CheckboxFieldProps,
  T,
  Controlled
>

export const RHFCheckbox = createRHFAdapter<CheckboxFieldProps, Controlled>(
  CheckboxField,
  // value из field не передаём: у чекбокса это атрибут отправляемого значения, а не состояние
  ({ name, ref, onChange, onBlur, disabled, value }, fieldState) => ({
    name,
    ref,
    onChange,
    onBlur,
    // disabled есть в field только при disabled на уровне формы — иначе не перетираем проп
    ...(disabled !== undefined && { disabled }),
    checked: !!value,
    error: fieldState.error?.message,
  }),
  'RHFCheckbox'
)
