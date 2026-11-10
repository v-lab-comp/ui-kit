import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import {
  skinChain,
  themeHtmlAttributes,
  type ColorScheme,
  type ColorSchemePreference,
  type Skin,
} from './skin'

export type ThemeContextValue = {
  /** Имя активного скина */
  skin: string
  setSkin: (name: string) => void
  /** Имена доступных скинов */
  skins: string[]
  /** Выбор пользователя: light / dark / system */
  colorScheme: ColorSchemePreference
  /** Фактическая схема после учёта системной настройки */
  resolvedColorScheme: ColorScheme
  setColorScheme: (scheme: ColorSchemePreference) => void
}

export type ThemeProviderProps<S extends readonly Skin[] = readonly Skin[]> = {
  /** Доступные скины; первый — по умолчанию */
  skins: S
  /** Controlled: активный скин */
  skin?: S[number]['name']
  /** Uncontrolled: стартовый скин */
  defaultSkin?: S[number]['name']
  onSkinChange?: (name: S[number]['name']) => void
  /** Controlled: схема */
  colorScheme?: ColorSchemePreference
  /** Uncontrolled: стартовая схема. По умолчанию `light` */
  defaultColorScheme?: ColorSchemePreference
  onColorSchemeChange?: (scheme: ColorSchemePreference) => void
  /** Ключ localStorage, чтобы запоминать выбор пользователя (только uncontrolled) */
  storageKey?: string
  /**
   * Не удалось загрузить CSS скина (`load` отклонился). Остаётся применённым предыдущий скин.
   * Без обработчика ошибка пишется в `console.error`.
   */
  onSkinLoadError?: (error: unknown, skinName: string) => void
  children?: ReactNode
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

type Stored = { skin?: string; colorScheme?: ColorSchemePreference }

const readStorage = (key: string | undefined): Stored => {
  if (!key || typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? '{}') as Stored
  } catch {
    return {}
  }
}

const writeStorage = (key: string | undefined, value: Stored) => {
  if (!key || typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // приватный режим / квота — выбор просто не запомнится
  }
}

const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)'

const getSystemQuery = (): MediaQueryList | undefined =>
  typeof window !== 'undefined' ? window.matchMedia?.(SYSTEM_DARK_QUERY) : undefined

