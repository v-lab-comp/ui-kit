/**
 * Скачивание файла через временную ссылку `<a download>`.
 * Прямой `url` открывается в новой вкладке (браузер может проигнорировать `download`
 * для чужого origin); `File`/`Blob` скачивается через временный blob-URL.
 * Ничего не делает, если нет ни `url`, ни `blob`.
 */
export function downloadFile({
  url,
  blob,
  fileName,
}: {
  url?: string | null
  blob?: Blob | null
  fileName: string
}): void {
  const a = document.createElement('a')
  a.download = fileName
  if (url) {
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
    return
  }
  if (!blob) return
  const blobUrl = URL.createObjectURL(blob)
  a.href = blobUrl
  a.click()
  URL.revokeObjectURL(blobUrl)
}
