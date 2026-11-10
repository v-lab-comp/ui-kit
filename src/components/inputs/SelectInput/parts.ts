/**
 * Части SelectInput для сборки родственных полей (AsyncSearchSelect, PhoneInput, SiteInput).
 * Внутренний модуль: не реэкспортируется из `src/index.ts`. API — в README.md этой папки.
 */

// Поведение и состояние
export { useSelectInteractions } from './useSelectInteractions'
export type { SelectInteractions, UseSelectInteractionsOptions } from './useSelectInteractions'
export { useSelectValue } from './useSelectValue'
export type {
  SelectMultipleValueConfig,
  SelectSingleValueConfig,
  SelectValueConfig,
  SelectValueState,
} from './useSelectValue'
export { useSelectList } from './useSelectList'
export type { SelectListState } from './useSelectList'
export { useLoadMoreSentinel } from './useLoadMoreSentinel'
export { useSelectDropdownFloating } from './useSelectDropdownFloating'

// Разметка
export { SelectTrigger } from './SelectTrigger'
export type { SelectTriggerProps } from './SelectTrigger'
export { SelectChevron, SelectSuffix } from './SelectSuffix'
export type { SelectSuffixProps } from './SelectSuffix'
export { SelectDropdownPanel } from './SelectDropdownPanel'
export type { SelectDropdownPanelProps, SelectDropdownSearchProps } from './SelectDropdownPanel'
export { SelectOptionList, SelectListStatus } from './SelectOptionList'
export type { SelectListStatusProps, SelectOptionListProps } from './SelectOptionList'
export { SelectGroupLabel, SelectOptionRow, SelectPlaceholderRow } from './SelectOptionRow'
export type { SelectOptionRowProps } from './SelectOptionRow'
export { SelectFormFields } from './SelectFormFields'

// Чистые функции над опциями
export {
  buildSelectList,
  getAllSelectOptions,
  getSelectChevronTransform,
  getSelectShortLabel,
  limitSelectRows,
  matchesSelectQuery,
} from './selectOptions'
export type { SelectListModel, SelectListRow } from './selectOptions'
