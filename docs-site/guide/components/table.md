---
title: Table
description: Таблица с колонками, данными и пагинацией.
---

# Table

Универсальная таблица с дженериком по строке данных: **`columns`**, **`data`**, опционально **`totalItems`** / **`pageSize`**.

## Превью

<ComponentDocsPreview name="table" />

## Импорт

```tsx
import { Table } from '@v-lab/ui-kit'
import type { TableColumn } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { Table } from '@v-lab/ui-kit'
import type { TableColumn } from '@v-lab/ui-kit'

type Row = { id: string; name: string; status: string }

const columns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 72 },
  { key: 'name', label: 'Название', strong: true },
  { key: 'status', label: 'Статус' },
]

const data: Row[] = [
  { id: '1', name: 'Позиция A', status: 'Активен' },
  { id: '2', name: 'Позиция B', status: 'Черновик' },
]

export function ItemsTable() {
  return <Table columns={columns} data={data} />
}
```

С пагинацией:

```tsx
<Table columns={columns} data={data} totalItems={120} pageSize={20} />
```

## Сортировка

Колонка становится сортируемой при `sortable: true`.

- **Клик по заголовку** — цикл: `asc → desc → none`. Не сбрасывает сортировку по другим колонкам — multi-sort собирается естественно.
- **Shift+Click** — оставить только эту колонку (быстрый сброс к single-sort).

Приоритет колонок в multi-sort определяется порядком, в котором их кликнули, и виден в `onSortChange(sort)` / query.

Компонент не сортирует данные — он отдаёт состояние через `onSortChange(sort)`. Сериализация в query — на стороне потребителя.

```tsx
import type { SortState } from '@v-lab/ui-kit'

const [sort, setSort] = useState<SortState[]>([])

const cols: TableColumn<Row>[] = [
  { key: 'subject', label: 'Тема', sortable: true },
  { key: 'registration_date', label: 'Дата', sortable: true },
]

// `sort=-registration_date,subject`
const query = 'sort=' + sort.map((s) => (s.direction === 'desc' ? '-' : '') + s.field).join(',')

return <Table columns={cols} data={data} sort={sort} onSortChange={setSort} />
```

Для других форматов (`sort=field&order=desc`, `sort=field:desc`) меняется только формирование строки — `SortState[]` остаётся нейтральным.

По умолчанию `field = String(column.key)`. Если имя в API отличается — задайте `sortField` на колонке.

## Переупорядочивание колонок

Drag-and-drop за заголовок включается передачей prop `reorder: { storageKey }`. Порядок сохраняется в `localStorage` по указанному ключу и восстанавливается при следующем рендере. Если prop не задан — фича выключена.

- **Клик по sortable-заголовку** — сортировка (drag не стартует без движения курсора).
- **Удержание и перетаскивание** заголовка — изменение порядка колонок.
- Новые колонки в `columns`, которых не было в сохранённом порядке, добавляются в конец; удалённые — отфильтровываются.

```tsx
<Table columns={cols} data={data} reorder={{ storageKey: 'app:documents-table:order' }} />
```

`storageKey` должен быть уникальным на таблицу — например, включайте имя экрана, чтобы порядки разных таблиц не пересекались.

## Sticky-шапка и sticky-колонки

При большом объёме данных задайте **`maxHeight`** — таблица получит собственный нативный скролл (вертикальный + горизонтальный), а шапка останется зафиксированной при вертикальном скролле. Без `maxHeight` поведение прежнее (таблица растёт по содержимому).

Чтобы колонка оставалась на месте при горизонтальном скролле, добавьте **`sticky: 'left'`**. Для sticky-колонки обязателен **`width`** — из него считается left-офсет (несколько sticky-колонок выстраиваются друг за другом). У крайней sticky-колонки рисуется тень-разделитель.

```tsx
const cols: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 80, sticky: 'left', strong: true },
  { key: 'name', label: 'Название', width: 220, sticky: 'left' },
  { key: 'status', label: 'Статус', width: 160 },
  // …широкие колонки
]

<Table columns={cols} data={data} maxHeight={360} />
```

## Основные пропсы (`Table`)

| Проп                 | Тип                           | Описание                                                                      |
| -------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| `columns`            | **`TableColumn<T>[]`**        | Колонки: ключ, заголовок, ширина, **`render`**, выравнивание, **`sortable`**  |
| `data`               | **`T[]`**                     | Строки текущей страницы                                                       |
| `totalItems`         | `number`                      | Всего элементов с бэкенда (включает пагинацию)                                |
| `pageSize`           | `number`                      | Размер страницы (по умолчанию **20**)                                         |
| `page`               | `number`                      | Текущая страница (1-based), с **`onPageChange`**                              |
| `onPageChange`       | `(page: number) => void`      | Смена страницы                                                                |
| `pageSizeOptions`    | `number[]`                    | Варианты в селекте размера страницы (по умолчанию `[20, 50, 100, 200]`)       |
| `onPageSizeChange`   | `(size: number) => void`      | Смена размера страницы                                                        |
| `onRowClick`         | `(row: T) => void`            | Клик по строке                                                                |
| `maxHeight`          | `number` \| `string`          | Макс. высота: включает нативный скролл и sticky-шапку                         |
| `hideHeader`         | `boolean`                     | Скрыть шапку таблицы                                                          |
| `paginationPosition` | `top` \| `bottom`             | Где показывать пагинацию                                                      |
| `activeRowIndex`     | `number`                      | Индекс подсвеченной строки (0-based в **`data`**)                             |
| `sort`               | `SortState[]`                 | Контролируемое состояние сортировки (multi-sort: порядок = приоритет)         |
| `defaultSort`        | `SortState[]`                 | Начальное состояние сортировки (неконтролируемый режим)                       |
| `onSortChange`       | `(sort: SortState[]) => void` | Колбэк при изменении сортировки                                               |
| `reorder`            | `{ storageKey: string }`      | Включает DnD-переупорядочивание колонок; порядок в `localStorage[storageKey]` |

### Колонка `TableColumn<T>`

| Поле                              | Тип                           | Описание                                                           |
| --------------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| `key`                             | `keyof T` \| `string`         | Поле строки или произвольный ключ                                  |
| `label`                           | `string`                      | Заголовок колонки                                                  |
| `width` / `minWidth` / `maxWidth` | `number` \| `string`          | Ширина                                                             |
| `render`                          | `(row: T) => ReactNode`       | Кастомная ячейка                                                   |
| `strong`                          | `boolean`                     | Жирный текст в ячейке                                              |
| `sortable`                        | `boolean`                     | Колонка сортируется по клику                                       |
| `sortField`                       | `string`                      | Имя поля в `onSortChange` (по умолчанию `String(key)`)             |
| `align`                           | `left` \| `center` \| `right` | Выравнивание                                                       |
| `sticky`                          | `'left'`                      | Закрепить колонку при гориз. скролле (нужны `maxHeight` и `width`) |

Полный тип — **`TableProps<T>`**.

## Галерея

Пагинация, клик по строке, ширины колонок, кастомный render — как **Gallery/Table** в Storybook.

<ComponentDocsPreview name="tableGallery" />

Исходники: `src/components/Table/`.
