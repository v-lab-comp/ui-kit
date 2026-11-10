import type { CSSProperties, ReactNode, Ref } from 'react'
import { FloatingPortal } from '@floating-ui/react'
import { SearchInput } from '../SearchInput'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'

export type SelectDropdownPanelProps = {
  open: boolean
  setFloatingRef: (node: HTMLElement | null) => void
  floatingStyles: CSSProperties
  dropdownPortalZIndex?: number
  basePlacement: string
  dropdownInnerStyle?: CSSProperties
  showSearch: boolean
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (value: string) => void
  searchDisabled?: boolean
  listScrollRef: Ref<HTMLDivElement>
  onListScroll?: () => void
  children: ReactNode
}

/** Общая оболочка портала + панели + поиск + скролл — для SelectInput и AsyncSearchSelect. */
export function SelectDropdownPanel({
  open,
  setFloatingRef,
  floatingStyles,
  dropdownPortalZIndex,
  basePlacement,
  dropdownInnerStyle,
  showSearch,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  searchDisabled,
  listScrollRef,
  onListScroll,
  children,
}: SelectDropdownPanelProps) {
  if (!open) return null

  return (
    <FloatingPortal>
      <div
        ref={setFloatingRef}
        className={contractPart(selectInputContract, 'dropdown-portal')}
        style={{
          ...floatingStyles,
          ...(dropdownPortalZIndex !== undefined ? { zIndex: dropdownPortalZIndex } : {}),
        }}
      >
        <div
          className={contractPart(selectInputContract, 'dropdown')}
          data-placement={basePlacement}
          style={dropdownInnerStyle}
        >
          {showSearch && (
            <SearchInput
              className={contractPart(selectInputContract, 'dropdown-search-field')}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={searchPlaceholder}
              disabled={searchDisabled}
              aria-label={searchPlaceholder}
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
