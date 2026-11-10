---
title: Avatar
description: User avatar — image, initials, icon, sizes, and semantic colors.
---

# Avatar

Circular avatar: **`src`** (image), **`text`** (initials), **`icon`** (e.g. from **`@remixicon/react`**), or a placeholder silhouette if nothing is set. Sizes and colors follow the design system (**`AVATAR_SIZE_OPTIONS`**, **`AVATAR_COLOR_OPTIONS`**).

## Preview

<ComponentDocsPreview name="avatar" />

## Import

```tsx
import { Avatar, AVATAR_SIZE_OPTIONS, AVATAR_COLOR_OPTIONS } from '@v-lab/ui-kit'
```

## Example

```tsx
import { RiUserLine } from '@remixicon/react'
import { Avatar } from '@v-lab/ui-kit'

export function UserAvatar() {
  return (
    <>
      <Avatar src="https://example.com/photo.jpg" alt="User" size={56} />
      <Avatar text="AB" size={48} color="primary" />
      <Avatar icon={<RiUserLine size={28} />} size={56} />
    </>
  )
}
```

## Main props

| Prop    | Type              | Description                                                                                                                     |
| ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `src`   | `string`          | Image URL                                                                                                                       |
| `alt`   | `string`          | Accessible name (person’s name): `alt` on `<img>` for photos, `role="img"` + `aria-label` for initials/icon. Empty — decorative |
| `text`  | `ReactNode`       | Initials (usually 1–2 chars)                                                                                                    |
| `icon`  | `ReactNode`       | Icon when no photo or text                                                                                                      |
| `size`  | number from scale | 20 … 80 (see **`AVATAR_SIZE_OPTIONS`**)                                                                                         |
| `color` | from palette      | See **`AVATAR_COLOR_OPTIONS`**                                                                                                  |

## Gallery

Sizes, variants, palette, **AvatarGroup** on the same page — like **Gallery/Avatar** in Storybook.

<ComponentDocsPreview name="avatarGallery" />

Sources: `src/components/Avatar/`.
