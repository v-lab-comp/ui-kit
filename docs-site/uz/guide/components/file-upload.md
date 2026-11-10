---
title: FileUpload
description: Fayl yuklash maydoni — FileUploadField / FileUploadItem.
---

# FileUpload

**`FileUploadField`** komponenti: drop zonasi, fayllar ro‘yxati, storisda progress simulyatsiyasi.

## Preview

<ComponentDocsPreview name="fileUpload" />

## Import

```tsx
import { FileUploadField, type UploadFile } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { FileUploadField, type UploadFile } from '@v-lab/ui-kit'

export function DocumentsUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])

  return (
    <FileUploadField
      label="Hujjatlarni yuklash"
      required
      multiple
      accept=".pdf,.doc,.docx"
      initialFiles={files}
      onFilesChange={(next) => setFiles(next)}
    />
  )
}
```

## Asosiy proplar (`FileUploadField`)

| Prop                | Tip                                                        | Tavsif                                                                                  |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `label`             | `string`                                                   | Yuklash zonasi yorlig‘i                                                                 |
| `required`          | `boolean`                                                  | Majburiy maydon                                                                         |
| `accept`            | `string`                                                   | input **`accept`** (MIME / kengaytmalar)                                                |
| `maxSize`           | `number`                                                   | Fayl hajmi limiti (**baytlarda**); limitdan oshsa → `error` statusi                     |
| `multiple`          | `boolean`                                                  | Bir nechta fayl (standart `true`)                                                       |
| `size`              | `default` \| `compact`                                     | Zona o‘lchami (**`FileDropZone`**)                                                      |
| `texts`             | **`FileUploadTexts`**                                      | Barcha ko‘rinadigan matnlar (ko‘p tillilik); standart — **`DEFAULT_FILE_UPLOAD_TEXTS`** |
| `initialFiles`      | **`UploadFile[]`**                                         | Maydon holatining boshlang‘ich fayl ro‘yxati                                            |
| `onFilesChange`     | `(uploadFiles: UploadFile[], nativeFiles: File[]) => void` | Ro‘yxat yangilandi (ikkinchi argument — **`FormData` uchun `File[]`**)                  |
| `className`         | `string`                                                   | Maydon konteyner sinfi                                                                  |
| `dropZoneClassName` | `string`                                                   | Drop zona sinfi                                                                         |

To‘liq tip — **`FileUploadFieldProps`**. Fayl metama’lumoti — **`UploadFile`** tipi.

## Ko‘p tillilik

Barcha ko‘rinadigan matnlar `texts` orqali beriladi. Berilmagan kalitlar **`DEFAULT_FILE_UPLOAD_TEXTS`** (RU) dan olinadi.

```tsx
<FileUploadField
  label="Hujjat"
  accept="image/jpeg,image/png,application/pdf"
  maxSize={2 * 1024 * 1024}
  texts={{
    title: 'Faylni tanlang yoki shu yerga tashlang',
    subtitle: 'JPEG, PNG, PDF format 2 MB gacha.',
    button: 'Fayl yuklash',
    uploading: 'Yuklanmoqda...',
    done: 'Tayyor',
    error: 'Xatolik',
    download: 'Faylni yuklab olish',
    remove: 'Faylni o‘chirish',
  }}
/>
```

`FileUploadTexts` kalitlari: `title`, `subtitle`, `button`, `uploading`, `done`, `error`, `download`, `remove`, `ofLabel`.

## Boshqa eksportlar

| Eksport                        | Vazifasi                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| **`FileUploadItem`**           | Ro‘yxatdagi fayl qatori (**`FileUploadField`** tarkibi)                             |
| **`FileDropZone`**             | Drag-and-drop zonasi (**`FileUploadField`** ichida; maxsus razmetka yig‘ish mumkin) |
| **`formatFileSize`**           | Yozuvlar uchun hajm formatlash                                                      |
| **`fileToUploadFile`**         | **`File`** → **`UploadFile`** boshlang‘ich holat uchun                              |
| **`uploadFilesToNativeFiles`** | **`UploadFile[]`** → **`File[]`** (masalan \*\*`FormData` uchun)                    |

Tiplar: **`FileDropZoneProps`**, **`FileDropZoneSize`**, **`FileUploadFilesChangeHandler`** va boshqalar — **`src/components/FileUpload/`** eksportiga qarang.

Manbalar: `src/components/FileUpload/`.
