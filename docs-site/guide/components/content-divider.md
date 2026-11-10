---
title: ContentDivider
description: Горизонтальные разделители — линия, текст, слот.
---

# ContentDivider

Варианты **`line`**, **`lineSpacing`**, **`textAndLine`**, **`text`**, **`solidText`**, **`withSlot`** (см. Storybook).

## Превью

<ComponentDocsPreview name="contentDivider" />

## Импорт

```tsx
import { ContentDivider } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { ContentDivider } from '@v-lab/ui-kit'

export function Dividers() {
  return (
    <>
      <ContentDivider variant="line" />
      <ContentDivider variant="textAndLine" text="или" />
      <ContentDivider variant="solidText" text="Секция" />
    </>
  )
}
```

С кастомным слотом (кнопка по центру):

```tsx
import { RiAddLine } from '@remixicon/react'
import { Button, ContentDivider } from '@v-lab/ui-kit'

export function DividerWithSlot() {
  return (
    <ContentDivider variant="withSlot">
      <Button
        variant="stroke"
        color="neutral"
        size="x-small"
        leftNode={<RiAddLine size={20} />}
        aria-label="Добавить"
      />
    </ContentDivider>
  )
}
```

## Основные пропсы

| Проп        | Тип                                                                             | Описание                                                                         |
| ----------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `variant`   | `line` \| `lineSpacing` \| `textAndLine` \| `text` \| `solidText` \| `withSlot` | Тип разделителя (линия, отступы, текст с линиями, только текст, заголовок, слот) |
| `text`      | `string`                                                                        | Текст для вариантов с текстом (**`textAndLine`**, **`text`**, **`solidText`**)   |
| `children`  | `ReactNode`                                                                     | Центральный слот для **`variant="withSlot"`**                                    |
| `className` | `string`                                                                        | Доп. класс корня                                                                 |

Полный тип — **`ContentDividerProps`**.

Исходники: `src/components/ContentDivider/`.
