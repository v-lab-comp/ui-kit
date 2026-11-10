---
title: Иконки
description: Remix Icon и реэкспорт — как Design System / Icons в Storybook.
---

# Иконки

Соответствует **Design System → Icons** в Storybook (история **Remix Icon Gallery**).

## Галерея

Тот же поиск и сетка имён, что в Storybook — переключатель **Тема** слева задаёт светлую/тёмную подложку для токенов.

<ComponentDocsPreview name="iconsGallery" />

## Библиотека

В компонентах и сторис используется **`@remixicon/react`**: импорт конкретных символов по имени, размер обычно **`16`** для инлайн-иконок в полях и кнопках.

```tsx
import { RiMailLine } from '@remixicon/react'

export function Example() {
  return <RiMailLine size={16} />
}
```

## Реэкспорт из пакета

Точка входа **`@v-lab/ui-kit/icons`** — barrel иконок для приложений, если нужен единый импорт из ui-kit.

## Общие иконки для сторис

В репозитории **`src/stories/helpers.tsx`** — переиспользуемые обёртки для документации; в коде продукта не дублируйте сырые SVG.
