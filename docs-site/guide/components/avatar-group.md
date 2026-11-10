---
title: AvatarGroup
description: Группа аватаров с перекрытием и режимом compact — как в Storybook Components/AvatarGroup.
---

# AvatarGroup

Обёртка над несколькими **[Avatar](./avatar)** с общим **`max`**, **`overlap`** и опционально **`mode="compact"`**.

## Превью

<ComponentDocsPreview name="avatarGroup" />

## Импорт

```tsx
import { AvatarGroup } from '@v-lab/ui-kit'
import { Avatar } from '@v-lab/ui-kit'
```

## Пример

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

## Основные пропсы

| Проп            | Тип                          | Описание                                             |
| --------------- | ---------------------------- | ---------------------------------------------------- |
| `children`      | `ReactNode`                  | Несколько **`Avatar`**                               |
| `mode`          | `default` \| `compact`       | Обычное перекрытие или компактная «пилюля» с **+N**  |
| `compactStyle`  | `default` \| `stroke`        | Рамка у compact-пилюли (`mode="compact"`)            |
| `compactSize`   | `small` \| `medium` \| `big` | Размер в compact (24 / 32 / 40 px по дизайну)        |
| `size`          | размер **Avatar**            | Для **`mode="default"`** — размер каждого аватара    |
| `max`           | `number`                     | Сколько аватаров показать до счётчика **+N**         |
| `overlap`       | `number`                     | Перекрытие соседних аватаров в px (`mode="default"`) |
| `overflowColor` | цвет **Avatar**              | Цвет бейджа **+N** при переполнении                  |
| `style`         | `CSSProperties`              | Инлайн-стили корня                                   |
| `className`     | `string`                     | Доп. класс                                           |

Полный тип — **`AvatarGroupProps`**.

## Галерея

Сценарии «как на макете», размеры и compact — как **Gallery/AvatarGroup** в Storybook.

<ComponentDocsPreview name="avatarGroupGallery" />

Исходники: `src/components/AvatarGroup/`.
