import type { HTMLAttributes, ReactNode } from 'react'
import type { ButtonSize } from '@/components/Button'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Размер всех кнопок внутри группы. По умолчанию 'small'. */
  size?: ButtonSize
}
