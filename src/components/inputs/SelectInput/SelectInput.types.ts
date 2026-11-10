import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { InputFieldOwnProps } from '../base/InputField'
import type { BaseInputSize } from '../base/BaseInput'

// ── Тег варианта отображения ───────────────────────────────────────────────

export type SelectVariant = 'full' | 'compact' | 'compact-label' | 'inline'

/** Положение выпадающего списка относительно поля */
export type SelectPlacement = 'bottom' | 'top' | 'left' | 'right'

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

// ── Значение и onChange ────────────────────────────────────────────────────

/** Одиночный выбор: значение — строка, `''` — ничего не выбрано. */
export type SelectInputSingleValueProps = {
  mode?: undefined
  value?: string
  defaultValue?: string
  /**
   * Новое значение и выбранная опция (`null` — значение очищено).
   * Не вызывается при повторном выборе уже выбранной опции.
   */
  onChange?: (value: string, option: SelectOption | null) => void
  multipleSummaryLabel?: undefined
  multipleSummaryRender?: undefined
}

/** Аргумент **`multipleSummaryRender`** */
export type SelectInputMultipleSummaryContext = {
  count: number
  selectedValues: string[]
  selectedOptions: SelectOption[]
}

/** **`mode="multiple"`**: значение — массив `value` выбранных опций. */
export type SelectInputMultipleValueProps = {
  mode: 'multiple'
  value?: string[]
  defaultValue?: string[]
  /** Новый набор значений и соответствующие опции (в порядке выбора) */
  onChange?: (value: string[], options: SelectOption[]) => void
  /**
   * Префикс сводки при непустом выборе; по умолчанию к нему добавляется **` (N)`**, если нет **`multipleSummaryRender`**.
   */
  multipleSummaryLabel?: string
  /** Полный контроль текста/разметки триггера при непустом выборе */
  multipleSummaryRender?: (ctx: SelectInputMultipleSummaryContext) => ReactNode
}

// ── Доступное имя триггера ─────────────────────────────────────────────────

/**
 * Обязательное доступное имя для триггера без видимой подписи
 * (`compact` / `compact-label` / `inline`): `aria-label` или `aria-labelledby`.
 */
export type SelectAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-labelledby': string; 'aria-label'?: string }

/** У `full` имя даёт `label`; `aria-label` / `aria-labelledby` — по желанию. */
export type SelectOptionalAccessibleName = {
  'aria-label'?: string
  'aria-labelledby'?: string
}

// ── Атрибуты кнопки-триггера ───────────────────────────────────────────────

/**
 * Стандартные атрибуты, которые уходят на кнопку-триггер (ref указывает на неё):
 * обработчики (`onFocus`, `onBlur`, `onKeyDown`…), `aria-describedby`, `title`, `autoFocus`, `data-*`.
 * Роль, `aria-expanded` / `aria-controls` / `aria-activedescendant` и т.п. ставит компонент.
 */
export type SelectTriggerNativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'type'
  | 'role'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'prefix'
  | 'children'
  | 'className'
  | 'style'
  | 'id'
  | 'name'
  | 'form'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'disabled'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-controls'
  | 'aria-activedescendant'
  | 'aria-autocomplete'
>

// ── Общие пропсы всех вариантов ────────────────────────────────────────────

