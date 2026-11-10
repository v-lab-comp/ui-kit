---
title: BaseCheckbox
description: Низкоуровневый input type="checkbox" без подписи — строительный блок для Checkbox и своих полей.
---

# BaseCheckbox

Только **`input type="checkbox"`** с размерами и поддержкой **`indeterminate`**. Обычно используют через экспорт [**Checkbox**](./checkbox) (это тот же компонент) или обёртки [**CheckboxField**](./checkbox-field) / [**CheckboxCard**](./checkbox-card).

## Превью

<ComponentDocsPreview name="baseCheckbox" />

## Импорт

```tsx
import { BaseCheckbox, BASE_CHECKBOX_SIZE_OPTIONS } from '@v-lab/ui-kit'
```

## Пример

В приложениях чаще импортируют [**Checkbox**](./checkbox) — здесь явный **`BaseCheckbox`** для кастомной вёрстки рядом с подписью.

```tsx
import { BaseCheckbox } from '@v-lab/ui-kit'

export function InlineConsent() {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <BaseCheckbox defaultChecked aria-label="Согласие" />
      <span>Согласие на обработку данных</span>
    </label>
  )
}
```

Состояние «неопределённо» (**`indeterminate`**) — для дерева или таблицы выбора:

```tsx
<BaseCheckbox indeterminate aria-label="Частичный выбор" />
```

## Пропсы (`BaseCheckboxProps`)

| Проп                | Тип                         | Описание                                                                       |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------ |
| **`size`**          | **`medium`** \| **`small`** | Визуальный размер чекбокса                                                     |
| **`indeterminate`** | `boolean`                   | Состояние «неопределённо» (частичный выбор в дереве); выставляется на DOM-узле |
| **`className`**     | `string`                    | Дополнительный класс на **`<input>`**                                          |

Остальное — стандартные атрибуты **`input type="checkbox"`**: **`checked`**, **`defaultChecked`**, **`onChange`**, **`name`**, **`value`**, **`disabled`**, **`required`**, **`aria-*`**, … Доступность: связывайте с подписью через **`id`** / **`aria-labelledby`** или задавайте **`aria-label`**.

### Полный тип

**`BaseCheckboxProps`**, **`BASE_CHECKBOX_SIZE_OPTIONS`** — **`BaseCheckbox.types.ts`**.

Исходники: `src/components/inputs/base/BaseCheckbox/`.
