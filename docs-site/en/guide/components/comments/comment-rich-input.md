---
title: CommentRichInput
description: Rich comment field with toolbar and send button — no thread.
---

# CommentRichInput

Editor only and **`onSend(html)`**. Thread with avatars and day dividers — [**CommentsSection**](./comments-section).

## Preview

UI strings — **English package defaults**; in your app set **`placeholder`** and **`ariaLabels`** if needed.

<ComponentDocsPreview name="commentRichInput" />

## Import

```tsx
import { CommentRichInput } from '@v-lab/ui-kit'
```

## Example

```tsx
import { CommentRichInput } from '@v-lab/ui-kit'

export function EditorOnly() {
  return (
    <CommentRichInput
      placeholder="Write a comment…"
      onSend={async (html) => {
        await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ html }) })
      }}
    />
  )
}
```

## Main props

Full type — **`CommentRichInputProps`**: required **`onSend`**, **`placeholder`**; optional **`isPending`**, **`disabled`**, **`ariaLabels`**, **`toolbarStartSlot`**, **`className`** / **`rootClassName`**. Submit — **Enter**, new line — **Shift+Enter**.

**`ariaLabels`** keys: **`input`** — accessible name of the input (defaults to `placeholder`), **`toolbar`** — name of the formatting toolbar (`role="toolbar"`, unset by default), plus **`bold`**, **`italic`**, **`underline`**, **`strikethrough`**, **`align`**, **`send`** — button names.

## Height and opacity

By default the field grows with its content and an inactive field is **not** dimmed (the defaults previously hardcoded `min-height: 116px` and `opacity: 0.8`). If needed, the old behavior is restored via CSS variables:

- `--comment-input-min-height` (default `0`) — a fixed minimum height;
- `--comment-input-opacity` (default `1`) — the field opacity.

Sources: `src/components/Comments/CommentRichInput/` · `CommentRichInput.types.ts`.
