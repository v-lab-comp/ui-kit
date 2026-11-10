---
title: PdfPreview
description: PDF preview via react-pdf / pdf.js — separate entry @v-lab/ui-kit/pdf.
---

# PdfPreview

Requires peers **`react-pdf`** and **`pdfjs-dist`**. Import from **`@v-lab/ui-kit/pdf`**. For the pdf.js worker use **`getPdfWorkerUrl`** from the same entry (as in the component).

## Preview

<ComponentDocsPreview name="pdfPreview" />

## Import and entry exports

**`@v-lab/ui-kit/pdf`** re-exports the public API of this module:

| Export                | What it is                                                                                                                                                                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`PdfPreview`**      | Preview component                                                                                                                                                                                                                                                           |
| **`PdfPreviewProps`** | Props type                                                                                                                                                                                                                                                                  |
| **`getPdfWorkerUrl`** | `(version: string) => string` — pdf.js worker URL for the same version as **`react-pdf`** / **`pdfjs`**. Inside **`PdfPreview`** the worker is configured on load; use this if you configure **`pdfjs.GlobalWorkerOptions`** separately and want the same source as ui-kit. |

```tsx
import { PdfPreview, getPdfWorkerUrl, type PdfPreviewProps } from '@v-lab/ui-kit/pdf'
```

Peer details — [Installation](/en/guide/installation).

## Example

Document source — either **`file`** or **`fileUrl`** (usually one). **`fileName`** is required — badge label and download name.

```tsx
import { PdfPreview } from '@v-lab/ui-kit/pdf'

export function AttachmentPreview({ file }: { file: File }) {
  return <PdfPreview file={file} fileName={file.name} />
}
```

External PDFs without proper CORS headers may fail in the browser — prefer same-origin hosting or a proxy in production.

## Props (`PdfPreview`)

The public API is small — no extra props like **`scale`**.

| Prop           | Type                     | Required | Description                                         |
| -------------- | ------------------------ | -------- | --------------------------------------------------- |
| **`fileName`** | `string`                 | yes      | Name in UI and when downloading                     |
| **`file`**     | `File`                   | no       | File from `<input type="file">` or drag-and-drop    |
| **`fileUrl`**  | `string`                 | no       | PDF URL (same origin or CORS-enabled URL preferred) |
| **`onError`**  | `(error: Error) => void` | no       | Load or parse error                                 |

If both **`file`** and **`fileUrl`** are set, load uses **`file`** (see effect in **`PdfPreview.tsx`**).

### Scale and pages

Built-in prev/next page and page counter. **Canvas render scale** is fixed inside the component (for clarity on high-DPI screens); there is **no** **`scale`** prop — that is the current API, not a docs omission.

Sources: `src/components/PdfPreview/` · **`PdfPreview.types.ts`**.
