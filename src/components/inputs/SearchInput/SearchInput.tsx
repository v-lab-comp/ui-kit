import clsx from 'clsx'
import { forwardRef, useEffect, useRef } from 'react'
import { RiSearchLine } from '@remixicon/react'
import { InputField, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { searchInputContract } from '@/theme/contracts/search-input'
import type { SearchInputProps, ShortcutConfig } from './SearchInput.types'

const checkIsMac = (): boolean =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)

const checkIsMobile = (): boolean =>
  typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

// Registry: shortcut code key → map of priority → element getter
const registry = new Map<string, Map<number, () => HTMLInputElement | null>>()

const getRegistryKey = (cfg: ShortcutConfig): string =>
  `${cfg.key}|${cfg.mac ?? 'cmd'}|${cfg.win ?? 'ctrl+shift'}`

const focusHighestPriority = (entries: Map<number, () => HTMLInputElement | null>): void => {
  const sorted = [...entries.entries()].sort((a, b) => b[0] - a[0])
  for (const [, get] of sorted) {
    const el = get()
    if (!el || el.disabled) continue
    el.ownerDocument?.defaultView?.focus()
    el.focus()
    return
  }
}

/** Map key character to physical KeyboardEvent.code (layout-independent) */
const keyToCode = (key: string): string => {
  if (/^[a-zA-Z]$/.test(key)) return `Key${key.toUpperCase()}`
  if (/^[0-9]$/.test(key)) return `Digit${key}`
  const map: Record<string, string> = {
    '/': 'Slash',
    '\\': 'Backslash',
    '.': 'Period',
    ',': 'Comma',
    ';': 'Semicolon',
    "'": 'Quote',
    '[': 'BracketLeft',
    ']': 'BracketRight',
    '-': 'Minus',
    '=': 'Equal',
    '`': 'Backquote',
    ' ': 'Space',
  }
  return map[key] ?? key
}

const getShortcutLabel = (cfg: ShortcutConfig): string => {
  const key = cfg.key.toUpperCase()
  if (checkIsMac()) {
    return cfg.mac === 'cmd+shift' ? `⌘⇧${key}` : `⌘${key}`
  }
  return cfg.win === 'ctrl' ? `Ctrl ${key}` : `⇧Ctrl ${key}`
}

const matchesShortcut = (e: KeyboardEvent, cfg: ShortcutConfig): boolean => {
  // Use e.code for layout-independent matching (e.key changes with keyboard layout)
  if (e.code !== keyToCode(cfg.key)) return false
  if (checkIsMac()) {
    return cfg.mac === 'cmd+shift' ? e.metaKey && e.shiftKey : e.metaKey && !e.shiftKey
  }
  return cfg.win === 'ctrl' ? e.ctrlKey && !e.shiftKey : e.ctrlKey && e.shiftKey
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, forwardedRef) => {
  const [field, rest] = splitInputFieldProps(props)
  const { shortcut, shortcutPriority = 0, ...inputProps } = rest
  const size = field.size ?? 'medium'
  const inputRef = useRef<HTMLInputElement | null>(null)
  const mobile = checkIsMobile()

  const handleRef = useMergeRefs([inputRef, forwardedRef])

  useEffect(() => {
    if (!shortcut || mobile) return

    const key = getRegistryKey(shortcut)
    if (!registry.has(key)) registry.set(key, new Map())
    registry.get(key)!.set(shortcutPriority, () => inputRef.current)

    const handler = (e: KeyboardEvent) => {
      if (!matchesShortcut(e, shortcut)) return
      e.preventDefault()
      const entries = registry.get(key)
      if (entries) focusHighestPriority(entries)
    }

    document.addEventListener('keydown', handler)
    try {
      if (window.parent && window.parent !== window) {
        window.parent.document.addEventListener('keydown', handler)
      }
    } catch {
      // cross-origin parent — ignore
    }

    return () => {
      registry.get(key)?.delete(shortcutPriority)
      document.removeEventListener('keydown', handler)
      try {
        if (window.parent && window.parent !== window) {
          window.parent.document.removeEventListener('keydown', handler)
        }
      } catch {
        // ignore
      }
    }
  }, [shortcut, shortcutPriority, mobile])

  const defaultPrefix = field.prefix ?? <RiSearchLine size={20} />

  // Don't show shortcut badge on mobile (no physical keyboard)
  const defaultSuffix =
    field.suffix !== undefined ? (
      field.suffix
    ) : shortcut && !mobile ? (
      <kbd className={contractPart(searchInputContract, 'shortcut')}>
        {getShortcutLabel(shortcut)}
      </kbd>
    ) : undefined

  return (
    <InputField
      {...field}
      prefix={defaultPrefix}
      suffix={defaultSuffix}
      size={size}
      className={clsx(searchInputContract.className, field.className)}
    >
      {(_id, control) => (
        <BaseInput
          ref={handleRef}
          {...control}
          type="search"
          size={size}
          hasError={!!field.error}
          disabled={field.disabled}
          className={contractPart(searchInputContract, 'input-inner')}
          {...inputProps}
        />
      )}
    </InputField>
  )
})

SearchInput.displayName = 'SearchInput'
