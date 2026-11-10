---
title: SegmentedControl
description: Переключатель режима с плавным анимированным индикатором-ползунком. Single-select.
---

# SegmentedControl

Компонент выбора одного значения из набора вариантов. Содержит единый контейнер с **плавным скользящим индикатором** (CSS transition), который перемещается к выбранному элементу.

## Превью

<ComponentDocsPreview name="segmentedControl" />

## Импорт

```tsx
import { SegmentedControl } from '@v-lab/ui-kit'
import type { SegmentedControlProps, SegmentedControlItemProps } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { SegmentedControl } from '@v-lab/ui-kit'
import { RiTableLine, RiNodeTree } from '@remixicon/react'

const [view, setView] = useState('table')

<SegmentedControl value={view} onValueChange={setView}>
  <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
    Таблица
  </SegmentedControl.Item>
  <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
    Дерево
  </SegmentedControl.Item>
</SegmentedControl>
```

## Только иконки

```tsx
<SegmentedControl defaultValue="grid">
  <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />} />
  <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />} />
  <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />} />
</SegmentedControl>
```

## Uncontrolled

```tsx
<SegmentedControl defaultValue="table">
  <SegmentedControl.Item value="table">Таблица</SegmentedControl.Item>
  <SegmentedControl.Item value="tree">Дерево</SegmentedControl.Item>
</SegmentedControl>
```

## Галерея состояний

<ComponentDocsPreview name="segmentedControlGallery" />

## Отличие от ToggleGroup

|            | `SegmentedControl`                     | `ToggleGroup type="single"`                      |
| ---------- | -------------------------------------- | ------------------------------------------------ |
| Визуал     | единый контейнер + скользящий ползунок | независимые кнопки                               |
| Анимация   | да — `transition: left + width`        | нет                                              |
| Multiple   | нет                                    | нет (для multiple используйте `type="multiple"`) |
| Применение | переключение вида (Таблица / Дерево)   | фильтры, форматирование                          |

## SegmentedControl Props

| Prop            | Тип                                | По умолчанию | Описание                         |
| --------------- | ---------------------------------- | ------------ | -------------------------------- |
| `value`         | `string`                           | —            | Controlled: выбранное значение   |
| `defaultValue`  | `string`                           | —            | Uncontrolled: начальное значение |
| `onValueChange` | `(value: string) => void`          | —            | Callback при смене значения      |
| `size`          | `'medium' \| 'small' \| 'x-small'` | `'medium'`   | Размер всего контрола            |
| `disabled`      | `boolean`                          | —            | Отключить весь контрол           |

## SegmentedControl.Item Props

| Prop        | Тип         | Описание                                       |
| ----------- | ----------- | ---------------------------------------------- |
| `value`     | `string`    | **Обязательный.** Идентификатор варианта       |
| `leftNode`  | `ReactNode` | Иконка/элемент слева                           |
| `rightNode` | `ReactNode` | Иконка/элемент справа                          |
| `disabled`  | `boolean`   | Отключить конкретный элемент                   |
| `children`  | `ReactNode` | Текстовая метка (можно опустить для icon-only) |
