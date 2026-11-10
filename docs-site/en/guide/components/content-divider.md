---
title: ContentDivider
description: Horizontal dividers — line, text, slot.
---

# ContentDivider

Variants **`line`**, **`lineSpacing`**, **`textAndLine`**, **`text`**, **`solidText`**, **`withSlot`** (see Storybook).

## Preview

<ComponentDocsPreview name="contentDivider" />

## Import

```tsx
import { ContentDivider } from '@v-lab/ui-kit'
```

## Example

```tsx
import { ContentDivider } from '@v-lab/ui-kit'

export function Dividers() {
  return (
    <>
      <ContentDivider variant="line" />
      <ContentDivider variant="textAndLine" text="or" />
      <ContentDivider variant="solidText" text="Section" />
    </>
  )
}
```

With a custom slot (centered button):

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
        aria-label="Add"
      />
    </ContentDivider>
  )
}
```

## Main props

| Prop        | Type                                                                            | Description                                                                        |
| ----------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `variant`   | `line` \| `lineSpacing` \| `textAndLine` \| `text` \| `solidText` \| `withSlot` | Divider type (line, spacing, text with lines, text only, heading-style text, slot) |
| `text`      | `string`                                                                        | Text for variants that show copy (**`textAndLine`**, **`text`**, **`solidText`**)  |
| `children`  | `ReactNode`                                                                     | Center slot for **`variant="withSlot"`**                                           |
| `className` | `string`                                                                        | Extra class on the root                                                            |

Full type — **`ContentDividerProps`**.

Sources: `src/components/ContentDivider/`.
