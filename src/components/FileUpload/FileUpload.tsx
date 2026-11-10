import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from 'react'
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
import { downloadFile } from '@/utils/downloadFile'
import { useControllableState } from '@/utils/useControllableState'

/* ─── File icon (PDF / DOC / etc.) ─── */

function FileIcon({ ext = 'PDF' }: { ext?: string }) {
  return (
    <div className={contractPart(fileUploadContract, 'file-icon')} aria-hidden="true">
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
  /** `title` кнопки скачивания (и начало её доступного имени, за ним — имя файла). */
  download?: string
  /** `aria-label` кнопки удаления (к нему добавляется имя файла). */
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

function fileExt(file: Pick<UploadFile, 'ext' | 'name'>): string {
  return file.ext ?? file.name.split('.').pop()?.toUpperCase() ?? 'FILE'
}

function clampProgress(progress: number): number {
  return Math.min(100, Math.max(0, Math.round(progress)))
}

/* ─── FileUploadItem ─── */

export interface FileUploadItemProps {
  file: UploadFile
  onRemove?: (id: string) => void
  texts?: FileUploadTexts
}

function FileUploadStatus({
  status,
  texts,
}: {
  status: UploadFileStatus
  texts: Required<FileUploadTexts>
}) {
  if (status === 'uploading') {
    return (
      <>
        <RiLoader4Line
          size={16}
          className={contractPart(fileUploadContract, 'spinning')}
          aria-hidden="true"
        />
        <span>{texts.uploading}</span>
      </>
    )
  }
  if (status === 'done') {
    return (
      <>
        <RiCheckboxCircleFill
          size={16}
          color="var(--state-success-base, #1fc16b)"
          aria-hidden="true"
        />
        <span>{texts.done}</span>
      </>
    )
  }
  return (
    <>
      <RiCloseCircleFill size={16} color="var(--state-error-base, #fb3748)" aria-hidden="true" />
      <span>{texts.error}</span>
    </>
  )
}

/**
 * Строка файла. Кнопка скачивания и кнопка удаления называются с именем файла
 * («Скачать файл report.pdf», «Удалить файл report.pdf»); прогресс — `role="progressbar"`
 * с именем файла; смена статуса объявляется через `role="status"`.
 */
export const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>(
  function FileUploadItem({ file, onRemove, texts }, ref) {
    const t = { ...DEFAULT_FILE_UPLOAD_TEXTS, ...texts }
    const { id, name, sizeLabel, progress = 0, status, url } = file
    const uid = useId()
    const downloadId = `${uid}-download`
    const removeId = `${uid}-remove`
    const nameId = `${uid}-name`
    const metaId = `${uid}-meta`

    return (
      <div ref={ref} className={contractPart(fileUploadContract, 'file-item')}>
        <div className={contractPart(fileUploadContract, 'file-item-content')}>
          <button
            type="button"
            id={downloadId}
            className={contractPart(fileUploadContract, 'file-item-download-btn')}
            onClick={() => downloadFile({ url, blob: file.file, fileName: name })}
            title={t.download}
            // Имя: «<download> <имя файла>»; размер и статус — описание
            aria-label={t.download}
            aria-labelledby={`${downloadId} ${nameId}`}
            aria-describedby={metaId}
          >
            <FileIcon ext={fileExt(file)} />
            <div className={contractPart(fileUploadContract, 'file-item-text')}>
              <span id={nameId} className={contractPart(fileUploadContract, 'file-item-name')}>
                {name}
              </span>
              <div id={metaId} className={contractPart(fileUploadContract, 'file-item-meta')}>
                <span className={contractPart(fileUploadContract, 'file-item-size')}>
                  {status === 'uploading' ? `0 KB ${t.ofLabel} ${sizeLabel}` : sizeLabel}
                </span>
                <span
                  className={contractPart(fileUploadContract, 'file-item-dot')}
                  aria-hidden="true"
                >
                  &middot;
                </span>
                <span
                  role="status"
                  className={contractPart(fileUploadContract, 'file-item-status')}
                >
                  <FileUploadStatus status={status} texts={t} />
                </span>
              </div>
            </div>
          </button>
          <button
            type="button"
            id={removeId}
            className={contractPart(fileUploadContract, 'file-item-action')}
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.(id)
            }}
            aria-label={t.remove}
            aria-labelledby={`${removeId} ${nameId}`}
          >
            {status === 'uploading' ? (
              <RiCloseLine size={20} aria-hidden="true" />
            ) : (
              <RiDeleteBin6Line size={20} aria-hidden="true" />
            )}
          </button>
        </div>
        {status === 'uploading' && (
          <div
            className={contractPart(fileUploadContract, 'progress-track')}
            role="progressbar"
            aria-labelledby={nameId}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={clampProgress(progress)}
          >
            <div
              className={contractPart(fileUploadContract, 'progress-fill')}
              style={{ width: `${clampProgress(progress)}%` }}
            />
          </div>
        )}
      </div>
    )
  }
)

FileUploadItem.displayName = 'FileUploadItem'

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

/**
 * Зона выбора / перетаскивания файлов. Обёртка — `role="group"` с именем из подписи поля.
 * В размере `default` единственная точка фокуса — кнопка загрузки (вложенных
 * интерактивных элементов нет); клик мышью по всей зоне по-прежнему открывает выбор файла.
 * В `compact` кнопки нет, поэтому сама зона — `role="button"`.
 */
