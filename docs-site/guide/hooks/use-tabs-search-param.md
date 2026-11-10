---
title: useTabsSearchParam
description: Активная вкладка и query-параметр (?tab=) без react-router.
---

# useTabsSearchParam

Синхронизирует строку состояния вкладки с **одним query-параметром** (`?имя=значение`) через **`history.replaceState`** или **`pushState`**. Компонент **`Tabs`** остаётся «глупым»: передайте **`value`** и **`onChange`** из хука.

При **`popstate`** (кнопка «Назад») состояние перечитывается из URL.

## Превью

<ComponentDocsPreview name="hookTabsSearchParam" />

Живая демонстрация добавляет к адресу текущей страницы параметр **`uik_hook_tab`** — только для этого превью в документации.

## Импорт

```tsx
import { useTabsSearchParam } from '@v-lab/ui-kit'
import type { UseTabsSearchParamOptions, UseTabsSearchParamResult } from '@v-lab/ui-kit'
```

## Сигнатура

```txt
useTabsSearchParam(paramName, options?)
```

| Опция          | Описание                                                                |
| -------------- | ----------------------------------------------------------------------- |
| `defaultValue` | Значение, если параметра нет или он не входит в `validValues`           |
| `replace`      | По умолчанию `true` — подмена истории; `false` — отдельные шаги «Назад» |
| `validValues`  | Белый список строк; значение из URL вне списка игнорируется             |

**Возвращает:** `{ value, setTab, onChange, getTabFromUrl }` — для `<Tabs value={value} onChange={onChange} />`.

## Пример

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
      <Tabs.Tab value="general">Общее</Tabs.Tab>
      <Tabs.Tab value="security">Безопасность</Tabs.Tab>
      <Tabs.Panel value="general">…</Tabs.Panel>
      <Tabs.Panel value="security">…</Tabs.Panel>
    </Tabs>
  )
}
```

Исходник: `src/hooks/tabs/useTabsSearchParam.ts`.
