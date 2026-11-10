import type { InputHTMLAttributes } from 'react'
import type { InputFieldProps } from '../base/InputField'
import type { BaseInputSize } from '../base/BaseInput'
import type { CountryCode } from 'libphonenumber-js'
import type { PhoneLocale } from './phoneLocales'

export type PhoneInputProps = Omit<InputFieldProps, 'children' | 'startBlock'> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'placeholder' | 'disabled' | 'size' | 'prefix'
  > & {
    /** Значение в формате E.164 (напр. +998901234567) */
    value?: string
    defaultValue?: string
    /** Новое значение в формате E.164 (или `''`, если номер очищен) */
    onChange?: (value: string) => void
    name?: string
    size?: BaseInputSize
    placeholder?: string
    /** Код страны по умолчанию (ISO 3166-1: UZ, RU, US...) */
    defaultCountry?: CountryCode
    /** Список стран для выбора (если не задан — все) */
    countries?: CountryCode[]
    /** Язык названий стран: 'ru' | 'en' | 'uz'. По умолчанию 'ru' */
    locale?: PhoneLocale
    /**
     * Доступное имя селекта страны. По умолчанию селект подписан `label` поля,
     * без `label` — названием выбранной страны (например «Узбекистан»).
     */
    countryAriaLabel?: string
  }
