---
title: Breadcrumbs
description: Navigatsion «non do‘ppi» — Storybook Components/Breadcrumbs.
---

# Breadcrumbs

**`Breadcrumbs`**, **`BreadcrumbItem`**, **`BreadcrumbLink`**, **`BreadcrumbPage`** komponentlari va **`chevron`**, **`slash`**, **`dot`** ajratgichlari.

## Preview

<ComponentDocsPreview name="breadcrumbs" />

## Import

```tsx
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { RiHome5Line } from '@remixicon/react'
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@v-lab/ui-kit'

const icon = <RiHome5Line size={20} />

export function PageBreadcrumbs() {
  return (
    <Breadcrumbs separator="chevron">
      <BreadcrumbItem>
        <BreadcrumbLink href="/" icon={icon}>
          Bosh sahifa
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/section" icon={icon}>
          Bo‘lim
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage icon={icon}>Joriy sahifa</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  )
}
```

## Asosiy proplar

### `Breadcrumbs`

| Prop        | Tip                           | Tavsif                            |
| ----------- | ----------------------------- | --------------------------------- |
| `children`  | `ReactNode`                   | **`BreadcrumbItem`** zanjiri      |
| `separator` | `chevron` \| `slash` \| `dot` | Punktlar orasidagi ajratgich turi |

Qo‘shimcha konteyner **`HTMLElement`** atributlari (**`className`**, **`aria-label`**, …). Tip — **`BreadcrumbsProps`**.

### `BreadcrumbItem`

| Prop       | Tip         | Tavsif                                                |
| ---------- | ----------- | ----------------------------------------------------- |
| `children` | `ReactNode` | Odatda **`BreadcrumbLink`** yoki **`BreadcrumbPage`** |

Tip — **`BreadcrumbItemProps`** (`<li>`).

### `BreadcrumbLink`

Polimorf komponent (standart **`<a>`**): **`as`**, **`href`**, **`icon`**, **`children`**, qo‘shimcha maqsad elementining to‘qnashuvsiz proplari. Tip — **`BreadcrumbLinkProps`**.

### `BreadcrumbPage`

Joriy sahifa (havola emas): **`icon`**, **`children`**, **`HTMLSpanElement`** atributlari. Tip — **`BreadcrumbPageProps`**.

Manbalar: `src/components/Breadcrumb/`.
