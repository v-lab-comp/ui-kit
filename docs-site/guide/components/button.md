---
title: Button
description: Кнопка — варианты filled/stroke/lighter/ghost, размеры, иконки.
---

# Button

Основная кнопка интерфейса.

## Превью

Короткий пример, как в блоке «Пример» ниже.

<ComponentDocsPreview name="button" />

## Импорт

```tsx
import { Button } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { RiAddLine } from '@remixicon/react'
import { Button } from '@v-lab/ui-kit'

export function Actions() {
  return (
    <>
      <Button variant="filled" color="primary" size="medium">
        Сохранить
      </Button>
      <Button variant="stroke" color="neutral" leftNode={<RiAddLine size={16} />}>
        Добавить
      </Button>
      <Button variant="ghost" disabled>
        Отмена
      </Button>
    </>
  )
}
```

## Основные пропсы

| Проп          | Тип                                            | Описание                                                                   |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| `children`    | `ReactNode`                                    | Текст или содержимое кнопки                                                |
| `variant`     | `filled` \| `stroke` \| `lighter` \| `ghost`   | Вариант заливки и обводки                                                  |
| `color`       | цвет из **`BUTTON_COLOR_OPTIONS`**             | Семантический цвет                                                         |
| `customColor` | `string`                                       | Свой hex (`#rgb` / `#rrggbb` / `#rrggbbaa`); перекрывает `color`           |
| `size`        | `medium` \| `small` \| `x-small` \| `2x-small` | Высота и типографика                                                       |
| `shape`       | `rounded` \| `circle` \| `square`              | Скругление: rounded по умолчанию, circle — иконка, square — без скругления |
| `leftNode`    | `ReactNode`                                    | Контент слева от текста                                                    |
| `rightNode`   | `ReactNode`                                    | Контент справа                                                             |

Плюс стандартные пропсы **`ButtonHTMLAttributes<HTMLButtonElement>`** (**`type`**, **`disabled`**, **`onClick`**, **`aria-*`**, **`className`** …).

Полный тип — **`ButtonProps`**.

## Галерея

Полная матрица как в Storybook **Docs → ButtonGalleryPage** и в **`src/docs/ButtonGalleryPage.tsx`**: для каждого семантического цвета таблица вариантов **Filled / Stroke / Lighter / Ghost** и строк состояний **Default / Hover / Active / Disabled**, в ячейке — кнопка с текстом и двумя иконками и вариант только с иконкой.

<ComponentDocsPreview name="buttonGallery" />

Исходники: `src/components/Button/`.
