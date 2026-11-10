/**
 * URL worker'а pdf.js той же версии, что и `pdfjs` из react-pdf.
 * Как в edoc-front-v2 (`shared/config/pdfWorker`): unpkg + `.mjs` — обход проблем с MIME у статики.
 */
export function getPdfWorkerUrl(version: string): string {
  return `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`
}
