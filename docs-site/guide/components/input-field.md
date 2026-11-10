---
title: InputField
description: Обёртка поля — подпись, hint/error, префикс/суффикс, блоки start/end; слот children как (id) => контрол.
---

# InputField

Обёртка для любого однострочного или составного контрола: **`label`**, **`hint`** / **`error`**, **`prefix`** / **`suffix`**, **`startBlock`** / **`endBlock`**, размер **`size`**. Внутри обычно **`BaseInput`**, **`SelectInput`** или своя разметка.

Готовые поля (**`TextInput`**, **`EmailInput`**, …) уже собирают **`InputField`** + примитив — эта страница нужна, если вы пишете **своё** поле по тому же контракту.

Составные строки (несколько частей одного значения) — хук [**useCompositeInput**](/guide/hooks/use-composite-input); подробности — **`src/components/inputs/base/COMPOSITE_INPUTS.md`** в репозитории.

## Импорт

```tsx
import { InputField } from '@v-lab/ui-kit'
import type { InputFieldProps } from '@v-lab/ui-kit'
```

Публичный тип **`InputFieldProps`** экспортируется из основного entry (через **`src/components/inputs`**).

## Пример с BaseInput

**`children`** — **`ReactNode`** или функция **`(id: string) => ReactNode`**. Функция получает **`id`** для связки **`label`** ↔ **`htmlFor`** у внутреннего контрола.

```tsx
import { forwardRef } from 'react'
import { InputField, BaseInput } from '@v-lab/ui-kit'

type Props = {
  label: string
  hint?: string
  error?: string
}

export const MyField = forwardRef<
  HTMLInputElement,
  Props & React.ComponentPropsWithoutRef<'input'>
>(({ label, hint, error, ...inputProps }, ref) => (
  <InputField label={label} hint={hint} error={error}>
    {(fieldId) => <BaseInput ref={ref} id={fieldId} hasError={!!error} {...inputProps} />}
  </InputField>
))
MyField.displayName = 'MyField'
```

Шаблон из **`CLAUDE.md`** репозитория совпадает с этим паттерном.

## Состояние «заполнено» (`completed`) {#input-completed}

Проп **`completed`** перекрашивает **штатную 1px рамку** оболочки в **primary** (по умолчанию **`--primary-base`** / **`--primary-dark`** при наведении). **`completedColor`** — короткие пресеты: **`"success"`**, **`"error"`**, **`"warning"`**, **`"primary"`**, **`"information"`**, **`"faded"`**, **`"feature"`**, **`"verified"`**, **`"away"`**, **`"highlighted"`** (подставляется **`var(--*-base)`**), либо **`#hex`**, **`rgb()`**, **`var(--…)`**, примитивы.

Стиль не применяется при **`error`** или **`disabled`** (приоритет у ошибки и неактивности).

Готовые поля (**`TextInput`**, **`EmailInput`**, **`TagInput`**, **`SelectInput`** variant **`full`**, **`AsyncSearchSelect`**, …) наследуют эти пропы из **`InputFieldProps`**. У **`SelectInput`** вариантов **`compact`** / **`compact-label`** / **`inline`** рамка на кнопке-триггере. У **`PhoneInput`** и **`SiteInput`** те же значения дублируются на вложенный **`SelectInput`** в **`startBlock`**.

