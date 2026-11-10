---
title: ContentDivider
description: Gorizontal ajratgichlar — chiziq, matn, slot.
---

# ContentDivider

**`line`**, **`lineSpacing`**, **`textAndLine`**, **`text`**, **`solidText`**, **`withSlot`** variantlari (Storybookga qarang).

## Preview

<ComponentDocsPreview name="contentDivider" />

## Import

```tsx
import { ContentDivider } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { ContentDivider } from '@v-lab/ui-kit'

export function Dividers() {
  return (
    <>
      <ContentDivider variant="line" />
      <ContentDivider variant="textAndLine" text="yoki" />
      <ContentDivider variant="solidText" text="Bo‘lim" />
    </>
  )
}
```

Maxsus slot bilan (markazda tugma):

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
        aria-label="Qo‘shish"
      />
    </ContentDivider>
  )
}
```

## Asosiy proplar

| Prop        | Tip                                                                             | Tavsif                                                                        |
| ----------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `variant`   | `line` \| `lineSpacing` \| `textAndLine` \| `text` \| `solidText` \| `withSlot` | Ajratgich turi (chiziq, chekinish, chiziqlı matn, faqat matn, sarlavha, slot) |
| `text`      | `string`                                                                        | Matnli variantlar uchun matn (**`textAndLine`**, **`text`**, **`solidText`**) |
| `children`  | `ReactNode`                                                                     | **`variant="withSlot"`** uchun markaziy slot                                  |
| `className` | `string`                                                                        | Ildizga qo‘shimcha sinf                                                       |

To‘liq tip — **`ContentDividerProps`**.

Manbalar: `src/components/ContentDivider/`.
