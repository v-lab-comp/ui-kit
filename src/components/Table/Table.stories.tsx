import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type React from 'react'
import { Table } from './Table'
import type { TableColumn, TableProps, SortState } from './Table.types'

type Row = { id: string; name: string; status: string; amount?: string }

// Table is generic — cast to a concrete Row instantiation so Storybook args are typed correctly
const RowTable = Table as React.ComponentType<TableProps<Row>>

const meta: Meta<typeof RowTable> = {
  component: RowTable,
  title: 'Components/Table',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 800 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    totalItems: { control: 'number', description: 'Total items (enables pagination)' },
    pageSize: { control: 'number' },
    hideHeader: { control: 'boolean' },
    paginationPosition: { control: 'select', options: ['top', 'bottom'] },
    activeRowIndex: { control: 'number' },
    onRowClick: { action: 'onRowClick' },
    onPageChange: { action: 'onPageChange' },
    onPageSizeChange: { action: 'onPageSizeChange' },
  },
}

export default meta

const columns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'name', label: 'Название', strong: true },
  { key: 'status', label: 'Статус' },
]

const data: Row[] = [
  { id: '1', name: 'Документ 1', status: 'Активен', amount: '1 000' },
  { id: '2', name: 'Документ 2', status: 'На проверке', amount: '2 500' },
  { id: '3', name: 'Документ 3', status: 'Завершён', amount: '500' },
]

type Story = StoryObj<typeof RowTable>

export const Playground: Story = {
  name: 'Playground',
  args: {
    columns,
    data,
    totalItems: undefined,
    pageSize: 10,
    hideHeader: false,
  },
  render: function Render(args) {
    const [page, setPage] = useState(1)
    return <RowTable {...args} onPageChange={setPage} page={page} />
  },
}

export const Default: Story = {
  args: {
    columns,
    data,
  },
}

export const WithPagination: Story = {
  args: {
    columns,
    data,
    totalItems: 42,
    pageSize: 20,
  },
}

export const ClickableRows: Story = {
  args: {
    columns,
    data,
    onRowClick: (row) => void row,
  },
}

export const WithoutHeader: Story = {
  name: 'Без заголовка (hideHeader)',
  args: {
    columns,
    data,
    hideHeader: true,
  },
}

export const PaginationBelowTable: Story = {
  name: 'Пагинация снизу (paginationPosition)',
  args: {
    columns,
    data,
    totalItems: 42,
    pageSize: 20,
    paginationPosition: 'bottom',
  },
}

export const ActiveRow: Story = {
  name: 'Активная строка (activeRowIndex)',
  args: {
    columns,
    data,
    hideHeader: true,
    activeRowIndex: 1,
    onRowClick: (row) => void row,
  },
}

export const ColumnAlignment: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', width: 72, align: 'center' },
      { key: 'name', label: 'Название', minWidth: 180, strong: true },
      { key: 'status', label: 'Статус', width: 120, align: 'center' },
      { key: 'amount', label: 'Сумма', width: 100, align: 'right' as const },
    ],
    data,
  },
}

export const CustomRender: Story = {
  args: {
    columns: [
      ...columns,
      {
        key: 'amount',
        label: 'Сумма',
        width: 100,
        align: 'right' as const,
        render: (row) => (row.amount ? `${row.amount} ₸` : '—'),
      },
    ],
    data,
  },
}

/** Сортировка: клик по заголовку → asc → desc → none (не сбрасывает другие колонки —
 *  multi-sort собирается естественно). Shift+Click — оставить только эту колонку.
 *  Сериализация в query — на стороне потребителя. Пример: `sort=-registration_date,subject`. */
export const Sortable: Story = {
  render: function SortableStory() {
    const [sort, setSort] = useState<SortState[]>([])

    const cols: TableColumn<Row>[] = [
      { key: 'id', label: 'ID', width: 110, sortable: true },
      { key: 'name', label: 'Название', strong: true, sortable: true },
      { key: 'status', label: 'Статус', sortable: true },
    ]

    const query =
      sort.length === 0
        ? ''
        : 'sort=' + sort.map((s) => (s.direction === 'desc' ? '-' : '') + s.field).join(',')

    return (
      <div style={{ width: '100%', maxWidth: 800 }}>
        <Table columns={cols} data={data} sort={sort} onSortChange={setSort} />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-sub-600)' }}>
          Query: <code>{query || '(no sort)'}</code>
          <br />
          Клик по заголовку — цикл asc → desc → none. Shift+Click — оставить только эту колонку.
        </p>
      </div>
    )
  },
}

