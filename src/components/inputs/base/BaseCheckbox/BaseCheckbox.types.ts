import type { InputHTMLAttributes } from 'react'
import { baseCheckboxContract } from '@/theme/contracts/base-checkbox'
import type { ContractValue } from '@/theme/contract'

export const BASE_CHECKBOX_SIZE_OPTIONS = baseCheckboxContract.attributes.size
export type BaseCheckboxSize = ContractValue<typeof baseCheckboxContract, 'size'>

export interface BaseCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  indeterminate?: boolean
  size?: BaseCheckboxSize
}
