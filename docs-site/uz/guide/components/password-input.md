---
title: PasswordInput
description: Ko‘rinishni almashtirgich bilan parol maydoni.
---

# PasswordInput

Sozlanadigan **`prefix`** / **`suffix`**; standart suffiks parolni ko‘rsatadi/yashiradi.

## Preview

<ComponentDocsPreview name="passwordInput" />

## Import

```tsx
import { PasswordInput } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { PasswordInput } from '@v-lab/ui-kit'

export function PasswordField() {
  const [value, setValue] = useState('')
  return (
    <PasswordInput
      label="Parol"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Parolni kiriting"
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`PasswordInputProps`**: **`InputField`** + `type` siz **`BaseInput`** (maydon turi qotirilgan), qolgani matn maydonlari kabi. [Kiritish maydonlari](/uz/guide/components/inputs/) ga qarang.

Manbalar: `src/components/inputs/PasswordInput/` · `PasswordInput.types.ts`.
