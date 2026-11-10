import type { CSSProperties } from 'react'
import { PdfPreview } from '@/pdf'

/** Тот же путь, что и в Storybook — `public/sample.pdf` у корня репозитория и копия в `docs-site/public` для VitePress. */
const SAMPLE_PDF_URL = '/sample.pdf'

const shell: CSSProperties = {
  width: '100%',
  maxWidth: 560,
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

export function PdfPreviewDocsDemo() {
  return (
    <div style={shell}>
      <PdfPreview fileUrl={SAMPLE_PDF_URL} fileName="sample.pdf" />
    </div>
  )
}
