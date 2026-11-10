import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { AvatarColor, AvatarSize } from '@/components/Avatar/Avatar.types'
import type { ContractValue } from '@/theme/contract'
import type { avatarGroupContract } from '@/theme/contracts/avatar-group'

export type AvatarGroupMode = ContractValue<typeof avatarGroupContract, 'mode'>

/** По Figma (node 2906-14962): default — без рамки, stroke — с рамкой */
export type AvatarGroupCompactStyle = ContractValue<typeof avatarGroupContract, 'compact-style'>

/** Три фиксированных размера для compact-режима (node 2906-14962) */
export type AvatarGroupCompactSize = 'small' | 'medium' | 'big'

export interface AvatarGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'style'
> {
  /** Наши Avatar-компоненты */
  children: ReactNode
  /** Режим отображения: default — обычный, compact — пилюля с текстом «+N» */
  mode?: AvatarGroupMode
  /** Стиль compact-пилюли: default — без рамки, stroke — с рамкой (только для mode="compact") */
  compactStyle?: AvatarGroupCompactStyle
  /**
   * Размер для compact-режима: small (24px) | medium (32px) | big (40px).
   * Если не указан — используется prop size, автоматически зажатый до big.
   */
  compactSize?: AvatarGroupCompactSize
  /** Размер аватаров (для mode="default"; в compact используется compactSize) */
  size?: AvatarSize
  /** Сколько аватаров показывать до счетчика +N */
  max?: number
  /** Величина перекрытия соседних аватаров в px (только для mode="default") */
  overlap?: number
  /** Цвет бейджа переполнения +N (только для mode="default") */
  overflowColor?: AvatarColor
  style?: CSSProperties
  className?: string
}
