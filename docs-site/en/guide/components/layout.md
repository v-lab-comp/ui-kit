---
title: Layout
description: App shell — sidebar, main column, PageHeader; two ways to compose.
---

# Layout

Layout blocks are exported from **`@v-lab/ui-kit`**. Below: what they are and **two typical setups**: “simple wiring” (**SidebarLayout** + content column) and “full page” with a fixed header (**LayoutRoot** + **SidebarInset**).

**`useSidebar`** returns **`collapsed`** and **`toggle`** from **`SidebarContext`**. If there is no provider, pass **`collapsed`** to **`Sidebar`** / **`SidebarItem`** manually and **`onToggle`** on **`SidebarTrigger`** (as in the previews below).

## Preview

Three blocks: **sidebar only** (**`SidebarLayout`** + **`Sidebar`** + **`SidebarMain`**), **top bar only** for the main column (**`PageHeader`** + placeholder under it), then **full page** like Storybook **Layout / Full Page**.

The fixed sidebar stays inside the docs preview frame because the preview wrapper sets positioning context (**`transform`** on the preview block — otherwise **`position: fixed`** on the column would attach to the browser viewport).

### Sidebar only

**`SidebarLayout`** → **`Sidebar`** (header with **`SidebarTrigger`** from context, nav, **`SidebarFooter`**) → **`SidebarMain`** with a placeholder on the right. No **`LayoutRoot`** or **`PageHeader`**.

<ComponentDocsPreview name="layoutSidebar" />

### PageHeader only

Top strip of the main column (**`PageHeader`** with **`PageHeaderDemoContent`**) and conditional content below — like **`SidebarInset`** without a real sidebar.

<ComponentDocsPreview name="layoutHeader" />

### Full page

**`LayoutRoot`** → **`Sidebar`** → **`SidebarInset`** (**`PageHeader`** + **`SidebarInsetContent`**).

::: tip Widths for `insetLeft`
In the design, the sidebar is **272px** expanded and **80px** collapsed (matches **`Sidebar`** CSS). In **`collapsed`** state, set **`insetLeft`** to the same pixel width as the rail — otherwise the main column will not align with the sidebar.
:::

<ComponentDocsPreview name="layout" />

## What the layout is made of

### Two ways to build a page

| Approach                                                | When to use                                                                                                                                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`SidebarLayout`** + **`Sidebar`** + **`SidebarMain`** | Simpler: sidebar and content share one flex wrapper; **`SidebarMain`** shifts with **`collapsed`** (**`margin-left`**). No dedicated app-level top bar.                                                                   |
| **`LayoutRoot`** + **`Sidebar`** + **`SidebarInset`**   | Full shell: root sets **`height`** and **`overflow`** so **only the content area scrolls** and **`PageHeader`** stays on top. **`SidebarInset`** gets **`insetLeft`** — sidebar width in px (depends on **`collapsed`**). |

**`Sidebar`** is visually fixed on the left (in the app — to the window edge). **`SidebarInset`** usually contains **`PageHeader`** (breadcrumbs, actions) and **`SidebarInsetContent`** — scrollable region under the header.

### Component tree (full shell)

```text
LayoutRoot                         ← page root: flex, overflow, height
├── Sidebar                        ← sidebar column (fixed pos in real app)
│   ├── SidebarHeader              ← brand + title; trigger slot → SidebarTrigger
│   ├── SidebarContent             ← scroll only nav sections
│   │   └── SidebarSection
│   │       └── SidebarItem …
│   └── SidebarFooter              ← wrapper over SidebarUserProfileCard (+ divider)
│
└── SidebarInset                   ← main: insetLeft = sidebar width
    ├── PageHeader                 ← top strip of main area
    └── SidebarInsetContent        ← main page scroll
```

Simpler variant without **`LayoutRoot`** / **`PageHeader`**:

```text
SidebarLayout                      ← collapsed context provider + flex wrapper
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent → SidebarSection → SidebarItem …
│   └── SidebarFooter (optional)
└── SidebarMain                    ← content right; offset for sidebar width
```

### Sidebar components

