---
title: Badge
description: Nishon — filled/light/lighter/stroke variantlari, o'lchamlar, customColor, dot, clickable.
---

# Badge

Status va hisoblagichlar uchun ixcham yorliq.

## Preview

<ComponentDocsPreview name="badge" />

## Import

```tsx
import { Badge } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { Badge } from '@v-lab/ui-kit'

export function StatusBadge() {
  return (
    <>
      <Badge variant="filled" color="primary">
        Active
      </Badge>
      <Badge variant="light" color="success" dot>
        Online
      </Badge>
      <Badge variant="stroke" customColor="#7c3aed" size="large">
        Custom
      </Badge>
      <Badge variant="filled" color="primary" onClick={() => {}}>
        Clickable
      </Badge>
    </>
  )
}
```

## Asosiy proplar

| Prop          | Tip                                          | Tavsif                                                          |
| ------------- | -------------------------------------------- | --------------------------------------------------------------- |
| `children`    | `ReactNode`                                  | Badge matni yoki kontenti                                       |
| `variant`     | `filled` \| `light` \| `lighter` \| `stroke` | Vizual variant                                                  |
| `color`       | rang **`BADGE_COLOR_OPTIONS`** dan           | Palitrada semantik rang                                         |
| `customColor` | `string`                                     | Maxsus hex (`#rgb` / `#rrggbb` / `#rrggbbaa`); `color`ni bosadi |
| `size`        | `xsmall` \| `small` \| `medium` \| `large`   | O'lcham                                                         |
| `shape`       | `pill` \| `rounded` \| `circle`              | Shakl                                                           |
| `dot`         | `boolean`                                    | Kontentdan oldin 6px nuqta-indikator (joriy matn rangida)       |
| `leftNode`    | `ReactNode`                                  | Matndan chapdagi tugun                                          |
| `rightNode`   | `ReactNode`                                  | O'ngdagi tugun                                                  |
| `onClick`     | `MouseEventHandler`                          | Berilganda ildiz `<button>` ko'rinishida render qilinadi        |
| `disabled`    | `boolean`                                    | Faolsiz holat                                                   |

`onClick` siz ildiz — `<span>`. `onClick` bilan — `<button type="button">`: `cursor: pointer`, hover/active to'qlanishi, active'da `scale(0.97)`, `focus-visible` outline.

To'liq tip — **`BadgeProps`**.

## CSS o'zgaruvchilar orqali sozlash

```tsx
<Badge
  variant="filled"
  color="primary"
  style={{
    '--badge-height': '28px',
    '--badge-padding-x': '12px',
    '--badge-font-size': '14px',
    '--badge-radius': '8px',
  }}
>
  custom
</Badge>
```

| O'zgaruvchi         | Standart                                                     |
| ------------------- | ------------------------------------------------------------ |
| `--badge-height`    | o'lchamga qarab                                              |
| `--badge-padding-x` | o'lchamga qarab                                              |
| `--badge-font-size` | o'lchamga qarab                                              |
| `--badge-radius`    | `var(--radius-full)` (`pill`), `var(--radius-6)` (`rounded`) |

## Galereya

Variantlar, ranglar, o'lchamlar, shakllar, `dot`, `customColor`, `clickable` bo'yicha jadvallar — Storybook'dagi **Gallery/Badge** kabi.

<ComponentDocsPreview name="badgeGallery" />

Manbalar: `src/components/Badge/`.
