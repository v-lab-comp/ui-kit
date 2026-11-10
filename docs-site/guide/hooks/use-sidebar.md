---
title: useSidebar
description: collapsed и toggle из контекста SidebarLayout.
---

# useSidebar

Читает состояние сайдбара из **`SidebarContext`**, который задаёт **`SidebarLayout`** (`collapsed`, **`toggle`**). Отдельные части сайдбара (**`SidebarItem`**, **`SidebarHeader`**, …) тоже используют этот контекст для отступов и подписей.

Если провайдера нет, возвращается **`collapsed`** из необязательного аргумента (или **`false`**) и **`toggle`** без эффекта — удобно для изолированных тестов.

## Превью

<ComponentDocsPreview name="hookSidebar" />

## Импорт

```tsx
import { useSidebar } from '@v-lab/ui-kit'
```

## Сигнатура

```txt
useSidebar(propCollapsed?)
```

| Аргумент        | Описание                                             |
| --------------- | ---------------------------------------------------- |
| `propCollapsed` | Если задан — переопределяет `collapsed` из контекста |

**Возвращает:** `{ collapsed, toggle }`.

## Пример

```tsx
import { useSidebar } from '@v-lab/ui-kit'

export function RailToggle() {
  const { collapsed, toggle } = useSidebar()

  return (
    <button type="button" onClick={toggle}>
      {collapsed ? 'Развернуть' : 'Свернуть'}
    </button>
  )
}
```

Сборка страницы с **`Sidebar`**, **`SidebarMain`**, **`LayoutRoot`** — в разделе [Layout](/guide/components/layout) и в Storybook **Layout / Sidebar**.

Исходник: `src/components/layout/Sidebar/SidebarContext.ts`.
