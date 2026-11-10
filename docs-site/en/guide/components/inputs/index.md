---
title: Inputs
description: InputField + BaseInput pattern, component list, optional entry points, and live gallery by size.
---

# Inputs

Everything under **`src/components/inputs/`** follows one pattern: **`InputField`** shell (label, hint, error, prefix/suffix, size) and an inner control — usually **`BaseInput`** or custom markup (**`SelectInput`**, **`Checkbox`**, composite fields).

Structure matches Storybook **`Inputs/`**: shell [**InputField**](../input-field), primitives [**BaseInput**](../base-input), [**BaseCheckbox**](../base-checkbox), [Checkbox](../checkbox), [CheckboxCard](../checkbox-card), [CheckboxField](../checkbox-field), [DateInput](../date-input), [EmailInput](../email-input), [PasswordInput](../password-input), [PhoneInput](../phone-input), [SearchInput](../search-input), [SelectInput](../select-input), [AsyncSearchSelect](../async-search-select), [ShareLinkInput](../share-link-input), [SiteInput](../site-input), [TagInput](../tag-input), [TextInput](../text-input). **`FileUpload`** lives under **`Components/`** in Storybook — see [FileUpload](../file-upload).

## Building your own field

1. Import **`InputField`** and **`BaseInput`** (or another primitive).
2. Pass **`children`** to **`InputField`** as **`(fieldId) => …`** and forward **`fieldId`** to the inner control **`id`**.
3. Surface errors via **`error`** on **`InputField`** — the border highlights via **`hasError`** on **`BaseInput`**.

Short skeleton:

```tsx
import { forwardRef } from 'react'
import { InputField } from '@v-lab/ui-kit'
import { BaseInput } from '@v-lab/ui-kit'

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => (
  <InputField label={props.label} hint={props.hint} error={props.error} id={props.id}>
    {(fieldId) => <BaseInput ref={ref} id={fieldId} hasError={!!props.error} {...props} />}
  </InputField>
))
MyInput.displayName = 'MyInput'
```

Full template and rules — repo **`CLAUDE.md`** and [**useCompositeInput**](/en/guide/hooks/use-composite-input) for composite values.

## Main package exports

Import from **`@v-lab/ui-kit`**:

| Component / hook                                                          | Role                                                                                      |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [**BaseInput**](../base-input), [**BaseCheckbox**](../base-checkbox)      | Low-level controls without label                                                          |
| [**InputField**](../input-field)                                          | Shell: label, hint, error, prefix/suffix, size                                            |
| **`TextInput`**, **`EmailInput`**, **`PasswordInput`**, **`SearchInput`** | Typical single-line fields                                                                |
| **`SiteInput`**, **`ShareLinkInput`**                                     | Composite strings (URLs, links)                                                           |
| **`SelectInput`**                                                         | Dropdown                                                                                  |
| **`TagInput`**                                                            | Chip tags: free typing and optional suggestion list (including remote)                    |
| **`AsyncSearchSelect`**                                                   | Dropdown with async search/load                                                           |
| **`Checkbox`**, **`CheckboxField`**, **`CheckboxCard`**                   | Checkboxes                                                                                |
| **`useCompositeInput`**                                                   | Composite value and hidden form fields — see [hooks](/en/guide/hooks/use-composite-input) |

## Optional dependencies (separate entries)

To avoid heavy peers in the main bundle:

| Entry                     | Component                         |
| ------------------------- | --------------------------------- |
| **`@v-lab/ui-kit/date`**  | **`DateInput`** (mask + calendar) |
| **`@v-lab/ui-kit/phone`** | **`PhoneInput`**                  |
| **`@v-lab/ui-kit/pdf`**   | **[PdfPreview](../pdf-preview)**  |

Setup and peer versions — [Installation](/en/guide/installation) and repo **`package.json`**.

## Autocomplete (`autoComplete`)

**[BaseInput](../base-input)** defaults to **`autoComplete="off"`** so the browser does not inject saved values into generic fields. Narrow components set sensible defaults: **[EmailInput](../email-input)** → **`email`**, **[PasswordInput](../password-input)** → **`current-password`**, **[PhoneInput](../phone-input)** → **`tel`**. **[DateInput](../date-input)** (`/date` entry) uses **`off`** for the masked control by default. Override any default by passing **`autoComplete`**.

## Gallery

Three size columns (**big / medium / small**) and main states — like Storybook **Gallery → Inputs**. Grid source: **`src/docs/InputsGalleryPage.tsx`**.

<ComponentDocsPreview name="inputsGallery" />

Interactive controls and all variants — **`npm run storybook`**.
