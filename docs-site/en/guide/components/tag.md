---
title: Tag
description: Chip — stroke/gray/filled/light variants, sizes, shapes, customColor.
---

# Tag

A compact **chip** for filters, selections, and labels.

Without **`color`** and **`customColor`**, the tag stays **neutral**. With **`color`**, it uses the same semantic palette as **Badge** / **Button** (the **`data-color`** attribute and **`--pal-*`** variables from the skin palettes — `src/skins/corporate/palettes.css`). **`customColor`** accepts **hex** and sets **`--pal-*`** via **`color-mix`** as an inline style (`data-custom-color` instead of `data-color`); if both **`color`** and **`customColor`** are set, **hex wins**.

## Preview

<ComponentDocsPreview name="tag" />

## Import

```tsx
import { Tag, TAG_COLOR_OPTIONS } from '@v-lab/ui-kit'
import type { TagProps, TagVariant, TagColor, TagSize, TagShape } from '@v-lab/ui-kit'
```

## Example

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

**`customColor`** must be **`#rgb`**, **`#rrggbb`**, or **`#rrggbbaa`**. Other values are not applied to CSS: the tag uses **`color`**, or stays neutral without it.

## Props

| Prop           | Type                                      | Description                                                                                                       |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                               | Main label                                                                                                        |
| `variant`      | `stroke` \| `gray` \| `filled` \| `light` | **stroke** — white bg + border; **gray** — weak fill; **filled** — solid color fill; **light** — soft tinted fill |
| `size`         | `small` \| `medium` \| `large`            | Height: 20 / 24 / 28px                                                                                            |
| `shape`        | `rounded` \| `pill`                       | `rounded` — `--radius-6`; `pill` — fully rounded                                                                  |
| `color`        | see **`TAG_COLOR_OPTIONS`**               | Design-system semantic color                                                                                      |
| `customColor`  | `string`                                  | Custom hex; overrides **`color`**                                                                                 |
| `sublabel`     | `ReactNode`                               | Secondary text, muted via `color-mix(currentColor, transparent)`                                                  |
| `prefix`       | `ReactNode`                               | Leading 16×16 slot                                                                                                |
| `suffix`       | `ReactNode`                               | Trailing node, before dismiss                                                                                     |
| `onClick`      | `MouseEventHandler`                       | Makes the tag clickable                                                                                           |
| `onDismiss`    | `() => void`                              | Shows dismiss button                                                                                              |
| `dismissLabel` | `string`                                  | Dismiss name prefix: name = `dismissLabel` + tag text (default **`'Remove'`** → “Remove Design”)                  |
| `disabled`     | `boolean`                                 | Disabled state                                                                                                    |

Plus **`HTMLAttributes<HTMLSpanElement>`**, except **`children`**, **`prefix`**, and **`suffix`**.

Full type: **`TagProps`**.

## CSS variables override

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

| Variable          | Default                                             |
| ----------------- | --------------------------------------------------- |
| `--tag-height`    | per size (`small` 20 / `medium` 24 / `large` 28)    |
| `--tag-padding-x` | per size                                            |
| `--tag-font-size` | per size                                            |
| `--tag-radius`    | `--radius-6` (`rounded`) / `--radius-full` (`pill`) |

## Storybook

**Components/Tag**.

Sources: `src/components/Tag/`.
