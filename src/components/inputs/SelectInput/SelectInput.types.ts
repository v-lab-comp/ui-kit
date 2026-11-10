import type { ReactNode, SelectHTMLAttributes } from 'react'
import type { InputFieldProps } from '../base/InputField'
import type { BaseInputSize } from '../base/BaseInput'

// ── Тег варианта отображения ───────────────────────────────────────────────

export type SelectVariant = 'full' | 'compact' | 'compact-label' | 'inline'

// ── Данные списка: опции, группы, источник для пропсов ─────────────────────

export interface SelectOption {
  value: string
  label: string
  /** Иконка/аватар слева в пункте выпадающего списка и в триггере */
  icon?: ReactNode
  /** Дополнительная строка под основным label (серая подпись в списке, например категория). */
  description?: string
  /** Дополнительные ключевые слова для поиска (не отображаются) */
  searchKeywords?: string[]
}

export interface SelectOptionWithShortLabel extends SelectOption {
  /** Обязательное сокращение для отображения в compact-label триггере */
  shortLabel: string
}

/** Группа опций с заголовком (аналог `SelectGroup` + `SelectLabel` в shadcn/ui). */
export interface SelectOptionGroup<O extends SelectOption = SelectOption> {
  label: string
  options: O[]
}

/**
 * Источник пунктов списка: либо плоский **`options`**, либо **`groups`** с секциями.
 * В одном объекте пропсов тип допускает только один из вариантов.
 */
export type SelectInputOptionsProp<O extends SelectOption = SelectOption> =
  | { options: O[]; groups?: undefined }
  | { groups: SelectOptionGroup<O>[]; options?: undefined }

// ── Режим `multiple`: события и отображение триггера ───────────────────────

/** Событие смены значения при `mode="multiple"` (как у Ant Design Select). */
export type SelectInputMultipleChangeEvent = {
  target: {
    name?: string
    value: string[]
  }
}

export type SelectInputMultipleDisplay = 'summary' | 'tags'

// ── Общие пропсы всех вариантов (кроме `variant` и options/groups) ─────────

type SelectInputCommonProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size' | 'prefix' | 'labelTooltip'
> & {
  /** big 40px | medium 36px | small 32px */
  size?: BaseInputSize
  /** Текст для пустого значения (placeholder) */
  placeholder?: string
  /** Иконка/элемент слева (фоллбэк, если у выбранной опции нет icon) */
  prefix?: ReactNode
  /** Тултип/иконка рядом с label (только для variant full) */
  labelTooltip?: ReactNode
  /**
   * Порог числа опций для показа поиска в выпадающем списке (по умолчанию 20).
   * Считается по плоскому списку (после разворота `groups`). В `mode="multiple"` поиск при >1 опции.
   */
  searchThreshold?: number
  /** Placeholder для поля поиска */
  searchPlaceholder?: string
  /** Размер страницы для lazy loading в клиентском списке (по умолчанию 50) */
  lazyLoadPageSize?: number
  /**
   * Положение выпадающего списка относительно инпута.
   * `bottom` — вниз, по центру (по умолчанию).
   */
  placement?: 'bottom' | 'top' | 'left' | 'right'
  /** Фиксированная ширина выпадающего списка (px). Если не задано — width: max-content */
  dropdownWidth?: number
  /**
   * z-index портала списка (по умолчанию `var(--z-dropdown)` из style.css).
   * Задаётся числом, если в приложении нужен другой порядок слоёв (например селект внутри модалки).
   */
  dropdownPortalZIndex?: number
  /**
   * Максимальная высота выпадающего списка (px или CSS-строка). По умолчанию 320.
   * Задаётся без глобальных переопределений классов в приложении.
   */
  dropdownMaxHeight?: number | string
  /** Перенос длинных подписей опций в несколько строк вместо одной строки с ellipsis. */
  optionTextWrap?: boolean
  /**
   * `aria-label` для кнопки-триггера (compact / compact-label / inline и combobox в full).
   * Нужен для шапки и тулбаров без видимого текстового лейбла.
   */
  triggerAriaLabel?: string
  /**
   * Рамка триггера в акцентном primary (full — через InputField, compact — рамка кнопки).
   * Не применяется при `error` или `disabled`.
   */
  completed?: boolean
}

/**
 * База поля как у `SelectInput` variant **full**: InputField + выпадашка/триггер, **без** `options` / `groups`.
 * **AsyncSearchSelect** расширяет это тип у себя.
 */
export type SelectInputFullFieldProps = Omit<
  InputFieldProps,
  'children' | 'prefix' | 'labelTooltip'
> &
  SelectInputCommonProps & {
    variant?: 'full'
  }

// ── Варианты: полный инпут (single и multiple) ─────────────────────────────

/** `variant="full"` (по умолчанию), одиночный выбор, статический список. */
type SelectInputFullSingleProps = SelectInputFullFieldProps & SelectInputOptionsProp

/**
 * `variant="full"` и **`mode="multiple"`**: чекбоксы в списке, сводка в триггере.
 * Компактные варианты не поддерживаются.
 */
export type FullVariantMultipleProps = Omit<
  SelectInputFullSingleProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  mode: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onChange?: (event: SelectInputMultipleChangeEvent) => void
  /**
   * Префикс сводки при непустом выборе; по умолчанию к нему добавляется **` (N)`**, если нет **`multipleSummaryRender`**.
   */
  multipleSummaryLabel?: string
  /** Полный контроль текста/разметки триггера при непустом выборе */
  multipleSummaryRender?: (ctx: {
    count: number
    selectedValues: string[]
    selectedOptions: SelectOption[]
  }) => ReactNode
  /**
   * Отображение выбранного в триггере: **`summary`** — текст «Label (N)» (по умолчанию);
   * **`tags`** — чипы (пока отображаются как **`summary`**).
   */
  multipleDisplay?: SelectInputMultipleDisplay
}

// ── Варианты: компактные (один `error`, без полного InputField) ─────────────

type SelectInputCompactChromeProps = {
  /** Сообщение об ошибке для компактных вариантов (рамка/стиль как у поля с ошибкой). */
  error?: string
  /** Цвет рамки при `completed`: коротко **`"success"`**, **`"error"`**, **`"warning"`**, **`"primary"`** и др. (→ `var(--*-base)`), либо hex / `rgb()` / `var(--…)`. Для `variant="full"` см. **`InputFieldProps.completedColor`**. */
  completedColor?: string
}

type SelectInputCompactProps = SelectInputCommonProps &
  SelectInputCompactChromeProps & {
    variant: 'compact'
  } & SelectInputOptionsProp

type SelectInputCompactLabelProps = SelectInputCommonProps &
  SelectInputCompactChromeProps & {
    variant: 'compact-label'
  } & SelectInputOptionsProp<SelectOptionWithShortLabel>

type SelectInputInlineProps = SelectInputCommonProps &
  SelectInputCompactChromeProps & {
    variant: 'inline'
  } & SelectInputOptionsProp<SelectOptionWithShortLabel>

// ── Публичный тип компонента ───────────────────────────────────────────────

type SelectInputPropsUnion =
  | SelectInputFullSingleProps
  | FullVariantMultipleProps
  | SelectInputCompactProps
  | SelectInputCompactLabelProps
  | SelectInputInlineProps

/** Override `prefix` / `labelTooltip` в `ReactNode`, чтобы JSX и строка проходили без приведения типов. */
export type SelectInputProps = SelectInputPropsUnion & {
  prefix?: ReactNode
  labelTooltip?: ReactNode
}
