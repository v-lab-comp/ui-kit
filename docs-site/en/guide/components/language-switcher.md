---
title: LanguageSwitcher
description: Language switcher UI — display and callbacks only.
---

# LanguageSwitcher

Pass locale codes, current value, and **`getLocaleLabel`**; locale state lives in your app.

## Preview

<ComponentDocsPreview name="languageSwitcher" />

## Import

```tsx
import { LanguageSwitcher } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { LanguageSwitcher } from '@v-lab/ui-kit'

const LOCALES = ['uz', 'ru', 'en'] as const

const LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  ru: 'Russian',
  en: 'English',
}

export function LocalePicker() {
  const [locale, setLocale] = useState<string>('en')

  return (
    <LanguageSwitcher
      locales={[...LOCALES]}
      value={locale}
      onLocaleChange={setLocale}
      getLocaleLabel={(code) => LABELS[code] ?? code}
      triggerAriaLabel="Interface language"
    />
  )
}
```

## Main props

| Prop                  | Type                                        | Description                                       |
| --------------------- | ------------------------------------------- | ------------------------------------------------- |
| `locales`             | `readonly string[]`                         | Locale codes in display order                     |
| `value`               | `string`                                    | Current locale (one of **`locales`**)             |
| `onLocaleChange`      | `(locale: string) => void \| Promise<void>` | User picked another locale                        |
| `getLocaleLabel`      | `(locale: string) => string`                | Full label in the dropdown                        |
| `getLocaleShortLabel` | `(locale: string) => string`                | Short label on trigger (default — uppercase code) |
| `prefix`              | `ReactNode`                                 | Icon left on trigger (default translate icon)     |
| `triggerAriaLabel`    | `string`                                    | **`aria-label`** for open button                  |

Other visual props inherit from compact **`SelectInput`** (without **`variant`**, **`options`**, **`value`**, **`onChange`** — fixed by this component). Type — **`LanguageSwitcherProps`**.

## Gallery

Active and disabled with short labels — Storybook **Components/LanguageSwitcher** **Gallery** story.

<ComponentDocsPreview name="languageSwitcherGallery" />

Sources: `src/components/LanguageSwitcher/`.