Подробнее по вариантам селекта — [SelectInput](./select-input#completed-state).

### Превью

<ComponentDocsPreview name="inputCompleted" />

Истории в Storybook: **Inputs/TextInput** — **Completed**, **CompletedCustomColor**; **Inputs/SelectInput** — **Completed (full)** и др.; **Inputs/TagInput**, **Inputs/AsyncSearchSelect**.

## Состояние «есть значение» (`filled`) {#input-filled}

Когда в поле есть значение, рамка оболочки окрашивается в **`--blue-400`** — заполненное поле визуально отличается от пустого с placeholder. Иерархия рамки:

| Состояние     | Цвет рамки                                             |
| ------------- | ------------------------------------------------------ |
| пусто         | **`--stroke-soft-200`** (серый)                        |
| есть значение | **`--blue-400`**                                       |
| фокус         | **`--primary-base`** + кольцо **`--primary-alpha-16`** |
| ошибка        | **`--error-base`**                                     |

Для текстовых полей (**`TextInput`**, **`EmailInput`**, …) состояние определяется автоматически: **`BaseInput`** выставляет атрибут **`data-filled`**. Для контролов без обычного **`<input>`** (**`SelectInput`**, **`AsyncSearchSelect`**, **`TagInput`**) используется проп **`filled`**.

## Маркер обязательности (`required`) {#input-required}

При **`required`** рядом с подписью показывается маркер — по умолчанию красный **`*`** (**`--error-base`**). Переопределение:

- **`requiredMarker`** — свой узел вместо **`*`** (например другой символ или иконка);
- CSS-переменная **`--input-required-color`** — цвет маркера.

```tsx
<TextInput label="Email" required />
<TextInput label="Email" required requiredMarker="（обязательно）" />
```

## Пропсы (`InputFieldProps`)

| Проп                 | Тип                                        | Описание                                                                                                                                         |
| -------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`children`**       | `ReactNode \| ((id: string) => ReactNode)` | Контент поля или render-функция с **`id`** для **`label`** / **`input`**                                                                         |
| **`label`**          | `string`                                   | Подпись над полем                                                                                                                                |
| **`required`**       | `boolean`                                  | Маркер обязательности (по умолчанию красный `*` рядом с подписью)                                                                                |
| **`requiredMarker`** | `ReactNode`                                | Свой маркер вместо `*`. Цвет — CSS-переменная **`--input-required-color`**                                                                       |
| **`optional`**       | `boolean \| string`                        | Текст «Optional» или свой текст                                                                                                                  |
| **`labelTooltip`**   | `ReactNode`                                | Узел справа от подписи (иконка подсказки)                                                                                                        |
| **`hint`**           | `string`                                   | Текст под полем; скрывается, если задан **`error`**                                                                                              |
| **`error`**          | `string`                                   | Ошибка; перекрывает **`hint`**, подсветка обёртки                                                                                                |
| **`filled`**         | `boolean`                                  | Рамка «есть значение» (**`--blue-400`**). Для текстовых полей определяется автоматически; проп нужен для Select и др. без обычного **`<input>`** |
| **`completed`**      | `boolean`                                  | Акцентная рамка (primary по умолчанию); не с **`error`** / **`disabled`**                                                                        |
| **`completedColor`** | `string`                                   | Пресеты **`success`**, **`error`**, … или hex / **`rgb()`** / **`var(--…)`**                                                                     |
| **`prefix`**         | `ReactNode`                                | Слот слева внутри обводки                                                                                                                        |
| **`suffix`**         | `ReactNode`                                | Слот справа внутри обводки                                                                                                                       |
| **`startBlock`**     | `ReactNode`                                | Отдельный блок слева (композитные поля)                                                                                                          |
| **`endBlock`**       | `ReactNode`                                | Отдельный блок справа                                                                                                                            |
| **`size`**           | `'big' \| 'medium' \| 'small'`             | Высота обёртки (по умолчанию **`medium`**)                                                                                                       |
| **`disabled`**       | `boolean`                                  | Неактивное состояние                                                                                                                             |
| **`id`**             | `string`                                   | Явный **`id`**; иначе генерируется через **`useId`**                                                                                             |
| **`className`**      | `string`                                   | Класс корневого **`div`** поля                                                                                                                   |

Живое превью типового контрола без подписи — на странице [**BaseInput**](./base-input); полная галерея инпутов — [**Обзор и галерея**](./inputs/).

Исходники: **`src/components/inputs/base/InputField/`** · **`InputField.types.ts`**.
