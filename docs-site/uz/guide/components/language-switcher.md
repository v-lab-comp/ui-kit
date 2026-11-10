---
title: LanguageSwitcher
description: Til almashtirgichi UI — faqat ko‘rinish va callbacklar.
---

# LanguageSwitcher

Lokal kodlari ro‘yxati, joriy qiymat va **`getLocaleLabel`** beriladi; lokalni saqlash — ilova tomonda.

## Preview

<ComponentDocsPreview name="languageSwitcher" />

## Import

```tsx
import { LanguageSwitcher } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { LanguageSwitcher } from '@v-lab/ui-kit'

const LOCALES = ['uz', 'ru', 'en'] as const

const LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  ru: 'Rus tili',
  en: 'English',
}

export function LocalePicker() {
  const [locale, setLocale] = useState<string>('ru')

  return (
    <LanguageSwitcher
      locales={[...LOCALES]}
      value={locale}
      onLocaleChange={setLocale}
      getLocaleLabel={(code) => LABELS[code] ?? code}
      triggerAriaLabel="Interfeys tili"
    />
  )
}
```

## Asosiy proplar

| Prop                  | Tip                                         | Tavsif                                                  |
| --------------------- | ------------------------------------------- | ------------------------------------------------------- |
| `locales`             | `readonly string[]`                         | Tartibda ko‘rsatiladigan lokal kodlari                  |
| `value`               | `string`                                    | Joriy lokal (**`locales`** dan biri)                    |
| `onLocaleChange`      | `(locale: string) => void \| Promise<void>` | Ro‘yxatdan boshqa lokal tanlanganda                     |
| `getLocaleLabel`      | `(locale: string) => string`                | Tushadigan ro‘yxatdagi to‘liq yozuv                     |
| `getLocaleShortLabel` | `(locale: string) => string`                | Triggdagi qisqa yozuv (standart — koding bosh harflari) |
| `prefix`              | `ReactNode`                                 | Triggda chapda ikonka (standart — tarjima ikonkasi)     |
| `triggerAriaLabel`    | `string`                                    | Ochish tugmasi uchun **`aria-label`**                   |

Qolgan vizual proplar ixcham **`SelectInput`** dan meros (**`variant`**, **`options`**, **`value`**, **`onChange`** berilmaydi — komponent mazmunida hal qilingan). Tip — **`LanguageSwitcherProps`**.

## Galereya

Ikki holat — faol va qisqa yozuvlar bilan faolsiz — Storybook **Components/LanguageSwitcher** dagi **Gallery** hikoyasi kabi.

<ComponentDocsPreview name="languageSwitcherGallery" />

Manbalar: `src/components/LanguageSwitcher/`.
