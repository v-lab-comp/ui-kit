---
title: TagInput
description: Chip/tag field with free typing and optional picker list (including remote options).
---

# TagInput

Built on **[InputField](./input-field)** and **[Tag](./tag)**. Value is **`TagInputTagValue[]`** (`string` or **`{ id, label }`**); optional **`suggestions`** enable a dropdown filtered locally or driven by the server.

**`completed`** and **`completedColor`** for the shell border — same as **[InputField](./input-field#input-completed)**.

## Preview

<ComponentDocsPreview name="tagInput" />

## Import

```tsx
import { TagInput } from '@v-lab/ui-kit'
import type {
  TagInputProps,
  TagInputSuggestion,
  TagInputSuggestionsMatch,
  TagInputTagValue,
} from '@v-lab/ui-kit'
```

**`suggestions`** accepts **`string`** items or **`{ id, label }`**: **`id`** is the React **`key`** for each row; picking an object suggestion adds **`{ id, label }`** to **`value`**; a string suggestion adds a **`string`** tag.

## Remote suggestions pattern

Parent keeps **`suggestions`** in React state and refreshes them when **`onSuggestionsQueryChange`** fires (debounced **`fetch`** in real apps):

```tsx
import { useEffect, useState } from 'react'
import { TagInput } from '@v-lab/ui-kit'
import type { TagInputSuggestion } from '@v-lab/ui-kit'

const OPTIONS_FROM_BACKEND: TagInputSuggestion[] = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vue', label: 'Vue' },
  { id: 'design', label: 'Design' },
  { id: 'qa', label: 'QA' },
]

export function TagsFromApiExample() {
  const [tags, setTags] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<TagInputSuggestion[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setSuggestions(
        q
          ? OPTIONS_FROM_BACKEND.filter((s) => s.label.toLowerCase().includes(q))
          : [...OPTIONS_FROM_BACKEND]
      )
    }, 220)

    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <TagInput
      label="Stack"
      placeholder="Search directory…"
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      suggestionsMatch="server"
      onSuggestionsQueryChange={setQuery}
    />
  )
}
```

Use **`suggestionsMatch="server"`** when the API already returns the filtered list.

By default, suggestion rows **stay visible** after selection: a **checkmark** shows on the right; **click** or **Enter** on the arrow-highlighted row again **removes** the tag. Set **`suggestionsExcludeSelected`** to bring back the old behavior (selected labels are removed from the dropdown; picking only adds).

### Keyboard

With **`suggestions`** the field is a **combobox** with a listbox popup ([WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)): focus stays in the field and the highlighted row is exposed via **`aria-activedescendant`**.

- **Enter** / comma / **`;`** — commit the **typed** text when no row is highlighted.
- **↓** / **↑** — highlight rows (wraps, skips disabled rows); on a closed list they open it at the first / last row.
- **Enter** on the highlighted row **toggles** it (checkmarks) or picks it once; focus stays in the field. **Tab** picks the highlighted row and moves focus on. Mouse: click a row.
- **Esc** closes only the list (a parent modal stays open); typing or clicking the field opens it again.
- **Backspace** in an empty field removes the last tag. **Enter** never submits the surrounding form.

### Accessibility

- The listbox is named by the field **`label`**; rows are not in the Tab order. In checkmark mode the listbox is **`aria-multiselectable`**.
- Every chip's remove button is named after the tag: **`Remove {label}`** by default, customise with **`removeTagLabel`**; **`renderTag`** receives the same text as **`removeLabel`**. After removing a tag with its button, focus returns to the field.

### Layout

**`tagsAreaMaxHeight`** caps the chip + input area (number = px, CSS string, or **`'none'`**); overflow uses the same thin scrollbar styling as Select.

## Props summary

See the Russian page **TagInput** for the full props table, or **`types.ts`** in the TagInput folder.

## React Hook Form

**`RHFTagInput`** — package entry **`@v-lab/ui-kit/adapters`**, field value **`TagInputTagValue[]`**. See **[Adapters](../adapters)**.

## Storybook

**Inputs/TagInput** — the “remote suggestions” story Docs tab includes a complete **`TagInput`** + **`onSuggestionsQueryChange`** snippet.
