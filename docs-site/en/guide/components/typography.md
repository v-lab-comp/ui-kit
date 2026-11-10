---
title: Typography
description: Typography — title, label, paragraph, subheading, docs.
---

# Typography

Shared text styles by variant and size from the design system.

## Preview

Several variants (**title**, **paragraph**, **label**, **subheading**) — as in the code sample below.

<ComponentDocsPreview name="typography" />

## Import

```tsx
import { Typography } from '@v-lab/ui-kit'
```

## Example

```tsx
import { Typography } from '@v-lab/ui-kit'

export function ArticleHeading() {
  return (
    <>
      <Typography variant="title" size="h1">
        Page title
      </Typography>
      <Typography variant="paragraph" size="medium">
        Body paragraph text per the design system.
      </Typography>
      <Typography variant="label" size="small">
        Field label
      </Typography>
      <Typography variant="subheading" size="small">
        Section subheading
      </Typography>
    </>
  )
}
```

## Main props

| Prop        | Type                                                                                 | Description                                                                   |
| ----------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `variant`   | `title` \| `label` \| `paragraph` \| `subheading` \| `docs`                          | Style set from the design system                                              |
| `size`      | depends on **`variant`** (e.g. **title**: `h1`…`h6`; **label**: `x-large`…`x-small`) | Size within variant — see **`TITLE_SIZES`**, **`LABEL_SIZES`**, etc. in types |
| `weight`    | **`TypographyWeight`**                                                               | Weight (**`docs`** bakes weight into size)                                    |
| `component` | **`ElementType`**                                                                    | HTML tag or component override                                                |

Plus **`HTMLAttributes<HTMLElement>`** (**`className`**, **`style`**, **`id`**, **`children`**, …).

Generic by variant: **`TypographyProps<V>`** — with **`variant="title"`**, **`size`** is **`TitleSize`**, etc. Without the generic, IDE may show a union of all sizes.

Full type — **`TypographyProps`**.

## Gallery

All sizes per variant — Storybook **Gallery → Typography**.

<ComponentDocsPreview name="typographyGallery" />

Sources: `src/components/Typography/`.
