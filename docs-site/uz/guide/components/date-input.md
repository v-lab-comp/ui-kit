---
title: DateInput
description: Maskali sana va taqvim — alohida entry @v-lab/ui-kit/date.
---

# DateInput

**`imask`** va **`react-imask`** peer-bog‘liqliklarini talab qiladi. Import **`@v-lab/ui-kit/date`**. REST/API uchun **`valueFormat="iso"`** qulay (`YYYY-MM-DD` **`onChange`** / **`onAccept`** da).

Taqvim maydon yoki prefiksdagi taqvim ikonkasiga bosilganda ochiladi; sanani tanlagach panel yopiladi; **Escape** va komponentdan tashqariga bosilganda ham yopiladi. Pozitsiyasi ekranga moslashadi: pastda joy bo‘lmasa yuqoriga ochiladi, chetlarda ko‘rinadigan sohaga suriladi — shu sababli to‘liq, qirqilishsiz va gorizontal skrollsiz ko‘rinadi. Panjarada bugungi kun ajratilgan.

## Preview

<ComponentDocsPreview name="dateInput" />

## Import

```tsx
import { DateInput } from '@v-lab/ui-kit/date'
```

Peer’lar haqida — [O‘rnatish](/uz/guide/installation).

## Misol

API ga yuborish uchun **`valueFormat="iso"`** qulay — **`onChange`** / **`onAccept`** da **`YYYY-MM-DD`**.

```tsx
import { useState } from 'react'
import { DateInput } from '@v-lab/ui-kit/date'

export function BirthDateField() {
  const [value, setValue] = useState('')
  return (
    <DateInput
      label="Tug‘ilgan sana"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      valueFormat="iso"
      placeholder="KK.OO.YYYY"
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`DateInputProps`**: **`InputField`** + maska/taqvim; **`valueFormat`** `'masked'` \| `'iso'`; **`onAccept`**; **`locale`**, **`getDotDays`**, … Qarang **`DateInput.types.ts`** JSDoc.

Manbalar: `src/components/inputs/DateInput/`.
