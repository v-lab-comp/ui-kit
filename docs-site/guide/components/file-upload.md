---
title: FileUpload
description: Поле загрузки файлов — FileUploadField / FileUploadItem.
---

# FileUpload

Компонент **`FileUploadField`**: зона drop, список файлов, симуляция прогресса в сторис.

## Превью

<ComponentDocsPreview name="fileUpload" />

## Импорт

```tsx
import { FileUploadField, type UploadFile } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { FileUploadField, type UploadFile } from '@v-lab/ui-kit'

export function DocumentsUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])

  return (
    <FileUploadField
      label="Загрузить документы"
      required
      multiple
      accept=".pdf,.doc,.docx"
      initialFiles={files}
      onFilesChange={(next) => setFiles(next)}
    />
  )
}
```

## Основные пропсы (`FileUploadField`)

| Проп                | Тип                                                        | Описание                                                                        |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `label`             | `string`                                                   | Подпись зоны загрузки                                                           |
| `required`          | `boolean`                                                  | Обязательное поле                                                               |
| `accept`            | `string`                                                   | Атрибут **`accept`** у input (MIME / расширения)                                |
| `maxSize`           | `number`                                                   | Лимит размера файла в **байтах**; сверх лимита → статус `error`                 |
| `multiple`          | `boolean`                                                  | Несколько файлов (`true` по умолчанию)                                          |
| `size`              | `default` \| `compact`                                     | Размер зоны (**`FileDropZone`**)                                                |
| `texts`             | **`FileUploadTexts`**                                      | Все видимые строки (мультиязычность); дефолты — **`DEFAULT_FILE_UPLOAD_TEXTS`** |
| `initialFiles`      | **`UploadFile[]`**                                         | Начальный список файлов в состоянии поля                                        |
| `onFilesChange`     | `(uploadFiles: UploadFile[], nativeFiles: File[]) => void` | Список обновился (второй аргумент — **`File[]` для FormData**)                  |
| `className`         | `string`                                                   | Класс контейнера поля                                                           |
| `dropZoneClassName` | `string`                                                   | Класс зоны drop                                                                 |

Полный тип — **`FileUploadFieldProps`**. Метаданные файла — тип **`UploadFile`**.

## Мультиязычность

Все видимые строки задаются через `texts`. Незаданные ключи берутся из **`DEFAULT_FILE_UPLOAD_TEXTS`** (RU).

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

Ключи `FileUploadTexts`: `title`, `subtitle`, `button`, `uploading`, `done`, `error`, `download`, `remove`, `ofLabel`.

## Другие экспорты

| Экспорт                        | Назначение                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| **`FileUploadItem`**           | Строка файла в списке (часть состава **`FileUploadField`**)                                       |
| **`FileDropZone`**             | Зона drag-and-drop (используется внутри **`FileUploadField`**; можно собирать кастомную разметку) |
| **`formatFileSize`**           | Форматирование размера для подписей                                                               |
| **`fileToUploadFile`**         | Перевод **`File`** → **`UploadFile`** для начального состояния                                    |
| **`uploadFilesToNativeFiles`** | **`UploadFile[]`** → **`File[]`** (например для **`FormData`**)                                   |

Типы: **`FileDropZoneProps`**, **`FileDropZoneSize`**, **`FileUploadFilesChangeHandler`** и др. — см. экспорт **`src/components/FileUpload/`**.

Исходники: `src/components/FileUpload/`.
