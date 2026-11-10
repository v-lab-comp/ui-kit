import type { ComponentProps, ReactNode } from 'react'

export interface LayoutRootProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactNode
  className?: string
}