type SelectInputCommonProps = SelectTriggerNativeProps & {
  /** big 40px | medium 36px | small 32px */
  size?: BaseInputSize
  /** Текст для пустого значения (placeholder) */
  placeholder?: string
  /** Иконка/элемент слева (фоллбэк, если у выбранной опции нет icon) */
  prefix?: ReactNode
  /**
   * Порог числа опций для показа поиска в выпадающем списке (по умолчанию 20).
   * Считается по плоскому списку (после разворота `groups`). В `mode="multiple"` поиск при >1 опции.
   */
  searchThreshold?: number
  /** Placeholder (и доступное имя) поля поиска */
  searchPlaceholder?: string
  /** Размер страницы для lazy loading в клиентском списке (по умолчанию 50) */
  lazyLoadPageSize?: number
  /**
   * Положение выпадающего списка относительно инпута.
   * `bottom` — вниз, по центру (по умолчанию).
   */
  placement?: SelectPlacement
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
   * Рамка триггера в акцентном primary (full — через InputField, compact — рамка кнопки).
   * Не применяется при `error` или `disabled`.
   */
  completed?: boolean
  /** Цвет рамки при `completed`: коротко **`"success"`**, **`"error"`**, **`"warning"`**, **`"primary"`** и др. (→ `var(--*-base)`), либо hex / `rgb()` / `var(--…)`. */
  completedColor?: string
  /** Сообщение об ошибке. У `full` — текст под полем, у компактных вариантов — красная рамка и `aria-invalid`. */
  error?: string
  disabled?: boolean
  /** Имя поля формы: значение уходит скрытым `<input type="hidden">` (в `multiple` — по одному на значение) */
  name?: string
  /** id формы для скрытых полей, если селект вне `<form>` */
  form?: string
  /** id кнопки-триггера (у `full` — ещё и связка с `label`) */
  id?: string
  /** Класс корня: у `full` — InputField, у компактных — контейнер `vl-select-input` */
  className?: string
}

/** Пропсы InputField, которые есть только у `variant="full"` */
type SelectInputFieldOnlyProps = Pick<
  InputFieldOwnProps,
  | 'label'
  | 'required'
  | 'requiredMarker'
  | 'optional'
  | 'labelTooltip'
  | 'hint'
  | 'suffix'
  | 'startBlock'
  | 'endBlock'
  | 'wrapperClassName'
  | 'wrapperStyle'
>

/** Ключи, недоступные варианту: объявлены как `undefined`, чтобы union разбирался без приведений */
type NotApplicable<T> = { [K in keyof T]?: undefined }

/**
 * База поля как у `SelectInput` variant **full**: InputField + выпадашка/триггер, **без** значения
 * и `options` / `groups`. **AsyncSearchSelect** расширяет этот тип у себя.
 */
export type SelectInputFullFieldProps = SelectInputCommonProps &
  SelectInputFieldOnlyProps &
  SelectOptionalAccessibleName & {
    variant?: 'full'
  }

// ── Варианты: полный инпут (single и multiple) ─────────────────────────────

/** `variant="full"` (по умолчанию), одиночный выбор, статический список. */
type SelectInputFullSingleProps = SelectInputFullFieldProps &
  SelectInputSingleValueProps &
  SelectInputOptionsProp

/**
 * `variant="full"` и **`mode="multiple"`**: чекбоксы в списке, сводка в триггере.
 * Компактные варианты не поддерживаются.
 */
export type FullVariantMultipleProps = SelectInputFullFieldProps &
  SelectInputMultipleValueProps &
  SelectInputOptionsProp

// ── Варианты: компактные (без InputField, имя обязательно) ─────────────────

type SelectInputCompactBaseProps<
  V extends SelectVariant,
  O extends SelectOption,
> = SelectInputCommonProps &
  NotApplicable<SelectInputFieldOnlyProps> &
  SelectAccessibleName &
  SelectInputSingleValueProps &
  SelectInputOptionsProp<O> & {
    variant: V
  }

type SelectInputCompactProps = SelectInputCompactBaseProps<'compact', SelectOption>

type SelectInputCompactLabelProps = SelectInputCompactBaseProps<
  'compact-label',
  SelectOptionWithShortLabel
>

type SelectInputInlineProps = SelectInputCompactBaseProps<'inline', SelectOptionWithShortLabel>

// ── Публичный тип компонента ───────────────────────────────────────────────

export type SelectInputProps =
  | SelectInputFullSingleProps
  | FullVariantMultipleProps
  | SelectInputCompactProps
  | SelectInputCompactLabelProps
  | SelectInputInlineProps

// ── Устаревшее (оставлено до чистки экспорта src/index.ts) ─────────────────

/**
 * @deprecated `onChange` в `mode="multiple"` получает `(value: string[], options)`.
 * Тип больше не используется компонентом.
 */
export type SelectInputMultipleChangeEvent = {
  target: {
    name?: string
    value: string[]
  }
}

/** @deprecated Проп `multipleDisplay` удалён: в триггере всегда сводка «Label (N)». */
export type SelectInputMultipleDisplay = 'summary' | 'tags'