// Функции модульного уровня: стабильная ссылка, поэтому подписка на matchMedia
// создаётся один раз, а не после каждого рендера.
const subscribeSystemScheme = (onChange: () => void) => {
  const query = getSystemQuery()
  if (!query) return () => {}
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getSystemScheme = (): ColorScheme => (getSystemQuery()?.matches ? 'dark' : 'light')

// На сервере системная схема неизвестна
const getServerSystemScheme = (): ColorScheme => 'light'

const useSystemScheme = (): ColorScheme =>
  useSyncExternalStore(subscribeSystemScheme, getSystemScheme, getServerSystemScheme)

type Applied = { skin: Skin; scheme: ColorScheme }
type Snapshot = {
  skin: string | null
  scheme: string | null
  theme: string | null
  colorScheme: string
}

/**
 * Провайдеров на странице может быть несколько (несколько React-корней, виджет со своим
 * провайдером). На `<html>` действует последний применённый; исходное состояние `<html>`
 * восстанавливается, только когда уходит последний провайдер, — иначе ранний провайдер
 * при размонтировании снял бы скин с ещё живого.
 */
const appliedStack: Applied[] = []
let original: Snapshot | null = null

// Те же атрибуты, что `themeHtmlAttributes` отдаёт для серверного `<html>`, — расходиться им нельзя.
const writeToDocument = ({ skin, scheme }: Applied) => {
  const root = document.documentElement
  const { style, ...attrs } = themeHtmlAttributes(skin, scheme)
  for (const [name, value] of Object.entries(attrs)) root.setAttribute(name, value)
  root.style.colorScheme = style.colorScheme
}

/** Атрибуты на `<html>`: скин и схема доходят и до порталов (модалки, тосты, дропдауны). */
const applyToDocument = (skin: Skin, scheme: ColorScheme) => {
  const root = document.documentElement
  if (appliedStack.length === 0) {
    original = {
      skin: root.getAttribute('data-vl-skin'),
      scheme: root.getAttribute('data-vl-scheme'),
      theme: root.getAttribute('data-theme'),
      colorScheme: root.style.colorScheme,
    }
  }
  const entry: Applied = { skin, scheme }
  appliedStack.push(entry)
  writeToDocument(entry)

  return () => {
    appliedStack.splice(appliedStack.indexOf(entry), 1)
    const top = appliedStack[appliedStack.length - 1]
    if (top) {
      writeToDocument(top)
      return
    }
    if (!original) return
    const restore = (name: string, value: string | null) =>
      value === null ? root.removeAttribute(name) : root.setAttribute(name, value)
    restore('data-vl-skin', original.skin)
    restore('data-vl-scheme', original.scheme)
    restore('data-theme', original.theme)
    root.style.colorScheme = original.colorScheme
    original = null
  }
}

export function ThemeProvider<const S extends readonly Skin[]>({
  skins,
  skin: skinProp,
  defaultSkin,
  onSkinChange,
  colorScheme: schemeProp,
  defaultColorScheme = 'light',
  onColorSchemeChange,
  storageKey,
  onSkinLoadError,
  children,
}: ThemeProviderProps<S>) {
  if (skins.length === 0) throw new Error('ThemeProvider: передайте хотя бы один скин в `skins`')

  const [stored] = useState(() => readStorage(storageKey))
  const [skinState, setSkinState] = useState<string>(
    () => stored.skin ?? defaultSkin ?? skins[0].name
  )
  const [schemeState, setSchemeState] = useState<ColorSchemePreference>(
    () => stored.colorScheme ?? defaultColorScheme
  )

  const skinName = skinProp ?? skinState
  const colorScheme = schemeProp ?? schemeState
  const systemScheme = useSystemScheme()
  const resolvedColorScheme = colorScheme === 'system' ? systemScheme : colorScheme

  const activeSkin = skins.find((s) => s.name === skinName) ?? skins[0]
  // Скин с `load` применяем только после загрузки его CSS (пока грузится — остаётся
  // предыдущий применённый); скин без `load` применяется сразу.
  const needsLoad = skinChain(activeSkin).some((s) => s.load)
  const [lastLoaded, setLastLoaded] = useState<Skin | null>(null)
  // Запоминаем и скин без `load`, чтобы при переключении на ленивый (или при ошибке
  // его загрузки) на `<html>` оставался он, а не пустота. Обновление состояния
  // во время рендера — штатный приём React для производного состояния.
  if (!needsLoad && lastLoaded !== activeSkin) setLastLoaded(activeSkin)
  const appliedSkin = needsLoad ? lastLoaded : activeSkin

  // Свежий обработчик без перезапуска загрузки при смене его ссылки
  const onSkinLoadErrorRef = useRef(onSkinLoadError)
  useEffect(() => {
    onSkinLoadErrorRef.current = onSkinLoadError
  })

  useEffect(() => {
    if (!needsLoad) return
    let cancelled = false
    // `new Promise` превращает и синхронный throw из `load` в отклонение
    const loads = skinChain(activeSkin).flatMap((s) =>
      s.load ? [new Promise((resolve) => resolve(s.load?.()))] : []
    )
    Promise.all(loads).then(
      () => {
        if (!cancelled) setLastLoaded(activeSkin)
      },
      (error: unknown) => {
        // Предыдущий загруженный скин остаётся применённым
        if (cancelled) return
        const handler = onSkinLoadErrorRef.current
        if (handler) handler(error, activeSkin.name)
        else console.error(`ThemeProvider: не удалось загрузить скин «${activeSkin.name}»`, error)
      }
    )
    return () => {
      cancelled = true
    }
  }, [activeSkin, needsLoad])

  useIsomorphicLayoutEffect(() => {
    if (!appliedSkin) return
    return applyToDocument(appliedSkin, resolvedColorScheme)
  }, [appliedSkin, resolvedColorScheme])

  useEffect(() => {
    if (skinProp === undefined && schemeProp === undefined)
      writeStorage(storageKey, { skin: skinState, colorScheme: schemeState })
  }, [storageKey, skinProp, schemeProp, skinState, schemeState])

  const setSkin = useCallback(
    (name: string) => {
      if (!skins.some((s) => s.name === name)) {
        throw new Error(
          `ThemeProvider: скин «${name}» не передан в skins (${skins.map((s) => s.name).join(', ')})`
        )
      }
      if (skinProp === undefined) setSkinState(name)
      onSkinChange?.(name as S[number]['name'])
    },
    [skins, skinProp, onSkinChange]
  )

  const setColorScheme = useCallback(
    (scheme: ColorSchemePreference) => {
      if (schemeProp === undefined) setSchemeState(scheme)
      onColorSchemeChange?.(scheme)
    },
    [schemeProp, onColorSchemeChange]
  )

  const value = useMemo<ThemeContextValue>(
    () => ({
      skin: activeSkin.name,
      setSkin,
      skins: skins.map((s) => s.name),
      colorScheme,
      resolvedColorScheme,
      setColorScheme,
    }),
    [activeSkin, setSkin, skins, colorScheme, resolvedColorScheme, setColorScheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme: компонент должен быть внутри <ThemeProvider>')
  return ctx
}
