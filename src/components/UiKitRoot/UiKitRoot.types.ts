import type { HTMLAttributes, ReactNode } from 'react'

export type UiKitRootProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}
