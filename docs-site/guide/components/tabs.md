---
title: Tabs
description: Вкладки — контролируемые и неконтролируемые.
---

# Tabs

Компонент **`Tabs`** с **`Tabs.Tab`** и **`Tabs.Panel`**. Синхронизация с URL — через хук **`useTabsSearchParam`** (см. Storybook), сам **`Tabs`** про URL не знает.

## Превью

<ComponentDocsPreview name="tabs" />

## Импорт

```tsx
import { Tabs } from '@v-lab/ui-kit'
```

## Пример

Неконтролируемые вкладки (начальное значение через **`defaultValue`**):

```tsx
import { Tabs } from '@v-lab/ui-kit'

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general">
      <Tabs.Tab value="general">Общие</Tabs.Tab>
      <Tabs.Tab value="security">Безопасность</Tabs.Tab>
      <Tabs.Panel value="general">Настройки профиля.</Tabs.Panel>
      <Tabs.Panel value="security">Пароль и сессии.</Tabs.Panel>
    </Tabs>
  )
}
```

Управляемый режим:

```tsx
import { useState } from 'react'
import { Tabs } from '@v-lab/ui-kit'

export function ControlledTabs() {
  const [tab, setTab] = useState('b')

  return (
    <Tabs value={tab} onChange={setTab}>
      <Tabs.Tab value="a">A</Tabs.Tab>
      <Tabs.Tab value="b">B</Tabs.Tab>
      <Tabs.Panel value="a">Контент A</Tabs.Panel>
      <Tabs.Panel value="b">Контент B</Tabs.Panel>
    </Tabs>
  )
}
```

## Основные пропсы

### `Tabs` (корень)

| Проп                             | Тип                       | Описание                                                                               |
| -------------------------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `children`                       | `ReactNode`               | **`Tabs.Tab`** и **`Tabs.Panel`** в любом порядке в разметке                           |
| `defaultValue`                   | `string`                  | Активная вкладка в неконтролируемом режиме                                             |
| `value`                          | `string`                  | Активная вкладка в контролируемом режиме                                               |
| `onChange`                       | `(value: string) => void` | Контролируемый режим — когда передан **`value`**; смену получайте через **`onChange`** |
| `aria-label` / `aria-labelledby` | `string`                  | Имя списка вкладок, если **`Tabs.List`** не используется                               |

Тип — **`TabsProps`**.

### `Tabs.List`

Необязательная обёртка вкладок (`role="tablist"`): принимает `aria-label` / `aria-labelledby`, `className`, `ref` и остальные пропсы `div`. Вкладки внутри можно оборачивать в свои компоненты. Без **`Tabs.List`** все дети корня, кроме **`Tabs.Panel`**, попадают в список автоматически.

Клавиатура (WAI-ARIA APG): в порядке Tab — только активная вкладка; ←/→, Home/End переводят фокус и сразу активируют вкладку. `Tabs.Tab` и `Tabs.Panel` принимают `ref`, `className` и остальные HTML-пропсы.

Тип — **`TabsListProps`**.

### `Tabs.Tab`

| Проп       | Тип         | Описание                                   |
| ---------- | ----------- | ------------------------------------------ |
| `value`    | `string`    | Идентификатор вкладки (связан с **Panel**) |
| `children` | `ReactNode` | Подпись вкладки                            |

Тип — **`TabsTabProps`**.

### `Tabs.Panel`

| Проп       | Тип         | Описание                          |
| ---------- | ----------- | --------------------------------- |
| `value`    | `string`    | Должен совпадать с **`Tabs.Tab`** |
| `children` | `ReactNode` | Содержимое панели                 |

Тип — **`TabsPanelProps`**.

Исходники: `src/components/Tabs/`.
