import type { HTMLAttributes, ReactNode } from 'react'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Заголовок панели */
  title: ReactNode
  /** Контент при раскрытии */
  children: ReactNode
  /** Раскрыт по умолчанию */
  defaultOpen?: boolean
  /** Управляемый режим: раскрыт ли (`open !== undefined`; смену получайте через onOpenChange) */
  open?: boolean
  /** Колбэк при смене раскрытия */
  onOpenChange?: (open: boolean) => void
  /** Отключить панель */
  disabled?: boolean
  /** Иконка слева (например question-line). Если не задана и flipIcon=false — только заголовок и +/− справа */
  leftIcon?: ReactNode
  /** true = иконка +/− слева от заголовка; false = иконка +/− справа (при leftIcon — слева от заголовка ещё и leftIcon) */
  flipIcon?: boolean
  /**
   * Панель контента — `role="region"` с именем из заголовка. По умолчанию выключено:
   * включайте для немногих важных панелей, чтобы не плодить ориентиры на странице.
   */
  region?: boolean
}
