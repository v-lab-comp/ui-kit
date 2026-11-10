import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { typographyContract } from '@/theme/contracts/typography'
import type { TypographyProps, VariantMap } from './Typography.types'
import { DEFAULT_WEIGHT_BY_VARIANT } from './Typography.types'

export type {
  TypographyProps,
  TypographyVariant,
  TitleSize,
  LabelSize,
  ParagraphSize,
  SubheadingSize,
  DocsSize,
  TypographyWeight,
  VariantMap,
} from './Typography.types'
export { DEFAULT_WEIGHT_BY_VARIANT } from './Typography.types'

const DEFAULT_TAG = 'span'

export function Typography<V extends keyof VariantMap = keyof VariantMap>({
  variant,
  size,
  weight,
  component,
  className,
  children,
  ...props
}: TypographyProps<V>) {
  const resolvedVariant = variant ?? 'title'
  const resolvedSize =
    size ?? (resolvedVariant === 'title' ? 'h1' : resolvedVariant === 'docs' ? 'label' : 'medium')
  const resolvedWeight = weight ?? DEFAULT_WEIGHT_BY_VARIANT[resolvedVariant]
  const Tag = component ?? DEFAULT_TAG
  // У docs вес зашит в size — data-weight не ставим.
  const useWeightClass = resolvedVariant !== 'docs'

  return (
    <Tag
      className={clsx(typographyContract.className, className)}
      {...contractAttrs(typographyContract, {
        variant: resolvedVariant,
        size: resolvedSize,
        weight: useWeightClass ? resolvedWeight : undefined,
      })}
      {...props}
    >
      {children}
    </Tag>
  )
}

Typography.displayName = 'Typography'
