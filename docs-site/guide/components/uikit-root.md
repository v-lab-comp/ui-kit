---
title: UiKitRoot
description: Локальный CSS-reset и базовая типографика для островка интерфейса.
---

# UiKitRoot

Обёртка с классом **`vl-ui-kit-root`**: нормализация отступов, `box-sizing`, базовые стили форм и типографики внутри узла — их задаёт скин (`src/skins/corporate/components/ui-kit-root.css`). Не подменяет глобальные стили **`body`** — оберните корень приложения или блок изоляции (превью, виджет).

## Превью

<ComponentDocsPreview name="uikitRoot" />

## Импорт

```tsx
import { UiKitRoot } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { UiKitRoot } from '@v-lab/ui-kit'

export function AppShell({ children }: { children: React.ReactNode }) {
  return <UiKitRoot>{children}</UiKitRoot>
}
```

## Когда использовать

| Сценарий                  | Что делать                                               |
| ------------------------- | -------------------------------------------------------- |
| SPA с одним корнем        | Обернуть `<App />` в `<UiKitRoot>` один раз в `main.tsx` |
| Micro-frontend / виджет   | Обернуть точку монтирования чтобы изолировать стили      |
| Превью в docs / Storybook | `<UiKitRoot>` уже добавлен в глобальный decorator        |

## ModalProvider внутри UiKitRoot

Если используете `Modal`, `Drawer`, `Tooltip` — добавьте `ModalProvider` рядом с `UiKitRoot`:

```tsx
import { UiKitRoot, ModalProvider } from '@v-lab/ui-kit'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UiKitRoot>
      <ModalProvider>{children}</ModalProvider>
    </UiKitRoot>
  )
}
```

**`ModalProvider`** управляет стеком оверлеев (z-index, Escape только для верхнего). Без него одиночный диалог работает, но при нескольких одновременно открытых Modal/Drawer нужен провайдер.

## Основные пропсы

| Проп        | Тип             | Описание                                       |
| ----------- | --------------- | ---------------------------------------------- |
| `children`  | `ReactNode`     | Содержимое приложения                          |
| `className` | `string`        | Дополнительный CSS-класс для корневого `<div>` |
| `style`     | `CSSProperties` | Инлайн-стили корневого `<div>`                 |

Принимает все `HTMLAttributes<HTMLDivElement>`.

Исходники: `src/components/UiKitRoot/` · `UiKitRoot.types.ts`.
