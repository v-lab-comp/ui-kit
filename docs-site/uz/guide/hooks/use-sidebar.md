---
title: useSidebar
description: SidebarLayout kontekstidan collapsed va toggle.
---

# useSidebar

Saydbar holatini **`SidebarLayout`** beradigan **`SidebarContext`** dan o‘qiydi (`collapsed`, **`toggle`**). Saydbar qismlari (**`SidebarItem`**, **`SidebarHeader`**, …) ham indent va yozuvlar uchun shu kontekstdan foydalanadi.

Provayder bo‘lmasa, ixtiyoriy argumentdan **`collapsed`** (yoki **`false`**) va effektsiz **`toggle`** qaytariladi — alohida testlar uchun qulay.

## Preview

<ComponentDocsPreview name="hookSidebar" />

## Import

```tsx
import { useSidebar } from '@v-lab/ui-kit'
```

## Signatura

```txt
useSidebar(propCollapsed?)
```

| Argument        | Tavsif                                               |
| --------------- | ---------------------------------------------------- |
| `propCollapsed` | Berilsa — kontekstdagi `collapsed` ni ustidan yozadi |

**Qaytaradi:** `{ collapsed, toggle }`.

## Misol

```tsx
import { useSidebar } from '@v-lab/ui-kit'

export function RailToggle() {
  const { collapsed, toggle } = useSidebar()

  return (
    <button type="button" onClick={toggle}>
      {collapsed ? 'Yoyish' : 'Yig‘ish'}
    </button>
  )
}
```

**`Sidebar`**, **`SidebarMain`**, **`LayoutRoot`** bilan sahifa — [Layout](/uz/guide/components/layout) bo‘limida va Storybook **Layout / Sidebar** da.

Manba: `src/components/layout/Sidebar/SidebarContext.ts`.
