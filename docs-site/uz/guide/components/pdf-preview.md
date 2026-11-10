---
title: PdfPreview
description: react-pdf / pdf.js orqali PDF preview — alohida entry @v-lab/ui-kit/pdf.
---

# PdfPreview

**`react-pdf`** va **`pdfjs-dist`** peer-bog‘liqliklarini talab qiladi. Import **`@v-lab/ui-kit/pdf`**. pdf.js worker uchun shu entry dan **`getPdfWorkerUrl`** ishlating (komponentda ham shunday).

## Preview

<ComponentDocsPreview name="pdfPreview" />

## Import va entry eksportlari

**`@v-lab/ui-kit/pdf`** kirish nuqtasi modulning barcha ochiq API sini eksport qiladi:

| Eksport               | Nima                                                                                                                                                                                                                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`PdfPreview`**      | Preview komponenti                                                                                                                                                                                                                                                                                 |
| **`PdfPreviewProps`** | Prop turlari                                                                                                                                                                                                                                                                                       |
| **`getPdfWorkerUrl`** | `(version: string) => string` — **`react-pdf`** / **`pdfjs`** bilan bir xil versiyadagi pdf.js worker URL. **`PdfPreview`** modul yuklanganda worker allaqachon sozlanadi; ilovada alohida **`pdfjs.GlobalWorkerOptions`** sozlasangiz va ui-kit bilan bir xil manbani xohlasa, bu funksiya kerak. |

```tsx
import { PdfPreview, getPdfWorkerUrl, type PdfPreviewProps } from '@v-lab/ui-kit/pdf'
```

Peer’lar haqida batafsil — [O‘rnatish](/uz/guide/installation).

## Misol

Hujjat manbai — **`file`** yoki **`fileUrl`** (odatda bittasini berishadi). **`fileName`** majburiy — nishonda yozuv va yuklashda fayl nomi.

```tsx
import { PdfPreview } from '@v-lab/ui-kit/pdf'

export function AttachmentPreview({ file }: { file: File }) {
  return <PdfPreview file={file} fileName={file.name} />
}
```

To‘g‘ri CORS sarlavhalarisiz tashqi PDF brauzerda yuklanmasligi mumkin — prod’da o‘z hosting yoki proxy afzal.

## Proplar (`PdfPreview`)

Ochiq shartnoma ixcham — **`scale`** kabi qo‘shimcha proplar API da **yo‘q**.

| Prop           | Tip                      | Majburiy | Tavsif                                          |
| -------------- | ------------------------ | -------- | ----------------------------------------------- |
| **`fileName`** | `string`                 | ha       | UI va yuklashda fayl nomi                       |
| **`file`**     | `File`                   | yo‘q     | `<input type="file">` yoki Drag-and-Drop dan    |
| **`fileUrl`**  | `string`                 | yo‘q     | PDF URL (bir xil origin yoki CORS ruxsatli URL) |
| **`onError`**  | `(error: Error) => void` | yo‘q     | Yuklash yoki tahlil xatosi                      |

Ikkalasi berilsa, yuklash **`file`** dan ketadi (**`PdfPreview.tsx`** dagi effektga qarang).

### Masshtab va sahifalar

Sahifalararo (oldingi/keyingi) va sahifa hisoblagichi komponentga kirilgan. **Canvas render masshtab** komponent **ichida** konstanta bilan belgilanadi (yuqori zichlikli ekranlar uchun), alohida **`scale`** propi **hozircha yo‘q** — bu hujjat kamchiligi emas, API ning joriy cheklovi.

Manbalar: `src/components/PdfPreview/` · tiplar — **`PdfPreview.types.ts`**.
