---
title: Checkbox
description: Низкоуровневый чекбокс — обёртка над BaseCheckbox без подписи поля.
---

# Checkbox

Экспорт **`Checkbox`** — это **`BaseCheckbox`**: один **`input type="checkbox"`** со стилями размера. Отдельная страница примитива — [**BaseCheckbox**](./base-checkbox). Подпись и ошибки — в [**CheckboxField**](./checkbox-field) или карточный вариант [**CheckboxCard**](./checkbox-card).

## Превью

<ComponentDocsPreview name="checkbox" />

## Импорт

```tsx
import { Checkbox } from '@v-lab/ui-kit'
```

Обычно удобнее **`CheckboxField`** / **`CheckboxCard`** — см. соседние страницы раздела [Поля ввода](./inputs/).

## Пример

Доступность: задайте **`aria-label`** или связь с подписью через **`id`**.

```tsx
import { Checkbox } from '@v-lab/ui-kit'

export function RawCheckbox() {
  return <Checkbox defaultChecked aria-label="Согласие на обработку данных" />
}
```

## Основные пропсы

Полный тип — **`CheckboxProps`** (= **`BaseCheckboxProps`**): атрибуты **`input type="checkbox"`**, **`size`**, **`indeterminate`**, **`className`**, … Подробнее — [**BaseCheckbox**](./base-checkbox).

Исходники: `src/components/inputs/Checkbox/Checkbox.tsx` · типы — `Checkbox.types.ts`.
