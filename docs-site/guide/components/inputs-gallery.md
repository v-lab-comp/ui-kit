---
title: Поля ввода — обзор
description: Все input-компоненты UI Kit — архитектура, список, опциональные entry points.
---

# Поля ввода — обзор

Все компоненты ввода строятся по единому принципу: **`InputField`** (label, hint, error, prefix/suffix) + **`BaseInput`** (или кастомный контрол).

→ Полная документация раздела: [**Inputs/**](./inputs/)

## Компоненты

| Компонент                                  | Entry point           | Описание                     |
| ------------------------------------------ | --------------------- | ---------------------------- |
| [TextInput](./text-input)                  | основной              | Однострочный текст           |
| [EmailInput](./email-input)                | основной              | Email с иконкой              |
| [PasswordInput](./password-input)          | основной              | Пароль с toggle              |
| [SearchInput](./search-input)              | основной              | Поиск с иконкой              |
| [TagInput](./tag-input)                    | основной              | Мультиввод тегов             |
| [SelectInput](./select-input)              | основной              | Выпадающий список            |
| [AsyncSearchSelect](./async-search-select) | основной              | Select с async-поиском       |
| [Checkbox](./checkbox)                     | основной              | Чекбокс                      |
| [CheckboxField](./checkbox-field)          | основной              | Чекбокс с label/hint         |
| [CheckboxCard](./checkbox-card)            | основной              | Чекбокс в карточке           |
| [SiteInput](./site-input)                  | основной              | URL с выбором протокола      |
| [ShareLinkInput](./share-link-input)       | основной              | Ссылка с кнопкой копирования |
| [DateInput](./date-input)                  | `@v-lab/ui-kit/date`  | Дата с маской (IMask)        |
| [PhoneInput](./phone-input)                | `@v-lab/ui-kit/phone` | Телефон с флагом страны      |

Опциональные entry points требуют установки дополнительных peer-зависимостей — см. [Optional entries](../optional-entries).

## Архитектура

```
InputField (label + wrapper + hint/error)
└── BaseInput (нативный <input>) — для текстовых полей
└── кастомный контрол (Select, Checkbox, Tags…)
```

Каждое поле: `forwardRef<HTMLInputElement, MyInputProps>`. Пропсы `label`, `hint`, `error`, `prefix`, `suffix`, `size`, `disabled` — всегда у `InputField`.

→ Подробно: [InputField](./input-field) · паттерн инпутов — `docs/architecture/inputs.md` в репозитории
