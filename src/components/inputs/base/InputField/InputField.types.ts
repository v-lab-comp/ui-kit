import type { CSSProperties, ReactNode } from 'react'
import type { BaseInputSize } from '../BaseInput'

/**
 * Атрибуты для фокусируемого контрола внутри InputField — второй аргумент render-функции.
 * Разворачиваются на `<input>`, кнопку-combobox и т.п.: связывают контрол с подсказкой / ошибкой
 * и сообщают скринридеру об ошибке и обязательности.
 */
export interface InputFieldControlProps {
  id: string
  /** id текста подсказки / ошибки — когда он показан */
  'aria-describedby'?: string
  'aria-invalid'?: true
  'aria-required'?: true
}

export interface InputFieldProps {
  size?: BaseInputSize
  label?: string
  required?: boolean
  /**
   * Маркер обязательного поля рядом с label (показывается при `required`).
   * По умолчанию `*` цвета `--error-base`. Цвет можно переопределить CSS-переменной
   * `--input-required-color`, либо передать сюда готовый узел со своим оформлением.
   */
  requiredMarker?: ReactNode
  optional?: boolean | string
  labelTooltip?: ReactNode
  /** Подсказка под полем. При наличии error показывается error вместо hint. */
  hint?: string
  /** Сообщение об ошибке. При наличии перекрывает hint. */
  error?: string
  /**
   * Рамка оболочки в акцентном **primary** (например заполненный шаг формы).
   * Не применяется при `error` или `disabled`.
   */
  completed?: boolean
  /**
   * Цвет рамки при **`completed`**.
   * Коротко: семантика дизайн-системы — **`"success"`**, **`"error"`**, **`"warning"`**, **`"primary"`**, **`"information"`**, **`"faded"`**, **`"feature"`**, **`"verified"`**, **`"away"`**, **`"highlighted"`** → соответствующий **`var(--*-base)`**.
   * Иначе: hex, **`rgb()`**, **`var(--success-base)`**, примитивы **`var(--green-500)`** и т.д.
   * Без пропа при **`completed`** используется **`--primary-base`** / **`--primary-dark`** при наведении.
   */
  completedColor?: string
  /**
   * Поле заполнено (есть значение) — рамка оболочки темнее, чем у пустого поля.
   * Для текстовых полей определяется автоматически (BaseInput выставляет `data-filled`);
   * проп нужен для контролов без обычного `<input>` (Select, AsyncSearchSelect, TagInput).
   * Не применяется при `error`, `disabled` или `completed`.
   */
  filled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  /** Блок-секция слева (отдельный фон + разделитель). Работает вместе с prefix. */
  startBlock?: ReactNode
  /** Блок-секция справа (отдельный фон + разделитель). Работает вместе с suffix. */
  endBlock?: ReactNode
  disabled?: boolean
  /** Внешний id. Если не передан — генерируется автоматически. */
  id?: string
  className?: string
  /** Дополнительный класс для внутренней оболочки поля (рамка, flex). Нужен для TagInput и др. */
  wrapperClassName?: string
  /** Инлайн-стили оболочки поля (например `height: 'auto'` для многострочного содержимого). */
  wrapperStyle?: CSSProperties
  /**
   * Render-функция: `id` для связки label ↔ контрол и `control` — атрибуты доступности
   * (`id`, `aria-describedby`, `aria-invalid`, `aria-required`), которые нужно развернуть на контрол.
   * Для контрола, который нельзя связать через `<label for>` (contenteditable), — `aria-labelledby={inputFieldLabelId(id)}`.
   */
  children: ReactNode | ((id: string, control: InputFieldControlProps) => ReactNode)
}
