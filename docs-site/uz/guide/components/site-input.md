---
title: SiteInput
description: URL ning murakkab maydoni — protokol va yo‘l, useCompositeInput orqali forma yashirin maydonlari.
---

# SiteInput

Protokol tanlovi (**`protocolOptions`** + **`SelectInput variant="inline"`**) va yo‘l qatori; forma uchun qiymat — to‘liq URL qatori.

**`completed`** / **`completedColor`** protokol tanloviga ham asosiy o‘ramga ham — **[InputField](/uz/guide/components/input-field#input-completed)**.

## Preview

<ComponentDocsPreview name="siteInput" />

## Import

```tsx
import { SiteInput } from '@v-lab/ui-kit'
```

## Misol

Formadagi to‘liq qiymat — **`https://…`** qatori (protokol + yo‘l); **`protocolOptions`** berilsa sxema tanlanadi.

```tsx
import { useState } from 'react'
import { SiteInput } from '@v-lab/ui-kit'

const PROTOCOL_OPTIONS = [
  { value: 'https://', shortLabel: 'https://', label: 'HTTPS' },
  { value: 'http://', shortLabel: 'http://', label: 'HTTP' },
]

export function WebsiteField() {
  const [value, setValue] = useState('https://')
  return (
    <SiteInput
      label="Sayt"
      protocolOptions={PROTOCOL_OPTIONS}
      value={value}
      onChange={setValue}
      placeholder="www.example.com"
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`SiteInputProps`**: **`startBlock`** siz **`InputField`** + **`BaseInput`** + **`protocol`** / **`protocolOptions`** / **`protocolAriaLabel`** (URL ning murakkab qiymati, **`useCompositeInput`** ga qarang). [Kiritish maydonlari](/uz/guide/components/inputs/).

Protokol tanlovi — **[SelectInput](./select-input)** kabi klaviaturali **combobox**. Nomi: **`protocolAriaLabel`**, aks holda maydon **`label`** i (**`aria-labelledby`** orqali), **`label`** bo‘lmasa — tanlangan opsiyaning **`label`** i.

Manbalar: `src/components/inputs/SiteInput/` · `SiteInput.types.ts`.
