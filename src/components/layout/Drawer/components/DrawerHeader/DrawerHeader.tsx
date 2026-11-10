import { RiCloseLine } from '@remixicon/react'
import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import { useDrawerContext } from '../../DrawerContext'
import { contractAttrs, contractPart } from '@/theme/contract'
import { drawerHeaderContract } from '@/theme/contracts/drawer-header'
import type { DrawerHeaderProps } from './DrawerHeader.types'

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      color="neutral"
      shape="square"
      size="small"
      aria-label="Закрыть"
      onClick={onClick}
    >
      <RiCloseLine size={18} aria-hidden />
    </Button>
  )
}

export function DrawerHeader(props: DrawerHeaderProps) {
  const { titleId, onClose } = useDrawerContext()
  const hideClose = props.hideCloseButton ?? false

  if ('closeOnly' in props && props.closeOnly) {
    return (
      <Box
        className={drawerHeaderContract.className}
        {...contractAttrs(drawerHeaderContract, { 'close-only': true })}
      >
        {!hideClose && <CloseButton onClick={onClose} />}
      </Box>
    )
  }

  const { title, subtitle, icon } = props
  const hasSubtitle = subtitle != null && subtitle !== ''

  return (
    <Box className={drawerHeaderContract.className}>
      {icon && <Box className={contractPart(drawerHeaderContract, 'icon-slot')}>{icon}</Box>}
      <Box className={contractPart(drawerHeaderContract, 'text-column')}>
        <Typography
          id={titleId}
          variant="label"
          size="large"
          weight="medium"
          component="h2"
          className={contractPart(drawerHeaderContract, 'title')}
        >
          {title}
        </Typography>
        {hasSubtitle && (
          <Typography
            variant="paragraph"
            size="small"
            component="p"
            className={contractPart(drawerHeaderContract, 'subtitle')}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {!hideClose && <CloseButton onClick={onClose} />}
    </Box>
  )
}

DrawerHeader.displayName = 'DrawerHeader'
