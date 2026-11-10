---
title: CheckboxField
description: Checkbox with label, hint, and error — same pattern as text fields.
---

# CheckboxField

**`InputField`** + **`Checkbox`**: **`label`**, **`hint`**, **`error`**, sizes **`CHECKBOX_SIZE_OPTIONS`**.

## Preview

<ComponentDocsPreview name="checkboxField" />

## Import

```tsx
import { CheckboxField } from '@v-lab/ui-kit'
```

## Example

```tsx
import { CheckboxField } from '@v-lab/ui-kit'

export function TermsField() {
  return <CheckboxField label="I accept the terms" name="terms" hint="Hint text below the field." />
}
```

## Main props

Full type — **`CheckboxFieldProps`**: extends **`CheckboxProps`** with **`label`**, **`hint`**, **`error`**, **`sublabel`**, **`tag`**, **`description`**, **`link`**, **`flip`**, …

Sources: `src/components/inputs/Checkbox/CheckboxField/` · `Checkbox.types.ts`.
