---
title: Tag
description: Чип / метка — варианты stroke/gray/filled/light, размеры, формы, customColor.
---

# Tag

Компактная **метка (chip)** для фильтров, выбранных значений и подписей.

Без **`color`** и **`customColor`** тег **нейтральный**, как в макете Figma. С **`color`** подключаются те же семантические цвета, что у **Badge** / **Button** (атрибут **`data-color`** и переменные **`--pal-*`** из палитр скина — `src/skins/corporate/palettes.css`). **`customColor`** задаёт hex и строит **`--pal-*`** через **`color-mix`** инлайн-стилем (вместо `data-color` ставится `data-custom-color`); если указан вместе с **`color`**, используется **только hex**.

## Превью

<ComponentDocsPreview name="tag" />

## Импорт

```tsx
import { Tag, TAG_COLOR_OPTIONS } from '@v-lab/ui-kit'
import type { TagProps, TagVariant, TagColor, TagSize, TagShape } from '@v-lab/ui-kit'
```

## Пример

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

Формат **`customColor`**: **`#rgb`**, **`#rrggbb`** или **`#rrggbbaa`**. Иные строки не подставляются в CSS: тег берёт **`color`**, а без него остаётся нейтральным.

## Пропсы

| Проп           | Тип                                       | Описание                                                                                                                  |
| -------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                               | Основной текст метки                                                                                                      |
| `variant`      | `stroke` \| `gray` \| `filled` \| `light` | **stroke** — белый фон + бордер; **gray** — заливка weak; **filled** — сплошной фон; **light** — приглушённый цветной фон |
| `size`         | `small` \| `medium` \| `large`            | Высота: 20 / 24 / 28px                                                                                                    |
| `shape`        | `rounded` \| `pill`                       | `rounded` — `--radius-6`; `pill` — полное скругление                                                                      |
| `color`        | см. **`TAG_COLOR_OPTIONS`**               | Палитра дизайн-системы (`primary`, `error`, …)                                                                            |
| `customColor`  | `string`                                  | Свой hex; перекрывает **`color`**                                                                                         |
| `sublabel`     | `ReactNode`                               | Вторичная подпись справа, приглушённая через `color-mix(currentColor, transparent)`                                       |
| `prefix`       | `ReactNode`                               | Слот слева 16×16                                                                                                          |
| `suffix`       | `ReactNode`                               | Узел справа от подписи, до крестика                                                                                       |
| `onClick`      | `MouseEventHandler`                       | Корень становится кликабельным                                                                                            |
| `onDismiss`    | `() => void`                              | Кнопка с крестиком                                                                                                        |
| `dismissLabel` | `string`                                  | Начало имени кнопки удаления: имя = `dismissLabel` + текст тега (по умолчанию **`'Remove'`** → «Remove Design»)           |
| `disabled`     | `boolean`                                 | Неактивное состояние                                                                                                      |

Плюс атрибуты **`HTMLAttributes<HTMLSpanElement>`**, кроме **`children`**, **`prefix`** и **`suffix`**.

Полный тип — **`TagProps`**.

## Кастомизация через CSS-переменные

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

| Переменная        | Default                                             |
| ----------------- | --------------------------------------------------- |
| `--tag-height`    | по размеру (`small` 20 / `medium` 24 / `large` 28)  |
| `--tag-padding-x` | по размеру                                          |
| `--tag-font-size` | по размеру                                          |
| `--tag-radius`    | `--radius-6` (`rounded`) / `--radius-full` (`pill`) |

## Storybook

Интерактивно и галерея: **Components/Tag**.

Исходники: `src/components/Tag/`.
