import type { ChangeEvent, InputHTMLAttributes } from 'react'
import type { InputFieldProps } from '../base/InputField'
import type { BaseInputSize } from '../base/BaseInput'
import type { CountryCode } from 'libphonenumber-js'
import type { PhoneLocale } from './phoneLocales'

export type PhoneInputProps = Omit<InputFieldProps, 'children'> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'placeholder' | 'disabled' | 'size'
  > & {
    /** Значение в формате E.164 (напр. +998901234567) */
    value?: string
    defaultValue?: string
    /** onChange получает value напрямую (E.164), для совместимости с формами — e.target.value */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    name?: string
    size?: BaseInputSize
    placeholder?: string
    /** Код страны по умолчанию (ISO 3166-1: UZ, RU, US...) */
    defaultCountry?: CountryCode
    /** Список стран для выбора (если не задан — все) */
    countries?: CountryCode[]
    /** Язык названий стран: 'ru' | 'en' | 'uz'. По умолчанию 'ru' */
    locale?: PhoneLocale
  }
