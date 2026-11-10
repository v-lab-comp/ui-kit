---
title: Icons
description: Remix Icon and re-exports — like Design System / Icons in Storybook.
---

# Icons

Matches **Design System → Icons** in Storybook (**Remix Icon Gallery** story).

## Gallery

Same search and name grid as Storybook — the **Theme** switch on the left sets light/dark background for tokens.

<ComponentDocsPreview name="iconsGallery" />

## Library

Components and stories use **`@remixicon/react`**: import specific glyphs by name, size usually **`16`** for inline icons in fields and buttons.

```tsx
import { RiMailLine } from '@remixicon/react'

export function Example() {
  return <RiMailLine size={16} />
}
```

## Re-export from the package

**`@v-lab/ui-kit/icons`** — icon barrel for apps that want a single import from ui-kit.

## Shared icons for stories

In the repo **`src/stories/helpers.tsx`** — reusable wrappers for docs; do not duplicate raw SVG in product code.
