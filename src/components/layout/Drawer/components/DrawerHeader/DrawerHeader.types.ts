import type {
  DialogHeaderCloseOnlyProps,
  DialogHeaderDefaultProps,
  DialogHeaderProps,
} from '@/components/overlays/Modal/dialog/DialogHeader'

/** Обычная шапка: заголовок + опциональный подзаголовок и иконка слева */
export type DrawerHeaderDefaultProps = DialogHeaderDefaultProps

/** Только кнопка закрытия — заголовок ставится отдельно (например, в DrawerBody) */
export type DrawerHeaderCloseOnlyProps = DialogHeaderCloseOnlyProps

export type DrawerHeaderProps = DialogHeaderProps
