---
title: ToggleButton / ToggleGroup
description: Кнопка-переключатель с состоянием on/off. Поддерживает одиночное использование и группировку с single/multiple выбором.
---

# ToggleButton / ToggleGroup

Кнопка-переключатель с явным состоянием **on / off**. Используется для фильтров, переключателей форматирования, режимов отображения и других действий с зафиксированным состоянием.

## Превью

<ComponentDocsPreview name="toggleButton" />

## Импорт

```tsx
import { ToggleButton, ToggleGroup } from '@v-lab/ui-kit'
import type { ToggleButtonProps, ToggleGroupProps } from '@v-lab/ui-kit'
```

## Одиночный ToggleButton

### Uncontrolled

```tsx
<ToggleButton defaultPressed size="small" leftNode={<RiFilter3Line size={16} />}>
  Фильтры
</ToggleButton>
```

### Controlled

```tsx
const [pressed, setPressed] = useState(false)

<ToggleButton
  pressed={pressed}
  onPressedChange={setPressed}
  size="small"
  leftNode={<RiFilter3Line size={16} />}
>
  Фильтры
</ToggleButton>
```

## ToggleGroup — single (radio)

Только один элемент может быть активен одновременно. При повторном клике элемент сбрасывается (`undefined`).

```tsx
const [view, setView] = useState<string | undefined>('grid')

<ToggleGroup type="single" value={view} onValueChange={setView} size="small">
  <ToggleButton value="grid" leftNode={<RiLayoutGridLine size={16} />}>Grid</ToggleButton>
  <ToggleButton value="list" leftNode={<RiListCheck size={16} />}>List</ToggleButton>
</ToggleGroup>
```

## ToggleGroup — multiple

Несколько элементов могут быть активны одновременно (например, форматирование текста).

```tsx
const [formats, setFormats] = useState<string[]>(['bold'])

<ToggleGroup type="multiple" value={formats} onValueChange={setFormats} size="small">
  <ToggleButton value="bold"      leftNode={<RiBold size={16} />} />
  <ToggleButton value="italic"    leftNode={<RiItalic size={16} />} />
  <ToggleButton value="underline" leftNode={<RiUnderline size={16} />} />
</ToggleGroup>
```

## Галерея состояний

<ComponentDocsPreview name="toggleButtonGallery" />

## Клавиатура

| Клавиша           | Действие                                                      |
| ----------------- | ------------------------------------------------------------- |
| `Space` / `Enter` | Переключить состояние                                         |
| `←` / `→`         | Переместить фокус на предыдущий/следующий элемент в группе    |
| `↑` / `↓`         | Переместить фокус (вертикальная ориентация)                   |
| `Home` / `End`    | Первый / последний элемент группы                             |
| `Tab`             | Вход в группу — фокус попадает на активный элемент или первый |

> Навигация через стрелки — **roving tabindex**: Tab перепрыгивает всю группу одним шагом.

## Отличие от SegmentedControl

|            | `ToggleButton` / `ToggleGroup` | `SegmentedControl`                       |
| ---------- | ------------------------------ | ---------------------------------------- |
| Режим      | single или **multiple**        | только single                            |
| Визуал     | независимые кнопки             | единый контейнер со скользящим ползунком |
| Применение | фильтры, форматирование        | переключение вида (Таблица / Дерево)     |

## ToggleButton Props

| Prop              | Тип                                              | По умолчанию | Описание                           |
| ----------------- | ------------------------------------------------ | ------------ | ---------------------------------- |
| `pressed`         | `boolean`                                        | —            | Controlled: текущее состояние      |
| `defaultPressed`  | `boolean`                                        | `false`      | Uncontrolled: начальное состояние  |
| `onPressedChange` | `(pressed: boolean) => void`                     | —            | Вызывается при смене состояния     |
| `value`           | `string`                                         | —            | Идентификатор внутри `ToggleGroup` |
| `size`            | `'medium' \| 'small' \| 'x-small' \| '2x-small'` | `'medium'`   | Размер кнопки                      |
| `shape`           | `'rounded' \| 'circle' \| 'square'`              | `'rounded'`  | Форма скруглений                   |
| `leftNode`        | `ReactNode`                                      | —            | Иконка/элемент слева               |
| `rightNode`       | `ReactNode`                                      | —            | Иконка/элемент справа              |
| `disabled`        | `boolean`                                        | —            | Отключить кнопку                   |

## ToggleGroup Props

| Prop            | Тип                          | По умолчанию   | Описание                                   |
| --------------- | ---------------------------- | -------------- | ------------------------------------------ |
| `type`          | `'single' \| 'multiple'`     | —              | **Обязательный.** Режим выбора             |
| `value`         | `string \| string[]`         | —              | Controlled: выбранное значение(я)          |
| `defaultValue`  | `string \| string[]`         | —              | Uncontrolled: начальное значение           |
| `onValueChange` | `(value) => void`            | —              | Callback при смене значения                |
| `size`          | `ButtonSize`                 | —              | Передаётся всем дочерним кнопкам           |
| `shape`         | `ButtonShape`                | —              | Передаётся всем дочерним кнопкам           |
| `disabled`      | `boolean`                    | —              | Отключить все кнопки в группе              |
| `rovingFocus`   | `boolean`                    | `true`         | Roving tabindex для клавиатурной навигации |
| `loop`          | `boolean`                    | `true`         | Зацикливание стрелок на краях              |
| `orientation`   | `'horizontal' \| 'vertical'` | `'horizontal'` | Направление навигации стрелками            |
