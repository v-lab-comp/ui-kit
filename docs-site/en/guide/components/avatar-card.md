---
title: AvatarCard
description: Profile row — avatar on the left, title and subtitle; optional right slot.
---

# AvatarCard

Horizontal row: **[Avatar](./avatar)** on the left (**`avatarSize`** default 64), then **`title`** and **`subtitle`**. Same avatar props (**`src`**, **`text`**, **`icon`**, **`color`**) are forwarded to the inner **`Avatar`**.

## Preview

<ComponentDocsPreview name="avatarCard" />

## Import

```tsx
import { AvatarCard } from '@v-lab/ui-kit'
```

## Example

```tsx
import { AvatarCard } from '@v-lab/ui-kit'

export function ProfileRow() {
  return (
    <AvatarCard
      src="https://example.com/photo.jpg"
      alt="Jane Doe"
      title="Jane Doe"
      subtitle="Product Manager"
    />
  )
}
```

With **`rightSlot`** you can insert a button or menu:

```tsx
<AvatarCard title="User" subtitle="Role" rightSlot={<button type="button">⋯</button>} />
```

## Main props

| Prop                                  | Type        | Description                     |
| ------------------------------------- | ----------- | ------------------------------- |
| `title`                               | `ReactNode` | Primary line                    |
| `subtitle`                            | `ReactNode` | Second line (role, email, etc.) |
| `src`, `alt`, `text`, `icon`, `color` | —           | Same as **Avatar**              |
| `avatarSize`                          | Avatar size | Default **64**                  |
| `rightSlot`                           | `ReactNode` | Content on the right            |

Sources: `src/components/AvatarCard/`.
