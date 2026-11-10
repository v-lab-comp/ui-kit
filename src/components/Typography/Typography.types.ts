import type { ElementType, HTMLAttributes } from 'react'
import { typographyContract } from '@/theme/contracts/typography'

export type TitleSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export const TITLE_SIZES = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const satisfies readonly TitleSize[]

export type LabelSize = 'x-large' | 'large' | 'medium' | 'small' | 'x-small'
export const LABEL_SIZES = [
  'x-large',
  'large',
  'medium',
  'small',
  'x-small',
] as const satisfies readonly LabelSize[]

/** Paragraph — Google Sans 400: X Large, Large, Medium, Small, X Small */
export type ParagraphSize = 'x-large' | 'large' | 'medium' | 'small' | 'x-small'
export const PARAGRAPH_SIZES = [
  'x-large',
  'large',
  'medium',
  'small',
  'x-small',
] as const satisfies readonly ParagraphSize[]

/** Subheading — Google Sans 500, uppercase */
export type SubheadingSize = 'medium' | 'small' | 'x-small' | '2x-small'
export const SUBHEADING_SIZES = [
  'medium',
  'small',
  'x-small',
  '2x-small',
] as const satisfies readonly SubheadingSize[]

/** Docs — для документации: Label (500) и Paragraph (400), оба 18px / 32px / −1.5% */
export type DocsSize = 'label' | 'paragraph'
export const DOCS_SIZES = ['label', 'paragraph'] as const satisfies readonly DocsSize[]

// Толщины — из контракта скинов (src/theme/contracts/typography.ts).
export const TYPOGRAPHY_WEIGHTS = typographyContract.attributes.weight
export type TypographyWeight = (typeof TYPOGRAPHY_WEIGHTS)[number]

/** Маппинг variant → size */
export type VariantMap = {
  title: TitleSize
  label: LabelSize
  paragraph: ParagraphSize
  subheading: SubheadingSize
  docs: DocsSize
}

/** Дефолтная толщина по варианту (если не передан проп weight). У docs вес зашит в size (label=500, paragraph=400). */
export const DEFAULT_WEIGHT_BY_VARIANT: Record<keyof VariantMap, TypographyWeight> = {
  title: 'medium',
  label: 'medium',
  paragraph: 'regular',
  subheading: 'medium',
  docs: 'medium',
}

type BaseProps = {
  weight?: TypographyWeight
  component?: ElementType
} & HTMLAttributes<HTMLElement>

/**
 * Generic по варианту: при variant="title" автокомплит по size даёт только h1…h6,
 * при variant="label" — x-large…x-small, при variant="paragraph" — то же по именам.
 *
 * ⚠️ Без явного дженерика (`TypographyProps` без `<V>`) `size` принимает объединение
 * всех возможных размеров — сужение по варианту теряется.
 * Для точного автокомплита используй `TypographyProps<'title'>` и т.п.
 */
export type TypographyProps<V extends keyof VariantMap = keyof VariantMap> = {
  variant?: V
  size?: VariantMap[V]
} & BaseProps

export type TypographyVariant = keyof VariantMap
