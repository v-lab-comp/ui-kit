---
title: useCompositeInput
description: One string value/onChange with multiple parts + hidden form fields.
---

# useCompositeInput

Maps a **composite value** (one string for a controlled input) to an **array of parts** via **`split`** and **`join`**. For native forms you can pass **`name`** and **`formNames`** to get **`hiddenInputs`** — hidden fields per part.

Typical cases: protocol + URL path, country code + phone number (see **`SiteInput`**, **`PhoneInput`** in the repo).

## Preview

<ComponentDocsPreview name="hookCompositeInput" />

## Import

```tsx
import { useCompositeInput } from '@v-lab/ui-kit'
```

## Options fields

| Field                                 | Description                                                           |
| ------------------------------------- | --------------------------------------------------------------------- |
| `split` / `join`                      | Parse string into a tuple of parts and join back                      |
| `value` / `defaultValue` / `onChange` | Same as a controlled form field                                       |
| `name`                                | Name of the main hidden input with the full string                    |
| `formNames`                           | Hidden field names by part index; `undefined` — part is not submitted |

## Example

```tsx
import { useCompositeInput } from '@v-lab/ui-kit'

function splitEmail(s: string): [string, string] {
  const i = s.indexOf('@')
  if (i === -1) return [s, '']
  return [s.slice(0, i), s.slice(i + 1)]
}

function joinEmail([local, domain]: [string, string]) {
  return domain ? `${local}@${domain}` : local
}

export function useEmailParts(value: string, onChange: (v: string) => void) {
  return useCompositeInput<[string, string]>({
    value,
    onChange: (e) => onChange(e.target.value),
    split: splitEmail,
    join: joinEmail,
    name: 'email',
    formNames: ['email_local', 'email_domain'],
  })
}
```

Full documentation: **`src/components/inputs/base/COMPOSITE_INPUTS.md`**.

Source: `src/components/inputs/base/useCompositeInput.ts`.
