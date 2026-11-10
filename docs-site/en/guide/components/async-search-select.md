---
title: AsyncSearchSelect
description: Select field with async options loaded by search query (Floating UI).
---

# AsyncSearchSelect

A dropdown for **remote data**: on open and whenever debounced **`query`** changes, **`loadOptions({ query, signal, page: 0 })`** runs; near the bottom of the option list **`page`** becomes **1**, **2**, … while you return **`hasMore: true`**. **`AbortSignal`** cancels on close, search changes, or a new first-page fetch. **`debounceMs`** defaults to **300** ms. Props match **`SelectInput`** **`full`**; there is no **`options`** prop — only async loading.

The in-panel search field is the same **`SearchInput`** component (`medium`). Focus moves into it when the dropdown opens (see [keyboard](#keyboard)) and returns to the trigger on close.

**`completed`** / **`completedColor`** — same as **[InputField](./input-field#input-completed)** (Storybook **Inputs/AsyncSearchSelect → Completed**).

## Preview

<ComponentDocsPreview name="asyncSearchSelect" />

## Import

```tsx
import { AsyncSearchSelect } from '@v-lab/ui-kit'
import type {
  AsyncSearchSelectLoadResult,
  AsyncSearchSelectProps,
  SelectOption,
} from '@v-lab/ui-kit'
```

## Example

```tsx
import { useCallback, useState } from 'react'
import { AsyncSearchSelect } from '@v-lab/ui-kit'
import type { SelectOption } from '@v-lab/ui-kit'

async function fetchPage(
  query: string,
  page: number,
  signal: AbortSignal
): Promise<{ items: SelectOption[]; hasMore: boolean }> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    pageSize: '20',
  })
  const res = await fetch(`/api/items?${params}`, { signal })
  return res.json()
}

export function RemoteSelect() {
  const [value, setValue] = useState('')
  const loadOptions = useCallback(
    async ({
      query,
      signal,
      page,
    }: {
      query: string
      signal: AbortSignal
      page: number
    }): Promise<AsyncSearchSelectLoadResult> => {
      const { items, hasMore } = await fetchPage(query, page, signal)
      return { options: items, hasMore }
    },
    []
  )
  return (
    <AsyncSearchSelect
      label="Item"
      placeholder="Choose…"
      value={value}
      onChange={(next) => setValue(next)}
      loadOptions={loadOptions}
    />
  )
}
```

Load failures show inside the dropdown; **loading** / **empty** states are built-in (English copy in the current implementation) and are announced to screen readers through **`role="status"`**. More scenarios in Storybook **Inputs/AsyncSearchSelect**.

If **`loadOptions`** returns a plain **`SelectOption[]`** (legacy shape), the component treats that as **no pagination** — only **`page === 0`** is requested.

## Value, `ref` and forms

- **`onChange(value, option)`** receives the new value and the selected option; clearing gives **`''`** and **`null`**. Picking the already selected option does not call **`onChange`**.
- **`ref`** points to the trigger button (**`HTMLButtonElement`**): **`ref.current.focus()`** focuses the field.
- Standard button attributes (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**…) go to the trigger.
- With **`name`** the value is submitted through a hidden **`<input type="hidden">`**; an empty value is an empty string. **`form`** is the form id when the field is outside it.

## Keyboard and accessibility {#keyboard}

The field is a **combobox** with a **listbox** popup (WAI-ARIA APG); the behaviour is shared with **[SelectInput](./select-input#keyboard-and-accessibility)**:

| Keys                                            | Action                                                      |
| ----------------------------------------------- | ----------------------------------------------------------- |
| **↓** / **↑** / **Enter** / **Space** (trigger) | Open the list; focus moves to the search field              |
| Typing in search                                | New **`query`** (after **`debounceMs`**)                    |
| **↓** / **↑** / **PageUp** / **PageDown**       | Move the active option (search **`aria-activedescendant`**) |
| **Enter**                                       | Select the active option and close                          |
| **Escape**                                      | Close; inside **Modal** only the list closes                |
| **Tab** / outside click                         | Close without selecting                                     |
| **Delete** / **Backspace** (trigger)            | Clear the value                                             |

The search field is the **combobox** (**`aria-controls`** points to the listbox, **`aria-autocomplete="list"`**); after **`loadOptions`** answers, the selected option is active, otherwise the first one. While loading, the listbox has **`aria-busy="true"`**. "Loading…", "No results" and "Failed to load" are announced through **`role="status"`**.

Without a visible **`label`**, **`aria-label`** or **`aria-labelledby`** is required (checked by TypeScript):

```tsx
<AsyncSearchSelect aria-label="Company" loadOptions={loadOptions} />
```

## Pagination (lazy load)

**`page`** always resets to **0** when the dropdown opens and whenever debounced **`query`** changes (typing in search clears accumulated pages and starts over). Further pages load automatically when the user scrolls the options panel near the bottom. **`hasMore: false`** stops loading until **`query`** changes again.

## Search field and API requests

The **`query`** argument in **`loadOptions`** is exactly what the user typed in the search box **after **`debounceMs`**. Use it in your URL or request body (see the example with **`encodeURIComponent(query)`\*\*).

To observe the same debounced string outside **`loadOptions`** (URL sync, analytics), pass optional **`onSearchQueryChange(query)`**. It fires whenever that **`query`** changes and matches what **`loadOptions`** receives.

## Props

| Prop                                     | Description                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **`loadOptions`**                        | Required: `(args: { query; signal; page }) => Promise<SelectOption[] \| { options; hasMore }>` — see pagination above                |
| **`debounceMs`**                         | Delay before **`loadOptions`** after typing (default **300**)                                                                        |
| **`onSearchQueryChange`**                | Optional: `(query: string) => void` — same debounced **`query`** as in **`loadOptions`**                                             |
| **`selectedOption`**                     | When **`value`** is set externally, pass **`{ value, label, icon? }`** for the trigger label until the option appears in API results |
| **`searchPlaceholder`**                  | Placeholder (and accessible name) of the search field inside the panel (default **`'Search...'`**)                                   |
| **`value`** / **`defaultValue`**         | `string` — **`value`** of the selected option, **`''`** — nothing selected                                                           |
| **`onChange`**                           | `(value: string, option: SelectOption \| null) => void`                                                                              |
| **`aria-label`** / **`aria-labelledby`** | Trigger name; one of them is required when there is no **`label`**                                                                   |

Everything else matches **`SelectInput`** **`full`**: **`label`**, **`hint`**, **`error`**, **`placement`**, **`dropdownMaxHeight`**, **`optionTextWrap`**, **`prefix`**, **`name`** / **`form`** (hidden form field), **`forwardRef`** to the trigger button. There are no **`variant`**, **`searchThreshold`** or **`lazyLoadPageSize`** props: the field is always **`full`**, search is always shown, and **`loadOptions`** provides the pages.

See **`AsyncSearchSelect.types.ts`**. Sources: **`src/components/inputs/AsyncSearchSelect/`**.
