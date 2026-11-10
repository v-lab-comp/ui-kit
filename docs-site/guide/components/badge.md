---
title: Badge
description: Бейдж — варианты filled/light/lighter/stroke, размеры, customColor, dot, clickable.
---

# Badge

Компактная метка для статусов и счётчиков.

## Превью

<ComponentDocsPreview name="badge" />

## Импорт

```tsx
import { Badge } from '@v-lab/ui-kit'
```

## Пример

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

## Основные пропсы

| Проп          | Тип                                          | Описание                                                         |
| ------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `children`    | `ReactNode`                                  | Текст или содержимое бейджа                                      |
| `variant`     | `filled` \| `light` \| `lighter` \| `stroke` | Визуальный вариант                                               |
| `color`       | цвет из **`BADGE_COLOR_OPTIONS`**            | Семантический цвет палитры                                       |
| `customColor` | `string`                                     | Свой hex (`#rgb` / `#rrggbb` / `#rrggbbaa`); перекрывает `color` |
| `size`        | `xsmall` \| `small` \| `medium` \| `large`   | Размер                                                           |
| `shape`       | `pill` \| `rounded` \| `circle`              | Форма                                                            |
| `dot`         | `boolean`                                    | Точка-индикатор 6px перед содержимым (цветом текущего текста)    |
| `leftNode`    | `ReactNode`                                  | Узел слева от текста                                             |
| `rightNode`   | `ReactNode`                                  | Узел справа                                                      |
| `onClick`     | `MouseEventHandler`                          | При передаче корень рендерится как `<button>` с hover-анимацией  |
| `disabled`    | `boolean`                                    | Неактивное состояние                                             |

Без `onClick` корень — `<span>`. С `onClick` — `<button type="button">`: добавляются `cursor: pointer`, hover/active затемнение и `scale(0.97)` на active, `focus-visible` outline.

Полный тип — **`BadgeProps`**.

## Кастомизация через CSS-переменные

На корне можно переопределить любую из переменных через `style`:

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

| Переменная          | Default                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `--badge-height`    | по размеру                                                           |
| `--badge-padding-x` | по размеру                                                           |
| `--badge-font-size` | по размеру                                                           |
| `--badge-radius`    | `var(--radius-full)` (для `pill`), `var(--radius-6)` (для `rounded`) |

## Галерея

Таблицы по вариантам (**filled / light / lighter / stroke**), цветам, размерам, формам, `dot`, `customColor`, `clickable` — как **Gallery/Badge** в Storybook.

<ComponentDocsPreview name="badgeGallery" />

Исходники: `src/components/Badge/`.
