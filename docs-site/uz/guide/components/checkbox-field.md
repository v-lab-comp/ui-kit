---
title: CheckboxField
description: Yorliq, maslahat va xato bilan belgilash qutisi — matn maydonlari bilan bir xil naqsh.
---

# CheckboxField

**`InputField`** + **`Checkbox`** o‘ramasi: **`label`**, **`hint`**, **`error`**, **`CHECKBOX_SIZE_OPTIONS`** o‘lchamlari.

## Preview

<ComponentDocsPreview name="checkboxField" />

## Import

```tsx
import { CheckboxField } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { CheckboxField } from '@v-lab/ui-kit'

export function TermsField() {
  return (
    <CheckboxField
      label="Shartlarni qabul qilaman"
      name="terms"
      hint="Maydon ostidagi maslahat matni."
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`CheckboxFieldProps`**: **`CheckboxProps`** ni **`label`**, **`hint`**, **`error`**, **`sublabel`**, **`tag`**, **`description`**, **`link`**, **`flip`**, … maydonlari bilan kengaytiradi.

Manbalar: `src/components/inputs/Checkbox/CheckboxField/` · `Checkbox.types.ts`.
