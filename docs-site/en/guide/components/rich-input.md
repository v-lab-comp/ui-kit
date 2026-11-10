---
title: RichInput
description: Multiline rich-text form field — label, hint/error, toolbar and length limit.
---

# RichInput

Rich-text field built on **[InputField](./input-field)**: a regular form control with **`label`**, **`hint`** / **`error`**, **`required`** and sizes — but a `contenteditable` area with a toolbar instead of an `<input>`.

The value is an **HTML string**. For a comment composer (send on **Enter**, paper-plane button) use **[CommentRichInput](./comments/comment-rich-input)** instead.

## Preview

<ComponentDocsPreview name="richInput" />

## Import

```tsx
import { RichInput } from '@v-lab/ui-kit'
import type { RichInputProps, RichInputTool } from '@v-lab/ui-kit'
```

## Controlled field

```tsx
import { useState } from 'react'
import { RichInput } from '@v-lab/ui-kit'

export function DescriptionField() {
  const [value, setValue] = useState('')
  return (
    <RichInput
      label="Description"
      required
      placeholder="Describe the task…"
      value={value}
      onChange={setValue}
    />
  )
}
```

Validation stays with the form — check the text without tags:

```tsx
const isEmpty = value.replace(/<[^>]*>/g, '').trim() === ''
```

## Length limit

**`maxLength`** counts **text without tags**: a counter appears under the field, typing past the limit is blocked and pasted text is trimmed.

## Toolbar

**`tools`** sets the buttons and their order — **`bold`**, **`italic`**, **`underline`**, **`strikethrough`**, **`bulletList`**, **`orderedList`**, **`clear`**. An empty array removes the toolbar; **`toolbarPlacement`** moves it below the text.

## Native form submit

With **`name`** a hidden `<input>` is rendered, so the value reaches **`FormData`** without React state:

```tsx
<RichInput label="Description" name="description" defaultValue="<b>Draft</b>" />
```

## Behavior

- **Enter** inserts a new line; the field never submits the form.
- Paste is **plain text** only.
- **`<script>`** is stripped from incoming **`value`** / **`defaultValue`**. Full sanitization before **`dangerouslySetInnerHTML`** is the app's / backend's job.
- **`readOnly`** keeps the text selectable and hides the toolbar; **`disabled`** greys the field out.

## Props summary

See the Russian page **[RichInput](/guide/components/rich-input)** for the full props table, or `RichInput.types.ts` in the component folder.

## Storybook

**Inputs/RichInput** — `Playground`, `InForm`, `WithMaxLength`, `UncontrolledWithName`, `Compact` and the states gallery.
