import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface SidebarCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Слот слева (иконка или аватар, 40×40) */
  leftSlot: ReactNode
  /** Контент по центру (название, подпись и т.д.) */
  children: ReactNode
  /** Слот справа (иконка или кнопка) */
  rightSlot?: ReactNode
  /** Свёрнутый вид — только leftSlot по центру */
  collapsed?: boolean
  /** Рамка карточки */
  bordered?: boolean
  /** Рендер как div вместо button (когда rightSlot содержит кнопку — избегаем вложенных button) */
  as?: 'button' | 'div'
}
