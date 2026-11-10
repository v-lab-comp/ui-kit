---
title: useCompositeInput
description: Одна строка value/onChange и несколько частей + скрытые поля формы.
---

# useCompositeInput

Связывает **составное значение** (одна строка для контролируемого инпута) с **массивом частей** через **`split`** и **`join`**. Для нативной формы можно передать **`name`** и **`formNames`**, чтобы получить **`hiddenInputs`** — скрытые поля по частям.

Типичные случаи: протокол + путь URL, код страны + номер телефона (см. **`SiteInput`**, **`PhoneInput`** в репозитории).

## Превью

<ComponentDocsPreview name="hookCompositeInput" />

## Импорт

```tsx
import { useCompositeInput } from '@v-lab/ui-kit'
```

## Поля опций

| Поле                                  | Описание                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `split` / `join`                      | Разбор строки в кортеж частей и обратная сборка                                                   |
| `value` / `defaultValue` / `onChange` | Как у контролируемого поля формы; `onChange(value: string)` получает собранную строку, не событие |
| `name`                                | Имя основного скрытого инпута с полной строкой                                                    |
| `formNames`                           | Имена скрытых полей по индексам частей; `undefined` — часть не уходит в форму                     |

## Пример

```tsx
import { useCompositeInput } from '@v-lab/ui-kit'

function splitEmail(s: string): [string, string] {
  const i = s.indexOf('@')
  if (i === -1) return [s, '']
  return [s.slice(0, i), s.slice(i + 1)]
}

function joinEmail([local, domain]: [string, string]) {
  return domain ? `${local}@${domain}` : local
}

export function useEmailParts(value: string, onChange: (v: string) => void) {
  return useCompositeInput<[string, string]>({
    value,
    onChange,
    split: splitEmail,
    join: joinEmail,
    name: 'email',
    formNames: ['email_local', 'email_domain'],
  })
}
```

Полная документация: **`src/components/inputs/base/COMPOSITE_INPUTS.md`**.

Исходник: `src/components/inputs/base/useCompositeInput.ts`.
