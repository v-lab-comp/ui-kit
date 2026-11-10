---
title: BaseInput
description: Pastki darajali input — yorliqsiz, o‘z maydonlaringiz uchun blok.
---

# BaseInput

Faqat **`input`** o‘lchamlar va holatlar bilan (**`hasError`**, **`disabled`**). Odatda **`InputField`** ichiga o‘raladi ([Kiritish maydonlari — umumiy](/uz/guide/components/inputs/)) yoki tayyor [**TextInput**](/uz/guide/components/text-input), [**EmailInput**](/uz/guide/components/email-input) va boshqalar ishlatiladi.

## Preview

<ComponentDocsPreview name="baseInput" />

## Import

```tsx
import { BaseInput } from '@v-lab/ui-kit'
```

## Misol

Prod’da ko‘proq [**TextInput**](/uz/guide/components/text-input) yoki **`InputField`** o‘ramasi ishlatiladi — bu yerda minimal boshqariladigan kiritish.

```tsx
import { useState } from 'react'
import { BaseInput } from '@v-lab/ui-kit'

export function PlainInput() {
  const [value, setValue] = useState('')
  return (
    <BaseInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Matn kiriting"
      aria-label="Yorliqsiz demo"
      size="medium"
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`BaseInputProps`**: **`HTMLInputElement`** atributlari, **`size`** bilan to‘qnashuvchi bundan mustasno (ayrilgan **`BaseInputSize`**: `big` \| `medium` \| `small`), qo‘shimcha **`hasError`**.

**`autoComplete`** berilmasa, standart **`"off"`** — [Kiritish maydonlari](/uz/guide/components/inputs/) dagi **Avtotoldirish**.

Manbalar: `src/components/inputs/base/BaseInput/` · `BaseInput.types.ts`.
