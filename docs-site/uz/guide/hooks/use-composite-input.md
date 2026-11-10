---
title: useCompositeInput
description: Bitta value/onChange qatori, bir nechta qismlar + forma yashirin maydonlari.
---

# useCompositeInput

**Murakkab qiymat**ni (boshqariladigan input uchun bitta qator) **`split`** va **`join`** orqali **qismlar massivi** bilan bog‘laydi. Tabiiy forma uchun **`name`** va **`formNames`** berib **`hiddenInputs`** — qismlar bo‘yicha yashirin maydonlarni olish mumkin.

Odatdagi holatlar: URL uchun protokol + yo‘l, telefon uchun mamlakat kodi + raqam (repozitoriydagi **`SiteInput`**, **`PhoneInput`** ga qarang).

## Preview

<ComponentDocsPreview name="hookCompositeInput" />

## Import

```tsx
import { useCompositeInput } from '@v-lab/ui-kit'
```

## Parametr maydonlari

| Maydon                                | Tavsif                                                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `split` / `join`                      | Qatorni qismlar kortejiga ajratish va qayta yig‘ish                                                        |
| `value` / `defaultValue` / `onChange` | Boshqariladigan forma maydoni bilan bir xil; `onChange(value: string)` hodisa emas, yig‘ilgan satrni oladi |
| `name`                                | To‘liq qatorli asosiy yashirin input nomi                                                                  |
| `formNames`                           | Qismlar indekslari bo‘yicha yashirin maydon nomlari; `undefined` — forma ga chiqmaydi                      |

## Misol

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

To‘liq hujjat: **`src/components/inputs/base/COMPOSITE_INPUTS.md`**.

Manba: `src/components/inputs/base/useCompositeInput.ts`.
