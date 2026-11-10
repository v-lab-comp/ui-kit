---
title: Tabs
description: Tabs — controlled and uncontrolled.
---

# Tabs

**`Tabs`** with **`Tabs.Tab`** and **`Tabs.Panel`**. URL sync — **`useTabsSearchParam`** (Storybook); **`Tabs`** itself is URL-agnostic.

## Preview

<ComponentDocsPreview name="tabs" />

## Import

```tsx
import { Tabs } from '@v-lab/ui-kit'
```

## Example

Uncontrolled tabs (**`defaultValue`** for initial tab):

```tsx
import { Tabs } from '@v-lab/ui-kit'

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general">
      <Tabs.Tab value="general">General</Tabs.Tab>
      <Tabs.Tab value="security">Security</Tabs.Tab>
      <Tabs.Panel value="general">Profile settings.</Tabs.Panel>
      <Tabs.Panel value="security">Password and sessions.</Tabs.Panel>
    </Tabs>
  )
}
```

Controlled mode:

```tsx
import { useState } from 'react'
import { Tabs } from '@v-lab/ui-kit'

export function ControlledTabs() {
  const [tab, setTab] = useState('b')

  return (
    <Tabs value={tab} onChange={setTab}>
      <Tabs.Tab value="a">A</Tabs.Tab>
      <Tabs.Tab value="b">B</Tabs.Tab>
      <Tabs.Panel value="a">Content A</Tabs.Panel>
      <Tabs.Panel value="b">Content B</Tabs.Panel>
    </Tabs>
  )
}
```

## Main props

### `Tabs` (root)

| Prop                             | Type                      | Description                                                               |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------- |
| `children`                       | `ReactNode`               | **`Tabs.Tab`** and **`Tabs.Panel`** in any order in the tree              |
| `defaultValue`                   | `string`                  | Active tab when uncontrolled                                              |
| `value`                          | `string`                  | Active tab when controlled                                                |
| `onChange`                       | `(value: string) => void` | Controlled when **`value`** is passed; receive changes via **`onChange`** |
| `aria-label` / `aria-labelledby` | `string`                  | Tab list name when **`Tabs.List`** is not used                            |

Type — **`TabsProps`**.

### `Tabs.List`

Optional tab wrapper (`role="tablist"`): takes `aria-label` / `aria-labelledby`, `className`, `ref` and other `div` props. Tabs inside may be wrapped in your own components. Without **`Tabs.List`** every root child except **`Tabs.Panel`** goes into the list automatically.

Keyboard (WAI-ARIA APG): only the active tab is in the Tab order; ←/→, Home/End move focus and activate the tab. `Tabs.Tab` and `Tabs.Panel` take `ref`, `className` and other HTML props.

Type — **`TabsListProps`**.

### `Tabs.Tab`

| Prop       | Type        | Description                   |
| ---------- | ----------- | ----------------------------- |
| `value`    | `string`    | Tab id (pairs with **Panel**) |
| `children` | `ReactNode` | Tab label                     |

Type — **`TabsTabProps`**.

### `Tabs.Panel`

| Prop       | Type        | Description               |
| ---------- | ----------- | ------------------------- |
| `value`    | `string`    | Must match **`Tabs.Tab`** |
| `children` | `ReactNode` | Panel content             |

Type — **`TabsPanelProps`**.

Sources: `src/components/Tabs/`.
