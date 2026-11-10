---
title: Kiritish maydonlari (Inputs)
description: InputField + BaseInput naqshi, komponentlar ro‘yxati, ixtiyoriy entry nuqtalari va o‘lchamlar bo‘yicha jonli galereya.
---

# Kiritish maydonlari (Inputs)

**`src/components/inputs/`** dagi barcha komponentlar bir xil tamoyil bo‘yicha yig‘iladi: **`InputField`** o‘ramasi (yorliq, maslahat, xato, prefiks/suffiks, o‘lcham) va ichki kontrol — ko‘pincha **`BaseInput`** yoki o‘z razmetkangiz (**`SelectInput`**, **`Checkbox`**, murakkab maydonlar).

Tuzilma Storybook **`Inputs/`** bilan bir xil: [**InputField**](/uz/guide/components/input-field) o‘ramasi, [**BaseInput**](/uz/guide/components/base-input), [**BaseCheckbox**](/uz/guide/components/base-checkbox), [Checkbox](/uz/guide/components/checkbox), [CheckboxCard](/uz/guide/components/checkbox-card), [CheckboxField](/uz/guide/components/checkbox-field), [DateInput](/uz/guide/components/date-input), [EmailInput](/uz/guide/components/email-input), [PasswordInput](/uz/guide/components/password-input), [PhoneInput](/uz/guide/components/phone-input), [SearchInput](/uz/guide/components/search-input), [SelectInput](/uz/guide/components/select-input), [AsyncSearchSelect](/uz/guide/components/async-search-select), [ShareLinkInput](/uz/guide/components/share-link-input), [SiteInput](/uz/guide/components/site-input), [TagInput](/uz/guide/components/tag-input), [TextInput](/uz/guide/components/text-input). Storybook’da **`FileUpload`** **`Components/`** da — [FileUpload](/uz/guide/components/file-upload).

## O‘z maydoningizni qanday yig‘ish

1. **`InputField`** va **`BaseInput`** (yoki boshqa primitiv) ni import qiling.
2. **`InputField`** ga **`children`** slotini **`(fieldId) => …`** funksiyasi sifatida bering va ichki kontrolning **`id`** sini **`fieldId`** ga uzating.
3. Xatoni **`InputField`** dagi **`error`** orqali ko‘rsating — chekka **`BaseInput`** dagi **`hasError`** bilan chiroqlanadi.

Qisqa karkas:

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

To‘liq shablon va qoidalar — repozitoriy **`CLAUDE.md`** va murakkab qiymatlar uchun [**useCompositeInput**](/uz/guide/hooks/use-composite-input).

## Asosiy paketdan nima eksport qilinadi

**`@v-lab/ui-kit`** dan import:

| Komponent / hook                                                                                         | Vazifasi                                                                                      |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [**BaseInput**](/uz/guide/components/base-input), [**BaseCheckbox**](/uz/guide/components/base-checkbox) | Yorliqsiz pastki kontrollar                                                                   |
| [**InputField**](/uz/guide/components/input-field)                                                       | O‘rama: label, hint, error, prefix/suffix, o‘lcham                                            |
| **`TextInput`**, **`EmailInput`**, **`PasswordInput`**, **`SearchInput`**                                | Standart bir qatorli maydonlar                                                                |
| **`SiteInput`**, **`ShareLinkInput`**                                                                    | Murakkab qatorlar (URL, havolalar)                                                            |
| **`SelectInput`**                                                                                        | Tushadigan ro‘yxat                                                                            |
| **`TagInput`**                                                                                           | Teg-chiplar: erkin yozish va ixtiyoriy takliflar ro‘yxati (API bilan ham)                     |
| **`AsyncSearchSelect`**                                                                                  | So‘rov bo‘yicha asinxron yuklanadigan ro‘yxat                                                 |
| **`Checkbox`**, **`CheckboxField`**, **`CheckboxCard`**                                                  | Belgilash qutichalari                                                                         |
| **`useCompositeInput`**                                                                                  | Murakkab qiymat va forma yashirin maydonlari — [hooklar](/uz/guide/hooks/use-composite-input) |

## Ixtiyoriy bog‘liqliklar (alohida entry)

Og‘ir peer’larni asosiy bundlga tortmaslik uchun:

| Entry                     | Komponent                                          |
| ------------------------- | -------------------------------------------------- |
| **`@v-lab/ui-kit/date`**  | **`DateInput`** (maska + taqvim)                   |
| **`@v-lab/ui-kit/phone`** | **`PhoneInput`**                                   |
| **`@v-lab/ui-kit/pdf`**   | **[PdfPreview](/uz/guide/components/pdf-preview)** |

Ulash va peer versiyalari — [O‘rnatish](/uz/guide/installation) va repozitoriy **`package.json`**.

## Avtotoldirish (`autoComplete`)

**[BaseInput](/uz/guide/components/base-input)** standart bo‘yicha **`autoComplete="off"`** — brauzer umumiy maydonlarga saqlangan qiymatlarni qo‘ymasin. Maxsus komponentlar: **[EmailInput](/uz/guide/components/email-input)** — **`email`**, **[PasswordInput](/uz/guide/components/password-input)** — **`current-password`**, **[PhoneInput](/uz/guide/components/phone-input)** — **`tel`**. **[DateInput](/uz/guide/components/date-input)** (**`/date`**) maskali maydon uchun standart **`off`**. O‘z **`autoComplete`** qiymatingiz bilan ustidan yozishingiz mumkin.

## Galereya

Uch ustun — o‘lchamlar (**big / medium / small**) va asosiy holatlar — Storybook **Gallery → Inputs** kabi. Panjara manbasi: **`src/docs/InputsGalleryPage.tsx`**.

<ComponentDocsPreview name="inputsGallery" />

Interaktiv boshqaruvlar va barcha variantlar — **`npm run storybook`**.
