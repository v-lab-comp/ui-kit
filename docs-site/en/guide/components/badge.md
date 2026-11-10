---
title: Badge
description: Badge — filled/light/lighter/stroke variants, sizes, customColor, dot, clickable.
---

# Badge

Compact label for statuses and counts.

## Preview

<ComponentDocsPreview name="badge" />

## Import

```tsx
import { Badge } from '@v-lab/ui-kit'
```

## Example

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

## Main props

| Prop          | Type                                         | Description                                                      |
| ------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `children`    | `ReactNode`                                  | Badge content                                                    |
| `variant`     | `filled` \| `light` \| `lighter` \| `stroke` | Visual variant                                                   |
| `color`       | color from **`BADGE_COLOR_OPTIONS`**         | Semantic palette color                                           |
| `customColor` | `string`                                     | Custom hex (`#rgb` / `#rrggbb` / `#rrggbbaa`); overrides `color` |
| `size`        | `xsmall` \| `small` \| `medium` \| `large`   | Size                                                             |
| `shape`       | `pill` \| `rounded` \| `circle`              | Shape                                                            |
| `dot`         | `boolean`                                    | 6px dot indicator before content (uses current text color)       |
| `leftNode`    | `ReactNode`                                  | Node left of text                                                |
| `rightNode`   | `ReactNode`                                  | Node right of text                                               |
| `onClick`     | `MouseEventHandler`                          | When provided, the root renders as `<button>` with hover anim    |
| `disabled`    | `boolean`                                    | Disabled state                                                   |

Without `onClick` the root is a `<span>`. With `onClick` it renders as `<button type="button">` with `cursor: pointer`, hover/active darkening, `scale(0.97)` on active, and a `focus-visible` outline.

Full type — **`BadgeProps`**.

## CSS variables override

You can override any of the following via `style` on the root:

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

| Variable            | Default                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `--badge-height`    | per size                                                             |
| `--badge-padding-x` | per size                                                             |
| `--badge-font-size` | per size                                                             |
| `--badge-radius`    | `var(--radius-full)` (for `pill`), `var(--radius-6)` (for `rounded`) |

## Gallery

Tables by variant, color, size, shape, `dot`, `customColor`, `clickable` — like **Gallery/Badge** in Storybook.

<ComponentDocsPreview name="badgeGallery" />

Sources: `src/components/Badge/`.
