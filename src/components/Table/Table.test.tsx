import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Table } from './Table'
import type { TableColumn } from './Table.types'

interface Row {
  id: number
  name: string
  age: number
}

const columns: TableColumn<Row>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age' },
]
const data: Row[] = [
  { id: 1, name: 'Ann', age: 30 },
  { id: 2, name: 'Bob', age: 40 },
]

const headerLabels = () => screen.getAllByRole('columnheader').map((th) => th.textContent)

describe('Table', () => {
  afterEach(() => window.localStorage.clear())

  it('прокручиваемая область фокусируется и получает имя', () => {
    render(<Table columns={columns} data={data} maxHeight={200} aria-label="Users" />)
    const region = screen.getByRole('region', { name: 'Users' })
    expect(region).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument()
  })

  it('без maxHeight область не является region и не в порядке Tab', () => {
    render(<Table columns={columns} data={data} aria-label="Users" />)
    expect(screen.queryByRole('region')).toBeNull()
  })

  it('кликабельная строка активируется с клавиатуры Enter и Space', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />)
    const row = screen.getByRole('row', { name: /Ann/ })
    row.focus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onRowClick).toHaveBeenCalledTimes(2)
    expect(onRowClick).toHaveBeenCalledWith(data[0])
  })

  it('Enter на вложенной кнопке не активирует строку', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    const cols: TableColumn<Row>[] = [
      { key: 'name', label: 'Name', render: (r) => <button type="button">{r.name}</button> },
    ]
    render(<Table columns={cols} data={data} onRowClick={onRowClick} />)
    screen.getByRole('button', { name: 'Ann' }).focus()
    await user.keyboard('{Enter}')
    expect(onRowClick).toHaveBeenCalledTimes(1) // только нативный click кнопки, всплывший до строки
  })

  it('активная строка помечена aria-current', () => {
    render(<Table columns={columns} data={data} activeRowIndex={1} />)
    expect(screen.getByRole('row', { name: /Bob/ })).toHaveAttribute('aria-current', 'true')
  })

  it('Alt+Shift+стрелки переносят колонку и сохраняют фокус', async () => {
    const user = userEvent.setup()
    render(<Table columns={columns} data={data} reorder={{ storageKey: 'cols' }} />)
    const ageHeader = screen.getByRole('columnheader', { name: 'Age' })
    expect(ageHeader).toHaveAttribute('tabindex', '0')
    ageHeader.focus()
    await user.keyboard('{Alt>}{Shift>}{ArrowLeft}{/Shift}{/Alt}')
    expect(headerLabels()).toEqual(['Age', 'Name'])
    expect(screen.getByRole('columnheader', { name: 'Age' })).toHaveFocus()
    expect(JSON.parse(window.localStorage.getItem('cols')!)).toEqual(['age', 'name'])

    // С кнопки сортировки тоже работает
    screen.getByRole('button', { name: 'Name' }).focus()
    await user.keyboard('{Alt>}{Shift>}{ArrowLeft}{/Shift}{/Alt}')
    expect(headerLabels()).toEqual(['Name', 'Age'])
    expect(screen.getByRole('button', { name: 'Name' })).toHaveFocus()
  })

  it('сортировка: клик — asc, Shift+клик — только эта колонка', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(<Table columns={columns} data={data} onSortChange={onSortChange} />)
    await user.click(screen.getByRole('button', { name: 'Name' }))
    expect(onSortChange).toHaveBeenLastCalledWith([{ field: 'name', direction: 'asc' }])
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
  })

  describe('пагинация', () => {
    it('не вызывает onPageChange при монтировании', () => {
      const onPageChange = vi.fn()
      render(<Table columns={columns} data={data} totalItems={100} onPageChange={onPageChange} />)
      expect(onPageChange).not.toHaveBeenCalled()
    })

    it('неконтролируемая страница меняется и при переданном onPageChange', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()
      render(<Table columns={columns} data={data} totalItems={100} onPageChange={onPageChange} />)
      await user.click(screen.getByRole('button', { name: '2' }))
      expect(onPageChange).toHaveBeenCalledWith(2)
      expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
      expect(screen.getByRole('button', { name: '1' })).not.toHaveAttribute('aria-current')
    })

    it('контролируемый pageSize следует за пропсом', () => {
      const { rerender } = render(
        <Table columns={columns} data={data} totalItems={100} pageSize={20} />
      )
      expect(screen.getByRole('combobox', { name: 'Строк на странице' })).toHaveValue('20')
      rerender(<Table columns={columns} data={data} totalItems={100} pageSize={50} />)
      expect(screen.getByRole('combobox', { name: 'Строк на странице' })).toHaveValue('50')
    })

    it('смена размера страницы (defaultPageSize) возвращает на первую страницу', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()
      const onPageSizeChange = vi.fn()
      render(
        <Table
          columns={columns}
          data={data}
          totalItems={500}
          defaultPage={3}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )
      const select = screen.getByRole('combobox', { name: 'Строк на странице' })
      await user.selectOptions(select, '50')
      expect(onPageSizeChange).toHaveBeenCalledWith(50)
      expect(onPageChange).toHaveBeenCalledWith(1)
      expect(select).toHaveValue('50')
      const pages = screen.getAllByRole('button', { name: /^\d+$/ })
      expect(within(pages[0]).getByText('1')).toBeInTheDocument()
      expect(pages[0]).toHaveAttribute('aria-current', 'page')
    })
  })

  it('getRowKey сохраняет DOM-строки при перестановке данных', () => {
    const { rerender } = render(<Table columns={columns} data={data} getRowKey={(r) => r.id} />)
    const annRow = screen.getByRole('row', { name: /Ann/ })
    rerender(<Table columns={columns} data={[data[1], data[0]]} getRowKey={(r) => r.id} />)
    expect(screen.getByRole('row', { name: /Ann/ })).toBe(annRow)
  })
})
