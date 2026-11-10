import clsx from 'clsx'
import { Box } from '@/components/Box'
import { contractAttrs, contractPart } from '@/theme/contract'
import { drawerFooterContract } from '@/theme/contracts/drawer-footer'
import type { DrawerFooterProps } from './DrawerFooter.types'

export function DrawerFooter({
  startContent,
  fullWidth = false,
  className,
  children,
}: DrawerFooterProps) {
  const hasStart = startContent != null && startContent !== false

  return (
    <Box
      className={clsx(drawerFooterContract.className, className)}
      {...contractAttrs(drawerFooterContract, { 'with-start': hasStart })}
    >
      {hasStart && (
        <Box className={contractPart(drawerFooterContract, 'start')}>{startContent}</Box>
      )}
      <Box
        className={contractPart(drawerFooterContract, 'actions')}
        data-full-width={fullWidth || undefined}
      >
        {children}
      </Box>
    </Box>
  )
}

DrawerFooter.displayName = 'DrawerFooter'
