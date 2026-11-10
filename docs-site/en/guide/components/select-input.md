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
      onChange={(next) => setValue(next)}
    />
  )
}
```

Option icons, **`variant="inline"`**, long lists — Storybook **Inputs/SelectInput** (**Grouped options**, **Multiple (summary)**).

## Value, `ref` and forms

- **`onChange(value, option)`** receives the new value and the selected option; on clear — **`''`** and **`null`**. Picking the already selected option does not call **`onChange`**.
- **`ref`** points to the trigger button (**`HTMLButtonElement`**): **`ref.current.focus()`** focuses the field (e.g. on a form validation error).
- Standard button attributes (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**, **`autoFocus`**…) go to the trigger.
- With **`name`**, the value is submitted with the native form via a hidden **`<input type="hidden">`**; an empty value is an empty string. **`form`** — form id when the field is outside it.

## Keyboard and accessibility

The field is a **combobox** with a **listbox** (WAI-ARIA APG): focus stays on the trigger, the active option is announced via **`aria-activedescendant`**.

| Keys                                           | Action                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| **↓** / **↑** / **Enter** / **Space**          | Open the list; when open — move the active option / select                |
| **Home** / **End** / **PageUp** / **PageDown** | First / last option, step of 10                                           |
| Printable characters                           | Jump to the option starting with the typed text (when there is no search) |
| **Escape**                                     | Close the list; inside a **Modal** only the list closes                   |
| **Tab**                                        | Close the list and move on                                                |
| **Delete** / **Backspace**                     | Clear the value                                                           |

When the list has a search field, focus moves into it on open (arrows and **Enter** work from there) and returns to the trigger on close. The list also closes on outside click or when focus leaves it. "No results" / "No options" are announced via **`role="status"`**.

**`compact`** / **`compact-label`** / **`inline`** have no visible label, so **`aria-label`** or **`aria-labelledby`** is required (enforced by TypeScript):

```tsx
<SelectInput variant="compact-label" aria-label="Currency" options={CURRENCIES} />
```

## `completed` state {#completed-state}

**`completed`** and **`completedColor`** match **[InputField](./input-field#input-completed)**:

- **`variant="full"`** — same bordered shell as text fields.
- **`compact`** / **`compact-label`** — border on the trigger; **`completedColor`** sets **`--input-completed-border`** on the button.
- **`inline`** — **1px** border on the trigger (transparent by default).

With **`error`** or **`disabled`**, the accent is hidden. Preview: **[InputField completed](./input-field#input-completed)** or Storybook **Completed (full)** / **Completed (compact)**.

## Grouped lists (`groups`)

Use **`groups`** instead of **`options`**: an array of **`{ label, options }`**. Headers are non-interactive; sections are separated visually. Types require either **`options`** or **`groups`** (**`SelectInputOptionsProp`**). If both appear at runtime (e.g. prop spreading), **`groups`** wins.

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
      onChange={(next) => setValue(next)}
    />
  )
}
```

Search filters items; empty groups are hidden.

## `mode="multiple"`

Only with **`variant="full"`** (default):

- **`value?: string[]`**, **`onChange(value, options)`** receives the new array of option **`value`** strings and the selected options.
- Non-empty selection: **`multipleSummaryLabel (N)`** or **`multipleSummaryRender`**; empty: **`placeholder`**.
- Dropdown keeps **open** when toggling items (click, **Enter** / **Space**); search shows when there is more than one option.
- **`SelectOption.description`** adds a second line under **`label`** (included in search).
- With **`name`**, each value is submitted as a separate hidden field (like **`<select multiple>`**).

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'

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
      onChange={(next) => setValue(next)}
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

**`compact`** / **`compact-label`** / **`inline`** have no **`InputField`**: **`label`**, **`hint`**, **`required`** etc. are not available, **`error`** gives a red border and **`aria-invalid`**. **`aria-label`** or **`aria-labelledby`** is required.

## Options

| Type                             | Fields                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| **`SelectOption`**               | **`value`**, **`label`**, optional **`description`**, **`icon`**, **`searchKeywords`** |
| **`SelectOptionWithShortLabel`** | Same + required **`shortLabel`**                                                       |
| **`SelectOptionGroup`**          | **`label`** (section heading), **`options`**: **`SelectOption[]`**                     |

## Shared props (all variants)

In addition to **`options`** or **`groups`** and variant-specific fields:

| Prop                                     | Description                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| **`size`**                               | **`big`** \| **`medium`** \| **`small`**                                           |
| **`placeholder`**                        | Empty-state label                                                                  |
| **`prefix`**                             | Left icon when the selected option has no **`icon`**                               |
| **`labelTooltip`**                       | Node next to **`label`** (mainly **`full`**)                                       |
| **`searchThreshold`**                    | Show search inside dropdown when option count exceeds this (default **20**)        |
| **`searchPlaceholder`**                  | Search field placeholder inside the list                                           |
| **`lazyLoadPageSize`**                   | Lazy-load page size (default **50**)                                               |
| **`placement`**                          | **`bottom`** \| **`top`** \| **`left`** \| **`right`** for the dropdown            |
| **`dropdownWidth`**                      | Fixed dropdown width (px)                                                          |
| **`dropdownPortalZIndex`**               | Portal **`z-index`** override                                                      |
| **`dropdownMaxHeight`**                  | Max list height (px or CSS string), default **320**                                |
| **`optionTextWrap`**                     | Wrap long option labels                                                            |
| **`aria-label`** / **`aria-labelledby`** | Trigger accessible name; required for **compact** / **compact-label** / **inline** |
| **`name`** / **`form`**                  | Form field name (hidden **`<input type="hidden">`**) and form id                   |
| **`id`**                                 | Trigger button id (for **`full`** also linked to **`label`**)                      |

Other standard button attributes (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**) go to the trigger — see **`SelectTriggerNativeProps`** in **`SelectInput.types.ts`**.

### Full type

**`SelectInputProps`**, **`SelectInputOptionsProp`**, **`FullVariantMultipleProps`**, **`SelectInputSingleValueProps`**, **`SelectInputMultipleValueProps`**, **`SelectAccessibleName`**, **`SelectOption`**, **`SelectOptionGroup`**, **`SelectVariant`** — **`SelectInput.types.ts`**.

Sources: `src/components/inputs/SelectInput/`.
