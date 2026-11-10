import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiAttachment2 } from '@remixicon/react'
import type { pdfjs } from 'react-pdf'
import { contractPart } from '@/theme/contract'
import { pdfPreviewContract } from '@/theme/contracts/pdf-preview'
import type { PdfPreviewProps } from './PdfPreview.types'
import { getPdfWorkerUrl } from './pdfWorker'
import { downloadFile } from '@/utils/downloadFile'

type PdfJs = typeof pdfjs

let pdfJsPromise: Promise<PdfJs> | null = null

/**
 * `react-pdf` (pdf.js) грузится лениво — только в браузере, из эффекта: при импорте pdf.js
 * обращается к DOM (`DOMMatrix`), и статический импорт ронял SSR ещё на загрузке модуля.
 * Воркер задаётся, только если приложение не указало свой.
 */
const loadPdfJs = (): Promise<PdfJs> =>
  (pdfJsPromise ??= import('react-pdf').then(({ pdfjs: lib }) => {
    if (!lib.GlobalWorkerOptions.workerSrc) {
      lib.GlobalWorkerOptions.workerSrc = getPdfWorkerUrl(lib.version)
    }
    return lib
  })).catch((error: unknown) => {
    pdfJsPromise = null // следующая попытка загрузит заново
    throw error
  })

/** pdf.js VerbosityLevel.ERRORS — без «Indexing all PDF objects» в воркере на простых PDF. */
const PDF_VERBOSITY_ERRORS_ONLY = 0

export const PdfPreview = forwardRef<HTMLDivElement, PdfPreviewProps>(function PdfPreview(
  { file, fileUrl, fileName, onError },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pageRenderTaskRef = useRef<ReturnType<pdfjs.PDFPageProxy['render']> | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null)

  const onErrorRef = useRef(onError)
  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  /**
   * Load PDF document from file or URL.
   * Converts file to Uint8Array to avoid blob URL race conditions in React Strict Mode.
   */
  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        if (!file && !fileUrl) return
        const lib = await loadPdfJs()
        if (cancelled) return
        const task = file
          ? lib.getDocument({
              data: new Uint8Array(await file.arrayBuffer()),
              verbosity: PDF_VERBOSITY_ERRORS_ONLY,
            })
          : fileUrl
            ? lib.getDocument({ url: fileUrl, verbosity: PDF_VERBOSITY_ERRORS_ONLY })
            : null

        if (!task) return

        const doc = await task.promise
        if (cancelled) {
          void doc.destroy()
          return
        }

        setPdfDoc(doc)
        setTotalPages(doc.numPages)
        setPage(1)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to load PDF')
        if (!cancelled) {
          onErrorRef.current?.(err)
          setPdfDoc(null)
          setTotalPages(0)
        }
      }
    })()

    return () => {
      cancelled = true
      setPdfDoc((prev: pdfjs.PDFDocumentProxy | null) => {
        if (prev) void prev.destroy()
        return null
      })
      setTotalPages(0)
    }
  }, [file, fileUrl])

  /**
   * Render current page to canvas.
   */
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    let cancelled = false
    pageRenderTaskRef.current?.cancel()
    pageRenderTaskRef.current = null

    void pdfDoc.getPage(page).then((pdfPage: pdfjs.PDFPageProxy) => {
      if (cancelled) return

      const canvas = canvasRef.current
      if (!canvas) return

      const scale = 2
      const viewport = pdfPage.getViewport({ scale })

      canvas.width = viewport.width
      canvas.height = viewport.height

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const task = pdfPage.render({ canvasContext: ctx, viewport, canvas })
      pageRenderTaskRef.current = task
      void task.promise.catch(() => {
        /* отмена при смене страницы / Strict Mode */
      })
    })

    return () => {
      cancelled = true
      pageRenderTaskRef.current?.cancel()
      pageRenderTaskRef.current = null
    }
  }, [pdfDoc, page])

  const goPrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), [])
  const goNext = useCallback(() => setPage((p) => Math.min(totalPages, p + 1)), [totalPages])

  const handleDownload = useCallback(
    () => downloadFile({ url: fileUrl, blob: file, fileName }),
    [file, fileName, fileUrl]
  )

  // Счётчик «1/3» — уже существующий текст; переиспользуем его и в имени холста
  const pageLabel = totalPages > 0 ? `${page}/${totalPages}` : null

  return (
    <div ref={ref} className={pdfPreviewContract.className}>
      {/* Left arrow */}
      <button
        type="button"
        disabled={page <= 1}
        onClick={goPrev}
        className={contractPart(pdfPreviewContract, 'nav-button')}
        aria-label="Previous page"
      >
        <RiArrowLeftSLine size={20} aria-hidden="true" />
      </button>

      {/* Page canvas */}
      <div className={contractPart(pdfPreviewContract, 'canvas-wrapper')}>
        <canvas
          ref={canvasRef}
          className={contractPart(pdfPreviewContract, 'canvas')}
          role="img"
          aria-label={pageLabel ? `${fileName} ${pageLabel}` : fileName}
        />
      </div>

      {/* Right arrow */}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={goNext}
        className={contractPart(pdfPreviewContract, 'nav-button')}
        aria-label="Next page"
      >
        <RiArrowRightSLine size={20} aria-hidden="true" />
      </button>

      {/* Filename badge (top-right) */}
      <button
        type="button"
        onClick={handleDownload}
        className={contractPart(pdfPreviewContract, 'filename-badge')}
        title="Скачать файл"
      >
        <RiAttachment2
          size={20}
          aria-hidden="true"
          className={contractPart(pdfPreviewContract, 'filename-badge-icon')}
        />
        <span className={contractPart(pdfPreviewContract, 'filename-badge-text')}>{fileName}</span>
      </button>

      {/* Page counter (bottom-center) */}
      {pageLabel && (
        <div
          className={contractPart(pdfPreviewContract, 'page-counter')}
          role="status"
          aria-live="polite"
        >
          {pageLabel}
        </div>
      )}
    </div>
  )
})

PdfPreview.displayName = 'PdfPreview'
