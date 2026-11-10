---
title: AvatarGroup
description: Overlapping avatars and compact mode — like Storybook Components/AvatarGroup.
---

# AvatarGroup

Wraps several **[Avatar](./avatar)** items with shared **`max`**, **`overlap`**, and optional **`mode="compact"`**.

## Preview

<ComponentDocsPreview name="avatarGroup" />

## Import

```tsx
import { AvatarGroup } from '@v-lab/ui-kit'
import { Avatar } from '@v-lab/ui-kit'
```

## Example

```tsx
import { Avatar, AvatarGroup } from '@v-lab/ui-kit'

export function TeamAvatars() {
  return (
    <AvatarGroup size={40} max={4} overlap={12}>
      <Avatar src="https://example.com/a.jpg" alt="User A" />
      <Avatar text="JB" color="primary" />
      <Avatar text="SW" color="away" />
      <Avatar text="AT" color="verified" />
      <Avatar text="XX" color="neutral" />
    </AvatarGroup>
  )
}
```

## Main props

| Prop            | Type                         | Description                                       |
| --------------- | ---------------------------- | ------------------------------------------------- |
| `children`      | `ReactNode`                  | Several **`Avatar`** children                     |
| `mode`          | `default` \| `compact`       | Normal overlap or compact “pill” with **+N**      |
| `compactStyle`  | `default` \| `stroke`        | Border on compact pill (`mode="compact"`)         |
| `compactSize`   | `small` \| `medium` \| `big` | Size in compact mode (24 / 32 / 40 px per design) |
| `size`          | **Avatar** size              | For **`mode="default"`** — size of each avatar    |
| `max`           | `number`                     | How many avatars to show before **+N** counter    |
| `overlap`       | `number`                     | Neighbor overlap in px (`mode="default"`)         |
| `overflowColor` | **Avatar** color             | **+N** badge color on overflow                    |
| `style`         | `CSSProperties`              | Root inline styles                                |
| `className`     | `string`                     | Extra class                                       |

Full type — **`AvatarGroupProps`**.

## Gallery

Layout scenarios, sizes, and compact — like **Gallery/AvatarGroup** in Storybook.

<ComponentDocsPreview name="avatarGroupGallery" />

Sources: `src/components/AvatarGroup/`.
