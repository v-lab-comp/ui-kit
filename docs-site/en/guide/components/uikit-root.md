---
title: UiKitRoot
description: Local CSS reset and base typography for an embedded UI island.
---

# UiKitRoot

Wrapper with the **`vl-ui-kit-root`** class: margin normalization, `box-sizing`, base form and typography styles inside the node — provided by the skin (`src/skins/corporate/components/ui-kit-root.css`). It does not replace global **`body`** styles — wrap your app root or an isolated block (preview, widget).

## Preview

<ComponentDocsPreview name="uikitRoot" />

## Import

```tsx
import { UiKitRoot } from '@v-lab/ui-kit'
```

## Example

```tsx
import { UiKitRoot } from '@v-lab/ui-kit'

export function AppShell({ children }: { children: React.ReactNode }) {
  return <UiKitRoot>{children}</UiKitRoot>
}
```

## Main props

Full type — **`UiKitRootProps`**: **`HTMLAttributes<HTMLDivElement>`** + **`children`** — root **`div`** with the `vl-ui-kit-root` class.

Sources: `src/components/UiKitRoot/` · `UiKitRoot.types.ts`.
