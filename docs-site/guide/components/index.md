---
title: Компоненты
description: Документация по компонентам V-Lab UI Kit — дерево как в Storybook (Calendar, Components, Inputs, Layout, Overlays).
---

# Компоненты

Страницы с **живым превью** и теми же сценариями, что в **`npm run storybook`**.

Как этот сайт соотносится со Storybook и с файлами в репозитории — см. [**Об этой документации**](../documentation).

**Боковое меню** этого раздела повторяет папки Storybook:

| Папка Storybook | Что здесь                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Calendar**    | [Calendar](./calendar) — календарная сетка месяца                                                                                            |
| **Components**  | Accordion … Typography, вложенная ветка **Comments**, [FileUpload](./file-upload), [PdfPreview](./pdf-preview) и др. — см. список в сайдбаре |
| **Inputs**      | [Поля ввода](./inputs/) — Checkbox, [BaseInput](./base-input), [BaseCheckbox](./base-checkbox)                                               |
| **Layout**      | [Drawer](./drawer), [Layout](./layout), [PageHeader](./page-header)                                                                          |
| **Overlays**    | [ConfirmModal](./confirm-modal), [Modal](./modal), [Popover](./popover), [Tooltip](./tooltip)                                                |

Плюс **[UiKitRoot](./uikit-root)** — обёртка рут-слоя (отдельной ветки в Storybook нет).

Галереи по размерам и прочие обзорные сетки остаются в Storybook (**Gallery/**) и на странице [Поля ввода — галерея](./inputs/).

Публичные **хуки** — в разделе [Хуки](/guide/hooks/).

Подключение пакета — в [Установке](/guide/installation).

---

## Все компоненты

### Calendar

| Компонент | Страница               |
| --------- | ---------------------- |
| Calendar  | [calendar](./calendar) |

### Display (Components)

| Компонент                          | Страница                                                                           |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| Accordion                          | [accordion](./accordion)                                                           |
| Avatar / AvatarCard / AvatarGroup  | [avatar](./avatar) / [avatar-card](./avatar-card) / [avatar-group](./avatar-group) |
| Badge                              | [badge](./badge)                                                                   |
| Box                                | [box](./box)                                                                       |
| Breadcrumbs                        | [breadcrumbs](./breadcrumbs)                                                       |
| Button                             | [button](./button)                                                                 |
| ButtonGroup                        | [button-group](./button-group)                                                     |
| CommentRichInput / CommentsSection | [comments/](./comments/)                                                           |
| ContentDivider                     | [content-divider](./content-divider)                                               |
| FileUpload                         | [file-upload](./file-upload)                                                       |
| LanguageSwitcher                   | [language-switcher](./language-switcher)                                           |
| PdfPreview _(entry: `/pdf`)_       | [pdf-preview](./pdf-preview)                                                       |
| Table                              | [table](./table)                                                                   |
| Tag                                | [tag](./tag)                                                                       |
| Tabs                               | [tabs](./tabs)                                                                     |
| Toast                              | [toast](./toast)                                                                   |
| Typography                         | [typography](./typography)                                                         |

### Inputs

| Компонент                               | Страница                                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| AsyncSearchSelect                       | [async-search-select](./async-search-select)                                                   |
| BaseCheckbox                            | [base-checkbox](./base-checkbox)                                                               |
| BaseInput                               | [base-input](./base-input)                                                                     |
| Checkbox / CheckboxCard / CheckboxField | [checkbox](./checkbox) / [checkbox-card](./checkbox-card) / [checkbox-field](./checkbox-field) |
| DateInput _(entry: `/date`)_            | [date-input](./date-input)                                                                     |
| EmailInput                              | [email-input](./email-input)                                                                   |
| InputField                              | [input-field](./input-field)                                                                   |
| PasswordInput                           | [password-input](./password-input)                                                             |
| PhoneInput _(entry: `/phone`)_          | [phone-input](./phone-input)                                                                   |
| SearchInput                             | [search-input](./search-input)                                                                 |
| SelectInput                             | [select-input](./select-input)                                                                 |
| ShareLinkInput                          | [share-link-input](./share-link-input)                                                         |
| SiteInput                               | [site-input](./site-input)                                                                     |
| TagInput                                | [tag-input](./tag-input)                                                                       |
| TextInput                               | [text-input](./text-input)                                                                     |
| Обзор & галерея                         | [inputs/](./inputs/)                                                                           |

### Layout

| Компонент                           | Страница                                          |
| ----------------------------------- | ------------------------------------------------- |
| **Drawer**                          | [drawer](./drawer)                                |
| Header / PageHeader                 | [layout](./layout) / [page-header](./page-header) |
| Sidebar / SidebarInset / LayoutRoot | [layout](./layout)                                |

### Overlays

| Компонент    | Страница                         |
| ------------ | -------------------------------- |
| ConfirmModal | [confirm-modal](./confirm-modal) |
| Modal        | [modal](./modal)                 |
| Popover      | [popover](./popover)             |
| Tooltip      | [tooltip](./tooltip)             |

### Прочее

| Компонент | Страница                   |
| --------- | -------------------------- |
| UiKitRoot | [uikit-root](./uikit-root) |

---

> **Optional entry points** (DateInput, PhoneInput, PdfPreview, RHF adapters) — см. [Установка](/guide/installation) и [Optional entries](/guide/optional-entries).
