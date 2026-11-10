---
title: Флаги стран
description: SVG-флаги для селектов локали — как Design System / Country Flags в Storybook.
---

# Флаги стран

Соответствует **Design System → Country Flags** в Storybook (история **Flags Gallery**).

## Галерея

Поиск по имени компонента (**`Flag…`**) или по названию страны из манифеста — как в Storybook.

<ComponentDocsPreview name="flagsGallery" />

## Импорт

Отдельная точка входа пакета:

```tsx
import { FlagUz } from '@v-lab/ui-kit/flags'
```

Полный список компонентов зависит от набора в **`src`** репозитория; сборка экспортируется в **`dist/flags`**.

Используются в **`PhoneInput`** и любых формах, где нужен визуальный код страны рядом с текстом.
