import { useState } from 'react'
import { FileUploadField } from '@/components/FileUpload'
import type { UploadFile } from '@/components/FileUpload'

export function FileUploadDocsDemo() {
  const [files, setFiles] = useState<UploadFile[]>([])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 560,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <FileUploadField
        label="Загрузить документы"
        required
        multiple
        initialFiles={files}
        onFilesChange={setFiles}
      />
    </div>
  )
}
