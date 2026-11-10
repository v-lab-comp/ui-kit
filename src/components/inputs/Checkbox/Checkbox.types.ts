import type { ReactNode } from 'react'
import type { BaseCheckboxProps } from '../base/BaseCheckbox'

// Re-export base types under Checkbox aliases for backward compatibility
export type {
  BaseCheckboxProps as CheckboxProps,
  BaseCheckboxSize as CheckboxSize,
} from '../base/BaseCheckbox'
export { BASE_CHECKBOX_SIZE_OPTIONS as CHECKBOX_SIZE_OPTIONS } from '../base/BaseCheckbox'

export interface CheckboxFieldProps extends BaseCheckboxProps {
  label?: ReactNode
  sublabel?: ReactNode
  tag?: ReactNode
  description?: ReactNode
  link?: ReactNode
  hint?: string
  error?: string
  flip?: boolean
}

export interface CheckboxCardProps extends Omit<BaseCheckboxProps, 'prefix'> {
  prefix?: ReactNode
  label?: ReactNode
  sublabel?: ReactNode
  tag?: ReactNode
  description?: ReactNode
}
