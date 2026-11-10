---
title: ShareLinkInput
description: Link field with copy action in the suffix.
---

# ShareLinkInput

Built-in **`endBlock`** with clipboard copy; optional **`onCopied`** callback.

## Preview

<ComponentDocsPreview name="shareLinkInput" />

## Import

```tsx
import { ShareLinkInput } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { ShareLinkInput } from '@v-lab/ui-kit'

export function ShareField() {
  const [value, setValue] = useState('')
  return (
    <ShareLinkInput
      label="Link"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="www.example.com/path"
    />
  )
}
```

## Props layout

Same as **[TextInput](./text-input)** plus copy UI in the suffix / **`endBlock`**.

| Prop           | Type                          | Description                                                                  |
| -------------- | ----------------------------- | ---------------------------------------------------------------------------- |
| **`onCopied`** | **`(value: string) => void`** | Called after **successful** copy to clipboard; argument is the copied string |

Without **`onCopied`**, copy still works.

### Full type

**`ShareLinkInputProps`** — **`ShareLinkInput.types.ts`**.

Sources: `src/components/inputs/ShareLinkInput/`.
