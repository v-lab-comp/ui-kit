---
title: TagInput
description: Поле с чипами-тегами, свободный ввод и выбор из списка (в т.ч. с бэка).
---

# TagInput

Поле на базе **[InputField](./input-field)** и компонента **[Tag](./tag)**: массив строк **`value`**, ввод своих меток и опционально **`suggestions`** с выпадающим списком.

Пропы **`completed`** и **`completedColor`** для акцентной рамки оболочки — как у **[InputField](./input-field#input-completed)**.

## Превью

<ComponentDocsPreview name="tagInput" />

## Импорт

```tsx
import { TagInput } from '@v-lab/ui-kit'
import type { TagInputProps, TagInputSuggestion, TagInputSuggestionsMatch } from '@v-lab/ui-kit'
```

## Примеры

### Только свой ввод

```tsx
import { useState } from 'react'
import { TagInput } from '@v-lab/ui-kit'

export function LabelsField() {
  const [tags, setTags] = useState<string[]>([])
  return (
    <TagInput
      label="Метки"
      placeholder="Введите и нажмите Enter…"
      value={tags}
      onChange={setTags}
    />
  )
}
```

### Локальный список подсказок

Можно передать **`string[]`** (ключ в списке = сама строка) или **`{ id, label }[]`** — **`id`** используется как **`key`** у пунктов; в **`value`** попадает **`label`**.

```tsx
import { useState } from 'react'
import { TagInput } from '@v-lab/ui-kit'

const OPTIONS = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vue', label: 'Vue' },
  { id: 'design', label: 'Design' },
]

export function SkillsField() {
  const [tags, setTags] = useState<string[]>([])
  return (
    <TagInput
      label="Навыки"
      value={tags}
      onChange={setTags}
      suggestions={OPTIONS}
      suggestionsMatch="contains"
      placeholder="Начните ввод или откройте список…"
    />
  )
}
```

По умолчанию пункты подсказок **не исчезают** после выбора: у выбранных строк справа показывается **галочка**, повторный клик (или Enter на подсвеченном стрелками пункте) **снимает** тег. Прежнее поведение («выбранные скрываются из списка») — проп **`suggestionsExcludeSelected`**.

### Список с бэка (`onSuggestionsQueryChange`)

Родитель держит **`suggestions`** в state и обновляет их после запроса (ниже — упрощённая имитация без `fetch`):

```tsx
import { useEffect, useState } from 'react'
import { TagInput } from '@v-lab/ui-kit'
import type { TagInputSuggestion } from '@v-lab/ui-kit'

const OPTIONS_FROM_BACKEND: TagInputSuggestion[] = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vue', label: 'Vue' },
  { id: 'design', label: 'Design' },
  { id: 'qa', label: 'QA' },
]

export function TagsFromApiExample() {
  const [tags, setTags] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<TagInputSuggestion[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setSuggestions(
        q
          ? OPTIONS_FROM_BACKEND.filter((s) => s.label.toLowerCase().includes(q))
          : [...OPTIONS_FROM_BACKEND]
      )
    }, 220)

    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <TagInput
      label="Стек"
      placeholder="Поиск по справочнику…"
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      suggestionsMatch="server"
      onSuggestionsQueryChange={setQuery}
    />
  )
}
```

Фильтрацию при **`suggestionsMatch="server"`** выполняет только бэк (или родитель по ответу API). Локальная фильтрация **`contains`** / **`startsWith`** по-прежнему работает по **`draft`**.

### Высота области тегов

Проп **`tagsAreaMaxHeight`** ограничивает блок «чипы + поле» (число в px, CSS-строка или **`'none'`**). Переполнение прокручивается тонким скроллбаром в стиле Select.

```tsx
<TagInput value={tags} onChange={setTags} tagsAreaMaxHeight={160} label="Теги" />
```

## Поведение клавиш

Поле со **`suggestions`** работает как **combobox** с listbox-попапом по [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/): фокус остаётся в поле, подсвеченный пункт сообщается скринридеру через **`aria-activedescendant`**. Пока стрелками ничего не подсвечено, **Enter** добавляет набранный текст.

| Действие                            | Клавиши                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Свой тег из непустого поля          | **Enter** (если пункт не подсвечен), запятая, **`;`**                                                      |
| Подсветить пункт                    | **↓** / **↑** — по кругу, отключённые пропускаются; на закрытом списке открывают его с первым / последним  |
| Выбрать подсвеченный пункт (toggle) | **Enter** — фокус остаётся в поле; **Tab** — пункт выбирается, фокус уходит дальше; мышью — клик по пункту |
| Закрыть список                      | **Esc** (родительская модалка не закрывается); ввод текста или клик по полю открывают список снова         |
| Удалить последний тег               | **Backspace** в пустом поле                                                                                |

## Доступность

- Без **`suggestions`** поле — обычный **textbox**; со списком — **combobox** (`aria-expanded`, `aria-controls`, `aria-activedescendant`), список — **listbox**, названный подписью поля (**`label`**). Пункты не попадают в порядок Tab.
- В режиме галочек (по умолчанию) у listbox **`aria-multiselectable`**, **`aria-selected`** отражает выбранные теги; при **`suggestionsExcludeSelected`** **`aria-selected`** — у подсвеченного пункта.
- У кнопки удаления каждого чипа имя с текстом тега: по умолчанию **`Remove {label}`**, свой вариант — **`removeTagLabel`**. После удаления кнопкой фокус возвращается в поле.
- В **`renderTag`** приходит **`removeLabel`** — то же имя для своей кнопки удаления.
- **Enter** в поле не отправляет форму.

## Устройство пропсов

Публичный тип **`TagInputProps`** объединяет:

1. Пропсы **InputField** (кроме **`children`**): **`label`**, **`hint`**, **`error`**, **`prefix`**, **`suffix`**, **`startBlock`**, **`endBlock`**, **`size`**, **`disabled`**, **`id`**, **`wrapperClassName`**, **`wrapperStyle`**, и т.д.
2. Специфичные для тегов поля ниже.
3. Атрибуты внутреннего **`<input>`** (без **`value`**, **`onChange`**, **`prefix`**, **`suffix`** у DOM — они заняты слотами и массивом тегов).

### Основные пропсы TagInput

| Проп                         | Тип                                  | Описание                                                                                                          |
| ---------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `value`                      | **`TagInputTagValue[]`**             | Controlled: теги (**`string`** или **`{ id, label }`**)                                                           |
| `defaultValue`               | **`TagInputTagValue[]`**             | Начальное значение (uncontrolled)                                                                                 |
| `onChange`                   | `(tags: TagInputTagValue[]) => void` | Смена списка                                                                                                      |
| `tagVariant`                 | см. **Tag**                          | Вариант чипов: **`stroke`** \| **`gray`**                                                                         |
| `maxTags`                    | `number`                             | Лимит числа тегов                                                                                                 |
| `allowDuplicates`            | `boolean`                            | Разрешить одинаковые **`label`**                                                                                  |
| `allowCustomTags`            | `boolean`                            | Произвольный текст как тег; **`false`** — только пункты списка (точное **`label`**, без учёта регистра)           |
| `commitOnBlur`               | `boolean`                            | Зафиксировать черновик при blur                                                                                   |
| `splitPattern`               | `RegExp`                             | Разделители при вставке и коммите (по умолчанию запятая, `;`, перевод строки)                                     |
| `removeTagLabel`             | `(tag: TagInputTagValue) => string`  | `aria-label` кнопки удаления у чипа (по умолчанию **`Remove {label}`**)                                           |
| `renderTag`                  | функция                              | Кастомный рендер чипа: **`{ tag, index, disabled, removeLabel, onRemove }`**                                      |
| `maxTagCount`                | `number`                             | Сколько чипов показывать; остальное — **`+N`** / **`maxTagCountOverflow`**                                        |
| `maxTagCountOverflow`        | `(n: number) => ReactNode`           | Подпись вместо **`+n`**                                                                                           |
| `validateTag`                | `(label: string) => boolean`         | **`false`** — не добавлять тег                                                                                    |
| `suggestions`                | `readonly TagInputSuggestion[]`      | Подсказки: **`string`** или **`{ id, label }`** (**`id`** — уникальный ключ пункта); **`undefined`** — без списка |
| `suggestionsMatch`           | **`TagInputSuggestionsMatch`**       | **`contains`** \| **`startsWith`** \| **`server`**                                                                |
| `suggestionsLimit`           | `number`                             | Макс. пунктов в списке (по умолчанию 50)                                                                          |
| `suggestionsExcludeSelected` | `boolean` (по умолчанию **`false`**) | **`true`** — скрывать уже выбранные пункты (старое поведение); **`false`** — галочки и toggle в списке            |
| `suggestionsLoading`         | `boolean`                            | Состояние загрузки выпадающего списка                                                                             |
| `suggestionsEmptyText`       | **`ReactNode`**                      | Текст при пустом результате фильтра (по умолчанию **`No matches`**)                                               |
| `suggestionsLoadingText`     | **`ReactNode`**                      | Текст при **`suggestionsLoading`** (по умолчанию **`Loading…`**)                                                  |
| `getOptionDisabled`          | `(row) => boolean`                   | Отключить пункт списка (**`TagInputSuggestionObject`**)                                                           |
| `onSuggestionsQueryChange`   | `(query: string) => void`            | Текст поля для запроса на бэк                                                                                     |
| `tagsAreaMaxHeight`          | `number` \| `string` \| **`'none'`** | Лимит высоты области чипов + ввода                                                                                |

Полный тип — **`TagInputProps`** (`types.ts`). Исходники: `src/components/inputs/TagInput/`.

## React Hook Form

Адаптер **`RHFTagInput`** в точке входа **`@v-lab/ui-kit/adapters`** (значение поля — массив **`TagInputTagValue`**). См. **[Адаптеры](../adapters)**.

## Storybook

**Inputs/TagInput** — интерактивно; у истории «Список с бэка» в Docs показан полный пример кода **`TagInput`** с **`onSuggestionsQueryChange`**.
