import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import type { Ref } from 'react'
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

/**
 * Тег. Корень — `button`, если есть только `onClick`; иначе `span`.
 * С `onDismiss` основная часть и крестик — отдельные элементы (`cluster`):
 * основная часть — `button` при `onClick`, иначе статичный `span`.
 */
export const Tag = forwardRef<HTMLElement, TagProps>(function Tag(
  {
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
    ...props
  },
  ref
) {
  const labelId = useId()
  const dismissId = useId()
  const hasDismiss = Boolean(onDismiss)
  // Текст тега дописывается к имени кнопки, только если dismissLabel его ещё не содержит
  // (TagInput передаёт готовое «Remove <тег>»)
  const plainText =
    typeof children === 'string' || typeof children === 'number' ? String(children) : null
  const labelHasText = plainText !== null && plainText !== '' && dismissLabel.includes(plainText)
  const customVars = customColor ? customPaletteStyle(customColor) : undefined

  const content = (
    <>
      {prefix != null ? (
        <span
          className={contractPart(tagContract, 'prefix')}
          data-rounded={prefixRounded || undefined}
        >
          {prefix}
        </span>
      ) : null}
      <span className={contractPart(tagContract, 'text-row')}>
        <span id={labelId} className={contractPart(tagContract, 'label')}>
          {children}
        </span>
        {sublabel != null && sublabel !== '' ? (
          <span className={contractPart(tagContract, 'sublabel')}>{sublabel}</span>
        ) : null}
        {suffix != null ? (
          <span className={contractPart(tagContract, 'suffix')}>{suffix}</span>
        ) : null}
      </span>
    </>
  )

  // Корень-кнопка — только onClick без крестика (вложенные кнопки недопустимы)
  const Root = onClick && !hasDismiss ? 'button' : 'span'
  const rootButtonProps =
    Root === 'button' ? { type: 'button' as const, disabled, onClick } : undefined

  return (
    <Root
      ref={ref as Ref<HTMLButtonElement & HTMLSpanElement>}
      className={clsx(tagContract.className, className)}
      {...contractAttrs(tagContract, {
        variant,
        size,
        shape,
        color: customVars ? undefined : color,
        'custom-color': Boolean(customVars),
        'with-dismiss': hasDismiss,
        'has-prefix': prefix != null,
        interactive: Boolean(onClick) && !disabled,
        disabled: Boolean(disabled),
      })}
      style={{ ...customVars, ...style }}
      {...rootButtonProps}
      {...props}
    >
      {hasDismiss ? (
        <span className={contractPart(tagContract, 'cluster')}>
          {onClick ? (
            <button
              type="button"
              className={contractPart(tagContract, 'main-hit')}
              disabled={disabled}
              onClick={onClick}
            >
              {content}
            </button>
          ) : (
            <span className={contractPart(tagContract, 'main-static')}>{content}</span>
          )}
          <button
            type="button"
            id={dismissId}
            className={contractPart(tagContract, 'dismiss')}
            // Имя «<dismissLabel> <текст тега>»: aria-label кнопки + подпись тега
            aria-label={dismissLabel}
            aria-labelledby={labelHasText ? undefined : `${dismissId} ${labelId}`}
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation()
              onDismiss?.()
            }}
          >
            <RiCloseLine size={16} aria-hidden />
          </button>
        </span>
      ) : (
        content
      )}
    </Root>
  )
})

Tag.displayName = 'Tag'
