---
title: Button
description: Tugma — filled/stroke/lighter/ghost variantlari, o‘lchamlar, ikonkalar.
---

# Button

Interfeysning asosiy tugmasi.

## Preview

Pastdagi «Misol» blokidagi kabi qisqa namuna.

<ComponentDocsPreview name="button" />

## Import

```tsx
import { Button } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { RiAddLine } from '@remixicon/react'
import { Button } from '@v-lab/ui-kit'

export function Actions() {
  return (
    <>
      <Button variant="filled" color="primary" size="medium">
        Saqlash
      </Button>
      <Button variant="stroke" color="neutral" leftNode={<RiAddLine size={16} />}>
        Qo‘shish
      </Button>
      <Button variant="ghost" disabled>
        Bekor qilish
      </Button>
    </>
  )
}
```

## Asosiy proplar

| Prop          | Tip                                            | Tavsif                                                                |
| ------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| `children`    | `ReactNode`                                    | Tugma matni yoki kontenti                                             |
| `variant`     | `filled` \| `stroke` \| `lighter` \| `ghost`   | To‘ldirish va chiziq varianti                                         |
| `color`       | rang **`BUTTON_COLOR_OPTIONS`** dan            | Semantik rang                                                         |
| `customColor` | `string`                                       | O‘z hex rangi (`#rgb` / `#rrggbb` / `#rrggbbaa`); `color` ni qoplaydi |
| `size`        | `medium` \| `small` \| `x-small` \| `2x-small` | Balandlik va tipografika                                              |
| `shape`       | `rounded` \| `circle` \| `square`              | Yumaloqlik: standart rounded, circle — ikonka, square — yumaloqsiz    |
| `leftNode`    | `ReactNode`                                    | Matndan chapdagi kontent                                              |
| `rightNode`   | `ReactNode`                                    | O‘ngdagi kontent                                                      |

Qo‘shimcha standart **`ButtonHTMLAttributes<HTMLButtonElement>`** proplari (**`type`**, **`disabled`**, **`onClick`**, **`aria-*`**, **`className`** …).

To‘liq tip — **`ButtonProps`**.

## Galereya

Storybook **Docs → ButtonGalleryPage** va **`src/docs/ButtonGalleryPage.tsx`** dagi kabi to‘liq matritsa: har bir semantik rang uchun **Filled / Stroke / Lighter / Ghost** va **Default / Hover / Active / Disabled** holatlari, katakda — matn va ikki ikonka bilan tugma va faqat ikonka varianti.

<ComponentDocsPreview name="buttonGallery" />

Manbalar: `src/components/Button/`.
