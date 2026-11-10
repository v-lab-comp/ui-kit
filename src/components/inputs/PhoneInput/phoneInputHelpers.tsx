import { createElement } from 'react'
import type { CountryCode } from 'libphonenumber-js'
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
  getExampleNumber,
  Metadata,
} from 'libphonenumber-js/max'
import examples from 'libphonenumber-js/examples.mobile'
import { getCountries } from 'react-phone-number-input/input-max'
import ru from 'react-phone-number-input/locale/ru'
import en from 'react-phone-number-input/locale/en'
import type { SelectOptionWithShortLabel } from '../SelectInput'
import { COUNTRY_TO_FLAG } from './countryFlags'
import type { PhoneLocale } from './phoneLocales'
import { COUNTRY_SHORT_NAMES, COUNTRY_NAMES_OVERRIDE } from './phoneLocales'

const BASE_LOCALES: Record<PhoneLocale, Record<string, string>> = {
  ru: ru as Record<string, string>,
  en: en as Record<string, string>,
  uz: en as Record<string, string>,
}

/** Страна номера в любом виде (E.164, с разделителями, национальный относительно `country`) */
export function getPhoneCountry(value: string, country: CountryCode): CountryCode | undefined {
  return parsePhoneNumberFromString(value, country)?.country
}

/**
 * Полный номер из произвольного текста: `+998 90 123-45-67`, `998901234567`, `90 123 45 67` (UZ),
 * `8 912 345-67-89` (RU). Неполный номер или номер без страны — `undefined`.
 */
export function parseFullPhone(
  text: string,
  country?: CountryCode
): { country: CountryCode; e164: string } | undefined {
  const pn = parsePhoneNumberFromString(text, country)
  return pn?.country && pn.isPossible() ? { country: pn.country, e164: pn.number } : undefined
}

/**
 * Значение для поля выбранной страны. E.164 (в том числе неполный при вводе) отдаётся как есть,
 * остальное нормализуется в E.164. Номер другого кода страны или неразбираемый текст — `undefined`.
 */
export function normalizePhoneValue(
  value: string | undefined,
  country: CountryCode
): string | undefined {
  if (!value) return undefined
  const e164 = /^\+\d+$/.test(value) ? value : parsePhoneNumberFromString(value, country)?.number
  return e164?.startsWith(`+${getCountryCallingCode(country)}`) ? e164 : undefined
}

/** Флаг-эмодзи по ISO 3166-1 alpha-2 (для стран без компонента флага в UI-ките) */
function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase()
  if (code.length !== 2) return ''
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)))
}

/** Список стран, поддерживаемых инпутом (тот же metadata — маска применяется по стране) */
export { getCountries } from 'react-phone-number-input/input-max'

/** Страны для выбора: поддерживаемые, суженные фильтром `countries` */
export function getAllowedCountries(countriesFilter?: CountryCode[]): CountryCode[] {
  const supported = getCountries()
  return countriesFilter && countriesFilter.length > 0
    ? countriesFilter.filter((c) => supported.includes(c))
    : supported
}

/** Максимальная длина национального номера (без кода страны) для выбранной страны */
export function getMaxNationalLength(country: CountryCode): number {
  try {
    const meta = new Metadata()
    meta.selectNumberingPlan(country)
    const lengths = (meta as unknown as { possibleLengths(): number[] }).possibleLengths()
    if (Array.isArray(lengths) && lengths.length > 0) {
      const nums = lengths.filter((n): n is number => typeof n === 'number')
      return nums.length > 0 ? Math.max(...nums) : 15
    }
    return 15
  } catch {
    return 15
  }
}

/** Плейсхолдер в формате маски при вводе (международный формат без кода страны — совпадает с отображением в поле) */
export function getPlaceholderForCountry(country: CountryCode, fallback: string): string {
  const ex = getExampleNumber(country, examples)
  if (!ex) return fallback
  const code = getCountryCallingCode(country)
  const intl = ex.formatInternational()
  const prefix = `+${code} `
  return intl.startsWith(prefix) ? intl.slice(prefix.length) : intl
}

/** Полное название страны по коду и локали */
function getCountryName(country: CountryCode, locale: PhoneLocale): string {
  const override = COUNTRY_NAMES_OVERRIDE[locale][country]
  if (override) return override
  return BASE_LOCALES[locale][country] ?? country
}

/** Опции стран для PhoneInput — страны из того же metadata, что и инпут (маска по стране), флаги из нашей библиотеки */
export function getPhoneCountryOptions(
  countriesFilter?: CountryCode[],
  locale: PhoneLocale = 'ru'
): SelectOptionWithShortLabel[] {
  const shortNames = COUNTRY_SHORT_NAMES[locale]
  return getAllowedCountries(countriesFilter).map((country) => {
    const code = getCountryCallingCode(country)
    const fullName = getCountryName(country, locale)
    const short = shortNames[country]
    const displayLabel = short?.label ?? fullName
    const searchKeywords = short ? [fullName, ...short.keywords] : undefined
    const FlagIcon = COUNTRY_TO_FLAG[country]
    const icon = FlagIcon
      ? createElement(FlagIcon, { size: 20, title: fullName })
      : createElement(
          'span',
          {
            role: 'img',
            'aria-label': fullName,
            title: fullName,
            style: { fontSize: 20, lineHeight: 1, display: 'inline-block' },
          },
          getFlagEmoji(country)
        )
    return {
      value: country,
      label: displayLabel,
      shortLabel: `+${code}`,
      icon,
      searchKeywords,
    }
  })
}
