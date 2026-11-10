---
title: Breadcrumbs
description: Navigation breadcrumbs — Components/Breadcrumbs in Storybook.
---

# Breadcrumbs

**`Breadcrumbs`**, **`BreadcrumbItem`**, **`BreadcrumbLink`**, **`BreadcrumbPage`**, and separators **`chevron`**, **`slash`**, **`dot`**.

## Preview

<ComponentDocsPreview name="breadcrumbs" />

## Import

```tsx
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@v-lab/ui-kit'
```

## Example

```tsx
import { RiHome5Line } from '@remixicon/react'
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@v-lab/ui-kit'

const icon = <RiHome5Line size={20} />

export function PageBreadcrumbs() {
  return (
    <Breadcrumbs separator="chevron">
      <BreadcrumbItem>
        <BreadcrumbLink href="/" icon={icon}>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/section" icon={icon}>
          Section
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage icon={icon}>Current page</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  )
}
```

## Main props

### `Breadcrumbs`

| Prop        | Type                          | Description                   |
| ----------- | ----------------------------- | ----------------------------- |
| `children`  | `ReactNode`                   | Chain of **`BreadcrumbItem`** |
| `separator` | `chevron` \| `slash` \| `dot` | Separator between items       |

Plus container **`HTMLElement`** attributes (**`className`**, **`aria-label`**, …). Type — **`BreadcrumbsProps`**.

### `BreadcrumbItem`

| Prop       | Type        | Description                                          |
| ---------- | ----------- | ---------------------------------------------------- |
| `children` | `ReactNode` | Usually **`BreadcrumbLink`** or **`BreadcrumbPage`** |

Type — **`BreadcrumbItemProps`** (`<li>`).

### `BreadcrumbLink`

Polymorphic (default **`<a>`**): **`as`**, **`href`**, **`icon`**, **`children`**, plus target element props without conflicts. Type — **`BreadcrumbLinkProps`**.

### `BreadcrumbPage`

Current page (not a link): **`icon`**, **`children`**, **`HTMLSpanElement`** attributes. Type — **`BreadcrumbPageProps`**.

Sources: `src/components/Breadcrumb/`.
