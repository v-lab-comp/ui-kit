---
title: Avatar
description: Foydalanuvchi avatari — rasm, bosh harflar, ikonka, o‘lchamlar va semantik ranglar.
---

# Avatar

Dumaloq avatar: **`src`** (rasm), **`text`** (bosh harflar), **`icon`** (masalan **`@remixicon/react`** dan) yoki hech narsa berilmasa joy egasi silueti. O‘lcham va ranglar dizayn tizimiga mos (**`AVATAR_SIZE_OPTIONS`**, **`AVATAR_COLOR_OPTIONS`**).

## Preview

<ComponentDocsPreview name="avatar" />

## Import

```tsx
import { Avatar, AVATAR_SIZE_OPTIONS, AVATAR_COLOR_OPTIONS } from '@v-lab/ui-kit'
```

## Misol

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

## Asosiy proplar

| Prop    | Tip           | Tavsif                                        |
| ------- | ------------- | --------------------------------------------- |
| `src`   | `string`      | Rasm URL                                      |
| `alt`   | `string`      | Muqobil matn                                  |
| `text`  | `ReactNode`   | Bosh harflar (odatda 1–2 belgi)               |
| `icon`  | `ReactNode`   | Rasm va matn bo‘lmasa ikonka                  |
| `size`  | shkaladan son | 20 … 80 (**`AVATAR_SIZE_OPTIONS`** ga qarang) |
| `color` | palitradan    | **`AVATAR_COLOR_OPTIONS`** ga qarang          |

## Galereya

O‘lchamlar, variantlar, palitra, sahifada **AvatarGroup** tarkibida — Storybook **Gallery/Avatar** kabi.

<ComponentDocsPreview name="avatarGallery" />

Manbalar: `src/components/Avatar/`.
