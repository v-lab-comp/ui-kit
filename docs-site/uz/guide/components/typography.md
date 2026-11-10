---
title: Typography
description: Tipografika — title, label, paragraph, subheading, docs.
---

# Typography

Dizayn tizimi variantlari va o‘lchamlari bo‘yicha yagona matn uslublari.

## Preview

Bir nechta variant (**title**, **paragraph**, **label**, **subheading**) — pastdagi kod misolidagi kabi.

<ComponentDocsPreview name="typography" />

## Import

```tsx
import { Typography } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { Typography } from '@v-lab/ui-kit'

export function ArticleHeading() {
  return (
    <>
      <Typography variant="title" size="h1">
        Sahifa sarlavhasi
      </Typography>
      <Typography variant="paragraph" size="medium">
        Dizayn tizimiga mos asosiy matn paragrafi.
      </Typography>
      <Typography variant="label" size="small">
        Maydon yorlig‘i
      </Typography>
      <Typography variant="subheading" size="small">
        bo‘lim pastki sarlavhasi
      </Typography>
    </>
  )
}
```

## Asosiy proplar

| Prop        | Tip                                                                                  | Tavsif                                                                               |
| ----------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `variant`   | `title` \| `label` \| `paragraph` \| `subheading` \| `docs`                          | Dizayn tizimidan uslublar to‘plami                                                   |
| `size`      | **`variant`** ga bog‘liq (mas. **title**: `h1`…`h6`; **label**: `x-large`…`x-small`) | Variant ichidagi o‘lcham — tiplardagi **`TITLE_SIZES`**, **`LABEL_SIZES`** va hokazo |
| `weight`    | **`TypographyWeight`**                                                               | Qalinlik (**`docs`** da o‘lcham bilan berilgan)                                      |
| `component` | **`ElementType`**                                                                    | Standart teg o‘rniga HTML-teg yoki komponent                                         |

Qo‘shimcha **`HTMLAttributes<HTMLElement>`** (**`className`**, **`style`**, **`id`**, **`children`** …).

Variant bo‘yicha generic tip: **`TypographyProps<V>`** — masalan **`variant="title"`** da **`size`** maydoni **`TitleSize`** bilan cheklanadi. Generic siz IDE da **`size`** barcha variantlarning birlashmasi bo‘lishi mumkin.

To‘liq tip — **`TypographyProps`**.

## Galereya

Har bir variant bo‘yicha barcha o‘lchamlar — Storybook **Gallery → Typography** kabi.

<ComponentDocsPreview name="typographyGallery" />

Manbalar: `src/components/Typography/`.
