import type { ReactNode } from 'react'
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
  /** Размер страницы. По умолчанию 20. */
  pageSize?: number
  /**
   * Максимальная высота области таблицы. При заданном значении включается нативный скролл
   * (вертикальный + горизонтальный) и шапка становится sticky (`top: 0`).
   */
  maxHeight?: number | string
  /** Текущая страница (1-based). Контролируемый режим: при смене страницы вызывается onPageChange. */
  page?: number
  /** Вызывается при смене страницы (клик по пагинации) и при первом появлении пагинации (с page=1), чтобы родитель мог загрузить данные. */
  onPageChange?: (page: number) => void
  /** Варианты размера страницы в селекте. По умолчанию [20, 50, 100, 200]. */
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  onRowClick?: (row: T) => void
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
   * Включает drag-and-drop переупорядочивания колонок за заголовок.
   * Порядок сохраняется в localStorage по ключу `storageKey`. Если prop не задан — фича выключена.
   */
  reorder?: { storageKey: string }
}
