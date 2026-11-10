---
title: MarkdownInput
description: RichInput whose value is stored as Markdown — /markdown sub-entry.
---

# MarkdownInput

The same editor as **[RichInput](./rich-input)**, but the outside value is **Markdown** rather than HTML. Incoming Markdown is expanded to HTML for the editor, and edits are folded back.

It lives in a separate entry point because the conversion pulls two dependencies:

```bash
npm install marked turndown
```

`RichInput` from the main bundle works with HTML and needs **neither** of them.

## Import

```tsx
import { MarkdownInput } from '@v-lab/ui-kit/markdown'
import type { MarkdownInputProps } from '@v-lab/ui-kit/markdown'
```

## Controlled field

```tsx
import { useState } from 'react'
import { MarkdownInput } from '@v-lab/ui-kit/markdown'

export function DescriptionField() {
  const [value, setValue] = useState('**Important:** read to the end.')
  return <MarkdownInput label="Description" required value={value} onChange={setValue} />
}
```

With **`name`**, the hidden input carries **Markdown**, so that is what reaches `FormData`.

## View mode

The converters are exported separately — e.g. to render stored Markdown:

```tsx
import { markdownToHtml } from '@v-lab/ui-kit/markdown'
;<div dangerouslySetInnerHTML={{ __html: markdownToHtml(saved) }} />
```

::: warning Sanitization
`markdownToHtml` does **not** sanitize its output — Markdown allows raw HTML. Run it through your app's sanitizer (e.g. `DOMPurify`) or clean it on the backend before `dangerouslySetInnerHTML`. The editor strips `<script>`, but that is not full protection.
:::

## Differences from `RichInput`

| Thing                | Behavior                                                       |
| -------------------- | -------------------------------------------------------------- |
| `value` / `onChange` | **Markdown** string instead of HTML                            |
| `name`               | Hidden input carries Markdown                                  |
| default `tools`      | No **`underline`** — see below                                 |
| `maxLength`          | Counts **visible text**, not the length of the Markdown source |

All other props behave as in **[RichInput](./rich-input)**.

### Underline

CommonMark has no underline, so `DEFAULT_MARKDOWN_INPUT_TOOLS` omits that button. Adding it back is fine — the formatting survives, but as inline HTML inside the Markdown (`<u>…</u>`). Strikethrough, by contrast, maps natively to `~~text~~` and is included by default.

## Round-trip caveat

`document.execCommand` emits different tags across browsers (`<b>` / `<strong>`, `<strike>` / `<s>` / `<del>`); the converter normalizes all of them. The reverse conversion does not preserve the original Markdown byte for byte — list indentation and delimiters are normalized (`-` for bullets, `*` for emphasis, `#` for headings). Keep that in mind if your backend diffs the text literally.

## Storybook

**Inputs/MarkdownInput** — `Playground`, `InForm`, `ViewMode`.