export const FileDropZone = forwardRef<HTMLDivElement, FileDropZoneProps>(function FileDropZone(
  {
    onFiles,
    accept,
    label = 'Документ',
    required,
    multiple = true,
    size = 'default',
    texts,
    className,
    dropZoneClassName,
  },
  ref
) {
  const t = { ...DEFAULT_FILE_UPLOAD_TEXTS, ...texts }
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isCompact = size === 'compact'
  const uid = useId()
  const labelId = `${uid}-label`
  const titleId = `${uid}-title`
  const subtitleId = `${uid}-subtitle`

  const openPicker = () => inputRef.current?.click()

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

  // В compact зона сама является кнопкой; иначе кнопка — вложенная drop-zone-btn
  const zoneButtonProps = isCompact
    ? {
        role: 'button' as const,
        tabIndex: 0,
        'aria-labelledby': `${labelId} ${titleId}`,
        'aria-describedby': subtitleId,
        onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPicker()
          }
        },
      }
    : {}

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={labelId}
      className={clsx(contractPart(fileUploadContract, 'drop-zone-wrapper'), className)}
    >
      <div id={labelId} className={contractPart(fileUploadContract, 'drop-zone-label')}>
        <span>{label}</span>
        {required && (
          <span
            className={contractPart(fileUploadContract, 'drop-zone-required')}
            aria-hidden="true"
          >
            *
          </span>
        )}
      </div>
      <div
        className={clsx(
          contractPart(fileUploadContract, isCompact ? 'drop-zone-compact' : 'drop-zone'),
          dropZoneClassName
        )}
        {...contractAttrs(fileUploadContract, { size, dragging })}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={openPicker}
        {...zoneButtonProps}
      >
        <RiUploadCloud2Line
          size={isCompact ? 40 : 24}
          color="var(--text-sub-600, #5c5c5c)"
          className={isCompact ? contractPart(fileUploadContract, 'drop-zone-icon') : undefined}
          aria-hidden="true"
        />
        <div className={contractPart(fileUploadContract, 'drop-zone-text')}>
          <p id={titleId} className={contractPart(fileUploadContract, 'drop-zone-title')}>
            {t.title}
          </p>
          <p id={subtitleId} className={contractPart(fileUploadContract, 'drop-zone-subtitle')}>
            {t.subtitle}
          </p>
        </div>
        {!isCompact && (
          <button
            type="button"
            className={contractPart(fileUploadContract, 'drop-zone-btn')}
            aria-describedby={`${titleId} ${subtitleId}`}
            onClick={(e) => {
              e.stopPropagation()
              openPicker()
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
          tabIndex={-1}
          aria-labelledby={labelId}
          onChange={handleChange}
        />
      </div>
    </div>
  )
})

FileDropZone.displayName = 'FileDropZone'

/* ─── FileUploadField — drop zone + file list ─── */

export interface FileUploadFieldProps {
  label?: string
  required?: boolean
  /** Допустимые типы файлов (атрибут `accept`), напр. `image/jpeg,image/png,application/pdf`. */
  accept?: string
  /** Максимальный размер одного файла в байтах. Превышение → статус `error`. */
  maxSize?: number
  /**
   * Список файлов (контролируемый режим). Прогресс и статус загрузки задаёт приложение:
   * обновляйте `progress` / `status` у элементов по мере реальной загрузки.
   */
  files?: UploadFile[]
  /** Начальный список (неконтролируемый режим). */
  defaultFiles?: UploadFile[]
  /**
   * Статус, с которым добавляются выбранные файлы (кроме превысивших `maxSize` — у них `error`).
   * `'uploading'` — если приложение само грузит файлы и обновляет `files`. По умолчанию `'done'`.
   */
  newFileStatus?: UploadFileStatus
  multiple?: boolean
  size?: FileDropZoneSize
  /** Видимые тексты (мультиязычность). */
  texts?: FileUploadTexts
  /** Второй аргумент — нативные `File` для multipart; не передавайте `UploadFile` в FormData целиком. */
  onFilesChange?: FileUploadFilesChangeHandler
  className?: string
  dropZoneClassName?: string
}

const NO_FILES: UploadFile[] = []

export const FileUploadField = forwardRef<HTMLDivElement, FileUploadFieldProps>(
  function FileUploadField(
    {
      label,
      required,
      accept,
      maxSize,
      files: filesProp,
      defaultFiles = NO_FILES,
      newFileStatus = 'done',
      multiple = true,
      size = 'default',
      texts,
      onFilesChange,
      className,
      dropZoneClassName,
    },
    ref
  ) {
    const [files, setFiles] = useControllableState<UploadFile[], [File[]]>({
      value: filesProp,
      defaultValue: defaultFiles,
      onChange: onFilesChange,
    })

    const commit = (next: UploadFile[]) => setFiles(next, uploadFilesToNativeFiles(next))

    function handleFiles(newFiles: File[]) {
      const mapped = newFiles.map((f) =>
        fileToUploadFile(f, maxSize != null && f.size > maxSize ? 'error' : newFileStatus)
      )
      commit(multiple ? [...files, ...mapped] : mapped.slice(0, 1))
    }

    function handleRemove(id: string) {
      commit(files.filter((f) => f.id !== id))
    }

    return (
      <div ref={ref} className={clsx(contractPart(fileUploadContract, 'upload-field'), className)}>
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
)

FileUploadField.displayName = 'FileUploadField'
