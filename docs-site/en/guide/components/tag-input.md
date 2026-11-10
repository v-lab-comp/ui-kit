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

By default, suggestion rows **stay visible** after selection: a **checkmark** shows on the right; **click** or **Enter** on that row again **removes** the tag. Set **`suggestionsExcludeSelected`** to bring back the old behavior (selected labels are removed from the dropdown; picking only adds).

### Keyboard (with list)

- **Enter** / comma / **`;`** — commit **typed** text when the field is non-empty.
- **Click** / **Tab** (list open) / **Enter** (empty field) on a row: **toggles** the tag when checkmarks are shown; otherwise picks once.
- **Esc** closes the list.

### Layout

**`tagsAreaMaxHeight`** caps the chip + input area (number = px, CSS string, or **`'none'`**); overflow uses the same thin scrollbar styling as Select.

## Props summary

See the Russian page **TagInput** for the full props table, or **`types.ts`** in the TagInput folder.

## React Hook Form

**`RHFTagInput`** — package entry **`@v-lab/ui-kit/adapters`**, field value **`TagInputTagValue[]`**. See **[Adapters](../adapters)**.

## Storybook

**Inputs/TagInput** — the “remote suggestions” story Docs tab includes a complete **`TagInput`** + **`onSuggestionsQueryChange`** snippet.
