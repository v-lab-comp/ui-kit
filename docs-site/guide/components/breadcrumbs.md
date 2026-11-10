---
title: Breadcrumbs
description: Навигационные хлебные крошки — Components/Breadcrumbs в Storybook.
---

# Breadcrumbs

Компоненты **`Breadcrumbs`**, **`BreadcrumbItem`**, **`BreadcrumbLink`**, **`BreadcrumbPage`** и разделители **`chevron`**, **`slash`**, **`dot`**.

## Превью

<ComponentDocsPreview name="breadcrumbs" />

## Импорт

```tsx
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { RiHome5Line } from '@remixicon/react'
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@v-lab/ui-kit'

const icon = <RiHome5Line size={20} />

export function PageBreadcrumbs() {
  return (
    <Breadcrumbs separator="chevron">
      <BreadcrumbItem>
        <BreadcrumbLink href="/" icon={icon}>
          Главная
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/section" icon={icon}>
          Раздел
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage icon={icon}>Текущая страница</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  )
}
```

## Основные пропсы

### `Breadcrumbs`

| Проп        | Тип                           | Описание                       |
| ----------- | ----------------------------- | ------------------------------ |
| `children`  | `ReactNode`                   | Цепочка **`BreadcrumbItem`**   |
| `separator` | `chevron` \| `slash` \| `dot` | Вид разделителя между пунктами |

Плюс атрибуты контейнера **`HTMLElement`** (**`className`**, **`aria-label`**, …). Тип — **`BreadcrumbsProps`**.

### `BreadcrumbItem`

| Проп       | Тип         | Описание                                             |
| ---------- | ----------- | ---------------------------------------------------- |
| `children` | `ReactNode` | Обычно **`BreadcrumbLink`** или **`BreadcrumbPage`** |

Тип — **`BreadcrumbItemProps`** (`<li>`).

### `BreadcrumbLink`

Полиморфный компонент (по умолчанию **`<a>`**): **`as`**, **`href`**, **`icon`**, **`children`**, плюс пропсы целевого элемента без конфликтов. Тип — **`BreadcrumbLinkProps`**.

### `BreadcrumbPage`

Текущая страница (не ссылка): **`icon`**, **`children`**, атрибуты **`HTMLSpanElement`**. Тип — **`BreadcrumbPageProps`**.

Исходники: `src/components/Breadcrumb/`.
