---
title: Tabs
description: Varoqlar — boshqariladigan va boshqarilmas.
---

# Tabs

**`Tabs`** komponenti **`Tabs.Tab`** va **`Tabs.Panel`** bilan. URL bilan sinxronlashtirish — **`useTabsSearchParam`** hooki orqali (Storybookga qarang), o‘zi **`Tabs`** URL haqida bilmaydi.

## Preview

<ComponentDocsPreview name="tabs" />

## Import

```tsx
import { Tabs } from '@v-lab/ui-kit'
```

## Misol

Boshqarilmasiz varoqlar (boshlang‘ich qiymat **`defaultValue`** orqali):

```tsx
import { Tabs } from '@v-lab/ui-kit'

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general">
      <Tabs.Tab value="general">Umumiy</Tabs.Tab>
      <Tabs.Tab value="security">Xavfsizlik</Tabs.Tab>
      <Tabs.Panel value="general">Profil sozlamalari.</Tabs.Panel>
      <Tabs.Panel value="security">Parol va seanslar.</Tabs.Panel>
    </Tabs>
  )
}
```

Boshqariladigan rejim:

```tsx
import { useState } from 'react'
import { Tabs } from '@v-lab/ui-kit'

export function ControlledTabs() {
  const [tab, setTab] = useState('b')

  return (
    <Tabs value={tab} onChange={setTab}>
      <Tabs.Tab value="a">A</Tabs.Tab>
      <Tabs.Tab value="b">B</Tabs.Tab>
      <Tabs.Panel value="a">A kontenti</Tabs.Panel>
      <Tabs.Panel value="b">B kontenti</Tabs.Panel>
    </Tabs>
  )
}
```

## Asosiy proplar

### `Tabs` (ildiz)

| Prop           | Tip                       | Tavsif                                                          |
| -------------- | ------------------------- | --------------------------------------------------------------- |
| `children`     | `ReactNode`               | Razmetkada istalgan tartibda **`Tabs.Tab`** va **`Tabs.Panel`** |
| `defaultValue` | `string`                  | Boshqarilmasiz rejimda faol varaq                               |
| `value`        | `string`                  | Boshqariladigan rejimda faol varaq                              |
| `onChange`     | `(value: string) => void` | Varaq almashishi (**`value`** bilan — boshqariladigan rejim)    |

Tip — **`TabsProps`**.

### `Tabs.Tab`

| Prop       | Tip         | Tavsif                                            |
| ---------- | ----------- | ------------------------------------------------- |
| `value`    | `string`    | Varaq identifikatori (**Panel** bilan bog‘langan) |
| `children` | `ReactNode` | Varaq yorlig‘i                                    |

Tip — **`TabsTabProps`**.

### `Tabs.Panel`

| Prop       | Tip         | Tavsif                                 |
| ---------- | ----------- | -------------------------------------- |
| `value`    | `string`    | **`Tabs.Tab`** bilan mos kelishi kerak |
| `children` | `ReactNode` | Panel kontenti                         |

Tip — **`TabsPanelProps`**.

Manbalar: `src/components/Tabs/`.
