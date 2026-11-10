---
title: EmailInput
description: Email field with icon and format check on blur.
---

# EmailInput

**`InputField`** + **`BaseInput`**, mail prefix, default format validation (**`validationMessage`**).

## Preview

<ComponentDocsPreview name="emailInput" />

## Import

```tsx
import { EmailInput } from '@v-lab/ui-kit'
```

## Example

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
      hint="Format is checked when the field loses focus."
    />
  )
}
```

## Props layout

Same as **[TextInput](./text-input)**: **[InputField](./input-field)** + **[BaseInput](./base-input)**.

### EmailInput-specific

| Prop                    | Type                | Description                                                                                                           |
| ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`validationMessage`** | `string` (optional) | Error text under the field when the email is invalid **on blur**. If omitted, the built-in default (English) is used. |

Other props match the text field.

### Full type

**`EmailInputProps`** — **`EmailInput.types.ts`**.

Sources: `src/components/inputs/EmailInput/`.
