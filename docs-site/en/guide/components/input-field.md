---
title: InputField
description: Field shell — label, hint/error, prefix/suffix, start/end blocks; children as (id) => control.
---

# InputField

Shell for any single-line or composite control: **`label`**, **`hint`** / **`error`**, **`prefix`** / **`suffix`**, **`startBlock`** / **`endBlock`**, **`size`**. Inside you usually put **`BaseInput`**, **`SelectInput`**, or custom markup.

Ready-made fields (**`TextInput`**, **`EmailInput`**, …) already compose **`InputField`** + primitive — this page is for **custom** fields on the same contract.

Composite strings (multiple parts of one value) — [**useCompositeInput**](/en/guide/hooks/use-composite-input); details — **`src/components/inputs/base/COMPOSITE_INPUTS.md`** in the repo.

## Import

```tsx
import { InputField } from '@v-lab/ui-kit'
import type { InputFieldProps } from '@v-lab/ui-kit'
```

Public **`InputFieldProps`** is exported from the main entry (via **`src/components/inputs`**).

## Example with BaseInput

**`children`** — **`ReactNode`** or **`(id: string) => ReactNode`**. The function receives **`id`** to wire **`label`** ↔ inner control **`htmlFor`**.

```tsx
import { forwardRef } from 'react'
import { InputField, BaseInput } from '@v-lab/ui-kit'

type Props = {
  label: string
  hint?: string
  error?: string
}

export const MyField = forwardRef<
  HTMLInputElement,
  Props & React.ComponentPropsWithoutRef<'input'>
>(({ label, hint, error, ...inputProps }, ref) => (
  <InputField label={label} hint={hint} error={error}>
    {(fieldId) => <BaseInput ref={ref} id={fieldId} hasError={!!error} {...inputProps} />}
  </InputField>
))
MyField.displayName = 'MyField'
```

The template in repo **`CLAUDE.md`** matches this pattern.

## Completed state (`completed`) {#input-completed}

**`completed`** tints the standard **1px** wrapper border with **primary** (defaults **`--primary-base`** / **`--primary-dark`** on hover). **`completedColor`** accepts short presets — **`"success"`**, **`"error"`**, **`"warning"`**, **`"primary"`**, **`"information"`**, **`"faded"`**, **`"feature"`**, **`"verified"`**, **`"away"`**, **`"highlighted"`** — each mapped to **`var(--*-base)`** from **`tokens.css`**, or any CSS colour (**`#hex`**, **`rgb()`**, **`var(--…)`**, primitives).

Nothing is applied when **`error`** or **`disabled`** is set.

Built-in fields (**`TextInput`**, **`EmailInput`**, **`TagInput`**, **`SelectInput`** **`full`**, **`AsyncSearchSelect`**, …) inherit these props from **`InputFieldProps`**. For **`SelectInput`** **`compact`** / **`compact-label`** / **`inline`**, the border wraps the trigger button. **`PhoneInput`** and **`SiteInput`** forward the same props to the nested **`SelectInput`** in **`startBlock`**.

More on select variants — [**SelectInput**](./select-input#completed-state).

### Preview

<ComponentDocsPreview name="inputCompleted" />

Storybook: **Inputs/TextInput** — **Completed**, **CompletedCustomColor**; **Inputs/SelectInput** — **Completed (full)** etc.; **Inputs/TagInput**, **Inputs/AsyncSearchSelect**.

## Props (`InputFieldProps`)

| Prop                 | Type                                       | Description                                                                                        |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **`children`**       | `ReactNode \| ((id: string) => ReactNode)` | Field content or render function with **`id`** for **`label`** / input                             |
| **`label`**          | `string`                                   | Label above the field                                                                              |
| **`required`**       | `boolean`                                  | Required marker (`*` next to label)                                                                |
| **`optional`**       | `boolean \| string`                        | “Optional” text or custom copy                                                                     |
| **`labelTooltip`**   | `ReactNode`                                | Node right of label (hint icon)                                                                    |
| **`hint`**           | `string`                                   | Help under the field; hidden when **`error`** is set                                               |
| **`error`**          | `string`                                   | Error; overrides **`hint`**, highlights wrapper                                                    |
| **`completed`**      | `boolean`                                  | Accent border (primary by default); not with **`error`** / **`disabled`**                          |
| **`completedColor`** | `string`                                   | Presets **`success`**, **`error`**, … → **`var(--*-base)`**, or hex / **`rgb()`** / **`var(--…)`** |
| **`prefix`**         | `ReactNode`                                | Slot left inside the border                                                                        |
| **`suffix`**         | `ReactNode`                                | Slot right inside the border                                                                       |
| **`startBlock`**     | `ReactNode`                                | Separate left block (composite fields)                                                             |
| **`endBlock`**       | `ReactNode`                                | Separate right block                                                                               |
| **`size`**           | `'big' \| 'medium' \| 'small'`             | Wrapper height (default **`medium`**)                                                              |
| **`disabled`**       | `boolean`                                  | Disabled state                                                                                     |
| **`id`**             | `string`                                   | Explicit **`id`**; otherwise generated with **`useId`**                                            |
| **`className`**      | `string`                                   | Root field **`div`** class                                                                         |

Live preview of a typical control without a visible label — [**BaseInput**](./base-input); full inputs gallery — [**Overview and gallery**](./inputs/).

Sources: **`src/components/inputs/base/InputField/`** · **`InputField.types.ts`**.
