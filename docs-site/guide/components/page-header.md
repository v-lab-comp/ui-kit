---
title: PageHeader
description: Верхняя полоса области контента — слот под заголовок, хлебные крошки, действия.
---

# PageHeader

Семантический **`<header>`** с оформлением из дизайн-системы. В **`children`** передаётся любая разметка: заголовок страницы, **`Breadcrumbs`**, поиск, кнопки. Готовый составной пример для превью — **`PageHeaderDemoContent`** (как в Storybook **Layout / Header**).

## Превью

<ComponentDocsPreview name="pageHeader" />

## Импорт

```tsx
import { PageHeader, PageHeaderDemoContent } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { PageHeader } from '@v-lab/ui-kit'

export function ShellHeader() {
  return (
    <PageHeader>
      <h1 style={{ margin: 0 }}>Заголовок страницы</h1>
    </PageHeader>
  )
}
```

Обычно **`PageHeader`** стоит внутри **`SidebarInset`** рядом с основным контентом — см. [Layout](./layout).

## Примеры

### С хлебными крошками и кнопками действий

```tsx
import {
  PageHeader,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Button,
} from '@v-lab/ui-kit'
import { RiAddLine, RiDownloadLine } from '@remixicon/react'

export function DocumentsHeader() {
  return (
    <PageHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Документы</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Счета</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Счета</h1>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <Button variant="stroke" color="neutral" leftIcon={<RiDownloadLine size={16} />}>
          Экспорт
        </Button>
        <Button leftIcon={<RiAddLine size={16} />}>Новый счёт</Button>
      </div>
    </PageHeader>
  )
}
```

### Только заголовок

```tsx
<PageHeader>
  <h1>Настройки</h1>
</PageHeader>
```

### С поиском и фильтром

```tsx
<PageHeader>
  <h1>Контрагенты</h1>
  <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
    <SearchInput placeholder="Поиск..." style={{ width: 240 }} />
    <Button variant="stroke" color="neutral">
      Фильтр
    </Button>
  </div>
</PageHeader>
```

## Основные пропсы

| Проп        | Тип         | Описание                                              |
| ----------- | ----------- | ----------------------------------------------------- |
| `children`  | `ReactNode` | Произвольный контент (заголовок, breadcrumbs, кнопки) |
| `className` | `string`    | Дополнительный CSS-класс                              |

Принимает все `HTMLAttributes<HTMLElement>` (`<header>`).

Исходники: `src/components/layout/Header/` · `Header.types.ts`.
