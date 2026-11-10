import type { AsyncSearchSelectLoadResult } from './AsyncSearchSelect.types'
import type { SelectOption } from '../SelectInput'

export function normalizeAsyncSearchLoadResult(raw: AsyncSearchSelectLoadResult): {
  options: SelectOption[]
  hasMore: boolean
} {
  return Array.isArray(raw) ? { options: raw, hasMore: false } : raw
}
