export type ColorScheme = 'light' | 'dark'
export type ColorSchemePreference = ColorScheme | 'system'

export type Skin<Name extends string = string> = {
  readonly name: Name
  /** Скин обязан поддерживать обе схемы */
  readonly schemes: readonly ['light', 'dark']
  /** Базовый скин: его стили применяются, этот скин переопределяет токены поверх */
  readonly extends?: Skin
  /** Ленивая загрузка CSS скина (например, `() => import('./brand.css')`) */
  readonly load?: () => Promise<unknown>
}

export const defineSkin = <const Name extends string>(skin: Skin<Name>): Skin<Name> => skin

/** Цепочка от базового скина к текущему: `brand extends corporate` → `[corporate, brand]` */
export const skinChain = (skin: Skin): Skin[] =>
  skin.extends ? [...skinChain(skin.extends), skin] : [skin]

/** Атрибуты `<html>` для скина и схемы — те же, что ставит `ThemeProvider`. */
export type ThemeHtmlAttributes = {
  'data-vl-skin': string
  'data-vl-scheme': ColorScheme
  'data-theme': ColorScheme
  style: { colorScheme: ColorScheme }
}

/**
 * Для SSR: отрисуйте эти атрибуты на серверном `<html>`, чтобы стили скина работали с первого
 * кадра, ещё до гидрации (`ThemeProvider` ставит их только в эффекте на клиенте).
 *
 * @example <html lang="ru" {...themeHtmlAttributes(corporateSkin, 'light')}>
 */
export const themeHtmlAttributes = (
  skin: Skin,
  scheme: ColorScheme = 'light'
): ThemeHtmlAttributes => ({
  'data-vl-skin': skinChain(skin)
    .map((s) => s.name)
    .join(' '),
  'data-vl-scheme': scheme,
  'data-theme': scheme,
  style: { colorScheme: scheme },
})
