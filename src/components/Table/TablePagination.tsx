import type { ReactNode } from 'react'
import {
  RiSkipBackLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSkipForwardLine,
  RiArrowDownSLine,
} from '@remixicon/react'
import { contractPart } from '@/theme/contract'
import { tableContract } from '@/theme/contracts/table'
import { getPageNumbers } from './utils'

export interface TablePaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  pageSizeOptions: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

const part = (name: Parameters<typeof contractPart<typeof tableContract>>[1]) =>
  contractPart(tableContract, name)

function NavButton(props: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={part('page-btn')}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props.label}
    >
      {props.children}
    </button>
  )
}

/** Панель пагинации таблицы: инфо о странице, кнопки страниц, выбор размера страницы. */
export function TablePagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <div className={part('pagination')}>
      <div className={part('pagination-left')}>
        <span className={part('pagination-info')}>
          Страница {currentPage} из {totalPages}
        </span>
      </div>
      <div className={part('pagination-center')}>
        <div className={part('btn-group')}>
          <NavButton label="Первая страница" disabled={isFirst} onClick={() => onPageChange(1)}>
            <RiSkipBackLine size={16} aria-hidden />
          </NavButton>
          <NavButton
            label="Предыдущая страница"
            disabled={isFirst}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <RiArrowLeftSLine size={16} aria-hidden />
          </NavButton>
          {getPageNumbers(currentPage, totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`e-${i}`} className={part('ellipsis')} aria-hidden>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className={part('page-btn')}
                data-active={p === currentPage || undefined}
                aria-current={p === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            )
          )}
          <NavButton
            label="Следующая страница"
            disabled={isLast}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <RiArrowRightSLine size={16} aria-hidden />
          </NavButton>
          <NavButton
            label="Последняя страница"
            disabled={isLast}
            onClick={() => onPageChange(totalPages)}
          >
            <RiSkipForwardLine size={16} aria-hidden />
          </NavButton>
        </div>
      </div>
      <div className={part('pagination-right')}>
        <div className={part('compact-select')}>
          {/* Видимая подпись дублирует выбранную опцию select — скрываем от AT */}
          <span aria-hidden>{pageSize} / страница</span>
          <RiArrowDownSLine size={16} aria-hidden />
          <select
            aria-label="Строк на странице"
            className={part('select-overlay')}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s} / страница
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
