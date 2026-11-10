---
title: BaseCheckbox
description: Low-level input type="checkbox" without a field label — building block for Checkbox and custom fields.
---

# BaseCheckbox

A styled **`input type="checkbox"`** with sizes and **`indeterminate`** support. Usually consumed via [**Checkbox**](./checkbox) (same implementation) or [**CheckboxField**](./checkbox-field) / [**CheckboxCard**](./checkbox-card).

## Preview

<ComponentDocsPreview name="baseCheckbox" />

## Import

```tsx
import { BaseCheckbox, BASE_CHECKBOX_SIZE_OPTIONS } from '@v-lab/ui-kit'
```

## Example

Apps typically import [**Checkbox**](./checkbox); here **`BaseCheckbox`** is used explicitly for custom markup next to a label.

```tsx
import { BaseCheckbox } from '@v-lab/ui-kit'

export function InlineConsent() {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <BaseCheckbox defaultChecked aria-label="Consent" />
      <span>Accept data processing</span>
    </label>
  )
}
```

**`indeterminate`** — for tree or table partial selection:

```tsx
<BaseCheckbox indeterminate aria-label="Partial selection" />
```

## Props (`BaseCheckboxProps`)

| Prop                | Type                        | Description                             |
| ------------------- | --------------------------- | --------------------------------------- |
| **`size`**          | **`medium`** \| **`small`** | Visual size                             |
| **`indeterminate`** | `boolean`                   | Indeterminate state (partial selection) |
| **`className`**     | `string`                    | Extra class on **`<input>`**            |

Other props are standard **`input type="checkbox"`**: **`checked`**, **`defaultChecked`**, **`onChange`**, **`name`**, **`value`**, **`disabled`**, **`required`**, **`aria-*`**, … Use **`id`** / **`aria-labelledby`** or **`aria-label`** for accessibility.

### Full type

**`BaseCheckboxProps`**, **`BASE_CHECKBOX_SIZE_OPTIONS`** — **`BaseCheckbox.types.ts`**.

Sources: `src/components/inputs/base/BaseCheckbox/`.
