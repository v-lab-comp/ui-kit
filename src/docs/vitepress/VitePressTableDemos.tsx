import type { CSSProperties } from 'react'
import type React from 'react'
import { Table } from '@/components/Table'
import type { TableColumn, TableProps } from '@/components/Table'

type Row = { id: string; name: string; status: string }

const RowTable = Table as React.ComponentType<TableProps<Row>>

const columns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'name', label: 'Название', strong: true },
  { key: 'status', label: 'Статус' },
]

const data: Row[] = [
  { id: '1', name: 'Документ 1', status: 'Активен' },
  { id: '2', name: 'Документ 2', status: 'На проверке' },
  { id: '3', name: 'Документ 3', status: 'Завершён' },
]

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

export function TableDocsDemo() {
  const shell: CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    alignSelf: 'stretch',
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
  }

  const section: CSSProperties = {
    width: '100%',
    minWidth: 0,
    marginBottom: 24,
  }

  return (
    <div style={shell}>
      <section style={section}>
        <p style={label}>Базовая таблица</p>
        <RowTable columns={columns} data={data} />
      </section>
      <section style={{ ...section, marginBottom: 0 }}>
        <p style={label}>С пагинацией</p>
        <RowTable columns={columns} data={data} totalItems={42} pageSize={20} />
      </section>
    </div>
  )
}
