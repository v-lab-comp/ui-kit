---
title: EmailInput
description: Ikonka va blur da format tekshiruvi bilan email maydoni.
---

# EmailInput

**`InputField`** + **`BaseInput`** bog‘lanishi, pochta prefiksi va standart tekshiruv (**`validationMessage`**).

## Preview

<ComponentDocsPreview name="emailInput" />

## Import

```tsx
import { EmailInput } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { EmailInput } from '@v-lab/ui-kit'

export function EmailField() {
  const [value, setValue] = useState('')
  return (
    <EmailInput
      label="Email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="name@example.com"
      hint="Fokus yo‘qotganda format tekshiriladi."
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`EmailInputProps`**: **`TextInput`** kabi, qo‘shimcha ixtiyoriy **`validationMessage`** — blur da noto‘g‘ri email uchun xato matni (kodda standart). [Kiritish maydonlari](/uz/guide/components/inputs/) ga qarang.

Manbalar: `src/components/inputs/EmailInput/` · `EmailInput.types.ts`.
