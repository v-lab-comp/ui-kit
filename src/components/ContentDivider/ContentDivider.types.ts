import type { ReactNode } from 'react'
import type { ContractValue } from '@/theme/contract'
import type { contentDividerContract } from '@/theme/contracts/content-divider'

export type ContentDividerVariant = ContractValue<typeof contentDividerContract, 'variant'>

export interface ContentDividerProps {
  /** Вариант отображения (по Figma 414-4401). */
  variant?: ContentDividerVariant
  /** Текст для вариантов textAndLine, text, solidText (например "OR", "AMOUNT & ACCOUNT"). */
  text?: string
  /** Слот по центру для variant="withSlot" (кнопка или группа кнопок между линиями). */
  children?: ReactNode
  className?: string
}
