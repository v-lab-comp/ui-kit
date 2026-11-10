---
title: RichInput
description: Многострочное поле форматированного текста для форм — label, hint/error, тулбар и лимит длины.
---

# RichInput

Поле форматированного текста на базе **[InputField](./input-field)**: обычное поле формы с **`label`**, **`hint`** / **`error`**, **`required`** и размерами — только вместо `<input>` внутри `contenteditable` с тулбаром.

Значение — **HTML-строка**. Для ленты комментариев (отправка по **Enter**, кнопка «самолётик») используйте **[CommentRichInput](./comments/comment-rich-input)** — у него другой сценарий.

## Превью

<ComponentDocsPreview name="richInput" />

## Импорт

```tsx
import { RichInput } from '@v-lab/ui-kit'
import type { RichInputProps, RichInputTool } from '@v-lab/ui-kit'
```

## Примеры

### Контролируемое поле формы

```tsx
import { useState } from 'react'
import { RichInput } from '@v-lab/ui-kit'

export function DescriptionField() {
  const [value, setValue] = useState('')
  return (
    <RichInput
      label="Описание"
      required
      placeholder="Опишите задачу…"
      hint="Жирный / курсив / списки — в тулбаре."
      value={value}
      onChange={setValue}
    />
  )
}
```

### Валидация

Поле не валидирует само — решение принимает форма. Проверять удобно по тексту без тегов:

```tsx
const isEmpty = value.replace(/<[^>]*>/g, '').trim() === ''

<RichInput
  label="Описание"
  required
  value={value}
  onChange={setValue}
  error={touched && isEmpty ? 'Заполните описание' : undefined}
/>
```

### Лимит длины

**`maxLength`** считает **текст без тегов**: под полем появляется счётчик, ввод сверх лимита блокируется, вставка обрезается.

```tsx
<RichInput label="Заметка" maxLength={280} value={value} onChange={setValue} />
```

### Свой набор инструментов

```tsx
<RichInput
  label="Заметка"
  size="small"
  tools={['bold', 'italic', 'clear']}
  toolbarPlacement="bottom"
  minRows={2}
  maxRows={4}
/>
```

Пустой массив **`tools={[]}`** убирает тулбар — остаётся многострочное поле с ручным форматированием через **Ctrl/Cmd + B / I / U**.

### Нативная отправка формы

С **`name`** рендерится скрытый `<input type="hidden">` — значение попадает в **`FormData`** без контроля из React:

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault()
    new FormData(e.currentTarget).get('description')
  }}
>
  <RichInput label="Описание" name="description" defaultValue="<b>Черновик</b>" />
</form>
```

## Поведение

- **Enter** — новая строка. Форму поле не отправляет.
- **Вставка** из буфера — только **plain text**.
- Из входящего **`value`** / **`defaultValue`** вырезается **`<script>`**. Полную санитизацию перед выводом через **`dangerouslySetInnerHTML`** выполняет приложение / бэкенд.
- **`readOnly`** — текст выделяется и копируется, тулбар скрыт; **`disabled`** — поле в неактивном состоянии.

## Пропы

Всё от **[InputField](./input-field)** (**`label`**, **`required`**, **`optional`**, **`labelTooltip`**, **`hint`**, **`error`**, **`completed`**, **`completedColor`**, **`prefix`**, **`suffix`**, **`size`**, **`disabled`**, **`id`**, **`className`**) плюс:

| Проп               | Тип                             | Назначение                                                           |
| ------------------ | ------------------------------- | -------------------------------------------------------------------- |
| `value`            | `string`                        | HTML-значение (контролируемый режим)                                 |
| `defaultValue`     | `string`                        | Начальный HTML (неконтролируемый режим)                              |
| `onChange`         | `(html: string) => void`        | Новое HTML-значение после каждого изменения                          |
| `placeholder`      | `string`                        | Текст в пустом поле                                                  |
| `name`             | `string`                        | Имя поля для нативной отправки формы (скрытый `input`)               |
| `readOnly`         | `boolean`                       | Только чтение: тулбар скрыт, текст копируется                        |
| `maxLength`        | `number`                        | Лимит текста без тегов: счётчик + блокировка ввода и обрезка вставки |
| `tools`            | `readonly RichInputTool[]`      | Набор и порядок кнопок; **`[]`** — без тулбара                       |
| `toolbarPlacement` | **`'top'`** \| **`'bottom'`**   | Положение тулбара (по умолчанию **`top`**)                           |
| `minRows`          | `number` (по умолчанию **`3`**) | Минимальная высота в строках                                         |
| `maxRows`          | `number`                        | Максимальная высота в строках; дальше — прокрутка                    |
| `ariaLabels`       | **`RichInputAriaLabels`**       | Подписи тулбара и кнопок; дефолты — **`DEFAULT_RICH_INPUT_ARIA_EN`** |

**`RichInputTool`**: **`bold`** | **`italic`** | **`underline`** | **`strikethrough`** | **`bulletList`** | **`orderedList`** | **`clear`**. Набор по умолчанию — **`DEFAULT_RICH_INPUT_TOOLS`** (всё, кроме **`clear`**).

Исходники: `src/components/inputs/RichInput/`.

## Storybook

**Inputs/RichInput** — `Playground`, сценарии `InForm`, `WithMaxLength`, `UncontrolledWithName`, `Compact` и галерея состояний.
