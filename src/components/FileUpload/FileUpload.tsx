import { useEffect, useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import clsx from 'clsx'
import {
  RiUploadCloud2Line,
  RiFileLine,
  RiLoader4Line,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseLine,
  RiDeleteBin6Line,
} from '@remixicon/react'
import { contractAttrs, contractPart, type ContractValue } from '@/theme/contract'
import { fileUploadContract } from '@/theme/contracts/file-upload'

/* ─── File icon (PDF / DOC / etc.) ─── */

function FileIcon({ ext = 'PDF' }: { ext?: string }) {
  return (
    <div className={contractPart(fileUploadContract, 'file-icon')}>
      <RiFileLine size={40} color="var(--stroke-soft-200)" />
      <span className={contractPart(fileUploadContract, 'file-icon-ext')}>{ext}</span>
    </div>
  )
}

/* ─── Types ─── */

export type UploadFileStatus = 'uploading' | 'done' | 'error'

/** Все видимые тексты — выносятся наружу под мультиязычность. */
export interface FileUploadTexts {
  /** Заголовок зоны загрузки. */
  title?: string
  /** Подпись под заголовком (форматы/лимит). */
  subtitle?: string
  /** Текст кнопки загрузки. */
  button?: string
  /** Статус «идёт загрузка». */
  uploading?: string
  /** Статус «загружено». */
  done?: string
  /** Статус «ошибка». */
  error?: string
  /** `title` кнопки скачивания. */
  download?: string
  /** `aria-label` кнопки удаления. */
  remove?: string
  /** Разделитель в «0 KB of 50 MB». */
  ofLabel?: string
}

export const DEFAULT_FILE_UPLOAD_TEXTS: Required<FileUploadTexts> = {
  title: 'Выберите файл или перетащите его сюда',
  subtitle: 'JPEG, PNG, PDF формат до 50 МБ.',
  button: 'Загрузить файл',
  uploading: 'Загрузка...',
  done: 'Готово',
  error: 'Ошибка',
  download: 'Скачать файл',
  remove: 'Удалить файл',
  ofLabel: 'of',
}

/** Метаданные + опционально нативный `File` для multipart (см. `uploadFilesToNativeFiles`). */
export interface UploadFile {
  id: string
  name: string
  sizeLabel: string
  progress?: number
  status: UploadFileStatus
  ext?: string
  /** Бинарник для `FormData.append(..., file)`; не подставляйте весь `UploadFile` в FormData. */
  file?: File
  url?: string
}

/* ─── Utils ─── */

export function formatFileSize(bytes: number): string {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`
}

function createUploadId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function fileToUploadFile(f: File, status: UploadFileStatus = 'uploading'): UploadFile {
  return {
    id: createUploadId(),
    name: f.name,
    sizeLabel: formatFileSize(f.size),
    status,
    progress: status === 'done' ? 100 : 0,
    ext: f.name.split('.').pop()?.toUpperCase() ?? 'FILE',
    file: f,
  }
}

/** Нативные `File` для `FormData` / `fetch` (весь `UploadFile` в FormData даёт строку `[object Object]`). */
export function uploadFilesToNativeFiles(files: UploadFile[]): File[] {
  return files.map((f) => f.file).filter((f): f is File => f instanceof File)
}

export type FileUploadFilesChangeHandler = (uploadFiles: UploadFile[], nativeFiles: File[]) => void

function notifyFilesChange(
  onFilesChange: FileUploadFilesChangeHandler | undefined,
  uploadFiles: UploadFile[]
) {
  onFilesChange?.(uploadFiles, uploadFilesToNativeFiles(uploadFiles))
}

function filesSignature(files: UploadFile[]): string {
  return files.map((f) => `${f.id}:${f.name}:${f.status}:${f.sizeLabel}`).join('|')
}

/* ─── FileUploadItem ─── */

interface FileUploadItemProps {
  file: UploadFile
  onRemove?: (id: string) => void
  texts?: FileUploadTexts
}

export function FileUploadItem({ file, onRemove, texts }: FileUploadItemProps) {
  const t = { ...DEFAULT_FILE_UPLOAD_TEXTS, ...texts }
  const { id, name, sizeLabel, progress = 0, status, ext, url } = file

  function handleDownload() {
    const directUrl = typeof url === 'string' && url ? url : null
    if (directUrl) {
      const a = document.createElement('a')
      a.href = directUrl
      a.download = name
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.click()
      return
    }

    if (!file.file) return
    const blobUrl = URL.createObjectURL(file.file)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = name
    a.click()
    URL.revokeObjectURL(blobUrl)
  }

  return (
    <div className={contractPart(fileUploadContract, 'file-item')}>
      <div className={contractPart(fileUploadContract, 'file-item-content')}>
        <button
          type="button"
          className={contractPart(fileUploadContract, 'file-item-download-btn')}
          onClick={handleDownload}
          title={t.download}
        >
          <FileIcon ext={ext ?? name.split('.').pop()?.toUpperCase() ?? 'FILE'} />
          <div className={contractPart(fileUploadContract, 'file-item-text')}>
            <span className={contractPart(fileUploadContract, 'file-item-name')}>{name}</span>
            <div className={contractPart(fileUploadContract, 'file-item-meta')}>
              <span className={contractPart(fileUploadContract, 'file-item-size')}>
                {status === 'uploading' ? `0 KB ${t.ofLabel} ${sizeLabel}` : sizeLabel}
              </span>
              <span className={contractPart(fileUploadContract, 'file-item-dot')}>&middot;</span>
              <span className={contractPart(fileUploadContract, 'file-item-status')}>
                {status === 'uploading' && (
                  <>
                    <RiLoader4Line
                      size={16}
                      className={contractPart(fileUploadContract, 'spinning')}
                    />
                    <span>{t.uploading}</span>
                  </>
                )}
                {status === 'done' && (
                  <>
                    <RiCheckboxCircleFill size={16} color="var(--state-success-base, #1fc16b)" />
                    <span>{t.done}</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <RiCloseCircleFill size={16} color="var(--state-error-base, #fb3748)" />
                    <span>{t.error}</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </button>
        <button
          type="button"
          className={contractPart(fileUploadContract, 'file-item-action')}
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.(id)
          }}
          aria-label={t.remove}
        >
          {status === 'uploading' ? <RiCloseLine size={20} /> : <RiDeleteBin6Line size={20} />}
        </button>
      </div>
      {status === 'uploading' && (
        <div className={contractPart(fileUploadContract, 'progress-track')}>
          <div
            className={contractPart(fileUploadContract, 'progress-fill')}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

/* ─── FileDropZone ─── */

export type FileDropZoneSize = ContractValue<typeof fileUploadContract, 'size'>

export interface FileDropZoneProps {
  onFiles: (files: File[]) => void
  accept?: string
  label?: string
  required?: boolean
  multiple?: boolean
  size?: FileDropZoneSize
  /** Видимые тексты (мультиязычность). */
  texts?: FileUploadTexts
  className?: string
  dropZoneClassName?: string
}

export function FileDropZone({
  onFiles,
  accept,
  label = 'Документ',
  required,
  multiple = true,
  size = 'default',
  texts,
  className,
  dropZoneClassName,
}: FileDropZoneProps) {
  const t = { ...DEFAULT_FILE_UPLOAD_TEXTS, ...texts }
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isCompact = size === 'compact'

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length) onFiles(files)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length) onFiles(files)
    e.target.value = ''
  }

  const dropZoneClass = clsx(
    contractPart(fileUploadContract, isCompact ? 'drop-zone-compact' : 'drop-zone'),
    dropZoneClassName
  )

  return (
    <div className={clsx(contractPart(fileUploadContract, 'drop-zone-wrapper'), className)}>
      <div className={contractPart(fileUploadContract, 'drop-zone-label')}>
        <span>{label}</span>
        {required && (
          <span className={contractPart(fileUploadContract, 'drop-zone-required')}>*</span>
        )}
      </div>
      <div
        className={dropZoneClass}
        {...contractAttrs(fileUploadContract, { size, dragging })}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
      >
        <RiUploadCloud2Line
          size={isCompact ? 40 : 24}
          color="var(--text-sub-600, #5c5c5c)"
          className={isCompact ? contractPart(fileUploadContract, 'drop-zone-icon') : undefined}
        />
        <div className={contractPart(fileUploadContract, 'drop-zone-text')}>
          <p className={contractPart(fileUploadContract, 'drop-zone-title')}>{t.title}</p>
          <p className={contractPart(fileUploadContract, 'drop-zone-subtitle')}>{t.subtitle}</p>
        </div>
        {!isCompact && (
          <button
            type="button"
            className={contractPart(fileUploadContract, 'drop-zone-btn')}
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
          >
            {t.button}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

/* ─── FileUploadField — drop zone + file list ─── */

export interface FileUploadFieldProps {
  label?: string
  required?: boolean
  /** Допустимые типы файлов (атрибут `accept`), напр. `image/jpeg,image/png,application/pdf`. */
  accept?: string
  /** Максимальный размер одного файла в байтах. Превышение → статус `error`. */
  maxSize?: number
  initialFiles?: UploadFile[]
  multiple?: boolean
  size?: FileDropZoneSize
  /** Видимые тексты (мультиязычность). */
  texts?: FileUploadTexts
  /** Второй аргумент — нативные `File` для multipart; не передавайте `UploadFile` в FormData целиком. */
  onFilesChange?: FileUploadFilesChangeHandler
  className?: string
  dropZoneClassName?: string
}

export function FileUploadField({
  label,
  required,
  accept,
  maxSize,
  initialFiles = [],
  multiple = true,
  size = 'default',
  texts,
  onFilesChange,
  className,
  dropZoneClassName,
}: FileUploadFieldProps) {
  const [files, setFiles] = useState<UploadFile[]>(initialFiles)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync props → state for controlled scenario
    setFiles((prev) =>
      filesSignature(prev) === filesSignature(initialFiles) ? prev : initialFiles
    )
  }, [initialFiles])

  function simulateUpload(id: string) {
    const timer = setInterval(() => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id)
        if (!file || file.status !== 'uploading') {
          clearInterval(timer)
          return prev
        }
        const next = (file.progress ?? 0) + 20
        if (next >= 100) {
          clearInterval(timer)
          const updated = prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: 'done' as const } : f
          )
          notifyFilesChange(onFilesChange, updated)
          return updated
        }
        return prev.map((f) => (f.id === id ? { ...f, progress: next } : f))
      })
    }, 80)
  }

  function handleFiles(newFiles: File[]) {
    const mapped = newFiles.map((f) =>
      maxSize != null && f.size > maxSize ? fileToUploadFile(f, 'error') : fileToUploadFile(f)
    )
    const next = multiple ? [...files, ...mapped] : mapped.slice(0, 1)
    setFiles(next)
    notifyFilesChange(onFilesChange, next)
    mapped.filter((f) => f.status === 'uploading').forEach((f) => simulateUpload(f.id))
  }

  function handleRemove(id: string) {
    const next = files.filter((f) => f.id !== id)
    setFiles(next)
    notifyFilesChange(onFilesChange, next)
  }

  return (
    <div className={clsx(contractPart(fileUploadContract, 'upload-field'), className)}>
      <FileDropZone
        label={label}
        required={required}
        accept={accept}
        multiple={multiple}
        size={size}
        texts={texts}
        onFiles={handleFiles}
        dropZoneClassName={dropZoneClassName}
      />
      {files.length > 0 && (
        <div className={contractPart(fileUploadContract, 'upload-field-list')}>
          {files.map((f) => (
            <FileUploadItem key={f.id} file={f} onRemove={handleRemove} texts={texts} />
          ))}
        </div>
      )}
    </div>
  )
}
