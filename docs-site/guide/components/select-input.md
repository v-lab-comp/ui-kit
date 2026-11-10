---
title: SelectInput
description: Выпадающий список с поиском, группы опций, full / compact / inline; режим multiple.
---

# SelectInput

Поле выбора из списка: плоский массив **`options`** или группы **`groups`** (заголовок секции + пункты, как **SelectGroup** в shadcn/ui). Полная строка с **`label`** и **`hint`**, поиск при большом числе пунктов, **`placement`** выпадающего слоя через Floating UI. Режим **`mode="multiple"`** (как у Ant Design Select) — несколько значений с чекбоксами и сводкой в триггере.

## Превью

<ComponentDocsPreview name="selectInput" />

### Группы опций (`groups`)

<ComponentDocsPreview name="selectInputGrouped" />

### Несколько значений (`mode="multiple"`)

<ComponentDocsPreview name="selectInputMultiple" />

## Импорт

```tsx
import { SelectInput } from '@v-lab/ui-kit'
import type {
  SelectInputProps,
  SelectInputOptionsProp,
  SelectOption,
  SelectOptionGroup,
} from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'

const OPTIONS = [
  { value: 'a', label: 'Первый' },
  { value: 'b', label: 'Второй' },
]

export function RegionSelect() {
  const [value, setValue] = useState('')
  return (
    <SelectInput
      label="Регион"
      options={OPTIONS}
      value={value}
      onChange={(next) => setValue(next)}
    />
  )
}
```

Иконки в опциях, **`variant="inline"`**, длинные списки — в Storybook **Inputs/SelectInput** (истории **Grouped options**, **Multiple (summary)**).

## Значение, `ref` и форма

- **`onChange(value, option)`** получает новое значение и выбранную опцию; при очистке — **`''`** и **`null`**. Повторный выбор уже выбранного пункта **`onChange`** не вызывает.
- **`ref`** указывает на кнопку-триггер (**`HTMLButtonElement`**): **`ref.current.focus()`** переводит фокус на поле (например, при ошибке валидации в форме).
- Стандартные атрибуты кнопки (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**, **`autoFocus`**…) уходят на триггер.
- С **`name`** значение отправляется в нативную форму скрытым **`<input type="hidden">`**; пустое значение — пустой строкой. **`form`** — id формы, если поле вне неё.

## Клавиатура и доступность

Поле работает как **combobox** с **listbox** (WAI-ARIA APG): фокус остаётся на триггере, активный пункт объявляется через **`aria-activedescendant`**.

| Клавиши                                        | Действие                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| **↓** / **↑** / **Enter** / **Space**          | Открыть список; в открытом — сменить активный пункт / выбрать     |
| **Home** / **End** / **PageUp** / **PageDown** | Первый / последний пункт, шаг на 10                               |
| Символы                                        | Перейти к пункту по первым буквам (если в списке нет поля поиска) |
| **Escape**                                     | Закрыть список; внутри **Modal** закрывается только список        |
| **Tab**                                        | Закрыть список и перейти дальше                                   |
| **Delete** / **Backspace**                     | Очистить значение                                                 |

Если в списке есть поле поиска, при открытии фокус уходит в него (стрелки и **Enter** работают оттуда), при закрытии возвращается на триггер. Список закрывается и при клике снаружи или уходе фокуса. Сообщения «No results» / «No options» объявляются через **`role="status"`**.

У **`compact`** / **`compact-label`** / **`inline`** нет видимой подписи, поэтому **`aria-label`** или **`aria-labelledby`** обязательны (проверяет TypeScript):

```tsx
<SelectInput variant="compact-label" aria-label="Валюта" options={CURRENCIES} />
```

## Состояние `completed` {#completed-state}

