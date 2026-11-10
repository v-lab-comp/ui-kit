---
title: SearchInput
description: Search field with prefix icon.
---

# SearchInput

Text field with search styling (**icon on the left** by default).

## Preview

<ComponentDocsPreview name="searchInput" />

## Import

```tsx
import { SearchInput } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { SearchInput } from '@v-lab/ui-kit'

export function SearchField() {
  const [value, setValue] = useState('')
  return (
    <SearchInput
      label="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Query…"
    />
  )
}
```

## Props layout

Same as **[TextInput](./text-input)**: **[InputField](./input-field)** + search styling (default search icon).

### Focus shortcut

| Prop                   | Type                 | Description                                                                                    |
| ---------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| **`shortcut`**         | **`ShortcutConfig`** | **`key`**, optional **`mac`** (`cmd` \| `cmd+shift`), **`win`** (`ctrl` \| `ctrl+shift`)       |
| **`shortcutPriority`** | `number`             | When several **`SearchInput`** share one combo, the higher priority gets focus (default **0**) |

Without **`shortcut`**, the field behaves like a normal prefixed text input.

### Full type

**`SearchInputProps`** — **`SearchInput.types.ts`**.

Sources: `src/components/inputs/SearchInput/`.
