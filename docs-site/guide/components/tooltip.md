---
title: Tooltip
description: Всплывающая подсказка по hover с позиционированием (Floating UI).
---

# Tooltip

**`Tooltip`** оборачивает один дочерний элемент (**`children`**) и показывает **`content`** при наведении. Задержка по умолчанию **300** ms; позиция задаётся **`placement`**.

Дочерний элемент должен поддерживать проброс пропсов/ref (как нативный **`button`** или элемент с **`forwardRef`**).

## Превью

<ComponentDocsPreview name="tooltip" />

## Импорт

```tsx
import { Tooltip } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { Tooltip } from '@v-lab/ui-kit'

export function HintButton() {
  return (
    <Tooltip content="Краткая подсказка" placement="top">
      <button type="button">Наведите курсор</button>
    </Tooltip>
  )
}
```

## Пропсы (`TooltipProps`)

| Проп            | Тип                        | Описание                                                                                                                          |
| --------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`content`**   | **`ReactNode`**            | Текст или разметка подсказки                                                                                                      |
| **`children`**  | **`ReactElement`**         | Ровно **один** дочерний элемент-триггер; должен допускать **`ref`** и проброс пропсов (**`button`**, **`forwardRef`**-компоненты) |
| **`placement`** | **`Placement`** (optional) | Положение относительно триггера (Floating UI), по умолчанию **`top`**                                                             |
| **`delay`**     | `number` (optional)        | Задержка перед показом (мс), по умолчанию **300**                                                                                 |
| **`zIndex`**    | `number` (optional)        | Переопределение **`z-index`** слоя подсказки                                                                                      |

Исходники: `src/components/overlays/Tooltip/` · `Tooltip.types.ts`.
