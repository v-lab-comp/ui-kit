export interface PdfPreviewProps {
  file?: File
  fileUrl?: string
  fileName: string
  onError?: (error: Error) => void
}
