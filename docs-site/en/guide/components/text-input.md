---
title: TextInput
description: Single-line text field with label, hint, and error.
---

# TextInput

Standard input on **`InputField`** + **`BaseInput`**: **`label`**, **`hint`**, **`error`**, **`prefix`** / **`suffix`**, **`size`**.

## Preview

<ComponentDocsPreview name="textInput" />

## Import

```tsx
import { TextInput } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { TextInput } from '@v-lab/ui-kit'

export function NameField() {
  const [value, setValue] = useState('')
  return (
    <TextInput
      label="Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter name"
    />
  )
}
```

## Props layout

**`TextInput`** composes **[InputField](./input-field)** and **[BaseInput](./base-input)**. **`TextInputProps`** merges:

1. **InputField** props except **`children`** (filled internally): **`label`**, **`hint`**, **`error`**, **`prefix`**, **`suffix`**, **`startBlock`**, **`endBlock`**, **`size`**, **`disabled`**, **`id`**, **`required`**, **`optional`**, **`labelTooltip`**, **`className`** — see the InputField table.
2. **`<input>`** attributes (**`BaseInputProps`** with **`prefix`**, **`size`**, **`id`**, **`disabled`**, **`className`** omitted — those come from the field shell).

**`hasError`**, **`size`**, **`id`**, **`disabled`** are wired consistently between **`InputField`** and **`BaseInput`**.

**`completed`** and **`completedColor`** for the accent border come from **[InputField](./input-field#input-completed)** (preview and table there).

### Common `<input>` attributes

| Attribute                                                                                                        | Purpose                     |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **`value`** / **`defaultValue`**                                                                                 | Controlled or initial value |
| **`onChange`**                                                                                                   | Value updates               |
| **`placeholder`**                                                                                                | Placeholder text            |
| **`name`**                                                                                                       | Form field name             |
| **`autoComplete`**, **`inputMode`**, **`maxLength`**, **`minLength`**, **`readOnly`**, **`pattern`**, **`step`** | Standard HTML behaviour     |

See **`InputHTMLAttributes<HTMLInputElement>`** in the types (minus the omissions above).

### Full type

**`TextInputProps`** — **`TextInput.types.ts`**.

Sources: `src/components/inputs/TextInput/`.
