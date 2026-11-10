---
title: SiteInput
description: Composite URL field — protocol and path, hidden form fields via useCompositeInput.
---

# SiteInput

Protocol selector (**`protocolOptions`** + **`SelectInput variant="inline"`**) and path string; form value is the full URL string.

**`completed`** / **`completedColor`** apply to the protocol selector and the main shell — [**InputField**](./input-field#input-completed).

## Preview

<ComponentDocsPreview name="siteInput" />

## Import

```tsx
import { SiteInput } from '@v-lab/ui-kit'
```

## Example

Submitted value is **`https://…`** (protocol + path); with **`protocolOptions`** the scheme is selectable.

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
      label="Website"
      protocolOptions={PROTOCOL_OPTIONS}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="www.example.com"
    />
  )
}
```

## Props layout

Composite URL field: protocol + path as one form value. Uses **[useCompositeInput](/en/guide/hooks/use-composite-input)** internally.

| Prop                  | Description                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`protocol`**        | Static protocol prefix (default **`https://`**). Ignored if **`protocolOptions`** is set                                                   |
| **`protocolOptions`** | **`SelectOptionWithShortLabel[]`** for inline protocol **`SelectInput`**; each **`value`** is a protocol string; **`shortLabel`** required |

Otherwise like **[TextInput](./text-input)**: **[InputField](./input-field)** without **`startBlock`** + path **`BaseInput`**.

### Full type

**`SiteInputProps`** — **`SiteInput.types.ts`**.

Sources: `src/components/inputs/SiteInput/`.
