import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'
import { resolveCompletedBorderColor } from '../base/InputField/resolveCompletedBorderColor'
import type { BaseInputSize } from '../base/BaseInput'
import { SelectChevron } from './SelectSuffix'
import type { SelectPlacement, SelectVariant } from './SelectInput.types'

export type SelectTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'children' | 'className'
> & {
  variant: SelectVariant
  open: boolean
  /** Для поворота шеврона компактных вариантов */
  placement: SelectPlacement
  size: BaseInputSize
  /** Подпись: значение, сводка `multiple` или плейсхолдер */
  text: ReactNode
  /** Значение не выбрано — подпись показывает плейсхолдер */
  isPlaceholder: boolean
  /** Иконка слева в компактных вариантах */
  icon?: ReactNode
  /** Красная рамка компактных вариантов */
  error?: boolean
  /** Значение выбрано — рамка компактных вариантов темнее */
  filled?: boolean
  /** Акцентная рамка (уже с учётом `error` / `disabled`) */
  completed?: boolean
  completedColor?: string
}

/**
 * Кнопка-триггер для всех вариантов: `full` — содержимое InputField, `compact` / `compact-label` —
 * кнопка с рамкой, `inline` — без рамки. Роль, aria и обработчики приходят из `getTriggerProps()`.
 */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      variant,
      open,
      placement,
      size,
      text,
      isPlaceholder,
      icon,
      error,
      filled,
      completed,
      completedColor,
      style,
      ...buttonProps
    },
    ref
  ) => {
    if (variant === 'full') {
      return (
        <button
          ref={ref}
          type="button"
          {...buttonProps}
          style={style}
          data-error={error || undefined}
          className={contractPart(selectInputContract, 'trigger')}
        >
          {/* Атрибут есть только у показанного плейсхолдера — скины выбирают по его наличию */}
          <span
            className={contractPart(selectInputContract, 'trigger-text')}
            data-placeholder={isPlaceholder || undefined}
          >
            {text}
          </span>
        </button>
      )
    }

    const completedStyle: CSSProperties | undefined =
      completed && completedColor
        ? {
            ...style,
            ['--input-completed-border' as string]: resolveCompletedBorderColor(completedColor),
          }
        : style
    const showText = variant === 'compact-label' || variant === 'inline'
    const textNode = (
      <span
        className={contractPart(selectInputContract, 'compact-text')}
        data-placeholder={isPlaceholder || undefined}
      >
        {text}
      </span>
    )

    return (
      <button
        ref={ref}
        type="button"
        {...buttonProps}
        data-size={size}
        data-error={error || undefined}
        data-open={open || undefined}
        data-filled={filled || undefined}
        data-completed={completed || undefined}
        data-custom-completed-border={(completed && !!completedColor) || undefined}
        style={completedStyle}
        className={
          variant === 'inline'
            ? contractPart(selectInputContract, 'inline-trigger')
            : contractPart(selectInputContract, 'compact-trigger')
        }
      >
        {icon ? (
          <>
            <span className={contractPart(selectInputContract, 'compact-icon')}>{icon}</span>
            {showText && textNode}
          </>
        ) : (
          textNode
        )}
        <SelectChevron open={open} placement={placement} size={14} />
      </button>
    )
  }
)

SelectTrigger.displayName = 'SelectTrigger'
