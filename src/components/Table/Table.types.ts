import type { Key, ReactNode } from 'react'
import type { ContractValue } from '@/theme/contract'
import type { tableContract } from '@/theme/contracts/table'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  field: string
  direction: SortDirection
}

export interface TableColumn<T extends object = object> {
  key: keyof T | string
  label: string
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  render?: (row: T) => ReactNode
  strong?: boolean
  sortable?: boolean
  /** Поле сортировки, отправляемое в onSortChange. По умолчанию — String(key). */
  sortField?: string
  align?: ContractValue<typeof tableContract, 'align'>
  /**
   * Закрепляет колонку при горизонтальном скролле. Сейчас поддержано только `'left'`.
   * Для sticky-колонок обязателен `width` — из него считается left-офсет.
   */
  sticky?: 'left'
}

export interface TableProps<T extends object = object> {
  columns: TableColumn<T>[]
  /** Данные текущей страницы (при пагинации по API — только слайс с бэкенда). */
  data: T[]
  /** Общее число элементов (с сервера). Включает пагинацию. Количество страниц = ceil(totalItems / pageSize). */
  totalItems?: number
  /** Размер страницы (контролируемый режим, вместе с `onPageSizeChange`). */
  pageSize?: number
  /** Начальный размер страницы (неконтролируемый режим). По умолчанию 20. */
  defaultPageSize?: number
  /**
   * Максимальная высота области таблицы. При заданном значении включается нативный скролл
   * (вертикальный + горизонтальный) и шапка становится sticky (`top: 0`).
   */
  maxHeight?: number | string
  /** Текущая страница (1-based). Контролируемый режим: при смене страницы вызывается onPageChange. */
  page?: number
  /** Начальная страница (неконтролируемый режим). По умолчанию 1. */
  defaultPage?: number
  /** Вызывается при смене страницы (клик по пагинации, сброс на 1 при смене размера страницы). */
  onPageChange?: (page: number) => void
  /** Варианты размера страницы в селекте. По умолчанию [20, 50, 100, 200]. */
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  /** Клик по строке. Строка становится фокусируемой и срабатывает по Enter/Space. */
  onRowClick?: (row: T) => void
  /** Стабильный ключ строки (id записи). По умолчанию — индекс; задайте при сортировке/обновлении данных. */
  getRowKey?: (row: T, index: number) => Key
  /**
   * Доступное имя таблицы. При `maxHeight` им же называется прокручиваемая область
   * (она фокусируется с клавиатуры) — задайте `aria-label` или `aria-labelledby`.
   */
  'aria-label'?: string
  /** id элемента-заголовка таблицы (альтернатива `aria-label`). */
  'aria-labelledby'?: string
  /** Скрыть строку заголовка (thead). Удобно для списков в сайдбаре и т.п. */
  hideHeader?: boolean
  /**
   * Где рендерить пагинацию относительно таблицы (порядок в DOM).
   * `top` — сверху (как раньше по умолчанию), `bottom` — снизу без flex-reverse в приложении.
   */
  paginationPosition?: 'top' | 'bottom'
  /** Индекс активной строки (0-based) в текущем `data` — подсветка через API, без кастомного CSS по классам. */
  activeRowIndex?: number
  /** Контролируемое состояние сортировки. Multi-sort: порядок в массиве = приоритет. */
  sort?: SortState[]
  /** Начальное состояние сортировки (неконтролируемый режим). */
  defaultSort?: SortState[]
  /** Колбэк при изменении сортировки. Сериализация в query — на стороне потребителя. */
  onSortChange?: (sort: SortState[]) => void
  /**
   * Включает drag-and-drop переупорядочивания колонок за заголовок;
   * с клавиатуры — Alt+Shift+←/→ на заголовке. Порядок сохраняется в localStorage по ключу `storageKey`. Если prop не задан — фича выключена.
   */
  reorder?: { storageKey: string }
}
