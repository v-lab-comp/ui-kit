---
title: Layout
description: Каркас приложения — сайдбар, основная колонка, PageHeader; два способа сборки.
---

# Layout

Блоки раскладки экспортируются из **`@v-lab/ui-kit`**. Ниже — из чего они состоят и **два типичных сценария**: «простая связка» (**SidebarLayout** + колонка контента) и «полная страница» с фиксированным хедером (**LayoutRoot** + **SidebarInset**).

Хук **`useSidebar`** возвращает **`collapsed`** и **`toggle`** из контекста **`SidebarLayout`**. Если провайдера нет, передайте **`collapsed`** на **`Sidebar`** / **`SidebarItem`** вручную и навесьте **`onToggle`** на **`SidebarTrigger`** (как в превью ниже).

## Превью

Ниже три блока: **только сайдбар** (**`SidebarLayout`** + **`Sidebar`** + **`SidebarMain`**), **только верхняя полоса** основной колонки (**`PageHeader`** + плейсхолдер под ним), затем **полная сборка** как в Storybook **Layout / Full Page**.

Фиксированный сайдбар остаётся внутри рамки превью за счёт контекста позиционирования на обёртке доков (**`transform`** у блока превью — иначе **`position: fixed`** у колонки цеплялся бы к окну браузера).

### Только сайдбар

**`SidebarLayout`** → **`Sidebar`** (шапка с **`SidebarTrigger`** из контекста, навигация, **`SidebarFooter`**) → **`SidebarMain`** с плейсхолдером справа. Без **`LayoutRoot`** и без **`PageHeader`**.

<ComponentDocsPreview name="layoutSidebar" />

### Только PageHeader

Верхняя полоса основной колонки (**`PageHeader`** с **`PageHeaderDemoContent`**) и условный блок контента ниже — как **`SidebarInset`** без сайдбара.

<ComponentDocsPreview name="layoutHeader" />

### Полная страница

**`LayoutRoot`** → **`Sidebar`** → **`SidebarInset`** (**`PageHeader`** + **`SidebarInsetContent`**).

::: tip Ширины для `insetLeft`
В макете сайдбар **272px** развёрнутый и **80px** свёрнутый (совпадает с **`Sidebar`** в CSS). В состоянии **`collapsed`** задавайте **`insetLeft`** в том же числе пикселей, что и ширина полосы — иначе основная колонка не совпадёт с сайдбаром.
:::

<ComponentDocsPreview name="layout" />

## Из чего состоит layout

### Два способа собрать страницу

| Подход                                                  | Когда использовать                                                                                                                                                                                                                                        |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`SidebarLayout`** + **`Sidebar`** + **`SidebarMain`** | Проще: сайдбар и контент рядом одной flex-обёрткой; **`SidebarMain`** сам сдвигается при **`collapsed`** (отступ **`margin-left`**). Нет отдельной верхней полосы страницы «как в приложении».                                                            |
| **`LayoutRoot`** + **`Sidebar`** + **`SidebarInset`**   | Полный каркас: корень задаёт **`height`** и **`overflow`**, чтобы **скролл был только в области контента**, а **`PageHeader`** оставался сверху. **`SidebarInset`** получает **`insetLeft`** — ширина колонки сайдбара в px (зависит от **`collapsed`**). |

Сайдбар (**`Sidebar`**) визуально фиксирован слева (в приложении — к краю окна). В **`SidebarInset`** обычно идут **`PageHeader`** (свой контент: хлебные крошки, действия) и **`SidebarInsetContent`** — прокручиваемая область под хедером.

### Дерево компонентов (полный каркас)

```text
LayoutRoot                         ← корень страницы: flex, overflow, высота
├── Sidebar                        ← колонка сайдбара (фиксированное позиционирование в приложении)
│   ├── SidebarHeader              ← бренд + заголовок; слот trigger → SidebarTrigger
│   ├── SidebarContent             ← скролл только секций навигации
│   │   └── SidebarSection
│   │       └── SidebarItem …
│   └── SidebarFooter              ← обёртка над SidebarUserProfileCard (+ divider)
│
└── SidebarInset                   ← main: insetLeft = ширина сайдбара
    ├── PageHeader                 ← верхняя полоса основной области
    └── SidebarInsetContent        ← основной скролл страницы
```

Упрощённый вариант без **`LayoutRoot`** / **`PageHeader`**:

```text
SidebarLayout                      ← провайдер контекста collapsed + обёртка flex
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent → SidebarSection → SidebarItem …
│   └── SidebarFooter (опционально)
└── SidebarMain                    ← контент справа, отступ под ширину сайдбара
```

### Компоненты сайдбара

