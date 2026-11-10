---
title: PageHeader
description: Kontent zonasi yuqori yo‘lagi — sarlavha, non do‘ppi, harakatlar sloti.
---

# PageHeader

Dizayn tizimidan bezatilgan semantik **`<header>`**. **`children`** da har qanday razmetka: sahifa sarlavhasi, **`Breadcrumbs`**, qidiruv, tugmalar. Preview uchun tayyor **`PageHeaderDemoContent`** (Storybook **Layout / Header** kabi).

## Preview

<ComponentDocsPreview name="pageHeader" />

## Import

```tsx
import { PageHeader, PageHeaderDemoContent } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { PageHeader } from '@v-lab/ui-kit'

export function ShellHeader() {
  return (
    <PageHeader>
      <h1 style={{ margin: 0 }}>Sahifa sarlavhasi</h1>
    </PageHeader>
  )
}
```

Odatda **`PageHeader`** asosiy kontent yonida **`SidebarInset`** ichida turadi — [Layout](/uz/guide/components/layout) ga qarang.

## Asosiy proplar

To‘liq tip — **`PageHeaderProps`**: **`<header>`** roli bilan **`HTMLElement`** — **`children`**, **`className`**, standart DOM atributlari.

Manbalar: `src/components/layout/Header/` · `Header.types.ts`.