| Component                    | Role                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`SidebarLayout`**          | **`SidebarContext`** provider (**collapsed**, **toggle**) and flex wrapper for **`Sidebar`** + **`SidebarMain`**.                                                                                                                                                                                                                                                                                                                                                                  |
| **`Sidebar`**                | Column root: width expanded / collapsed, **`collapsed`**.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **`SidebarHeader`**          | Sidebar header; inner **`SidebarHeaderCard`**; optional **`divider`**, **`trigger`** slot (**`SidebarTrigger`**).                                                                                                                                                                                                                                                                                                                                                                  |
| **`SidebarHeaderCard`**      | Brand / title card (inside **`SidebarHeader`**; can be used standalone). With **`options`** it is a menu button (WAI-ARIA APG): ↑/↓/Home/End, typeahead, Escape; items are **`menuitemradio`**.                                                                                                                                                                                                                                                                                    |
| **`SidebarContent`**         | Scrollable middle between header and footer. Renders as **`<nav>`** (landmark); name it with **`aria-label`** when there are several navs.                                                                                                                                                                                                                                                                                                                                         |
| **`SidebarSection`**         | Group of items with **`label`**.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`SidebarItem`**            | Menu row: **`leftNode`** (icon), **`active`**, **`collapsed`**. With **`href`** renders a link **`<a>`**, otherwise a **`<button>`**. For routers use **`as`**: **`<SidebarItem as={Link} href="/projects">`** renders the given component with **`href`** and the other link props (**`aria-current="page"`** for **`active`** is kept). When **`collapsed`** the item text stays its accessible name. **`SidebarSection`** with **`label`** is a **`role="group"`** named by it. |
| **`SidebarTrigger`**         | Collapse button; without **`SidebarLayout`** pass **`onToggle`** and **`collapsed`**.                                                                                                                                                                                                                                                                                                                                                                                              |
| **`SidebarFooter`**          | Footer with **`SidebarUserProfileCard`** (avatar, name, email).                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`SidebarUserProfileCard`** | Profile card (**`SidebarFooter`** or standalone).                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`SidebarCard`**            | Generic card inside the column.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### Main area and root

| Component                 | Role                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`LayoutRoot`**          | Page root with sidebar: **`height`**, **`overflow`**, so **`SidebarInsetContent`** is the only scroll under **`PageHeader`**.                          |
| **`SidebarInset`**        | **`<main>`**: **`insetLeft`** offsets from the left by sidebar width (account for **`collapsed`**).                                                    |
| **`SidebarInsetContent`** | Region under **`PageHeader`** with **`overflow-y: auto`**. Keyboard focusable (**`tabIndex={0}`**); with **`aria-label`** becomes **`role="region"`**. |
| **`PageHeader`**          | Top strip of main column; **`children`** — any layout. Storybook demo: **`PageHeaderDemoContent`**. Separate page — [PageHeader](./page-header).       |
| **`SidebarMain`**         | Alternative to **`SidebarInset`** with **`SidebarLayout`**: simple content block with left offset.                                                     |

## Import

```tsx
import {
  LayoutRoot,
  Sidebar,
  SidebarLayout,
  SidebarMain,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarInsetContent,
  PageHeader,
  useSidebar,
} from '@v-lab/ui-kit'
```

## Example: SidebarLayout + SidebarMain

When you do not need **`LayoutRoot`** or a fixed **`PageHeader`**:

```tsx
import {
  Sidebar,
  SidebarLayout,
  SidebarMain,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarHeader,
} from '@v-lab/ui-kit'

function BrandIcon() {
  return (
    <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-base)' }} />
  )
}

export function Shell() {
  return (
    <SidebarLayout>
      <Sidebar>
        <SidebarHeader icon={<BrandIcon />} title="Project" subtitle="Environment" divider />
        <SidebarContent>
          <SidebarSection label="Section">
            {/* SidebarItem + icons from @remixicon/react */}
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
      <SidebarMain>
        <main>Page content</main>
      </SidebarMain>
    </SidebarLayout>
  )
}
```

Full page with **`LayoutRoot`**, **`SidebarInset`**, and **`insetLeft`** when **`collapsed`** — in the previews above and Storybook **Layout / Full Page**.

## Example: full shell (LayoutRoot + SidebarInset)

Control **`collapsed`** yourself (as in previews and **`FullLayout.stories.tsx`**): **`SidebarTrigger`** with **`onToggle`**, **`SidebarInset`** with **`insetLeft`** from current sidebar width.

```tsx
import { useState } from 'react'
import { PageHeader } from '@v-lab/ui-kit'
import { SidebarInset, SidebarInsetContent } from '@v-lab/ui-kit'
import { LayoutRoot } from '@v-lab/ui-kit'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarTrigger,
} from '@v-lab/ui-kit'

const W = 272
const W_COLLAPSED = 80

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const insetLeft = collapsed ? W_COLLAPSED : W

  return (
    <LayoutRoot>
      <Sidebar collapsed={collapsed}>
        <SidebarHeader
          icon={<BrandIcon />}
          title="Project"
          subtitle="Environment"
          divider
          collapsed={collapsed}
          trigger={
            <SidebarTrigger collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
          }
        />
        <SidebarContent>{/* SidebarSection → SidebarItem … */}</SidebarContent>
        <SidebarFooter
          src={avatarUrl}
          alt=""
          title="Name"
          description="email@…"
          divider
          collapsed={collapsed}
        />
      </Sidebar>

      <SidebarInset insetLeft={insetLeft}>
        <PageHeader>{/* breadcrumbs, actions */}</PageHeader>
        <SidebarInsetContent>{/* main scroll */}</SidebarInsetContent>
      </SidebarInset>
    </LayoutRoot>
  )
}
```

## Main props

There is no single “one type for everything”: **`SidebarLayout`**, **`Sidebar`**, **`SidebarInset`**, **`LayoutRoot`**, **`PageHeader`** each have **`*.types.ts`**. Export overview — **`src/index.ts`** and **`src/components/layout/`**.

Sources: `src/components/layout/`.