| Компонент                    | Назначение                                                                                                                                                                                                                                                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`SidebarLayout`**          | Провайдер **`SidebarContext`** (**collapsed**, **toggle**) и обёртка flex под **`Sidebar`** + **`SidebarMain`**.                                                                                                                                                |
| **`Sidebar`**                | Корень колонки: ширина в развёрнутом / свёрнутом виде, **`collapsed`**.                                                                                                                                                                                         |
| **`SidebarHeader`**          | Шапка сайдбара; внутри **`SidebarHeaderCard`**; опционально **`divider`**, слот **`trigger`** (**`SidebarTrigger`**).                                                                                                                                           |
| **`SidebarHeaderCard`**      | Карточка бренда / заголовка (используется внутри **`SidebarHeader`**; можно использовать отдельно в кастомной вёрстке). С **`options`** — кнопка меню (WAI-ARIA APG): ↑/↓/Home/End, поиск по буквам, Escape; пункты — **`menuitemradio`**.                      |
| **`SidebarContent`**         | Средняя прокручиваемая часть между шапкой и футером. Рендерится как **`<nav>`** (landmark); имя — **`aria-label`**, если навигаций несколько.                                                                                                                   |
| **`SidebarSection`**         | Группа пунктов с подписью (**`label`**).                                                                                                                                                                                                                        |
| **`SidebarItem`**            | Пункт меню: **`leftNode`** (иконка), **`active`**, **`collapsed`**. С **`href`** — ссылка **`<a>`**, без — **`<button>`**. В **`collapsed`** текст пункта остаётся его доступным именем. **`SidebarSection`** с **`label`** — **`role="group"`** с этим именем. |
| **`SidebarTrigger`**         | Кнопка сворачивания; без **`SidebarLayout`** передать **`onToggle`** и **`collapsed`**.                                                                                                                                                                         |
| **`SidebarFooter`**          | Футер с **`SidebarUserProfileCard`** (аватар, имя, email).                                                                                                                                                                                                      |
| **`SidebarUserProfileCard`** | Карточка профиля (используется в **`SidebarFooter`** или самостоятельно).                                                                                                                                                                                       |
| **`SidebarCard`**            | Универсальная карточка внутри колонки.                                                                                                                                                                                                                          |

### Основная область и корень

| Компонент                 | Назначение                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`LayoutRoot`**          | Корень страницы с сайдбаром: **`height`**, **`overflow`**, чтобы **`SidebarInsetContent`** был единственной прокруткой под **`PageHeader`**.                              |
| **`SidebarInset`**        | Тег **`<main>`**: **`insetLeft`** сдвигает колонку от левого края на ширину сайдбара (учитывайте **`collapsed`**).                                                        |
| **`SidebarInsetContent`** | Область под **`PageHeader`** с **`overflow-y: auto`**. Фокусируется с клавиатуры (**`tabIndex={0}`**); с **`aria-label`** — **`role="region"`**.                          |
| **`PageHeader`**          | Верхняя полоса основной колонки; **`children`** — любая вёрстка. Для демо в Storybook есть **`PageHeaderDemoContent`**. Отдельная страница — [PageHeader](./page-header). |
| **`SidebarMain`**         | Альтернатива **`SidebarInset`** в связке с **`SidebarLayout`**: простой блок контента с отступом слева.                                                                   |

## Импорт

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

## Пример: SidebarLayout + SidebarMain

Когда не нужны **`LayoutRoot`** и фиксированный **`PageHeader`**:

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
        <SidebarHeader icon={<BrandIcon />} title="Проект" subtitle="Окружение" divider />
        <SidebarContent>
          <SidebarSection label="Раздел">
            {/* SidebarItem + иконки из @remixicon/react */}
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
      <SidebarMain>
        <main>Контент страницы</main>
      </SidebarMain>
    </SidebarLayout>
  )
}
```

Полная страница с **`LayoutRoot`**, **`SidebarInset`** и отступом **`insetLeft`** при **`collapsed`** — в превью выше и в Storybook **Layout / Full Page**.

## Пример: полный каркас (LayoutRoot + SidebarInset)

Управляем **`collapsed`** сами (как в превью и в **`FullLayout.stories.tsx`**): **`SidebarTrigger`** с **`onToggle`**, **`SidebarInset`** с **`insetLeft`** из текущей ширины сайдбара.

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
          title="Проект"
          subtitle="Окружение"
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
          title="Имя"
          description="email@…"
          divider
          collapsed={collapsed}
        />
      </Sidebar>

      <SidebarInset insetLeft={insetLeft}>
        <PageHeader>{/* хлебные крошки, действия */}</PageHeader>
        <SidebarInsetContent>{/* основной скролл страницы */}</SidebarInsetContent>
      </SidebarInset>
    </LayoutRoot>
  )
}
```

## Основные пропсы

Единого типа «один интерфейс на всё» нет: у **`SidebarLayout`**, **`Sidebar`**, **`SidebarInset`**, **`LayoutRoot`**, **`PageHeader`** — свои **`*.types.ts`**. Свод экспорта — **`src/index.ts`** и **`src/components/layout/`**.

Исходники: `src/components/layout/`.
