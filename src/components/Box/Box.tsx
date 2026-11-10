import { forwardRef } from 'react'
import type { BoxProps } from './Box.types'

export type { BoxProps } from './Box.types'

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
})

Box.displayName = 'Box'
