---
title: SelectInput
description: Dropdown with search, grouped options, full / compact / inline; multiple mode.
---

# SelectInput

Pick from a flat **`options`** list or grouped **`groups`** (section title + items, like shadcn **SelectGroup**). Full row with **`label`** / **`hint`**, search for long lists, **`placement`** via Floating UI. **`mode="multiple"`** — checkbox rows and a summary in the trigger.

## Preview

<ComponentDocsPreview name="selectInput" />

### Grouped options (`groups`)

<ComponentDocsPreview name="selectInputGrouped" />

### Multiple selection (`mode="multiple"`)

<ComponentDocsPreview name="selectInputMultiple" />

## Import

```tsx
import { SelectInput } from '@v-lab/ui-kit'
import type {
  SelectInputProps,
  SelectInputMultipleChangeEvent,
  SelectInputOptionsProp,
  SelectOption,
  SelectOptionGroup,
} from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'

const OPTIONS = [
  { value: 'a', label: 'First' },
  { value: 'b', label: 'Second' },
]

export function RegionSelect() {
  const [value, setValue] = useState('')
  return (
    <SelectInput
      label="Region"
      options={OPTIONS}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

Option icons, **`variant="inline"`**, long lists — Storybook **Inputs/SelectInput** (**Grouped options**, **Multiple (summary)**).

## `completed` state {#completed-state}

**`completed`** and **`completedColor`** match **[InputField](./input-field#input-completed)**:

- **`variant="full"`** — same bordered shell as text fields.
- **`compact`** / **`compact-label`** — border on the trigger; **`completedColor`** sets **`--input-completed-border`** on the button.
- **`inline`** — **1px** border on the trigger (transparent by default).

With **`error`** or **`disabled`**, the accent is hidden. Preview: **[InputField completed](./input-field#input-completed)** or Storybook **Completed (full)** / **Completed (compact)**.

## Grouped lists (`groups`)

Use **`groups`** instead of **`options`**: an array of **`{ label, options }`**. Headers are non-interactive; sections are separated visually. The hidden native **`<select>`** renders **`<optgroup>`**. Types require either **`options`** or **`groups`** (**`SelectInputOptionsProp`**). If both appear at runtime (e.g. prop spreading), **`groups`** wins.

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'
import type { SelectOptionGroup } from '@v-lab/ui-kit'

const GROUPS: SelectOptionGroup[] = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [{ value: 'carrot', label: 'Carrot' }],
  },
]

export function GroupedSelect() {
  const [value, setValue] = useState('')
  return (
    <SelectInput
      label="Category"
      placeholder="Choose…"
      groups={GROUPS}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

Search filters items; empty groups are hidden.

## `mode="multiple"`

Only with **`variant="full"`** (default):

- **`value?: string[]`**, **`onChange`** receives **`SelectInputMultipleChangeEvent`** with **`event.target.value`** as the selected option **`value`** strings.
- Non-empty selection: **`multipleSummaryLabel (N)`** or **`multipleSummaryRender`**; empty: **`placeholder`**.
- Dropdown keeps **open** when toggling items; search shows when there is more than one option.
- **`SelectOption.description`** adds a second line under **`label`** (included in search).
- Hidden **`<select multiple>`** for native form posts.

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'
import type { SelectInputMultipleChangeEvent } from '@v-lab/ui-kit'

const OPTIONS = [
  { value: 'a', label: 'Field A', description: 'Category' },
  { value: 'b', label: 'Field B', description: 'Category' },
]

export function ExtraFieldsSelect() {
  const [value, setValue] = useState<string[]>([])
  return (
    <SelectInput
      mode="multiple"
      label="More fields"
      placeholder="Select fields…"
      options={OPTIONS}
      value={value}
      onChange={(e: SelectInputMultipleChangeEvent) => setValue(e.target.value)}
      multipleSummaryLabel="Change selection"
      searchPlaceholder="Search field"
    />
  )
}
```

## Variants (`variant`)

**`SelectInputProps`** is a union of four variants (discriminated by **`variant`**):

| Value                | Use case                                                   |
| -------------------- | ---------------------------------------------------------- |
| **`full`** (default) | Full row with **`label`**, **`hint`**, **`error`**         |
| **`compact`**        | Icon/text trigger + chevron only                           |
| **`compact-label`**  | Compact trigger; each option must include **`shortLabel`** |
| **`inline`**         | Inline dashed trigger — toolbars                           |

For **`compact`** / **`compact-label`** / **`inline`**, **`InputField`** layout is reduced as defined in the type.

## Options

| Type                             | Fields                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| **`SelectOption`**               | **`value`**, **`label`**, optional **`description`**, **`icon`**, **`searchKeywords`** |
| **`SelectOptionWithShortLabel`** | Same + required **`shortLabel`**                                                       |
| **`SelectOptionGroup`**          | **`label`** (section heading), **`options`**: **`SelectOption[]`**                     |

## Shared props (all variants)

In addition to **`options`** or **`groups`** and variant-specific fields:

| Prop                       | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| **`size`**                 | **`big`** \| **`medium`** \| **`small`**                                    |
| **`placeholder`**          | Empty-state label                                                           |
| **`prefix`**               | Left icon when the selected option has no **`icon`**                        |
| **`labelTooltip`**         | Node next to **`label`** (mainly **`full`**)                                |
| **`searchThreshold`**      | Show search inside dropdown when option count exceeds this (default **20**) |
| **`searchPlaceholder`**    | Search field placeholder inside the list                                    |
| **`lazyLoadPageSize`**     | Lazy-load page size (default **50**)                                        |
| **`placement`**            | **`bottom`** \| **`top`** \| **`left`** \| **`right`** for the dropdown     |
| **`dropdownWidth`**        | Fixed dropdown width (px)                                                   |
| **`dropdownPortalZIndex`** | Portal **`z-index`** override                                               |
| **`dropdownMaxHeight`**    | Max list height (px or CSS string), default **320**                         |
| **`optionTextWrap`**       | Wrap long option labels                                                     |
| **`triggerAriaLabel`**     | **`aria-label`** for triggers without visible label                         |

### Full type

**`SelectInputProps`**, **`SelectInputOptionsProp`**, **`FullVariantMultipleProps`**, **`SelectInputMultipleChangeEvent`**, **`SelectOption`**, **`SelectOptionGroup`**, **`SelectVariant`** — **`SelectInput.types.ts`**.

Sources: `src/components/inputs/SelectInput/`.
