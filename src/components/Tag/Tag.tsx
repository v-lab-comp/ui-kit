import clsx from 'clsx'
import type { KeyboardEvent, MouseEvent } from 'react'
import { RiCloseLine } from '@remixicon/react'
import { customPaletteStyle } from '@/utils/customPalette'
import { contractAttrs, contractPart } from '@/theme/contract'
import { tagContract } from '@/theme/contracts/tag'
import type { TagProps } from './Tag.types'

export type { TagProps, TagVariant, TagColor, TagSize, TagShape } from './Tag.types'
export {
  TAG_VARIANT_OPTIONS,
  TAG_COLOR_OPTIONS,
  TAG_SIZE_OPTIONS,
  TAG_SHAPE_OPTIONS,
} from './Tag.types'

export function Tag({
  children,
  variant = 'stroke',
  size = 'medium',
  shape = 'rounded',
  color,
  customColor,
  sublabel,
  prefix,
  prefixRounded = true,
  suffix,
  onDismiss,
  dismissLabel = 'Remove',
  disabled,
  className,
  style,
  onClick,
  onKeyDown,
  ...props
}: TagProps) {
  const hasDismiss = Boolean(onDismiss)
  const hasPrefix = Boolean(prefix)
  const interactive = Boolean(onClick) && !disabled
  const customVars = customColor ? customPaletteStyle(customColor) : undefined
  const tagClassName = clsx(tagContract.className, className)
  const tagAttrs = contractAttrs(tagContract, {
    variant,
    size,
    shape,
    color: customVars ? undefined : color,
    'custom-color': Boolean(customVars),
    'with-dismiss': hasDismiss,
    'has-prefix': hasPrefix,
    interactive,
    disabled: Boolean(disabled),
  })

  const mergedStyle = { ...customVars, ...style }

  const prefixEl =
    prefix != null ? (
      <span
        className={contractPart(tagContract, 'prefix')}
        data-rounded={prefixRounded || undefined}
      >
        {prefix}
      </span>
    ) : null

  const textRow = (
    <span className={contractPart(tagContract, 'text-row')}>
      <span className={contractPart(tagContract, 'label')}>{children}</span>
      {sublabel != null && sublabel !== '' ? (
        <span className={contractPart(tagContract, 'sublabel')}>{sublabel}</span>
      ) : null}
      {suffix != null ? (
        <span className={contractPart(tagContract, 'suffix')}>{suffix}</span>
      ) : null}
    </span>
  )

  const dismissBtn = hasDismiss ? (
    <button
      type="button"
      className={contractPart(tagContract, 'dismiss')}
      aria-label={dismissLabel}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        onDismiss?.()
      }}
    >
      <RiCloseLine size={16} aria-hidden />
    </button>
  ) : null

  const handleMainKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || disabled || !onClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(e as unknown as MouseEvent<HTMLSpanElement>)
    }
  }

  const mainRegion = (
    <>
      {prefixEl}
      {textRow}
    </>
  )

  if (onClick && !hasDismiss) {
    return (
      <button
        type="button"
        className={tagClassName}
        {...tagAttrs}
        style={mergedStyle}
        disabled={disabled}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {mainRegion}
        {dismissBtn}
      </button>
    )
  }

  if (onClick && hasDismiss) {
    return (
      <span className={tagClassName} {...tagAttrs} style={mergedStyle} {...props}>
        <span className={contractPart(tagContract, 'cluster')}>
          <span
            role="button"
            tabIndex={disabled ? -1 : 0}
            className={contractPart(tagContract, 'main-hit')}
            onClick={disabled ? undefined : onClick}
            onKeyDown={handleMainKeyDown}
          >
            {mainRegion}
          </span>
          {dismissBtn}
        </span>
      </span>
    )
  }

  return (
    <span className={tagClassName} {...tagAttrs} style={mergedStyle} {...props}>
      {hasDismiss ? (
        <span className={contractPart(tagContract, 'cluster')}>
          <span className={contractPart(tagContract, 'main-static')}>{mainRegion}</span>
          {dismissBtn}
        </span>
      ) : (
        mainRegion
      )}
    </span>
  )
}

Tag.displayName = 'Tag'
