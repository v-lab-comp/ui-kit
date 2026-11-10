import { useControllableState } from '@/utils/useControllableState'

export interface UsePaginationParams {
  totalItems: number | undefined
  page: number | undefined
  defaultPage: number
  onPageChange: ((page: number) => void) | undefined
  pageSize: number | undefined
  defaultPageSize: number
  onPageSizeChange: ((size: number) => void) | undefined
}

/**
 * Страница и размер страницы — каждый контролируемый или неконтролируемый.
 * Смена размера страницы возвращает на первую страницу.
 */
export function usePagination(params: UsePaginationParams) {
  const [page, setPage] = useControllableState({
    value: params.page,
    defaultValue: params.defaultPage,
    onChange: params.onPageChange,
  })
  const [pageSize, setPageSize] = useControllableState({
    value: params.pageSize,
    defaultValue: params.defaultPageSize,
    onChange: params.onPageSizeChange,
  })

  const enabled = params.totalItems !== undefined
  const totalPages = enabled ? Math.max(1, Math.ceil(params.totalItems! / pageSize)) : 1
  // Страница за пределами диапазона (уменьшился totalItems) показывается как последняя
  const currentPage = Math.min(Math.max(1, page), totalPages)

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === currentPage) return
    setPage(p)
  }

  const changePageSize = (size: number) => {
    if (size === pageSize) return
    setPageSize(size)
    if (currentPage !== 1) setPage(1)
  }

  return { enabled, currentPage, totalPages, pageSize, goToPage, changePageSize }
}
