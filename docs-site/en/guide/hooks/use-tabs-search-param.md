---
title: useTabsSearchParam
description: Active tab and a query param (?tab=) without react-router.
---

# useTabsSearchParam

Keeps the tab state string in sync with **one query parameter** (`?name=value`) via **`history.replaceState`** or **`pushState`**. The **`Tabs`** component stays “dumb”: pass **`value`** and **`onChange`** from the hook.

On **`popstate`** (Back button), state is read from the URL again.

## Preview

<ComponentDocsPreview name="hookTabsSearchParam" />

The live demo adds the **`uik_hook_tab`** parameter to the current page URL — only for this docs preview.

## Import

```tsx
import { useTabsSearchParam } from '@v-lab/ui-kit'
import type { UseTabsSearchParamOptions, UseTabsSearchParamResult } from '@v-lab/ui-kit'
```

## Signature

```txt
useTabsSearchParam(paramName, options?)
```

| Option         | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `defaultValue` | Value when the param is missing or not in `validValues`         |
| `replace`      | Default `true` — replace history; `false` — separate Back steps |
| `validValues`  | Allow-list of strings; URL values outside the list are ignored  |

**Returns:** `{ value, setTab, onChange, getTabFromUrl }` — for `<Tabs value={value} onChange={onChange} />`.

## Example

```tsx
import { Tabs } from '@v-lab/ui-kit'
import { useTabsSearchParam } from '@v-lab/ui-kit'

const TAB_IDS = ['general', 'security'] as const

export function SettingsTabs() {
  const { value, onChange } = useTabsSearchParam('tab', {
    defaultValue: 'general',
    validValues: TAB_IDS,
  })

  return (
    <Tabs value={value} onChange={onChange}>
      <Tabs.Tab value="general">General</Tabs.Tab>
      <Tabs.Tab value="security">Security</Tabs.Tab>
      <Tabs.Panel value="general">…</Tabs.Panel>
      <Tabs.Panel value="security">…</Tabs.Panel>
    </Tabs>
  )
}
```

Source: `src/hooks/tabs/useTabsSearchParam.ts`.
