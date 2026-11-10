import type { SelectOption, SelectOptionGroup } from './SelectInput.types'

/** Совпадает ли опция с поисковой строкой: label, value, description, searchKeywords */
export function matchesSelectQuery(option: SelectOption, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    option.label.toLowerCase().includes(q) ||
    option.value.toLowerCase().includes(q) ||
    !!option.description?.toLowerCase().includes(q) ||
    !!option.searchKeywords?.some((keyword) => keyword.toLowerCase().includes(q))
  )
}

/**
 * Все опции плоским списком без фильтра. Если задан `groups` (даже `[]`), `options` не используется —
 * так union в типах и merge аргументов в Storybook дают предсказуемый результат.
 */
export function getAllSelectOptions(
  options: readonly SelectOption[] | undefined,
  groups: readonly SelectOptionGroup[] | undefined
): SelectOption[] {
  if (groups !== undefined) return groups.flatMap((group) => group.options)
  return options ? [...options] : []
}

/** Строка выпадающего списка: заголовок группы или опция с индексом для клавиатурной навигации */
export type SelectListRow =
  | { kind: 'group'; key: string; label: string; separated: boolean }
  | { kind: 'option'; key: string; option: SelectOption; index: number }

export type SelectListModel = {
  /** Строки для отрисовки (заголовки групп + опции) */
  rows: SelectListRow[]
  /** Опции по порядку навигации: индекс в массиве = `index` строки */
  items: SelectOption[]
}

/** Отфильтрованный список: пустые группы скрываются, между группами — разделитель */
export function buildSelectList(
  options: readonly SelectOption[] | undefined,
  groups: readonly SelectOptionGroup[] | undefined,
  query: string
): SelectListModel {
  const rows: SelectListRow[] = []
  const items: SelectOption[] = []
  const pushOption = (option: SelectOption) => {
    rows.push({
      kind: 'option',
      key: `${items.length}-${option.value}`,
      option,
      index: items.length,
    })
    items.push(option)
  }

  if (groups === undefined) {
    ;(options ?? []).filter((option) => matchesSelectQuery(option, query)).forEach(pushOption)
    return { rows, items }
  }

  let shownGroups = 0
  groups.forEach((group, groupIndex) => {
    const matched = group.options.filter((option) => matchesSelectQuery(option, query))
    if (matched.length === 0) return
    rows.push({
      kind: 'group',
      key: `group-${groupIndex}-${group.label}`,
      label: group.label,
      separated: shownGroups > 0,
    })
    shownGroups += 1
    matched.forEach(pushOption)
  })
  return { rows, items }
}

/**
 * Строки для первых `count` опций (ленивая отрисовка длинного списка).
 * Заголовок группы остаётся, только если отрисована хотя бы одна её опция.
 */
export function limitSelectRows(rows: readonly SelectListRow[], count: number): SelectListRow[] {
  const result: SelectListRow[] = []
  let pendingGroup: SelectListRow | null = null
  for (const row of rows) {
    if (row.kind === 'group') {
      pendingGroup = row
      continue
    }
    if (row.index >= count) break
    if (pendingGroup) {
      result.push(pendingGroup)
      pendingGroup = null
    }
    result.push(row)
  }
  return result
}

/** Подпись опции в компактном триггере: `shortLabel`, если есть, иначе `label` */
export function getSelectShortLabel(option: SelectOption): string {
  return 'shortLabel' in option && typeof option.shortLabel === 'string'
    ? option.shortLabel
    : option.label
}

/** Поворот шеврона: открыт вниз — вверх; при `placement="top"` — наоборот */
export function getSelectChevronTransform(open: boolean, placement: string): string | undefined {
  const flipped = placement === 'top' ? !open : open
  return flipped ? 'rotate(180deg)' : undefined
}