/** Переупорядочивание колонок drag-and-drop. Включается prop `reorder: { storageKey }`;
 *  порядок сохраняется в localStorage по ключу. Клик по sortable-заголовку продолжает
 *  работать как сортировка — drag запускается только при удержании и движении. */
export const Reorderable: Story = {
  render: function ReorderableStory() {
    const [sort, setSort] = useState<SortState[]>([])

    const cols: TableColumn<Row>[] = [
      { key: 'id', label: 'ID', width: 110, sortable: true },
      { key: 'name', label: 'Название', strong: true, sortable: true },
      { key: 'status', label: 'Статус', sortable: true },
      { key: 'amount', label: 'Сумма', width: 120, align: 'right' as const },
    ]

    const storageKey = 'storybook:table:reorderable'

    return (
      <div style={{ width: '100%', maxWidth: 800 }}>
        <Table
          columns={cols}
          data={data}
          sort={sort}
          onSortChange={setSort}
          reorder={{ storageKey }}
        />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-sub-600)' }}>
          Перетащите заголовок колонки, чтобы изменить порядок. Порядок сохраняется в
          <code> localStorage[{storageKey}]</code> — перезагрузите страницу, порядок останется.
          <br />
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem(storageKey)
              window.location.reload()
            }}
            style={{ marginTop: 8 }}
          >
            Сбросить порядок
          </button>
        </p>
      </div>
    )
  },
}

/** Sticky-шапка + sticky-колонка. `maxHeight` включает нативный скролл (верт. + гориз.)
 *  и закрепляет шапку. `sticky: 'left'` закрепляет колонку — для неё обязателен `width`,
 *  из него считается left-офсет. */
export const StickyHeaderAndColumn: Story = {
  name: 'Sticky шапка и колонка (maxHeight + sticky)',
  render: function StickyStory() {
    const wideCols: TableColumn<Row>[] = [
      { key: 'id', label: 'ID', width: 80, sticky: 'left', strong: true },
      { key: 'name', label: 'Название', width: 220, sticky: 'left' },
      { key: 'status', label: 'Статус', width: 160 },
      { key: 'amount', label: 'Сумма', width: 160, align: 'right' as const },
      { key: 'c1', label: 'Колонка A', width: 160, render: (r) => `A-${r.id}` },
      { key: 'c2', label: 'Колонка B', width: 160, render: (r) => `B-${r.id}` },
      { key: 'c3', label: 'Колонка C', width: 160, render: (r) => `C-${r.id}` },
      { key: 'c4', label: 'Колонка D', width: 160, render: (r) => `D-${r.id}` },
    ] as TableColumn<Row>[]

    const rows: Row[] = Array.from({ length: 40 }, (_, i) => {
      const n = i + 1
      return {
        id: String(n),
        name: 'Документ с длинным названием ' + n,
        status: n % 3 === 0 ? 'Завершён' : n % 2 === 0 ? 'На проверке' : 'Активен',
        amount: String(n * 100),
      }
    })

    return (
      <div style={{ width: '100%', maxWidth: 700 }}>
        <Table columns={wideCols} data={rows} maxHeight={360} activeRowIndex={1} />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-sub-600)' }}>
          Скролльте вниз — шапка остаётся. Скролльте вправо — колонки ID и Название остаются.
        </p>
      </div>
    )
  },
}

/** Контролируемая пагинация: page и pageSize в state родителя. При клике на страницу вызывается onPageChange(p) → setPage(p), родитель подставляет новые data. */
export const ControlledPagination: Story = {
  render: function ControlledPaginationStory() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(50)
    const totalItems = 100

    const pageData: Row[] = []
    const start = (page - 1) * pageSize
    for (let i = 0; i < pageSize; i++) {
      const n = start + i + 1
      if (n > totalItems) break
      pageData.push({
        id: String(n),
        name: 'Документ ' + n,
        status: n % 3 === 0 ? 'Завершён' : n % 2 === 0 ? 'На проверке' : 'Активен',
        amount: String(n * 100),
      })
    }

    const cols = [
      ...columns,
      { key: 'amount' as const, label: 'Сумма', width: 100, align: 'right' as const },
    ]

    return (
      <div style={{ width: '100%', maxWidth: 800 }}>
        <Table
          columns={cols}
          data={pageData}
          totalItems={totalItems}
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[20, 50, 100, 200]}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => {
            setPageSize(s)
            setPage(1)
          }}
        />
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-sub-600)' }}>
          State: page={page}, pageSize={pageSize}. Клик по странице → onPageChange(p) → setPage(p).
        </p>
      </div>
    )
  },
}
