# Layout

Слой `src/components/layout/` отвечает за каркас приложения: верхняя полоса, боковая навигация, основная область контента и выезжающие панели.

```
src/components/layout/
├── LayoutRoot/        корневой flex-контейнер
├── Header/            PageHeader — верхняя полоса области контента (+ PageHeaderDemoContent для stories)
├── Sidebar/           боковая панель: collapsed / expanded
│   ├── Sidebar/, Item/, Card/, HeaderCard/, Footer/, UserProfileCard/
│   └── SidebarContext.ts    + useSidebar()
├── Inset/             основная колонка рядом с Sidebar (SidebarInset, SidebarInsetContent)
└── Drawer/            slide-in панель: left/right/top/bottom + mobile bottom-sheet
    └── components/    DrawerHeader, DrawerBody, DrawerFooter
```

Все компоненты слоя доступны через основной entry `@v-lab/ui-kit`. Стилей в папках нет: у каждого компонента контракт в `src/theme/contracts/` (`layout-root`, `page-header`, `sidebar*`, `drawer*`), оформление — в `src/skins/corporate/components/`.

## Сборка типового layout

```tsx
import {
  LayoutRoot,
  Sidebar,
  SidebarLayout,
  SidebarMain,
  SidebarInset,
  SidebarInsetContent,
  PageHeader,
} from '@v-lab/ui-kit'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutRoot>
      <SidebarLayout>
        <Sidebar>
          <SidebarMain>{/* SidebarItem, SidebarCard и т.д. */}</SidebarMain>
        </Sidebar>

        <SidebarInset>
          <PageHeader>{/* breadcrumbs, поиск, профиль */}</PageHeader>
          <SidebarInsetContent>{children}</SidebarInsetContent>
        </SidebarInset>
      </SidebarLayout>
    </LayoutRoot>
  )
}
```

## Компоненты

### `LayoutRoot`

`<div class="vl-layout-root">` — корневой контейнер для пары `Sidebar` + `SidebarInset`. В скине corporate — `display: flex`, `height: 100vh`, `overflow: hidden`: страница целиком не скроллится, прокручивается только `SidebarInsetContent`. Кастомные `className`/`style` поддерживаются.

### `Sidebar`

Два режима — collapsed (только иконки) и expanded (иконки + подписи). Состояние раздаётся через React Context (`SidebarContext`) и доступно из дерева хуком `useSidebar()`:

```tsx
const { collapsed, toggle } = useSidebar()
```

Подкомпоненты:

| Компонент                                 | Назначение                                         |
| ----------------------------------------- | -------------------------------------------------- |
| `SidebarLayout`                           | Flex-контейнер для пары `Sidebar` + `SidebarInset` |
| `SidebarMain`                             | Прокручиваемая зона навигации                      |
| `SidebarItem`                             | Пункт меню: иконка + label + активное состояние    |
| `SidebarCard`                             | Секционная карточка внутри `SidebarMain`           |
| `SidebarHeader`, `SidebarHeaderCard`      | Шапка панели (логотип, бренд, название)            |
| `SidebarFooter`, `SidebarUserProfileCard` | Нижняя зона (профиль, выход)                       |
| `SidebarTrigger`                          | Кнопка toggle между collapsed/expanded             |

### `PageHeader`

`<header class="vl-page-header">` — верхняя полоса области основного контента. Своих пропов, кроме атрибутов `<header>`, нет: контент (breadcrumbs, поиск, профиль, actions) передаётся через `children`. В скине corporate — `position: sticky` с токеном `--z-sticky`.

### `SidebarInset`

`SidebarInset` — flex-колонка рядом с сайдбаром. `SidebarInsetContent` — прокручиваемая область внутри неё с паддингом по дизайн-системе. Использовать вместе: `PageHeader` сверху, `SidebarInsetContent` под ним.

### `Drawer`

Slide-in панель для контекстных действий (форма редактирования, фильтры, детали записи) — не для первичной навигации.

```tsx
<Drawer side="right" size="md" ref={drawerRef}>
  <DrawerHeader title="Edit" />
  <DrawerBody>{/* форма */}</DrawerBody>
  <DrawerFooter>
    <Button>Save</Button>
  </DrawerFooter>
</Drawer>
```

Пропы: `side: 'left' | 'right' | 'top' | 'bottom'` (по умолчанию `'left'`), `size: 'sm' | 'md' | 'lg' | 'xl'` или произвольный `width`, `mobileBottom` (≤640 px панель всегда снизу, по умолчанию `true`). Controlled API — `open` + `onOpenChange`; императивный — `ref` (`DrawerHandle`).

Устройство — общее с Modal: Floating UI + `FloatingFocusManager` + `useModalStack` + `setBodyScrollLocked`. Детали паттерна — в [`overlays.md`](overlays.md).

## Z-index

Слои каркаса используют семантические токены `--z-*` из `src/skins/corporate/tokens.css`:

| Токен          | Что использует                                                        |
| -------------- | --------------------------------------------------------------------- |
| `--z-base`     | Контент страницы                                                      |
| `--z-raised`   | Локальное наложение соседей (sticky-колонка `Table`)                  |
| `--z-dropdown` | Выпадающий список `SelectInput`, `AppSwitcher`                        |
| `--z-sticky`   | `PageHeader`, sticky-шапка `Table`                                    |
| `--z-sidebar`  | `Sidebar`                                                             |
| `--z-overlay`  | `Popover`, календарь `DateInput`, выпадающее меню `SidebarHeaderCard` |
| `--z-modal`    | `Modal`, `Drawer` (внутри `ModalProvider` — сдвиг по глубине стека)   |
| `--z-tooltip`  | `Tooltip`                                                             |
| `--z-toast`    | Toast-уведомления                                                     |

Не задавать `z-index` числом — только через токен или относительный сдвиг от него.
