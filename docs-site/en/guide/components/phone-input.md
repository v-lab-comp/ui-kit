---
title: PhoneInput
description: Phone with international format — entry @v-lab/ui-kit/phone.
---

# PhoneInput

Requires **`libphonenumber-js`** and **`react-phone-number-input`**. Import from **`@v-lab/ui-kit/phone`**.

With **`completed`** / **`completedColor`**, both the field shell and the country selector (**SelectInput** in **`startBlock`**) pick up the accent — see [**InputField**](./input-field#input-completed).

## Preview

<ComponentDocsPreview name="phoneInput" />

## Import

```tsx
import { PhoneInput } from '@v-lab/ui-kit/phone'
```

Peer details — [Installation](/en/guide/installation).

## Example

**`value`** uses **E.164** format (e.g. `+998901234567`).

```tsx
import { useState } from 'react'
import { PhoneInput } from '@v-lab/ui-kit/phone'

export function PhoneField() {
  const [value, setValue] = useState('')
  return <PhoneInput label="Phone" value={value} onChange={setValue} defaultCountry="UZ" />
}
```

## Value and country

- **`onChange`** always emits **E.164**, or `""` for an empty field.
- **Non-E.164 `value`** (`901234567`, `+998-901234567`, `+998 90 123-45-67`) is displayed correctly, but **`onChange` is not called**, so the form does not become dirty. An unparseable value shows an empty field.
- **An external `value` change** (form `reset`, a drawer reopened for another record) takes the country from the number when it is in **`countries`**. An empty value does not reset the country.
- **Pasting a full number** (`+998 90 123 45 67`, `998901234567`, `+7 912 345 67 89`) replaces the field and switches the country.
- **Changing the country by the user** clears the number.

With **react-hook-form**, a value set via `reset()` after mount is shown with the right country:

```tsx
const { field } = useController({ name: 'phone', control })
<PhoneInput label="Phone" value={field.value} onChange={field.onChange} />
```

## Props layout

Import from **`@v-lab/ui-kit/phone`**. Shell — **[InputField](./input-field)**; value is **E.164**.

| Prop                             | Type                           | Description                                     |
| -------------------------------- | ------------------------------ | ----------------------------------------------- |
| **`value`** / **`defaultValue`** | `string`                       | **E.164** number (other formats are normalized) |
| **`onChange`**                   | `(value: string) => void`      | **E.164** string (or `""`), not an event        |
| **`name`**                       | `string`                       | Form field name                                 |
| **`size`**                       | **`BaseInputSize`**            | **`big`** \| **`medium`** \| **`small`**        |
| **`placeholder`**                | `string`                       | Mask placeholder                                |
| **`defaultCountry`**             | **`CountryCode`**              | Default country (e.g. **`UZ`**, **`US`**)       |
| **`countries`**                  | **`CountryCode[]`**            | Restrict country list                           |
| **`locale`**                     | **`'ru'` \| `'en'` \| `'uz'`** | Country name language (default **`ru`**)        |
| **`countryAriaLabel`**           | `string`                       | Accessible name of the country select (below)   |

**[InputField](./input-field)** props (**`endBlock`**, **`wrapperClassName`**, **`wrapperStyle`**, …) go to the field shell; **`startBlock`** is taken by the country select.

### Accessibility

The country selector is a **combobox** with the same keyboard and search behaviour as **[SelectInput](./select-input#keyboard-and-accessibility)**. Its accessible name is **`countryAriaLabel`**, otherwise the field **`label`** (via **`aria-labelledby`**), and without a **`label`** — the selected country name.

### Full type

**`PhoneInputProps`** — **`PhoneInput.types.ts`**.

Sources: `src/components/inputs/PhoneInput/`.
