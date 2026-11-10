import clsx from 'clsx'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import PhoneInputLib from 'react-phone-number-input/input-max'
import {
  getCountryCallingCode,
  parseDigits,
  validatePhoneNumberLength,
} from 'libphonenumber-js/max'
import type { CountryCode } from 'libphonenumber-js'
import { InputField } from '../base/InputField'
import { formFields } from '../base/useCompositeInput'
import { SelectInput } from '../SelectInput'
import {
  getAllowedCountries,
  getMaxNationalLength,
  getPhoneCountry,
  getPhoneCountryOptions,
  getPlaceholderForCountry,
  normalizePhoneValue,
  parseFullPhone,
} from './phoneInputHelpers'
import { phoneLocaleStrings } from './phoneLocales'
import { contractPart } from '@/theme/contract'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { phoneInputContract } from '@/theme/contracts/phone-input'
import type { PhoneInputProps } from './PhoneInput.types'

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      prefix,
      suffix,
      id,
      size = 'medium',
      disabled,
      className,
      value: valueProp,
      defaultValue,
      onChange,
      name,
      placeholder,
      defaultCountry = 'UZ',
      countries,
      locale = 'ru',
      ...inputProps
    },
    ref
  ) => {
    // Библиотека пересылает ref сама и теряет очистку callback-ref (React 19) — оборачиваем
    const phoneRef = useMergeRefs([ref])
    const allowedCountries = useMemo(() => getAllowedCountries(countries), [countries])
    const isAllowed = useCallback(
      (c: CountryCode | undefined): c is CountryCode => !!c && allowedCountries.includes(c),
      [allowedCountries]
    )
    const [country, setCountry] = useState<CountryCode>(() => {
      const fromValue = getPhoneCountry(valueProp ?? defaultValue ?? '', defaultCountry)
      if (isAllowed(fromValue)) return fromValue
      return isAllowed(defaultCountry) ? defaultCountry : allowedCountries[0]
    })
    const [internalValue, setInternalValue] = useState(() =>
      normalizePhoneValue(defaultValue, country)
    )
    const [clearDisplayUntilEmpty, setClearDisplayUntilEmpty] = useState(false)

    const isControlled = valueProp !== undefined
    const phoneValue = isControlled ? valueProp || undefined : internalValue
    // Последнее значение, которое компонент сам отдал в onChange или уже учёл снаружи
    const [knownValue, setKnownValue] = useState(phoneValue)

    // Сброс флага, когда значение уже пустое (см. react.dev — adjusting state when props change)
    if (!phoneValue && clearDisplayUntilEmpty) {
      setClearDisplayUntilEmpty(false)
    }

    // Внешняя смена value (reset формы, другая запись): страна — из номера. Пустое значение страну не меняет
    if (phoneValue !== knownValue && !clearDisplayUntilEmpty) {
      setKnownValue(phoneValue)
      const valueCountry = getPhoneCountry(phoneValue ?? '', country)
      if (isAllowed(valueCountry) && valueCountry !== country) setCountry(valueCountry)
    }

    // При смене страны передаём в библиотеку пустое значение до синхронизации,
    // иначе маска не переключается (родитель в контролируемом режиме может ещё не обновить value)
    const valueForLib = clearDisplayUntilEmpty
      ? undefined
      : normalizePhoneValue(phoneValue, country)

    const countryOptions = useMemo(
      () => getPhoneCountryOptions(countries, locale),
      [countries, locale]
    )
    const localeStrings = phoneLocaleStrings[locale]

    const emit = useCallback(
      (newValue: string) => {
        setKnownValue(newValue || undefined)
        if (!isControlled) setInternalValue(newValue || undefined)
        onChange?.({
          target: { value: newValue, name: name ?? '' },
        } as React.ChangeEvent<HTMLInputElement>)
      },
      [isControlled, onChange, name]
    )

    const applyFullPhone = useCallback(
      (phone: { country: CountryCode; e164: string }) => {
        setCountry(phone.country)
        emit(phone.e164)
      },
      [emit]
    )

    const handlePhoneChange = useCallback(
      (v: string | undefined) => {
        const code = getCountryCallingCode(country)
        if (!v || v === `+${code}`) return emit('')
        let e164 = v
        try {
          let result = validatePhoneNumberLength(e164, country)
          const nationalDigits = parseDigits(e164).slice(code.length)
          const prevDigits = parseDigits(valueForLib ?? '').slice(code.length)
          // Несколько цифр разом (автозаполнение, вставка без paste-события) — возможно, это целый номер с кодом страны
          if (result === 'TOO_LONG' && nationalDigits.length - prevDigits.length > 1) {
            const full =
              parseFullPhone(`+${nationalDigits}`) ?? parseFullPhone(nationalDigits, country)
            if (full && isAllowed(full.country)) return applyFullPhone(full)
          }
          while (result === 'TOO_LONG') {
            const digits = parseDigits(e164).slice(code.length)
            if (digits.length <= 1) break
            e164 = `+${code}${digits.slice(0, -1)}`
            result = validatePhoneNumberLength(e164, country)
          }
        } catch {
          // ограничение длины не применяем — маска и ввод не ломаем
        }
        emit(e164)
      },
      [country, valueForLib, emit, applyFullPhone, isAllowed]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { selectionStart, selectionEnd } = e.currentTarget
        if (/^\d$/.test(e.key) && valueForLib && selectionStart === selectionEnd) {
          const code = getCountryCallingCode(country)
          const nationalDigits = parseDigits(valueForLib).slice(code.length)
          if (nationalDigits.length >= getMaxNationalLength(country)) {
            e.preventDefault()
          }
        }
      },
      [country, valueForLib]
    )

    // Вставка полного номера (в т.ч. с кодом страны) заменяет поле целиком и переключает страну
    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (e.currentTarget.readOnly) return
        const full = parseFullPhone(e.clipboardData.getData('text'), country)
        if (!full) return
        e.preventDefault()
        if (isAllowed(full.country)) applyFullPhone(full)
      },
      [country, isAllowed, applyFullPhone]
    )

    const handleCountryChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value as CountryCode)
        setClearDisplayUntilEmpty(true)
        emit('')
      },
      [emit]
    )

    const showCompletedChrome = !!(completed && !error && !disabled)

    const startBlock = (
      <div className={contractPart(phoneInputContract, 'phone-country-select')}>
        <SelectInput
          variant="compact-label"
          options={countryOptions}
          value={country}
          onChange={handleCountryChange}
          disabled={disabled}
          size={size}
          placement="bottom"
          searchPlaceholder={localeStrings.searchPlaceholder}
          dropdownWidth={280}
          completed={showCompletedChrome}
          completedColor={completedColor}
        />
      </div>
    )

    const hiddenInputs = name
      ? formFields({
          [name]: phoneValue ?? '',
          country,
        })
      : null

    return (
      <>
        {hiddenInputs}
        <InputField
          label={label}
          required={required}
          requiredMarker={requiredMarker}
          optional={optional}
          labelTooltip={labelTooltip}
          hint={hint}
          error={error}
          completed={completed}
          completedColor={completedColor}
          prefix={prefix}
          suffix={suffix}
          size={size}
          disabled={disabled}
          className={clsx(phoneInputContract.className, className)}
          id={id}
          startBlock={startBlock}
        >
          {(fieldId) => (
            <div className={contractPart(phoneInputContract, 'phone-input')}>
              <PhoneInputLib
                key={country}
                ref={phoneRef}
                id={fieldId}
                country={country}
                international={true}
                withCountryCallingCode={false}
                value={valueForLib}
                onChange={handlePhoneChange}
                disabled={disabled}
                data-filled={!!valueForLib || undefined}
                placeholder={getPlaceholderForCountry(
                  country,
                  placeholder ?? localeStrings.enterNumber
                )}
                className={contractPart(phoneInputContract, 'phone-input-field')}
                {...inputProps}
                autoComplete={inputProps.autoComplete ?? 'tel'}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  handleKeyDown(e)
                  inputProps.onKeyDown?.(e)
                }}
                onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                  handlePaste(e)
                  inputProps.onPaste?.(e)
                }}
              />
            </div>
          )}
        </InputField>
      </>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'
