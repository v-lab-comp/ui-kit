import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type Ref } from 'react'
import { Composite, CompositeItem } from '@floating-ui/react'

export type RichTextToolbarProps = HTMLAttributes<HTMLDivElement>

/**
 * Тулбар rich-text редактора по паттерну WAI-ARIA Toolbar: `role="toolbar"`,
 * один tab stop (roving tabindex), ←/→ переводят фокус между кнопками (по кругу).
 * Кнопки внутри — {@link RichTextToolButton}.
 */
export const RichTextToolbar = forwardRef<HTMLDivElement, RichTextToolbarProps>((props, ref) => (
  <Composite
    {...(props as HTMLAttributes<HTMLElement>)}
    ref={ref as Ref<HTMLElement>}
    orientation="horizontal"
    render={(htmlProps) => <div role="toolbar" {...htmlProps} />}
  />
))

RichTextToolbar.displayName = 'RichTextToolbar'

export type RichTextToolButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick' | 'onMouseDown'
> & {
  /** Команда форматирования; выполняется по click (мышь, Enter, Space). */
  onExec: () => void
  /** Формат применён — `aria-pressed`. */
  pressed?: boolean
  /** Значение `data-active` (CompositeItem ставит свой `data-active` на roving-элемент — перекрываем). */
  'data-active'?: boolean
}

/**
 * Кнопка тулбара rich-text редактора. Mousedown не забирает фокус у редактора (сохраняет выделение),
 * команда выполняется в `onClick`, поэтому кнопка работает и с клавиатуры.
 */
export const RichTextToolButton = forwardRef<HTMLButtonElement, RichTextToolButtonProps>(
  ({ onExec, pressed, 'data-active': dataActive, ...buttonProps }, ref) => (
    <CompositeItem
      {...(buttonProps as HTMLAttributes<HTMLElement>)}
      ref={ref as Ref<HTMLElement>}
      render={(htmlProps) => (
        <button
          {...(htmlProps as ButtonHTMLAttributes<HTMLButtonElement>)}
          type="button"
          aria-pressed={pressed}
          data-active={dataActive || undefined}
          onMouseDown={(e) => e.preventDefault()}
          onClick={onExec}
        />
      )}
    />
  )
)

RichTextToolButton.displayName = 'RichTextToolButton'
