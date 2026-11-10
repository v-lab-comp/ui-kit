import type { HTMLAttributes, ReactNode } from 'react'
import type { ContractValue } from '@/theme/contract'
import type { segmentedControlContract } from '@/theme/contracts/segmented-control'

export type SegmentedControlSize = ContractValue<typeof segmentedControlContract, 'size'>

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled selected value. */
  value?: string
  /** Initial value for uncontrolled usage. */
  defaultValue?: string
  /** Called when the selected value changes. */
  onValueChange?: (value: string) => void
  size?: SegmentedControlSize
  /** Disables all items. */
  disabled?: boolean
  children: ReactNode
}

export interface SegmentedControlItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Required — identifies this item within the control. */
  value: string
  /** Icon or element rendered before the label. */
  leftNode?: ReactNode
  /** Icon or element rendered after the label. */
  rightNode?: ReactNode
  disabled?: boolean
  children?: ReactNode
}