Пропы **`completed`** и **`completedColor`** совпадают с **[InputField](./input-field#input-completed)**:

- **`variant="full"`** — рамка той же оболочки, что у текстового поля.
- **`compact`** / **`compact-label`** — рамка вокруг кнопки-триггера; **`completedColor`** задаёт **`--input-completed-border`** на триггере.
- **`inline`** — видимая **`1px`** рамка (по умолчанию прозрачная обводка у триггера).

При **`error`** или **`disabled`** акцент не показывается. Превью: **[InputField — превью completed](./input-field#input-completed)** или Storybook **Completed (full)** / **Completed (compact)**.

## Группы (`groups`)

Вместо **`options`** передайте **`groups`**: массив **`{ label, options }`**. Заголовок не выбирается; между секциями — разделитель. В типах **`options`** и **`groups`** взаимоисключающие (**`SelectInputOptionsProp`**); если в рантайме оказались оба (например, merge пропсов), приоритет у **`groups`**.

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'
import type { SelectOptionGroup } from '@v-lab/ui-kit'

const GROUPS: SelectOptionGroup[] = [
  {
    label: 'Фрукты',
    options: [
      { value: 'apple', label: 'Яблоко' },
      { value: 'banana', label: 'Банан' },
    ],
  },
  {
    label: 'Овощи',
    options: [{ value: 'carrot', label: 'Морковь' }],
  },
]

export function GroupedSelect() {
  const [value, setValue] = useState('')
  return (
    <SelectInput
      label="Категория"
      placeholder="Выберите…"
      groups={GROUPS}
      value={value}
      onChange={(next) => setValue(next)}
    />
  )
}
```

Поиск фильтрует пункты; пустые группы скрываются.

## Режим `mode="multiple"`

Только при **`variant="full"`** (по умолчанию):

- Значение: **`value?: string[]`**, **`onChange(value, options)`** получает новый массив **`value`** и выбранные опции.
- В триггере при непустом выборе: текст **`multipleSummaryLabel (N)`** или свой **`multipleSummaryRender`**; при пустом — **`placeholder`**.
- В выпадающем списке — чекбоксы; выбор пункта (клик, **Enter** / **Space**) **не закрывает** панель; поиск показывается, если опций больше одной.
- У опции можно задать **`description`** — вторая строка под **`label`** (и участвует в поиске).
- С **`name`** каждое значение отправляется в форму отдельным скрытым полем (как у **`<select multiple>`**).

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'

const OPTIONS = [
  { value: 'a', label: 'Поле A', description: 'Категория' },
  { value: 'b', label: 'Поле B', description: 'Категория' },
]

export function ExtraFieldsSelect() {
  const [value, setValue] = useState<string[]>([])
  return (
    <SelectInput
      mode="multiple"
      label="Ещё поля"
      placeholder="Выберите поля…"
      options={OPTIONS}
      value={value}
      onChange={(next) => setValue(next)}
      multipleSummaryLabel="Изменить выбор"
      searchPlaceholder="Поиск поля"
    />
  )
}
```

## Варианты (`variant`)

Тип **`SelectInputProps`** — объединение четырёх вариантов (discriminated union по **`variant`**):

| Значение                  | Когда использовать                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **`full`** (по умолчанию) | Полная строка с **`label`**, **`hint`**, **`error`**, как у обычного поля               |
| **`compact`**             | Только кнопка-триггер (иконка/текст + шеврон), без полной подписи поля                  |
| **`compact-label`**       | Компактная кнопка с **`shortLabel`** у каждой опции (обязательное поле в **`options`**) |
| **`inline`**              | Инлайн-кнопка с пунктирной обводкой — для тулбаров                                      |

У **`compact`** / **`compact-label`** / **`inline`** нет **`InputField`**: пропсы **`label`**, **`hint`**, **`required`** и т.п. недоступны, **`error`** даёт красную рамку и **`aria-invalid`**. Обязательны **`aria-label`** или **`aria-labelledby`**.

## Опции списка

| Тип                              | Поля                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| **`SelectOption`**               | **`value`**, **`label`**, опционально **`description`**, **`icon`**, **`searchKeywords`** |
| **`SelectOptionWithShortLabel`** | То же + обязательный **`shortLabel`** (для **`compact-label`** и **`inline`**)            |
| **`SelectOptionGroup`**          | **`label`** (заголовок секции), **`options`**: **`SelectOption[]`**                       |

## Общие пропсы (все варианты)

Плюс к **`options`** или **`groups`** и полям варианта:

| Проп                                     | Описание                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`size`**                               | **`big`** \| **`medium`** \| **`small`** — высота триггера                                        |
| **`placeholder`**                        | Подпись пустого значения                                                                          |
| **`prefix`**                             | Иконка слева, если у выбранной опции нет своей **`icon`**                                         |
| **`labelTooltip`**                       | Узел рядом с **`label`** (в основном для **`full`**)                                              |
| **`searchThreshold`**                    | Порог числа опций, после которого показывается поиск в выпадающем списке (по умолчанию **20**)    |
| **`searchPlaceholder`**                  | Плейсхолдер поля поиска внутри списка                                                             |
| **`lazyLoadPageSize`**                   | Размер «страницы» при ленивой подгрузке (по умолчанию **50**)                                     |
| **`placement`**                          | **`bottom`** \| **`top`** \| **`left`** \| **`right`** — положение выпадающего слоя (Floating UI) |
| **`dropdownWidth`**                      | Фиксированная ширина выпадающего списка (px)                                                      |
| **`dropdownPortalZIndex`**               | **`z-index`** портала списка (если нужен порядок слоёв с модалками)                               |
| **`dropdownMaxHeight`**                  | Макс. высота списка (**px** или CSS-строка), по умолчанию **320**                                 |
| **`optionTextWrap`**                     | Перенос длинных подписей опций на несколько строк                                                 |
| **`aria-label`** / **`aria-labelledby`** | Доступное имя триггера; обязательно у **compact** / **compact-label** / **inline**                |
| **`name`** / **`form`**                  | Имя поля формы (скрытые **`<input type="hidden">`**) и id формы                                   |
| **`id`**                                 | id кнопки-триггера (у **`full`** — и связка с **`label`**)                                        |

Остальные стандартные атрибуты кнопки (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**) уходят на триггер — см. **`SelectTriggerNativeProps`** в **`SelectInput.types.ts`**.

### Полный тип

**`SelectInputProps`**, **`SelectInputOptionsProp`**, **`FullVariantMultipleProps`**, **`SelectInputSingleValueProps`**, **`SelectInputMultipleValueProps`**, **`SelectAccessibleName`**, **`SelectOption`**, **`SelectOptionGroup`**, **`SelectVariant`** — **`SelectInput.types.ts`**.

Исходники: `src/components/inputs/SelectInput/`.
