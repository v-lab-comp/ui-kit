import type { CSSProperties, ReactNode, Ref, UIEventHandler } from 'react'
import { FloatingPortal } from '@floating-ui/react'
import { formatSize } from '@/utils/formatSize'
import { SearchInput, type SearchInputProps } from '../SearchInput'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'

export type SelectDropdownSearchProps = {
  value: string
  onChange: (value: string) => void
  /** Placeholder и доступное имя поля */
  placeholder: string
  disabled?: boolean
  /** Атрибуты `<input>`: ref, role combobox, aria-*, onKeyDown — `getSearchProps()` */
  inputProps?: Omit<
    SearchInputProps,
    'value' | 'onChange' | 'placeholder' | 'disabled' | 'size'
  > & {
    ref?: Ref<HTMLInputElement>
  }
}

export type SelectDropdownPanelProps = {
  open: boolean
  /** ref floating-элемента (портальная обёртка) */
  floatingRef: Ref<HTMLDivElement>
  /** `getFloatingProps()`: обработчики клавиатуры, Escape, ухода фокуса */
  floatingProps?: Record<string, unknown>
  floatingStyles: CSSProperties
  dropdownPortalZIndex?: number
  basePlacement: string
  /** Фиксированная ширина панели (px) */
  dropdownWidth?: number
  /** Макс. высота панели (px или CSS-строка) */
  dropdownMaxHeight?: number | string
  /** Поле поиска над списком; не задано — без поиска */
  search?: SelectDropdownSearchProps
  listScrollRef?: Ref<HTMLDivElement>
  onListScroll?: UIEventHandler<HTMLDivElement>
  children: ReactNode
}

/** Общая оболочка портала + панели + поиск + скролл — для SelectInput и AsyncSearchSelect. */
export function SelectDropdownPanel({
  open,
  floatingRef,
  floatingProps,
  floatingStyles,
  dropdownPortalZIndex,
  basePlacement,
  dropdownWidth,
  dropdownMaxHeight,
  search,
  listScrollRef,
  onListScroll,
  children,
}: SelectDropdownPanelProps) {
  if (!open) return null

  const dropdownStyle: CSSProperties = {
    ...(dropdownWidth ? { width: dropdownWidth } : {}),
    ...(dropdownMaxHeight !== undefined
      ? { ['--select-dropdown-max-height' as string]: formatSize(dropdownMaxHeight) }
      : {}),
  }

  return (
    <FloatingPortal>
      <div
        ref={floatingRef}
        {...floatingProps}
        className={contractPart(selectInputContract, 'dropdown-portal')}
        style={{
          ...floatingStyles,
          ...(dropdownPortalZIndex !== undefined ? { zIndex: dropdownPortalZIndex } : {}),
        }}
      >
        <div
          className={contractPart(selectInputContract, 'dropdown')}
          data-placement={basePlacement}
          style={dropdownStyle}
        >
          {search && (
            <SearchInput
              {...search.inputProps}
              className={contractPart(selectInputContract, 'dropdown-search-field')}
              value={search.value}
              onChange={(event) => search.onChange(event.target.value)}
              placeholder={search.placeholder}
              disabled={search.disabled}
              aria-label={search.placeholder}
              size="medium"
            />
          )}
          <div
            ref={listScrollRef}
            className={contractPart(selectInputContract, 'options-scroll')}
            onScroll={onListScroll}
          >
            {children}
          </div>
        </div>
      </div>
    </FloatingPortal>
  )
}
