import clsx from 'clsx'
import { Table } from '@/components/Table'
import type { TableColumn } from '@/components/Table'
import styles from './TableGalleryPage.module.css'

type Row = { id: string; name: string; status: string; amount: string }

const baseColumns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'name', label: 'Название', strong: true },
  { key: 'status', label: 'Статус' },
]

const baseData: Row[] = [
  { id: '1', name: 'Документ 1', status: 'Активен', amount: '1 000' },
  { id: '2', name: 'Документ 2', status: 'На проверке', amount: '2 500' },
  { id: '3', name: 'Документ 3', status: 'Завершён', amount: '500' },
]

export type TableGalleryPageProps = {
  embedded?: boolean
}

export function TableGalleryPage({ embedded = false }: TableGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Table Gallery</h1>
        <p className={styles.subtitle}>
          Таблица с колонками, пагинацией, кликабельными строками. Настройки ширины и выравнивания
          колонок.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Default</h2>
          <div className={styles.item}>
            <Table columns={baseColumns} data={baseData} />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>With pagination</h2>
          <div className={styles.item}>
            <Table columns={baseColumns} data={baseData} totalItems={42} pageSize={20} />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Clickable rows</h2>
          <div className={styles.item}>
            <div className={styles.itemLabel}>Клик по строке — onRowClick</div>
            <Table columns={baseColumns} data={baseData} onRowClick={() => {}} />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Column width & alignment</h2>
          <div className={styles.item}>
            <Table
              columns={[
                { key: 'id', label: 'ID', width: 72, align: 'center' },
                { key: 'name', label: 'Название', minWidth: 180, strong: true },
                { key: 'status', label: 'Статус', width: 120, align: 'center' },
                { key: 'amount', label: 'Сумма', width: 100, align: 'right' },
              ]}
              data={baseData}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Custom render</h2>
          <div className={styles.item}>
            <Table
              columns={[
                ...baseColumns,
                {
                  key: 'amount',
                  label: 'Сумма',
                  width: 100,
                  align: 'right',
                  render: (row) => `${row.amount} ₸`,
                },
              ]}
              data={baseData}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
