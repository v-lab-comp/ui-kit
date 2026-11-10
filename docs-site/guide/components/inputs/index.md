---
title: Поля ввода (Inputs)
description: Паттерн InputField + BaseInput, список компонентов, опциональные entry points и живая галерея по размерам.
---

# Поля ввода (Inputs)

Все компоненты из **`src/components/inputs/`** строятся по одному принципу: обёртка **`InputField`** (подпись, подсказка, ошибка, префикс/суффикс, размер) и внутренний контрол — чаще всего **`BaseInput`** или своя разметка (**`SelectInput`**, **`Checkbox`**, составные поля).

Структура как в Storybook **`Inputs/`**: обёртка [**InputField**](../input-field), примитивы [**BaseInput**](../base-input), [**BaseCheckbox**](../base-checkbox), [Checkbox](../checkbox), [CheckboxCard](../checkbox-card), [CheckboxField](../checkbox-field), [DateInput](../date-input), [EmailInput](../email-input), [PasswordInput](../password-input), [PhoneInput](../phone-input), [SearchInput](../search-input), [SelectInput](../select-input), [AsyncSearchSelect](../async-search-select), [ShareLinkInput](../share-link-input), [SiteInput](../site-input), [TagInput](../tag-input), [TextInput](../text-input). **`FileUpload`** в Storybook относится к **`Components/`** — см. [FileUpload](../file-upload).

## Как собирать своё поле

1. Импортируйте **`InputField`** и **`BaseInput`** (или другой примитив).
2. Передайте в **`InputField`** слот **`children`** как функцию **`(fieldId) => …`** и пробросьте **`fieldId`** в **`id`** внутреннего контрола.
3. Ошибку отображайте через **`error`** у **`InputField`** — граница подсветится через **`hasError`** у **`BaseInput`**.

Краткий каркас:

```tsx
import { forwardRef } from 'react'
import { InputField } from '@v-lab/ui-kit'
import { BaseInput } from '@v-lab/ui-kit'

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => (
  <InputField label={props.label} hint={props.hint} error={props.error} id={props.id}>
    {(fieldId) => <BaseInput ref={ref} id={fieldId} hasError={!!props.error} {...props} />}
  </InputField>
))
MyInput.displayName = 'MyInput'
```

Полный шаблон и правила — в **`CLAUDE.md`** репозитория и в [**useCompositeInput**](/guide/hooks/use-composite-input) для составных значений.

## Что экспортируется из основного пакета

Импорт из **`@v-lab/ui-kit`**:

| Компонент / хук                                                           | Назначение                                                                             |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [**BaseInput**](../base-input), [**BaseCheckbox**](../base-checkbox)      | Низкоуровневые контролы без подписи                                                    |
| [**InputField**](../input-field)                                          | Обёртка: label, hint, error, prefix/suffix, размер                                     |
| **`TextInput`**, **`EmailInput`**, **`PasswordInput`**, **`SearchInput`** | Типовые однострочные поля                                                              |
| **`SiteInput`**, **`ShareLinkInput`**                                     | Составные строки (URL, ссылки)                                                         |
| **`SelectInput`**                                                         | Выпадающий список                                                                      |
| **`TagInput`**                                                            | Чипы-теги: свой ввод и опциональный список подсказок (в т.ч. с API)                    |
| **`AsyncSearchSelect`**                                                   | Выпадающий список с асинхронной подгрузкой по запросу                                  |
| **`Checkbox`**, **`CheckboxField`**, **`CheckboxCard`**                   | Чекбоксы                                                                               |
| **`useCompositeInput`**                                                   | Составное значение и скрытые поля формы — см. [хуки](/guide/hooks/use-composite-input) |

## Опциональные зависимости (отдельные entry)

Чтобы не тянуть тяжёлые peer-зависимости в основной бандл:

| Entry                     | Компонент                           |
| ------------------------- | ----------------------------------- |
| **`@v-lab/ui-kit/date`**  | **`DateInput`** (маска + календарь) |
| **`@v-lab/ui-kit/phone`** | **`PhoneInput`**                    |
| **`@v-lab/ui-kit/pdf`**   | **[PdfPreview](../pdf-preview)**    |

Подключение и версии peers — в [Установке](/guide/installation) и в **`package.json`** репозитория.

## Автозаполнение (`autoComplete`)

У **[BaseInput](../base-input)** по умолчанию **`autoComplete="off"`**, чтобы браузер не подставлял сохранённые значения в произвольные поля. Осмысленные значения по умолчанию у узких компонентов: **[EmailInput](../email-input)** — **`email`**, **[PasswordInput](../password-input)** — **`current-password`**, **[PhoneInput](../phone-input)** — **`tel`**. У **[DateInput](../date-input)** (entry **`/date`**) для маскированного поля по умолчанию тоже **`off`**. Любой дефолт можно переопределить, передав свой **`autoComplete`**.

## Галерея

Три колонки размеров (**big / medium / small**) и основные состояния — как в Storybook **Gallery → Inputs**. Исходник сетки: **`src/docs/InputsGalleryPage.tsx`**.

<ComponentDocsPreview name="inputsGallery" />

Интерактивные контролы и все варианты — в **`npm run storybook`**.
