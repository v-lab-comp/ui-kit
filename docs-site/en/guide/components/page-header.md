---
title: PageHeader
description: Top strip of the content area — slot for title, breadcrumbs, actions.
---

# PageHeader

Semantic **`<header>`** with design-system styling. **`children`** can be page title, **`Breadcrumbs`**, search, buttons. Composite demo for previews — **`PageHeaderDemoContent`** (Storybook **Layout / Header**).

## Preview

<ComponentDocsPreview name="pageHeader" />

## Import

```tsx
import { PageHeader, PageHeaderDemoContent } from '@v-lab/ui-kit'
```

## Example

```tsx
import { PageHeader } from '@v-lab/ui-kit'

export function ShellHeader() {
  return (
    <PageHeader>
      <h1 style={{ margin: 0 }}>Page title</h1>
    </PageHeader>
  )
}
```

Usually **`PageHeader`** sits inside **`SidebarInset`** — see [Layout](./layout).

## Main props

Full type — **`PageHeaderProps`**: **`HTMLElement`** as **`<header>`** — **`children`**, **`className`**, standard DOM attributes.

Sources: `src/components/layout/Header/` · `Header.types.ts`.
