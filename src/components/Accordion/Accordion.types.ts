import type { HTMLAttributes, ReactNode } from 'react'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Заголовок панели */
  title: ReactNode
  /** Контент при раскрытии */
  children: ReactNode
  /** Раскрыт по умолчанию */
  defaultOpen?: boolean
  /** Управляемый режим: раскрыт ли (в паре с onOpenChange) */
  open?: boolean
  /** Колбэк при смене раскрытия */
  onOpenChange?: (open: boolean) => void
  /** Отключить панель */
  disabled?: boolean
  /** Иконка слева (например question-line). Если не задана и flipIcon=false — только заголовок и +/− справа */
  leftIcon?: ReactNode
  /** true = иконка +/− слева от заголовка; false = иконка +/− справа (при leftIcon — слева от заголовка ещё и leftIcon) */
  flipIcon?: boolean
}
