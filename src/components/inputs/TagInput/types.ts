import type { InputHTMLAttributes, ReactNode } from 'react'
import type { TagVariant } from '@/components/Tag'
import type { InputFieldProps } from '../base/InputField'

/**
 * `contains` / `startsWith` — фильтрация по тексту в поле.
 * `server` — без локального фильтра (массив уже пришёл от API с учётом запроса).
 */
export type TagInputSuggestionsMatch = 'contains' | 'startsWith' | 'server'

/**
 * Элемент списка подсказок: **`id`** — **`key`** у пункта списка и связь с сущностью бэка (должен быть уникален среди текущего **`suggestions`**).
 */
export type TagInputSuggestionObject = {
  id: string
  /** Текст в выпадающем списке и значение тега после выбора. */
  label: string
}

/** Строка (`label === id` для ключа) или объект **`{ id, label }`**. */
export type TagInputSuggestion = string | TagInputSuggestionObject

/** Значение одного выбранного тега: строка или объект с **`id`** (для форм/API) и **`label`** для подписи чипа. */
export type TagInputTagObject = {
  id: string
  label: string
}

export type TagInputTagValue = string | TagInputTagObject

export function tagLabel(tag: TagInputTagValue): string {
  return typeof tag === 'string' ? tag : tag.label
}

/** Поле тегов: чипы + черновик в **`<input>`**; у черновика всегда **`autoComplete="off"`**. */
export type TagInputProps = Omit<InputFieldProps, 'children'> & {
  /** Выбранные теги (controlled). */
  value?: TagInputTagValue[]
  /** Начальный список (uncontrolled). */
  defaultValue?: TagInputTagValue[]
  onChange?: (tags: TagInputTagValue[]) => void
  /** Вариант встроенных `Tag`. */
  tagVariant?: TagVariant
  /** Лимит числа тегов; лишние при вводе игнорируются. */
  maxTags?: number
  /** Разрешить одинаковые строки (сравнение по **`label`**). */
  allowDuplicates?: boolean
  /** Разрешить произвольный текст как тег (`false` — только пункты из **`suggestions`**, по точному совпадению **`label`** без учёта регистра). */
  allowCustomTags?: boolean
  /** Зафиксировать текст в поле как тег при потере фокуса. */
  commitOnBlur?: boolean
  /** Разбиение при вставке из буфера и при фиксации черновика (по умолчанию запятая, `;`, перевод строки). */
  splitPattern?: RegExp
  /** `aria-label` для кнопки удаления у каждого тега. */
  removeTagLabel?: (tag: TagInputTagValue) => string
  /**
   * Вместо стандартного чипа **`Tag`** — свой рендер (например иконка + текст).
   * Вызывается для каждого **видимого** тега с учётом **`maxTagCount`**.
   */
  renderTag?: (ctx: {
    tag: TagInputTagValue
    index: number
    disabled: boolean
    onRemove: () => void
  }) => ReactNode
  /**
   * Сколько чипов показывать; остальные сворачиваются в **`+N`** (или в **`maxTagCountOverflow`**).
   * Не ограничивает **`maxTags`** и не режет **`value`** — только отображение.
   */
  maxTagCount?: number
  /** Текст/разметка вместо дефолтного **`+{hidden}`** при **`maxTagCount`**. */
  maxTagCountOverflow?: (hiddenCount: number) => ReactNode
  /** Если вернёт `false`, тег не добавится (и произвольный ввод, и выбор из списка). */
  validateTag?: (label: string) => boolean
  /**
   * Предложения для выбора из списка (бэк, константы и т.д.).
   * **`undefined`** — выпадающий список отключён.
   *
   * При **`allowCustomTags === true`** (по умолчанию): **Enter** / запятая / `;` фиксируют ввод как тег;
   * пункт из списка — клик, **Tab** (при открытом списке) или **Enter** на **пустом** поле с подсветкой.
   *
   * Объект **`{ id, label }`** из списка попадает в **`value`** как **`TagInputTagObject`**; строка из списка — как **`string`**.
   */
  suggestions?: readonly TagInputSuggestion[]
  /** Как фильтровать `suggestions` по строке в поле. По умолчанию `contains`. */
  suggestionsMatch?: TagInputSuggestionsMatch
  /** Максимум пунктов в выпадающем списке. */
  suggestionsLimit?: number
  /**
   * Уже выбранные пункты **остаются** в выпадающем списке с галочкой; клик / Enter по пункту **снимает** выбор.
   * Если **`true`** — прежнее поведение: выбранные скрываются из списка, выбор только добавляет тег.
   */
  suggestionsExcludeSelected?: boolean
  /** Показать состояние загрузки вместо списка (удобно для async). */
  suggestionsLoading?: boolean
  /** Текст при пустом **`filtered`** и непустом запросе (список открыт). По умолчанию **`No matches`**. */
  suggestionsEmptyText?: ReactNode
  /** Текст при **`suggestionsLoading`**. По умолчанию **`Loading…`**. */
  suggestionsLoadingText?: ReactNode
  /** Отключить отдельные пункты списка (не выбираются с клавиатуры и мыши). */
  getOptionDisabled?: (row: TagInputSuggestionObject) => boolean
  /**
   * Вызывается при изменении текста в поле — удобно для debounce и запроса на бэк;
   * родитель обновляет `suggestions` из ответа API.
   */
  onSuggestionsQueryChange?: (query: string) => void
  /**
   * Максимальная высота области «теги + поле ввода».
   * При переполнении — вертикальная прокрутка со стилизованным скроллбаром (как у Select).
   * Число — пиксели; строка — любое значение CSS (`'12rem'`, `'min(40vh,240px)'`).
   * **`'none'`** — без лимита (скролла у поля нет).
   * По умолчанию **200px**.
   */
  tagsAreaMaxHeight?: number | string | 'none'
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'prefix'
    | 'suffix'
    | 'disabled'
    | 'className'
    | 'children'
    | 'id'
    | 'autoComplete'
  >
