---
title: Checkbox
description: Low-level checkbox — BaseCheckbox wrapper without field label.
---

# Checkbox

**`Checkbox`** is **`BaseCheckbox`**: a single **`input type="checkbox"`** with size styles. Primitive details — [**BaseCheckbox**](./base-checkbox). Label and errors — in [**CheckboxField**](./checkbox-field) or card variant [**CheckboxCard**](./checkbox-card).

## Preview

<ComponentDocsPreview name="checkbox" />

## Import

```tsx
import { Checkbox } from '@v-lab/ui-kit'
```

**`CheckboxField`** / **`CheckboxCard`** are usually easier — see sibling pages under [Inputs](./inputs/).

## Example

Accessibility: set **`aria-label`** or link to a label via **`id`**.

```tsx
import { Checkbox } from '@v-lab/ui-kit'

export function RawCheckbox() {
  return <Checkbox defaultChecked aria-label="Consent to data processing" />
}
```

## Main props

Full type — **`CheckboxProps`** (= **`BaseCheckboxProps`**): **`input type="checkbox"`** attributes, **`size`**, **`indeterminate`**, **`className`**, … More in [**BaseCheckbox**](./base-checkbox).

Sources: `src/components/inputs/Checkbox/Checkbox.tsx` · types — `Checkbox.types.ts`.
