import clsx from 'clsx'
import { contractAttrs, contractPart } from '@/theme/contract'
import { contentDividerContract } from '@/theme/contracts/content-divider'
import type { ContentDividerProps } from './ContentDivider.types'

export type { ContentDividerProps, ContentDividerVariant } from './ContentDivider.types'

/**
 * Разделитель контента по Figma 414-4401: линия, текст с линиями, текст на фоне, слот для кнопки.
 */
export function ContentDivider({
  variant = 'line',
  text = 'OR',
  children,
  className,
  ...props
}: ContentDividerProps) {
  const rootProps = {
    className: clsx(contentDividerContract.className, className),
    ...contractAttrs(contentDividerContract, { variant }),
  }
  const lineClass = contractPart(contentDividerContract, 'line')

  if (variant === 'line') {
    return (
      <div {...rootProps} {...props}>
        <div className={lineClass} aria-hidden />
      </div>
    )
  }

  if (variant === 'lineSpacing') {
    return (
      <div {...rootProps} {...props}>
        <div className={lineClass} aria-hidden />
      </div>
    )
  }

  if (variant === 'textAndLine') {
    return (
      <div {...rootProps} {...props}>
        <div className={lineClass} aria-hidden />
        <span className={contractPart(contentDividerContract, 'text-and-line-label')}>{text}</span>
        <div className={lineClass} aria-hidden />
      </div>
    )
  }

  if (variant === 'text') {
    return (
      <div {...rootProps} {...props}>
        <span className={contractPart(contentDividerContract, 'text-label')}>{text}</span>
      </div>
    )
  }

  if (variant === 'solidText') {
    return (
      <div {...rootProps} {...props}>
        <span className={contractPart(contentDividerContract, 'text-label')}>{text}</span>
      </div>
    )
  }

  /* withSlot */
  return (
    <div {...rootProps} {...props}>
      <div className={lineClass} aria-hidden />
      {children}
      <div className={lineClass} aria-hidden />
    </div>
  )
}

ContentDivider.displayName = 'ContentDivider'
