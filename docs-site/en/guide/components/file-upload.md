---
title: FileUpload
description: File upload field — FileUploadField / FileUploadItem.
---

# FileUpload

**`FileUploadField`**: drop zone, file list, progress simulation in stories.

## Preview

<ComponentDocsPreview name="fileUpload" />

## Import

```tsx
import { FileUploadField, type UploadFile } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { FileUploadField, type UploadFile } from '@v-lab/ui-kit'

export function DocumentsUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])

  return (
    <FileUploadField
      label="Upload documents"
      required
      multiple
      accept=".pdf,.doc,.docx"
      initialFiles={files}
      onFilesChange={(next) => setFiles(next)}
    />
  )
}
```

## Main props (`FileUploadField`)

| Prop                | Type                                                       | Description                                                            |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `label`             | `string`                                                   | Upload zone label                                                      |
| `required`          | `boolean`                                                  | Required field                                                         |
| `accept`            | `string`                                                   | **`accept`** on the input (MIME / extensions)                          |
| `maxSize`           | `number`                                                   | File size limit in **bytes**; over the limit → `error` status          |
| `multiple`          | `boolean`                                                  | Multiple files (`true` by default)                                     |
| `size`              | `default` \| `compact`                                     | Zone size (**`FileDropZone`**)                                         |
| `texts`             | **`FileUploadTexts`**                                      | All visible strings (i18n); defaults — **`DEFAULT_FILE_UPLOAD_TEXTS`** |
| `initialFiles`      | **`UploadFile[]`**                                         | Initial file list in field state                                       |
| `onFilesChange`     | `(uploadFiles: UploadFile[], nativeFiles: File[]) => void` | List updated (second arg — **`File[]` for `FormData`**)                |
| `className`         | `string`                                                   | Field container class                                                  |
| `dropZoneClassName` | `string`                                                   | Drop zone class                                                        |

Full type — **`FileUploadFieldProps`**. File metadata — **`UploadFile`**.

## Internationalization

All visible strings are set via `texts`. Missing keys fall back to **`DEFAULT_FILE_UPLOAD_TEXTS`** (RU).

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

`FileUploadTexts` keys: `title`, `subtitle`, `button`, `uploading`, `done`, `error`, `download`, `remove`, `ofLabel`.

## Other exports

| Export                         | Role                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------- |
| **`FileUploadItem`**           | File row in the list (part of **`FileUploadField`**)                         |
| **`FileDropZone`**             | Drag-and-drop zone (used inside **`FileUploadField`**; build custom layouts) |
| **`formatFileSize`**           | Size formatting for labels                                                   |
| **`fileToUploadFile`**         | **`File`** → **`UploadFile`** for initial state                              |
| **`uploadFilesToNativeFiles`** | **`UploadFile[]`** → **`File[]`** (e.g. for **`FormData`**)                  |

Types: **`FileDropZoneProps`**, **`FileDropZoneSize`**, **`FileUploadFilesChangeHandler`**, etc. — see **`src/components/FileUpload/`** exports.

Sources: `src/components/FileUpload/`.
