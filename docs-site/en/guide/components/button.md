---
title: Button
description: Button — filled/stroke/lighter/ghost variants, sizes, icons.
---

# Button

Primary UI button.

## Preview

Short example like the block below.

<ComponentDocsPreview name="button" />

## Import

```tsx
import { Button } from '@v-lab/ui-kit'
```

## Example

```tsx
import { RiAddLine } from '@remixicon/react'
import { Button } from '@v-lab/ui-kit'

export function Actions() {
  return (
    <>
      <Button variant="filled" color="primary" size="medium">
        Save
      </Button>
      <Button variant="stroke" color="neutral" leftNode={<RiAddLine size={16} />}>
        Add
      </Button>
      <Button variant="ghost" disabled>
        Cancel
      </Button>
    </>
  )
}
```

## Main props

| Prop          | Type                                           | Description                                                      |
| ------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `children`    | `ReactNode`                                    | Button label or content                                          |
| `variant`     | `filled` \| `stroke` \| `lighter` \| `ghost`   | Fill and border style                                            |
| `color`       | color from **`BUTTON_COLOR_OPTIONS`**          | Semantic color                                                   |
| `customColor` | `string`                                       | Custom hex (`#rgb` / `#rrggbb` / `#rrggbbaa`); overrides `color` |
| `size`        | `medium` \| `small` \| `x-small` \| `2x-small` | Height and typography                                            |
| `shape`       | `rounded` \| `circle` \| `square`              | Rounding: default rounded; circle — icon; square — no radius     |
| `leftNode`    | `ReactNode`                                    | Content left of text                                             |
| `rightNode`   | `ReactNode`                                    | Content right of text                                            |

Plus **`ButtonHTMLAttributes<HTMLButtonElement>`** (**`type`**, **`disabled`**, **`onClick`**, **`aria-*`**, **`className`**, …).

Full type — **`ButtonProps`**.

## Gallery

Full matrix like Storybook **Docs → ButtonGalleryPage** and **`src/docs/ButtonGalleryPage.tsx`**: for each semantic color, a table of **Filled / Stroke / Lighter / Ghost** and **Default / Hover / Active / Disabled** rows; each cell shows a button with text and two icons and an icon-only variant.

<ComponentDocsPreview name="buttonGallery" />

Sources: `src/components/Button/`.
