import type { ReactNode } from 'react'
import type {
  SelectInputProps,
  SelectOptionWithShortLabel,
} from '../inputs/SelectInput/SelectInput.types'

/** Только плоский `options` — без `groups`, иначе rest-пропсы пересекаются с union `SelectInput`. */
type CompactLabelSelect = Extract<
  SelectInputProps,
  { variant: 'compact-label'; options: SelectOptionWithShortLabel[] }
>

/**
 * Переключатель локали: только список кодов, текущее значение и колбэки.
 * Подписи опций и смена локали — на стороне приложения.
 *
 * @example
 * ```tsx
 * const labels: Record<string, string> = { uz: "O'zbek", ru: 'Русский', en: 'English' }
 *
 * <LanguageSwitcher
 *   locales={['uz', 'ru', 'en']}
 *   value={locale}
 *   onLocaleChange={setLocale}
 *   getLocaleLabel={(code) => labels[code] ?? code}
 *   triggerAriaLabel="Language"
 * />
 * ```
 */
export type LanguageSwitcherProps = Omit<
  CompactLabelSelect,
  'variant' | 'options' | 'onChange' | 'value'
> & {
  /** Коды локалей в том же смысле, что и `SUPPORTED_LOCALES` на фронте */
  locales: readonly string[]
  /** Текущая локаль (одна из `locales`) */
  value: string
  /** Вызывается при выборе другой локали из списка */
  onLocaleChange: (locale: string) => void | Promise<void>
  /** Подпись опции в выпадающем списке по коду локали */
  getLocaleLabel: (locale: string) => string
  /** Короткая подпись на триггере; по умолчанию `locale.toUpperCase()` */
  getLocaleShortLabel?: (locale: string) => string
  /** Иконка слева на триггере (по умолчанию `RiTranslate2`) */
  prefix?: ReactNode
}
