import type { HTMLAttributes, ReactNode } from 'react'

export type DrawerBodyProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode
  /** Убрать стандартный padding — для случаев когда нужен скролл "к краям" */
  noPadding?: boolean
}
