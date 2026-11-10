import type { ReactNode } from 'react'
import type { SidebarCardProps } from '../Card'

export interface SidebarHeaderCardOption {
  value: string
  label: string
  subtitle?: string
  icon?: ReactNode
}

export interface SidebarHeaderCardProps extends Omit<
  SidebarCardProps,
  'leftSlot' | 'children' | 'title' | 'onSelect'
> {
  /** Иконка/лого слева (40×40, круглый) */
  icon: ReactNode
  /** Заголовок (название бренда/организации) */
  title: ReactNode
  /** Подзаголовок (описание) */
  subtitle?: ReactNode
  /** Опции списка по клику (dropdown). При наличии рендерится обёртка с выпадающим списком */
  options?: SidebarHeaderCardOption[]
  selectedValue?: string
  onSelect?: (value: string) => void
}
