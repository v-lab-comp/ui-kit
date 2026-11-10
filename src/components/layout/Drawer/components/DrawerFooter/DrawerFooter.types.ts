import type { ReactNode } from 'react'

export type DrawerFooterProps = {
  /** Слот слева (чекбокс, ссылка, текст и т.д.) */
  startContent?: ReactNode
  /** Кнопки справа */
  children?: ReactNode
  /** Растянуть кнопки на всю ширину футера поровну */
  fullWidth?: boolean
  className?: string
}
