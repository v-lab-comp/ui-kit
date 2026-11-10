---
title: PasswordInput
description: Password field with visibility toggle.
---

# PasswordInput

Configurable **`prefix`** / **`suffix`**; default suffix shows/hides the password.

## Preview

<ComponentDocsPreview name="passwordInput" />

## Import

```tsx
import { PasswordInput } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { PasswordInput } from '@v-lab/ui-kit'

export function PasswordField() {
  const [value, setValue] = useState('')
  return (
    <PasswordInput
      label="Password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter password"
    />
  )
}
```

## Props layout

Same as **[TextInput](./text-input)**: **[InputField](./input-field)** + **[BaseInput](./base-input)**.

### PasswordInput-specific

| Detail              | Description                                                                  |
| ------------------- | ---------------------------------------------------------------------------- |
| **`type`**          | Fixed to **`password`**; **`type`** is omitted from the public props         |
| **Prefix / suffix** | Default suffix toggles visibility; override with **`prefix`** / **`suffix`** |

Inherited: **`label`**, **`hint`**, **`error`**, **`size`**, **`disabled`**, **`startBlock`**, **`endBlock`**, and input attributes (**`value`**, **`onChange`**, **`placeholder`**, **`name`**, **`autoComplete`** …).

### Full type

**`PasswordInputProps`** — **`PasswordInput.types.ts`**.

Sources: `src/components/inputs/PasswordInput/`.
