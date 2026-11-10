---
title: Typography
description: Типографика — title, label, paragraph, subheading, docs.
---

# Typography

Единые стили текста по вариантам и размерам из дизайн-системы.

## Превью

Несколько вариантов (**title**, **paragraph**, **label**, **subheading**) — как в примере кода ниже.

<ComponentDocsPreview name="typography" />

## Импорт

```tsx
import { Typography } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { Typography } from '@v-lab/ui-kit'

export function ArticleHeading() {
  return (
    <>
      <Typography variant="title" size="h1">
        Заголовок страницы
      </Typography>
      <Typography variant="paragraph" size="medium">
        Основной текст абзаца по дизайн-системе.
      </Typography>
      <Typography variant="label" size="small">
        Подпись к полю
      </Typography>
      <Typography variant="subheading" size="small">
        подзаголовок секции
      </Typography>
    </>
  )
}
```

## Основные пропсы

| Проп        | Тип                                                                                   | Описание                                                                         |
| ----------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `variant`   | `title` \| `label` \| `paragraph` \| `subheading` \| `docs`                           | Набор стилей из дизайн-системы                                                   |
| `size`      | зависит от **`variant`** (напр. **title**: `h1`…`h6`; **label**: `x-large`…`x-small`) | Размер внутри варианта — см. **`TITLE_SIZES`**, **`LABEL_SIZES`** и т.д. в типах |
| `weight`    | **`TypographyWeight`**                                                                | Насыщенность (у **`docs`** вес зашит в размер)                                   |
| `component` | **`ElementType`**                                                                     | HTML-тег или компонент вместо тега по умолчанию                                  |

Плюс **`HTMLAttributes<HTMLElement>`** ( **`className`**, **`style`**, **`id`**, **`children`** …).

Тип с дженериком по варианту: **`TypographyProps<V>`** — при **`variant="title"`** поле **`size`** ограничено **`TitleSize`**, и т.д. Без дженерика в IDE **`size`** может быть объединением всех вариантов.

Полный тип — **`TypographyProps`**.

## Галерея

Все размеры по каждому варианту — как в Storybook **Gallery → Typography**.

<ComponentDocsPreview name="typographyGallery" />

Исходники: `src/components/Typography/`.
