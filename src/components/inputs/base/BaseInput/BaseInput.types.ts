import type { InputHTMLAttributes } from 'react'
import { baseInputContract } from '@/theme/contracts/base-input'
import type { ContractValue } from '@/theme/contract'

export const BASE_INPUT_SIZE_OPTIONS = baseInputContract.attributes.size
export type BaseInputSize = ContractValue<typeof baseInputContract, 'size'>

export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** big 40px | medium 36px | small 32px */
  size?: BaseInputSize
  /** Красная рамка при ошибке валидации */
  hasError?: boolean
}
