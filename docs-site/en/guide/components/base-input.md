---
title: BaseInput
description: Low-level input without label — building block for custom fields.
---

# BaseInput

Only the **`input`** with sizes and states (**`hasError`**, **`disabled`**). Usually wrapped in **`InputField`** (see [Inputs overview](./inputs/)) or use ready-made [**TextInput**](./text-input), [**EmailInput**](./email-input), etc.

## Preview

<ComponentDocsPreview name="baseInput" />

## Import

```tsx
import { BaseInput } from '@v-lab/ui-kit'
```

## Example

In production you more often use [**TextInput**](./text-input) or **`InputField`** — here is a minimal controlled field.

```tsx
import { useState } from 'react'
import { BaseInput } from '@v-lab/ui-kit'

export function PlainInput() {
  const [value, setValue] = useState('')
  return (
    <BaseInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
      aria-label="Demo without visible label"
      size="medium"
    />
  )
}
```

## Props (`BaseInputProps`)

Extends **`InputHTMLAttributes<HTMLInputElement>`** with a custom **`size`**:

| Prop           | Type                                     | Description                                                     |
| -------------- | ---------------------------------------- | --------------------------------------------------------------- |
| **`size`**     | **`big`** \| **`medium`** \| **`small`** | Height: **40** / **36** / **32** px                             |
| **`hasError`** | `boolean`                                | Error border (usually from parent **`InputField`** **`error`**) |

All other attributes match native **`<input>`**: **`value`**, **`defaultValue`**, **`onChange`**, **`placeholder`**, **`name`**, **`type`**, **`disabled`**, **`readOnly`**, **`autoComplete`**, **`inputMode`**, **`maxLength`**, **`min`**, **`max`**, **`step`**, **`pattern`**, **`aria-*`**, …

If **`autoComplete`** is omitted, it defaults to **`"off"`** — see [**Inputs → Autocomplete**](./inputs/).

With **[InputField](./input-field)**, use **`children={(id) => <BaseInput id={id} hasError={!!error} … />}`**.

### Full type

**`BaseInputProps`**, **`BASE_INPUT_SIZE_OPTIONS`** — **`BaseInput.types.ts`**.

Sources: `src/components/inputs/base/BaseInput/`.
