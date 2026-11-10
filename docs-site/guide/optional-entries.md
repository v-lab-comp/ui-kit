---
title: Optional entry points
description: Отдельные subpath imports для компонентов с тяжёлыми peer deps — DateInput, PhoneInput, PdfPreview, RHF adapters.
---

# Optional entry points

Четыре компонента вынесены в отдельные **subpath exports** чтобы не тянуть их тяжёлые peer deps в основной bundle приложений, которые их не используют.

| Entry                    | Компоненты                                               | Peer deps (установить отдельно)                          |
| ------------------------ | -------------------------------------------------------- | -------------------------------------------------------- |
| `@v-lab/ui-kit/date`     | **`DateInput`**                                          | `imask ^7`, `react-imask ^7`                             |
| `@v-lab/ui-kit/phone`    | **`PhoneInput`**                                         | `libphonenumber-js ^1.11`, `react-phone-number-input ^3` |
| `@v-lab/ui-kit/pdf`      | **`PdfPreview`**, `getPdfWorkerUrl`                      | `react-pdf ^7`, `pdfjs-dist`                             |
| `@v-lab/ui-kit/adapters` | **`RHFTextInput`**, **`RHFTagInput`**, **`RHFCheckbox`** | `react-hook-form ^7`                                     |

## Установка

### DateInput

```bash
npm install imask react-imask
```

```tsx
import { DateInput } from '@v-lab/ui-kit/date'
```

### PhoneInput

```bash
npm install libphonenumber-js react-phone-number-input
```

```tsx
import { PhoneInput } from '@v-lab/ui-kit/phone'
```

### PdfPreview

```bash
npm install react-pdf pdfjs-dist
```

```tsx
import { PdfPreview, getPdfWorkerUrl } from '@v-lab/ui-kit/pdf'
```

Для корректной работы PDF.js необходимо настроить worker:

```tsx
import { getPdfWorkerUrl } from '@v-lab/ui-kit/pdf'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = getPdfWorkerUrl()
```

### RHF Adapters

```bash
npm install react-hook-form
```

```tsx
import { RHFTextInput, RHFTagInput, RHFCheckbox } from '@v-lab/ui-kit/adapters'
```

## Зачем это нужно

Вместо одного большого бандла (`@v-lab/ui-kit`) приложения тянут только те зависимости, которые реально используют:

- Проект без дат не устанавливает `imask`
- Проект без телефонов не устанавливает `libphonenumber-js` (≈ 2 MB)
- Проект без PDF не устанавливает `react-pdf` + `pdfjs-dist` (≈ 8+ MB)

## Storybook

Интерактивные примеры адаптеров — `npm run storybook` → **Adapters/**.

Примеры DateInput, PhoneInput, PdfPreview — соответствующие страницы в разделе **Inputs** / **Components**.
