---
title: SearchInput
description: Prefiksda ikonka bilan qidiruv maydoni.
---

# SearchInput

Qidiruv uslubidagi matn maydoni (standart **chapda ikonka**).

## Preview

<ComponentDocsPreview name="searchInput" />

## Import

```tsx
import { SearchInput } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { SearchInput } from '@v-lab/ui-kit'

export function SearchField() {
  const [value, setValue] = useState('')
  return (
    <SearchInput
      label="Qidiruv"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="So‘rov…"
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`SearchInputProps`**: bir qatorli maydon kabi, qo‘shimcha fokus uchun **`shortcut`** / **`shortcutPriority`**. [Kiritish maydonlari](/uz/guide/components/inputs/) ga qarang.

Manbalar: `src/components/inputs/SearchInput/` · `SearchInput.types.ts`.
