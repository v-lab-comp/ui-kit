---
title: useSidebar
description: collapsed and toggle from SidebarLayout context.
---

# useSidebar

Reads sidebar state from **`SidebarContext`**, which **`SidebarLayout`** provides (`collapsed`, **`toggle`**). Sidebar pieces (**`SidebarItem`**, **`SidebarHeader`**, …) also use this context for spacing and labels.

If there is no provider, **`collapsed`** comes from the optional argument (or **`false`**) and **`toggle`** is a no-op — convenient for isolated tests.

## Preview

<ComponentDocsPreview name="hookSidebar" />

## Import

```tsx
import { useSidebar } from '@v-lab/ui-kit'
```

## Signature

```txt
useSidebar(propCollapsed?)
```

| Argument        | Description                                   |
| --------------- | --------------------------------------------- |
| `propCollapsed` | When set — overrides `collapsed` from context |

**Returns:** `{ collapsed, toggle }`.

## Example

```tsx
import { useSidebar } from '@v-lab/ui-kit'

export function RailToggle() {
  const { collapsed, toggle } = useSidebar()

  return (
    <button type="button" onClick={toggle}>
      {collapsed ? 'Expand' : 'Collapse'}
    </button>
  )
}
```

Building a page with **`Sidebar`**, **`SidebarMain`**, **`LayoutRoot`** — see [Layout](/en/guide/components/layout) and Storybook **Layout / Sidebar**.

Source: `src/components/layout/Sidebar/SidebarContext.ts`.
