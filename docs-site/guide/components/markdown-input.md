---
title: MarkdownInput
description: RichInput, у которого значение хранится в Markdown — sub-entry /markdown.
---

# MarkdownInput

Тот же редактор, что и **[RichInput](./rich-input)**, но значение снаружи — **Markdown**, а не HTML. Входящий Markdown разворачивается в HTML для редактора, результат правки сворачивается обратно.

Живёт в отдельной точке входа, потому что конвертация тянет две зависимости:

```bash
npm install marked turndown
```

`RichInput` из основного bundle работает с HTML и этих пакетов **не требует**.

## Импорт

```tsx
import { MarkdownInput } from '@v-lab/ui-kit/markdown'
import type { MarkdownInputProps } from '@v-lab/ui-kit/markdown'
```

## Примеры

### Контролируемое поле

```tsx
import { useState } from 'react'
import { MarkdownInput } from '@v-lab/ui-kit/markdown'

export function DescriptionField() {
  const [value, setValue] = useState('**Важно:** прочитать до конца.')
  return (
    <MarkdownInput
      label="Описание"
      required
      placeholder="Опишите задачу…"
      value={value}
      onChange={setValue}
    />
  )
}
```

### Нативная отправка формы

С **`name`** в `FormData` уходит **Markdown**, а не HTML:

```tsx
<MarkdownInput label="Описание" name="description" defaultValue="# Заголовок" />
```

### Режим просмотра

Конвертеры экспортируются отдельно — например, чтобы отрисовать сохранённый Markdown:

```tsx
import { markdownToHtml } from '@v-lab/ui-kit/markdown'
;<div dangerouslySetInnerHTML={{ __html: markdownToHtml(saved) }} />
```

::: warning Санитизация
`markdownToHtml` **не санитизирует** результат: Markdown допускает сырой HTML. Перед выводом через `dangerouslySetInnerHTML` пропускайте его через санитайзер приложения (например `DOMPurify`) или очищайте на бэкенде. Внутри самого редактора `<script>` вырезается, но это не полноценная защита.
:::

## Отличия от `RichInput`

| Что                  | Поведение                                               |
| -------------------- | ------------------------------------------------------- |
| `value` / `onChange` | Строка **Markdown** вместо HTML                         |
| `name`               | В скрытый `input` кладётся Markdown                     |
| `tools` по умолчанию | Без **`underline`** — см. ниже                          |
| `maxLength`          | Считает **видимый текст**, а не длину Markdown-разметки |

Остальные пропы — как у **[RichInput](./rich-input#пропы)**: `label`, `required`, `hint` / `error`, `completed`, `size`, `disabled`, `readOnly`, `minRows` / `maxRows`, `toolbarPlacement`.

### Подчёркивание

В CommonMark подчёркивания нет. Поэтому в наборе по умолчанию (`DEFAULT_MARKDOWN_INPUT_TOOLS`) кнопки `underline` нет. Если добавить её вручную — формат не потеряется, но сохранится как inline-HTML внутри Markdown:

```tsx
<MarkdownInput tools={['bold', 'italic', 'underline']} /> // → «текст <u>под</u>»
```

Зачёркивание, наоборот, выражается штатно (`~~текст~~`) — оно в наборе по умолчанию есть.

## Что происходит с форматированием при round-trip

`document.execCommand` в разных браузерах отдаёт разные теги (`<b>` / `<strong>`, `<strike>` / `<s>` / `<del>`) — конвертер нормализует их все. Обратное преобразование не пытается сохранить исходное форматирование Markdown символ в символ: отступы списков и разделители приводятся к одному стилю (`-` для маркеров, `*` для курсива, `#` для заголовков). Если бэкенд сравнивает тексты побайтово, учитывайте это.

## Storybook

**Inputs/MarkdownInput** — `Playground` (поле + значение в Markdown рядом), `InForm`, `ViewMode`.
