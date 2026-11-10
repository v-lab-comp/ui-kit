---
title: LanguageSwitcher
description: UI переключателя языка — только отображение и колбэки.
---

# LanguageSwitcher

Передаёте список кодов локалей, текущее значение и **`getLocaleLabel`**; хранение локали — на стороне приложения.

## Превью

<ComponentDocsPreview name="languageSwitcher" />

## Импорт

```tsx
import { LanguageSwitcher } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { LanguageSwitcher } from '@v-lab/ui-kit'

const LOCALES = ['uz', 'ru', 'en'] as const

const LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
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
      triggerAriaLabel="Язык интерфейса"
    />
  )
}
```

## Основные пропсы

| Проп                  | Тип                                         | Описание                                                           |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------ |
| `locales`             | `readonly string[]`                         | Коды локалей в порядке отображения                                 |
| `value`               | `string`                                    | Текущая локаль (одна из **`locales`**)                             |
| `onLocaleChange`      | `(locale: string) => void \| Promise<void>` | Выбор другой локали из списка                                      |
| `getLocaleLabel`      | `(locale: string) => string`                | Полная подпись в выпадающем списке                                 |
| `getLocaleShortLabel` | `(locale: string) => string`                | Короткая подпись на триггере (по умолчанию — верхний регистр кода) |
| `prefix`              | `ReactNode`                                 | Иконка слева на триггере (по умолчанию translate-иконка)           |
| `triggerAriaLabel`    | `string`                                    | **`aria-label`** для кнопки открытия                               |

Остальные визуальные пропсы наследуются от компактного **`SelectInput`** (без **`variant`**, **`options`**, **`value`**, **`onChange`** — они заданы смыслом компонента). Тип — **`LanguageSwitcherProps`**.

## Галерея

Два состояния — активное и отключённое с короткими подписями — как история **Gallery** у **Components/LanguageSwitcher** в Storybook.

<ComponentDocsPreview name="languageSwitcherGallery" />

Исходники: `src/components/LanguageSwitcher/`.
