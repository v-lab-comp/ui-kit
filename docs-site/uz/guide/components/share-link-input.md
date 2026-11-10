---
title: ShareLinkInput
description: Suffiksda nusxa olish harakati bilan havola maydoni.
---

# ShareLinkInput

Tayyor **`endBlock`** va buferga nusxa olish; kerak bo‘lsa **`onCopy`** callback.

## Preview

<ComponentDocsPreview name="shareLinkInput" />

## Import

```tsx
import { ShareLinkInput } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { ShareLinkInput } from '@v-lab/ui-kit'

export function ShareField() {
  const [value, setValue] = useState('')
  return (
    <ShareLinkInput
      label="Havola"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="www.example.com/path"
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`ShareLinkInputProps`**: **`InputField`** + **`BaseInput`** + muvaffaqiyatli nusxalashdan keyin ixtiyoriy **`onCopy`**. [Kiritish maydonlari](/uz/guide/components/inputs/).

Manbalar: `src/components/inputs/ShareLinkInput/` · `ShareLinkInput.types.ts`.
