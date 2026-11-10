---
title: useTabsSearchParam
description: Faol varaq va query parametri (?tab=) — react-router siz.
---

# useTabsSearchParam

Varaq holatini bitta **query parametri** bilan (`?nom=qiymat`) **`history.replaceState`** yoki **`pushState`** orqali sinxronlashtiradi. **`Tabs`** komponenti «xolis» bo‘lib qoladi: hookdan **`value`** va **`onChange`** bering.

**`popstate`** da («Orqaga» tugmasi) holat URL dan qayta o‘qiladi.

## Preview

<ComponentDocsPreview name="hookTabsSearchParam" />

Jonli demo joriy sahifa manziliga faqat ushbu hujjat preview’i uchun **`uik_hook_tab`** parametrini qo‘shadi.

## Import

```tsx
import { useTabsSearchParam } from '@v-lab/ui-kit'
import type { UseTabsSearchParamOptions, UseTabsSearchParamResult } from '@v-lab/ui-kit'
```

## Signatura

```txt
useTabsSearchParam(paramName, options?)
```

| Parametr       | Tavsif                                                                            |
| -------------- | --------------------------------------------------------------------------------- |
| `defaultValue` | Parametr yo‘q yoki `validValues` ga kirmasa — shu qiymat                          |
| `replace`      | Standart `true` — tarixni almashtirish; `false` — «Orqaga» uchun alohida qadamlar |
| `validValues`  | Qatorlarning oq ro‘yxati; URL dan tashqaridagi qiymat e’tiborsiz qoldiriladi      |

**Qaytaradi:** `{ value, setTab, onChange, getTabFromUrl }` — `<Tabs value={value} onChange={onChange} />` uchun.

## Misol

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
      <Tabs.Tab value="general">Umumiy</Tabs.Tab>
      <Tabs.Tab value="security">Xavfsizlik</Tabs.Tab>
      <Tabs.Panel value="general">…</Tabs.Panel>
      <Tabs.Panel value="security">…</Tabs.Panel>
    </Tabs>
  )
}
```

Manba: `src/hooks/tabs/useTabsSearchParam.ts`.
