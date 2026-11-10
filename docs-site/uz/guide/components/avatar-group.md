---
title: AvatarGroup
description: Ustma-ust tushadigan avatarlar guruhi va compact rejimi — Storybook Components/AvatarGroup kabi.
---

# AvatarGroup

Bir nechta [**Avatar**](/uz/guide/components/avatar) ustidan o‘tadigan umumiy **`max`**, **`overlap`** va ixtiyoriy **`mode="compact"`** bilan o‘rama.

## Preview

<ComponentDocsPreview name="avatarGroup" />

## Import

```tsx
import { AvatarGroup } from '@v-lab/ui-kit'
import { Avatar } from '@v-lab/ui-kit'
```

## Misol

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

## Asosiy proplar

| Prop            | Tip                          | Tavsif                                                        |
| --------------- | ---------------------------- | ------------------------------------------------------------- |
| `children`      | `ReactNode`                  | Bir nechta **`Avatar`**                                       |
| `mode`          | `default` \| `compact`       | Oddiy ustma-ust yoki **+N** li ixcham «dori»                  |
| `compactStyle`  | `default` \| `stroke`        | Compact «dori» ramkasi (`mode="compact"`)                     |
| `compactSize`   | `small` \| `medium` \| `big` | Compact da o‘lcham (dizayn bo‘yicha 24 / 32 / 40 px)          |
| `size`          | **Avatar** o‘lchami          | **`mode="default"`** da har bir avatar o‘lchami               |
| `max`           | `number`                     | **+N** hisoblagichi oldin nechta avatar ko‘rsatiladi          |
| `overlap`       | `number`                     | Qonshi avatarlarning ustma-ust tushishi px (`mode="default"`) |
| `overflowColor` | **Avatar** rangi             | Ortiqcha bo‘lganda **+N** nishoni rangi                       |
| `style`         | `CSSProperties`              | Ildiz inline-stillar                                          |
| `className`     | `string`                     | Qo‘shimcha sinf                                               |

To‘liq tip — **`AvatarGroupProps`**.

## Galereya

«Maketdagi» ssenariylar, o‘lchamlar va compact — Storybook **Gallery/AvatarGroup** kabi.

<ComponentDocsPreview name="avatarGroupGallery" />

Manbalar: `src/components/AvatarGroup/`.
