import type { CSSProperties, ReactNode } from 'react'
import type { DrawerSide, DrawerSize } from './Drawer.constants'

export type DrawerProps = {
  /** Контент: обычно DrawerHeader + DrawerBody + DrawerFooter */
  children: ReactNode
  /**
   * Контролируемое состояние открытия. Если задано — компонент контролируемый,
   * пара с `onOpenChange`. Если не задан — компонент управляется через `ref` (DrawerHandle).
   */
  open?: boolean
  /** Вызывается при любом закрытии/открытии */
  onOpenChange?: (open: boolean) => void
  /** Сторона выезда. По умолчанию 'left'. */
  side?: DrawerSide
  /** На мобильных (≤640px) панель всегда выезжает снизу независимо от `side`. По умолчанию true. */
  mobileBottom?: boolean
  /** Размер: 'sm' | 'md' | 'lg' | 'xl'. По умолчанию 'md' (440px). */
  size?: DrawerSize
  /**
   * Кастомный размер. Для left/right — ширина, для top/bottom — высота.
   * Имеет приоритет над `size`.
   */
  width?: number | string
  /** Закрывать по клику на бэкдроп. По умолчанию true. */
  closeOnBackdropClick?: boolean
  /** Скрыть бэкдроп. По умолчанию false. */
  hideBackdrop?: boolean
  /** ARIA-метка для случаев без DrawerHeader с заголовком */
  ariaLabel?: string
  /** Длительность анимации, ms. По умолчанию 280. */
  animationDuration?: number
  className?: string
  panelClassName?: string
  zIndex?: number
  style?: CSSProperties
}

export type DrawerHandle = {
  open: () => void
  close: () => void
}
