---
title: Table
description: Table with columns, data, and pagination.
---

# Table

Generic table with row type **`columns`**, **`data`**, optional **`totalItems`** / **`pageSize`**.

## Preview

<ComponentDocsPreview name="table" />

## Import

```tsx
import { Table } from '@v-lab/ui-kit'
import type { TableColumn } from '@v-lab/ui-kit'
```

## Example

```tsx
import { Table } from '@v-lab/ui-kit'
import type { TableColumn } from '@v-lab/ui-kit'

type Row = { id: string; name: string; status: string }

const columns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 72 },
  { key: 'name', label: 'Name', strong: true },
  { key: 'status', label: 'Status' },
]

const data: Row[] = [
  { id: '1', name: 'Item A', status: 'Active' },
  { id: '2', name: 'Item B', status: 'Draft' },
]

export function ItemsTable() {
  return <Table columns={columns} data={data} />
}
```

With pagination:

```tsx
<Table columns={columns} data={data} totalItems={120} pageSize={20} />
```

## Sorting

Set `sortable: true` on a column.

- **Header click** — cycle: `asc → desc → none`. Doesn't clear other sorted columns — multi-sort builds up naturally.
- **Shift+Click** — keep only this column (quick reset to single-sort).

Priority in multi-sort follows the click order and is visible in `onSortChange(sort)` / the query.

The component doesn't sort data — it emits state via `onSortChange(sort)`. Query serialization is up to the consumer.

```tsx
import type { SortState } from '@v-lab/ui-kit'

const [sort, setSort] = useState<SortState[]>([])

const cols: TableColumn<Row>[] = [
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'registration_date', label: 'Date', sortable: true },
]

// `sort=-registration_date,subject`
const query = 'sort=' + sort.map((s) => (s.direction === 'desc' ? '-' : '') + s.field).join(',')

return <Table columns={cols} data={data} sort={sort} onSortChange={setSort} />
```

For other formats (`sort=field&order=desc`, `sort=field:desc`) only the string builder changes — `SortState[]` stays neutral.

Default `field = String(column.key)`. Override with `sortField` when the API uses a different name.

## Column reordering

Drag-and-drop on the header is enabled by passing `reorder: { storageKey }`. The order is persisted to `localStorage` under the given key and restored on the next render. Without the prop the feature is off.

- **Click on a sortable header** — sorts (drag won't start without cursor movement).
- **Hold and drag** a header — reorders columns.
- New columns in `columns` that weren't in the saved order are appended at the end; removed ones are filtered out.

```tsx
<Table columns={cols} data={data} reorder={{ storageKey: 'app:documents-table:order' }} />
```

The `storageKey` must be unique per table — include a screen name so different tables don't share an order.

## Sticky header and sticky columns

For large datasets set **`maxHeight`** — the table gets its own native scroll (vertical + horizontal) and the header stays pinned during vertical scroll. Without `maxHeight` the behavior is unchanged (the table grows with its content).

To keep a column in place during horizontal scroll, add **`sticky: 'left'`**. A sticky column requires **`width`** — its left offset is computed from it (multiple sticky columns line up one after another). The last sticky column gets a divider shadow.

```tsx
const cols: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 80, sticky: 'left', strong: true },
  { key: 'name', label: 'Name', width: 220, sticky: 'left' },
  { key: 'status', label: 'Status', width: 160 },
  // …wide columns
]

<Table columns={cols} data={data} maxHeight={360} />
```

## Main props (`Table`)

| Prop                             | Type                             | Description                                                                                                |
| -------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `columns`                        | **`TableColumn<T>[]`**           | Columns: key, title, width, **`render`**, alignment, **`sortable`**                                        |
| `data`                           | **`T[]`**                        | Current page rows                                                                                          |
| `totalItems`                     | `number`                         | Total from backend (enables pagination)                                                                    |
| `pageSize`                       | `number`                         | Page size (controlled, with **`onPageSizeChange`**); uncontrolled — **`defaultPageSize`** (default **20**) |
| `page`                           | `number`                         | Current page (1-based) with **`onPageChange`**; uncontrolled — **`defaultPage`**                           |
| `onPageChange`                   | `(page: number) => void`         | Page change                                                                                                |
| `pageSizeOptions`                | `number[]`                       | Page size select options (default `[20, 50, 100, 200]`)                                                    |
| `onPageSizeChange`               | `(size: number) => void`         | Page size change                                                                                           |
| `onRowClick`                     | `(row: T) => void`               | Row click; the row is focusable and activates on Enter/Space                                               |
| `getRowKey`                      | `(row: T, index: number) => Key` | Stable row key (default: index)                                                                            |
| `aria-label` / `aria-labelledby` | `string`                         | Table name; with `maxHeight` also names the focusable scroll region                                        |
| `maxHeight`                      | `number` \| `string`             | Max height: enables native scroll and sticky header                                                        |
| `hideHeader`                     | `boolean`                        | Hide table header                                                                                          |
| `paginationPosition`             | `top` \| `bottom`                | Pagination placement                                                                                       |
| `activeRowIndex`                 | `number`                         | Highlighted row index (0-based in **`data`**)                                                              |
| `sort`                           | `SortState[]`                    | Controlled sort state (multi-sort: array order = priority)                                                 |
| `defaultSort`                    | `SortState[]`                    | Initial sort state (uncontrolled mode)                                                                     |
| `onSortChange`                   | `(sort: SortState[]) => void`    | Sort change callback                                                                                       |
| `reorder`                        | `{ storageKey: string }`         | Column reordering: drag-and-drop or Alt+Shift+←/→ on a header; order stored in `localStorage[storageKey]`  |

### Column `TableColumn<T>`

| Field                             | Type                          | Description                                                             |
| --------------------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| `key`                             | `keyof T` \| `string`         | Row field or custom key                                                 |
| `label`                           | `string`                      | Column header                                                           |
| `width` / `minWidth` / `maxWidth` | `number` \| `string`          | Width                                                                   |
| `render`                          | `(row: T) => ReactNode`       | Custom cell                                                             |
| `strong`                          | `boolean`                     | Bold cell text                                                          |
| `sortable`                        | `boolean`                     | Column is sortable on click                                             |
| `sortField`                       | `string`                      | Field name passed to `onSortChange` (default `String(key)`)             |
| `align`                           | `left` \| `center` \| `right` | Alignment                                                               |
| `sticky`                          | `'left'`                      | Pin the column during horizontal scroll (needs `maxHeight` and `width`) |

Full type — **`TableProps<T>`**.

## Gallery

Pagination, row click, column widths, custom render — **Gallery/Table** in Storybook.

<ComponentDocsPreview name="tableGallery" />

Sources: `src/components/Table/`.
