import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Свёрнутый режим (только иконки). Если не передан — читается из SidebarLayout контекста */
  collapsed?: boolean
  children?: ReactNode
}

/** Рендерится как `<nav>` */
export interface SidebarContentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Подпись секции (например "MAIN", "OTHERS") */
  label?: ReactNode
  /** @deprecated Читается из контекста автоматически */
  collapsed?: boolean
  children?: ReactNode
}

export interface SidebarLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Начальное состояние (свёрнут/развёрнут). По умолчанию false */
  defaultCollapsed?: boolean
  children?: ReactNode
}

export interface SidebarMainProps extends HTMLAttributes<HTMLDivElement> {
  /** Если передан — перезаписывает значение из контекста */
  collapsed?: boolean
  children?: ReactNode
}

export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Если передан — перезаписывает значение из контекста */
  collapsed?: boolean
  /** Если передан — вызывается вместо toggle из контекста */
  onToggle?: () => void
}
