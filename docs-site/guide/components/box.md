---
title: Box
description: Универсальный контейнер — как Components/Box в Storybook.
---

# Box

Нейтральная обёртка над `<div>` без собственного оформления: у `Box` нет класса `vl-*` и стилей в скине — отступы, фон и типографику задают ваши `className` / `style` (через токены дизайн-системы).

## Превью

<ComponentDocsPreview name="box" />

## Импорт

```tsx
import { Box } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { Box } from '@v-lab/ui-kit'

export function CardLikeBox() {
  return (
    <Box>
      <p>Произвольный контент внутри Box.</p>
    </Box>
  )
}
```

## Ref

`Box` пробрасывает `ref` на корневой элемент:

```tsx
import { useRef } from 'react'
import { Box } from '@v-lab/ui-kit'

const ref = useRef<HTMLDivElement>(null)
<Box ref={ref}>Content</Box>
```

## Использование в layout

`Box` удобен как нейтральная обёртка внутри layout-компонентов (`SidebarInset` сам рендерится как `<main>`; `page-content` — класс вашего приложения):

```tsx
import { SidebarInset, Box } from '@v-lab/ui-kit'
;<SidebarInset>
  <Box className="page-content">
    <section>
      <h2>Section title</h2>
      <p>Content here.</p>
    </section>
  </Box>
</SidebarInset>
```

## Основные пропсы

**`BoxProps`** = **`HTMLAttributes<HTMLDivElement>`**; `ref` указывает на `HTMLDivElement`. Отдельного пропа для смены тега нет — `Box` всегда рендерит `<div>`.

| Проп        | Тип                   | По умолчанию | Описание                 |
| ----------- | --------------------- | ------------ | ------------------------ |
| `children`  | `ReactNode`           | —            | Содержимое               |
| `className` | `string`              | —            | Дополнительный CSS-класс |
| `style`     | `CSSProperties`       | —            | Инлайн-стили             |
| `ref`       | `Ref<HTMLDivElement>` | —            | Ссылка на DOM-элемент    |

Принимает все `HTMLAttributes<HTMLDivElement>` (`onClick`, `role`, `aria-*`, `data-*` и т.д.).

Исходники: `src/components/Box/`.
