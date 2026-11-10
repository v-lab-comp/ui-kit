import type { FocusEventHandler } from 'react'
import type { InputFieldProps } from '../base/InputField'

/** Инструмент тулбара. Порядок кнопок = порядок в массиве `tools`. */
export type RichInputTool =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'bulletList'
  | 'orderedList'
  | 'clear'

/** Подписи тулбара и его кнопок (a11y). Дефолты — английские, см. {@link DEFAULT_RICH_INPUT_ARIA_EN}. */
export type RichInputAriaLabels = Partial<Record<RichInputTool | 'toolbar', string>>

/**
 * Многострочное поле форматированного текста для форм: `InputField` (label / hint / error /
 * required / completed) + `contenteditable` с тулбаром.
 *
 * @remarks
 * - **Значение — HTML-строка.** Контролируемый режим — `value` + `onChange`, неконтролируемый — `defaultValue`.
 * - **Enter** — новая строка. Отправку формы поле не инициирует (в отличие от `CommentRichInput`).
 * - **Вставка** из буфера — только plain text.
 * - Санитизацию HTML перед выводом через `dangerouslySetInnerHTML` выполняет приложение / бэкенд;
 *   поле лишь вырезает `<script>`.
 */
export type RichInputProps = Omit<InputFieldProps, 'children' | 'wrapperStyle' | 'filled'> & {
  /** HTML-значение (контролируемый режим). */
  value?: string
  /** Начальный HTML (неконтролируемый режим). Смена на лету не отслеживается. */
  defaultValue?: string
  /** Новое HTML-значение после каждого изменения. */
  onChange?: (html: string) => void
  onFocus?: FocusEventHandler<HTMLDivElement>
  onBlur?: FocusEventHandler<HTMLDivElement>
  /** Текст в пустом поле. */
  placeholder?: string
  /** Имя поля для нативной отправки формы — рендерится `<input type="hidden">`. */
  name?: string
  /** Только чтение: текст выделяется и копируется, тулбар скрыт. */
  readOnly?: boolean
  /** Лимит длины текста (без тегов). Включает счётчик под полем и обрезку вставки. */
  maxLength?: number
  /** Набор и порядок кнопок тулбара. Пустой массив — без тулбара. */
  tools?: readonly RichInputTool[]
  /** Положение тулбара относительно текста. По умолчанию `top`. */
  toolbarPlacement?: 'top' | 'bottom'
  /** Минимальная высота поля в строках. По умолчанию 3. */
  minRows?: number
  /** Максимальная высота в строках; дальше — прокрутка. По умолчанию без ограничения. */
  maxRows?: number
  ariaLabels?: RichInputAriaLabels
}
