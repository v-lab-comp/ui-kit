---
title: CheckboxField
description: Чекбокс с подписью, подсказкой и ошибкой — паттерн как у текстовых полей.
---

# CheckboxField

Обёртка **`InputField`** + **`Checkbox`**: **`label`**, **`hint`**, **`error`**, размеры **`CHECKBOX_SIZE_OPTIONS`**.

## Превью

<ComponentDocsPreview name="checkboxField" />

## Импорт

```tsx
import { CheckboxField } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { CheckboxField } from '@v-lab/ui-kit'

export function TermsField() {
  return <CheckboxField label="Я принимаю условия" name="terms" hint="Текст подсказки под полем." />
}
```

## Основные пропсы

| Проп             | Тип                             | По умолчанию | Описание                                    |
| ---------------- | ------------------------------- | ------------ | ------------------------------------------- |
| `label`          | `string`                        | —            | Подпись рядом с чекбоксом                   |
| `hint`           | `string`                        | —            | Подсказка под полем; скрывается при `error` |
| `error`          | `string`                        | —            | Сообщение об ошибке; перекрывает `hint`     |
| `sublabel`       | `string`                        | —            | Вторичный текст под основной подписью       |
| `description`    | `string`                        | —            | Описание ниже подписи (светлый цвет)        |
| `link`           | `ReactNode`                     | —            | Ссылка рядом с label                        |
| `flip`           | `boolean`                       | `false`      | `true` — чекбокс справа от текста           |
| `disabled`       | `boolean`                       | `false`      | Заблокировано                               |
| `checked`        | `boolean`                       | —            | Контролируемое состояние                    |
| `defaultChecked` | `boolean`                       | —            | Начальное состояние (uncontrolled)          |
| `onChange`       | `ChangeEvent<HTMLInputElement>` | —            | Обработчик изменения                        |
| `size`           | `'big' \| 'medium' \| 'small'`  | `'medium'`   | Размер чекбокса                             |
| `tag`            | `ReactNode`                     | —            | Элемент-метка рядом с label (Badge, Tag)    |

### CheckboxCard

Вариант с рамкой вокруг всего поля — `CheckboxCard`:

```tsx
import { CheckboxCard } from '@v-lab/ui-kit'
;<CheckboxCard
  label="Подписаться на рассылку"
  description="Получать обновления на email."
  hint="Можно отменить в любое время."
/>
```

`CheckboxCard` принимает те же пропы, что `CheckboxField`. Отличие — визуальная обёртка с рамкой и акцентом при `checked`.

## Примеры

### Состояния

```tsx
// Default
<CheckboxField label="Agree to terms" hint="Required to continue." />

// Checked
<CheckboxField label="Checked" defaultChecked />

// Error
<CheckboxField label="Accept privacy policy" error="You must accept the policy." />

// Disabled
<CheckboxField label="Cannot change" hint="This field is locked." disabled />

// With description and link
<CheckboxField
  label="Marketing emails"
  description="Receive product updates and promotions."
  link={<a href="#">Privacy policy</a>}
/>
```

Исходники: `src/components/inputs/Checkbox/CheckboxField/` · `Checkbox.types.ts`.
