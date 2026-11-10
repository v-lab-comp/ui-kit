import { forwardRef, useCallback, useMemo } from 'react'
import { RiTranslate2 } from '@remixicon/react'
import { SelectInput } from '../inputs/SelectInput/SelectInput'
import type { SelectOptionWithShortLabel } from '../inputs/SelectInput/SelectInput.types'
import type { LanguageSwitcherProps } from './LanguageSwitcher.types'

const defaultShortLabel = (locale: string) => locale.toUpperCase()

export const LanguageSwitcher = forwardRef<HTMLButtonElement, LanguageSwitcherProps>(
  function LanguageSwitcher(
    {
      locales,
      value,
      onLocaleChange,
      getLocaleLabel,
      getLocaleShortLabel = defaultShortLabel,
      prefix = <RiTranslate2 size={20} />,
      size = 'big',
      ...selectProps
    },
    ref
  ) {
    const options = useMemo<SelectOptionWithShortLabel[]>(
      () =>
        locales.map((locale) => ({
          value: locale,
          label: getLocaleLabel(locale),
          shortLabel: getLocaleShortLabel(locale),
        })),
      [locales, getLocaleLabel, getLocaleShortLabel]
    )

    const onChange = useCallback(
      (next: string) => {
        if (next === value) return
        void onLocaleChange(next)
      },
      [onLocaleChange, value]
    )

    return (
      <SelectInput
        ref={ref}
        variant="compact-label"
        options={options}
        value={value}
        onChange={onChange}
        prefix={prefix}
        size={size}
        {...selectProps}
      />
    )
  }
)

LanguageSwitcher.displayName = 'LanguageSwitcher'
