import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { drawerBodyContract } from '@/theme/contracts/drawer-body'
import type { DrawerBodyProps } from './DrawerBody.types'

export function DrawerBody({ className, children, noPadding, ...rest }: DrawerBodyProps) {
  return (
    <div
      className={clsx(drawerBodyContract.className, className)}
      {...contractAttrs(drawerBodyContract, { 'no-padding': noPadding })}
      {...rest}
    >
      {children}
    </div>
  )
}

DrawerBody.displayName = 'DrawerBody'
