---
title: PhoneInput
description: Телефон с международным форматом — entry @v-lab/ui-kit/phone.
---

# PhoneInput

Требует **`libphonenumber-js`** и **`react-phone-number-input`**. Импорт из **`@v-lab/ui-kit/phone`**.

При **`completed`** / **`completedColor`** акцент на оболочке поля и на селекторе страны (**SelectInput** в **`startBlock`**); см. **[InputField](./input-field#input-completed)**.

## Превью

<ComponentDocsPreview name="phoneInput" />

## Импорт

```tsx
import { PhoneInput } from '@v-lab/ui-kit/phone'
```

Подробности peers — в [Установке](/guide/installation).

## Пример

Значение в **`value`** — в формате **E.164** (например `+998901234567`).

```tsx
import { useState } from 'react'
import { PhoneInput } from '@v-lab/ui-kit/phone'

export function PhoneField() {
  const [value, setValue] = useState('')
  return (
    <PhoneInput
      label="Телефон"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      defaultCountry="UZ"
    />
  )
}
```

## Значение и страна

- **`onChange`** всегда отдаёт **E.164** либо `""` для пустого поля.
- **`value` не в E.164** (`901234567`, `+998-901234567`, `+998 90 123-45-67`) показывается корректно, но **`onChange` не вызывается** — форма не становится dirty. Неразбираемое значение — пустое поле.
- **Внешняя смена `value`** (`reset` формы, переоткрытие дровера для другой записи) берёт страну из номера, если она есть в **`countries`**. Пустое значение страну не сбрасывает.
- **Вставка полного номера** (`+998 90 123 45 67`, `998901234567`, `+7 912 345 67 89`) заменяет поле и переключает страну.
- **Смена страны пользователем** очищает номер.

С **react-hook-form** значение, пришедшее через `reset()` после монтирования, отображается с правильной страной:

```tsx
const { field } = useController({ name: 'phone', control })
<PhoneInput label="Телефон" value={field.value} onChange={field.onChange} />
```

## Устройство пропсов

Импорт из **`@v-lab/ui-kit/phone`**. Оболочка — **[InputField](./input-field)**; значение телефона — в формате **E.164** (например **`+998901234567`**).

| Проп                             | Тип                            | Описание                                                |
| -------------------------------- | ------------------------------ | ------------------------------------------------------- |
| **`value`** / **`defaultValue`** | `string`                       | Номер в **E.164** (другие форматы нормализуются)        |
| **`onChange`**                   | `ChangeEventHandler`           | В **`event.target.value`** — строка **E.164**           |
| **`name`**                       | `string`                       | Имя поля в форме                                        |
| **`size`**                       | **`BaseInputSize`**            | Высота поля (**`big`** \| **`medium`** \| **`small`**)  |
| **`placeholder`**                | `string`                       | Плейсхолдер маски                                       |
| **`defaultCountry`**             | **`CountryCode`**              | Код страны по умолчанию (ISO, напр. **`UZ`**, **`RU`**) |
| **`countries`**                  | **`CountryCode[]`**            | Ограничить список стран в выпадающем флаге              |
| **`locale`**                     | **`'ru'` \| `'en'` \| `'uz'`** | Язык названий стран (по умолчанию **`ru`**)             |

Остальные атрибуты — см. **`PhoneInput.types.ts`** (наследование без дублирования **`value`** / **`onChange`** из обычного input там, где задано явно).

### Полный тип

**`PhoneInputProps`** — **`PhoneInput.types.ts`**.

Исходники: `src/components/inputs/PhoneInput/`.
