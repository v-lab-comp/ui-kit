import { DialogContext, useDialogContext } from '@/components/overlays/Modal/dialog/DialogContext'
import type { DialogContextValue } from '@/components/overlays/Modal/dialog/DialogContext'

export type DrawerContextValue = DialogContextValue

/** Контекст Drawer — общий с Modal (`DialogContext`). */
export const DrawerContext = DialogContext

const FALLBACK: DrawerContextValue = {
  titleId: '',
  descriptionId: '',
  onClose: () => {},
  registerPart: () => () => {},
}

export function useDrawerContext() {
  return useDialogContext() ?? FALLBACK
}
