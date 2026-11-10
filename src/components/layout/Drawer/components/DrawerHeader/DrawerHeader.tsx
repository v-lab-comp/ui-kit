import { forwardRef } from 'react'
import { RiCloseLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import {
  DialogHeader,
  type DialogHeaderClasses,
} from '@/components/overlays/Modal/dialog/DialogHeader'
import { contractAttrs, contractPart } from '@/theme/contract'
import { drawerHeaderContract } from '@/theme/contracts/drawer-header'
import type { DrawerHeaderProps } from './DrawerHeader.types'

const CLASSES: DialogHeaderClasses = {
  root: drawerHeaderContract.className,
  iconSlot: contractPart(drawerHeaderContract, 'icon-slot'),
  textColumn: contractPart(drawerHeaderContract, 'text-column'),
  title: contractPart(drawerHeaderContract, 'title'),
  subtitle: contractPart(drawerHeaderContract, 'subtitle'),
}

const CLOSE_ONLY_ATTRS = contractAttrs(drawerHeaderContract, { 'close-only': true })

function renderClose(onClose: () => void) {
  return (
    <Button
      variant="ghost"
      color="neutral"
      shape="square"
      size="small"
      aria-label="Закрыть"
      onClick={onClose}
    >
      <RiCloseLine size={18} aria-hidden />
    </Button>
  )
}

/** Шапка Drawer: заголовок даёт имя диалогу, подзаголовок — описание. */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader(props, ref) {
    return (
      <DialogHeader
        ref={ref}
        {...props}
        classes={CLASSES}
        closeOnlyAttrs={CLOSE_ONLY_ATTRS}
        titleLook={{ size: 'large', weight: 'medium' }}
        subtitleLook={{ size: 'small' }}
        renderClose={renderClose}
      />
    )
  }
)

DrawerHeader.displayName = 'DrawerHeader'
