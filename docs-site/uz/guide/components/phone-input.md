---
title: PhoneInput
description: Xalqaro formatda telefon — entry @v-lab/ui-kit/phone.
---

# PhoneInput

**`libphonenumber-js`** va **`react-phone-number-input`** talab qilinadi. Import **`@v-lab/ui-kit/phone`**.

**`completed`** / **`completedColor`** — o‘rama va davlat **`SelectInput`** (**`startBlock`**) uchun; **[InputField](/uz/guide/components/input-field#input-completed)**.

## Preview

<ComponentDocsPreview name="phoneInput" />

## Import

```tsx
import { PhoneInput } from '@v-lab/ui-kit/phone'
```

Peer’lar haqida — [O‘rnatish](/uz/guide/installation).

## Misol

**`value`** qiymati **E.164** formatida (masalan `+998901234567`).

```tsx
import { useState } from 'react'
import { PhoneInput } from '@v-lab/ui-kit/phone'

export function PhoneField() {
  const [value, setValue] = useState('')
  return <PhoneInput label="Telefon" value={value} onChange={setValue} defaultCountry="UZ" />
}
```

## Qiymat va mamlakat

- **`onChange`** har doim **E.164** yoki bo‘sh maydon uchun `""` qaytaradi.
- **E.164 bo‘lmagan `value`** (`901234567`, `+998-901234567`, `+998 90 123-45-67`) to‘g‘ri ko‘rsatiladi, lekin **`onChange` chaqirilmaydi** — forma dirty bo‘lmaydi. Tahlil qilib bo‘lmaydigan qiymat — bo‘sh maydon.
- **Tashqi `value` o‘zgarishi** (forma `reset`, drawer boshqa yozuv uchun qayta ochilishi) mamlakatni raqamdan oladi, agar u **`countries`** da bo‘lsa. Bo‘sh qiymat mamlakatni tashlab yubormaydi.
- **To‘liq raqamni qo‘yish** (`+998 90 123 45 67`, `998901234567`, `+7 912 345 67 89`) maydonni almashtiradi va mamlakatni o‘zgartiradi.
- **Foydalanuvchi mamlakatni o‘zgartirsa**, raqam tozalanadi.

**react-hook-form** bilan montajdan keyin `reset()` orqali kelgan qiymat to‘g‘ri mamlakat bilan ko‘rsatiladi:

```tsx
const { field } = useController({ name: 'phone', control })
<PhoneInput label="Telefon" value={field.value} onChange={field.onChange} />
```

## Asosiy proplar

To‘liq tip — **`PhoneInputProps`**: **`InputField`** + **`value`** / **`onChange`** da **E.164**, **`defaultCountry`**, **`countries`**, **`locale`**, **`countryAriaLabel`**, … Qarang **`PhoneInput.types.ts`**. **`InputField`** proplari (**`endBlock`**, **`wrapperClassName`**, **`wrapperStyle`**, …) maydon qobig‘iga tushadi; **`startBlock`** mamlakat tanlovi uchun band.

### Foydalanish imkoniyati

Mamlakat tanlovi — **[SelectInput](./select-input)** kabi klaviatura va qidiruvli **combobox**. Uning nomi: **`countryAriaLabel`**, aks holda maydon **`label`** i (**`aria-labelledby`** orqali), **`label`** bo‘lmasa — tanlangan mamlakat nomi.

Manbalar: `src/components/inputs/PhoneInput/`.
