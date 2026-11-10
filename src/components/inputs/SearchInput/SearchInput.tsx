import clsx from 'clsx'
import { forwardRef, useEffect, useId, useRef, useSyncExternalStore } from 'react'
import { RiSearchLine } from '@remixicon/react'
import { InputField, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { searchInputContract } from '@/theme/contracts/search-input'
import type { SearchInputProps, ShortcutConfig } from './SearchInput.types'

type Platform = 'mac' | 'other' | 'mobile'

const noopSubscribe = () => () => {}

/** Платформа клиента; на сервере и при гидрации — `null` (бейдж и хоткей появятся после mount). */
const getClientPlatform = (): Platform => {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } }
  const ua = nav.userAgent
  if (nav.userAgentData?.mobile || /Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return 'mobile'
  const platform = nav.userAgentData?.platform ?? nav.platform ?? ''
  return /mac|iphone|ipad|ipod/i.test(platform || ua) ? 'mac' : 'other'
}

const getServerPlatform = (): Platform | null => null

const usePlatform = (): Platform | null =>
  useSyncExternalStore(noopSubscribe, getClientPlatform, getServerPlatform)

type RegistryEntry = { priority: number; get: () => HTMLInputElement | null }

// Реестр: ключ сочетания → записи по уникальному токену инстанса (не по приоритету — иначе равные затирают друг друга)
const registry = new Map<string, Map<string, RegistryEntry>>()

const getRegistryKey = (cfg: ShortcutConfig): string =>
  `${cfg.key}|${cfg.mac ?? 'cmd'}|${cfg.win ?? 'ctrl+shift'}`

/** Токен инстанса, который должен получить фокус: старший приоритет, при равенстве — первый зарегистрированный. */
const findTarget = (entries: Map<string, RegistryEntry>): string | undefined => {
  let best: [string, number] | undefined
  for (const [token, { priority, get }] of entries) {
    const el = get()
    if (!el || el.disabled) continue
    if (!best || priority > best[1]) best = [token, priority]
  }
  return best?.[0]
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

const getShortcutLabel = (cfg: ShortcutConfig, isMac: boolean): string => {
  const key = cfg.key.toUpperCase()
  if (isMac) {
    return cfg.mac === 'cmd+shift' ? `⌘⇧${key}` : `⌘${key}`
  }
  return cfg.win === 'ctrl' ? `Ctrl ${key}` : `⇧Ctrl ${key}`
}

/** Значение `aria-keyshortcuts` (имена модификаторов по спецификации ARIA). */
const getAriaKeyShortcuts = (cfg: ShortcutConfig, isMac: boolean): string => {
  const key = cfg.key.length === 1 ? cfg.key.toUpperCase() : cfg.key
  if (isMac) return cfg.mac === 'cmd+shift' ? `Meta+Shift+${key}` : `Meta+${key}`
  return cfg.win === 'ctrl' ? `Control+${key}` : `Control+Shift+${key}`
}

const matchesShortcut = (e: KeyboardEvent, cfg: ShortcutConfig, isMac: boolean): boolean => {
  // Use e.code for layout-independent matching (e.key changes with keyboard layout)
  if (e.code !== keyToCode(cfg.key)) return false
  if (isMac) {
    return cfg.mac === 'cmd+shift' ? e.metaKey && e.shiftKey : e.metaKey && !e.shiftKey
  }
  return cfg.win === 'ctrl' ? e.ctrlKey && !e.shiftKey : e.ctrlKey && e.shiftKey
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, forwardedRef) => {
  const [field, rest] = splitInputFieldProps(props)
  const { shortcut, shortcutPriority = 0, ...inputProps } = rest
  const size = field.size ?? 'medium'
  const inputRef = useRef<HTMLInputElement | null>(null)
  const platform = usePlatform()
  // Хоткей и бейдж — только с физической клавиатурой и после определения платформы на клиенте
  const activeShortcut = shortcut && platform && platform !== 'mobile' ? shortcut : undefined
  const isMac = platform === 'mac'
  const token = useId()

  const handleRef = useMergeRefs([inputRef, forwardedRef])

  // Примитивы в зависимостях: объект shortcut часто создаётся заново на каждом рендере
  const shortcutKey = activeShortcut?.key
  const shortcutMac = activeShortcut?.mac
  const shortcutWin = activeShortcut?.win

  useEffect(() => {
    if (shortcutKey === undefined) return
    const cfg: ShortcutConfig = { key: shortcutKey, mac: shortcutMac, win: shortcutWin }

    const key = getRegistryKey(cfg)
    let entries = registry.get(key)
    if (!entries) registry.set(key, (entries = new Map()))
    entries.set(token, { priority: shortcutPriority, get: () => inputRef.current })

    // Слушатель у каждого инстанса, но действует только выбранный — фокус ставится один раз
    const handler = (e: KeyboardEvent) => {
      if (!matchesShortcut(e, cfg, isMac)) return
      const current = registry.get(key)
      if (!current || findTarget(current) !== token) return
      e.preventDefault()
      const el = inputRef.current!
      el.ownerDocument?.defaultView?.focus()
      el.focus()
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
      const current = registry.get(key)
      current?.delete(token)
      if (current?.size === 0) registry.delete(key)
      document.removeEventListener('keydown', handler)
      try {
        if (window.parent && window.parent !== window) {
          window.parent.document.removeEventListener('keydown', handler)
        }
      } catch {
        // ignore
      }
    }
  }, [shortcutKey, shortcutMac, shortcutWin, shortcutPriority, isMac, token])

  const defaultPrefix = field.prefix ?? <RiSearchLine size={20} />

  // Don't show shortcut badge on mobile (no physical keyboard)
  const defaultSuffix =
    field.suffix !== undefined ? (
      field.suffix
    ) : activeShortcut ? (
      // Сочетание озвучивается через aria-keyshortcuts у поля, визуальный бейдж скрыт от AT
      <kbd className={contractPart(searchInputContract, 'shortcut')} aria-hidden>
        {getShortcutLabel(activeShortcut, isMac)}
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
          aria-keyshortcuts={
            activeShortcut ? getAriaKeyShortcuts(activeShortcut, isMac) : undefined
          }
          {...inputProps}
        />
      )}
    </InputField>
  )
})

SearchInput.displayName = 'SearchInput'
