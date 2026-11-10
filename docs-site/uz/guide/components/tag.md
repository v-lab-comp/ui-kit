---
title: Tag
description: Chip — stroke/gray/filled/light variantlari, o'lchamlar, shakllar, customColor.
---

# Tag

Tanlovlar va yorliqlar uchun ixcham **chip**.

**`color`** va **`customColor`** bo'lmasa — **neytral** ko'rinish. **`color`** bilan Badge/Button bilan bir xil semantik ranglar (**`data-color`** atributi va skin palitralaridagi **`--pal-*`** — `src/skins/corporate/palettes.css`). **`customColor`** — hex, **`color-mix`** orqali inline uslubda **`--pal-*`** (`data-color` o'rniga `data-custom-color`); ikkalasi berilsa, **hex ustun**.

## Preview

<ComponentDocsPreview name="tag" />

## Import

```tsx
import { Tag, TAG_COLOR_OPTIONS } from '@v-lab/ui-kit'
import type { TagProps, TagVariant, TagColor, TagSize, TagShape } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { Tag } from '@v-lab/ui-kit'
import { RiUserLine } from '@remixicon/react'

export function TagsRow() {
  return (
    <>
      <Tag variant="stroke">Draft</Tag>
      <Tag variant="filled" color="primary">
        Active
      </Tag>
      <Tag variant="light" color="success" size="small">
        Done
      </Tag>
      <Tag variant="stroke" customColor="#7c3aed" shape="pill">
        Custom
      </Tag>
      <Tag variant="gray" sublabel="(12)" color="primary">
        Inbox
      </Tag>
      <Tag variant="stroke" prefix={<RiUserLine size={16} aria-hidden />} onDismiss={() => {}}>
        User
      </Tag>
    </>
  )
}
```

**`customColor`**: faqat **`#rgb`**, **`#rrggbb`**, **`#rrggbbaa`**. Boshqa qatorlar CSS ga qo'yilmaydi: teg **`color`** ni oladi, u bo'lmasa neytral qoladi.

## Proplar

| Prop           | Tip                                       | Tavsif                                                                                                           |
| -------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                               | Asosiy matn                                                                                                      |
| `variant`      | `stroke` \| `gray` \| `filled` \| `light` | **stroke** — oq fon + chegara; **gray** — weak fon; **filled** — to'liq rang; **light** — yumshoq fon            |
| `size`         | `small` \| `medium` \| `large`            | Balandlik: 20 / 24 / 28px                                                                                        |
| `shape`        | `rounded` \| `pill`                       | `rounded` — `--radius-6`; `pill` — to'liq yumaloq                                                                |
| `color`        | **`TAG_COLOR_OPTIONS`**                   | Dizayn tizimi rangi                                                                                              |
| `customColor`  | `string`                                  | O'z hex; **`color`** ustun                                                                                       |
| `sublabel`     | `ReactNode`                               | Qo'shimcha matn, `color-mix(currentColor, transparent)` orqali yumshatilgan                                      |
| `prefix`       | `ReactNode`                               | Chap 16×16 slot                                                                                                  |
| `suffix`       | `ReactNode`                               | O'ng tugun, krestikgacha                                                                                         |
| `onClick`      | `MouseEventHandler`                       | Tagni bosilishi mumkin qilib qo'yadi                                                                             |
| `onDismiss`    | `() => void`                              | Yopish tugmasi                                                                                                   |
| `dismissLabel` | `string`                                  | O‘chirish tugmasi nomi boshlanishi: nom = `dismissLabel` + teg matni (standart **`'Remove'`** → «Remove Design») |
| `disabled`     | `boolean`                                 | O'chirilgan                                                                                                      |

Qo'shimcha **`HTMLAttributes<HTMLSpanElement>`**, **`children`**, **`prefix`** va **`suffix`** dan tashqari.

Tip — **`TagProps`**.

## CSS o'zgaruvchilar orqali sozlash

```tsx
<Tag
  variant="filled"
  color="primary"
  style={{
    '--tag-height': '32px',
    '--tag-padding-x': '14px',
    '--tag-font-size': '14px',
    '--tag-radius': '12px',
  }}
>
  custom
</Tag>
```

| O'zgaruvchi       | Standart                                                |
| ----------------- | ------------------------------------------------------- |
| `--tag-height`    | o'lchamga qarab (`small` 20 / `medium` 24 / `large` 28) |
| `--tag-padding-x` | o'lchamga qarab                                         |
| `--tag-font-size` | o'lchamga qarab                                         |
| `--tag-radius`    | `--radius-6` (`rounded`) / `--radius-full` (`pill`)     |

## Storybook

**Components/Tag**.

Manba: `src/components/Tag/`.
