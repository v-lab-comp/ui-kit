import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
} from 'react'
import { getHtmlTextLength, isHtmlEffectivelyEmpty, stripScriptsFromHtml } from './htmlText'

/** Команды `document.execCommand`, состояние которых отслеживается по умолчанию. */
export const RICH_TEXT_FORMAT_COMMANDS = ['bold', 'italic', 'underline', 'strikeThrough'] as const

const EMPTY_FORMATS: ReadonlySet<string> = new Set<string>()

function queryActiveFormats(commands: readonly string[]): ReadonlySet<string> {
  const active = new Set<string>()
  for (const command of commands) {
    try {
      if (document.queryCommandState(command)) active.add(command)
    } catch {
      // queryCommandState бросает вне редактируемого контекста
    }
  }
  return active
}

export type UseRichTextEditorOptions = {
  disabled?: boolean
  /** Лимит длины текста (по `textContent`): ввод блокируется, вставка обрезается. */
  maxLength?: number
  /** HTML, который выставляется в редактор при mount. Смена на лету не отслеживается. */
  initialHtml?: string
  /** Команды, для которых считается активное состояние (подсветка кнопок тулбара). */
  trackedCommands?: readonly string[]
  /** Вызывается после каждого изменения содержимого; получает `innerHTML`. */
  onChangeHtml?: (html: string) => void
}

/**
 * Общая механика `contenteditable`-редактора: пустота, длина, активные форматы,
 * лимит длины, вставка только plain text и выполнение команд форматирования.
 *
 * Используется `RichInput` (форма) и `CommentRichInput` (комментарии) — визуал у них свой.
 */
export function useRichTextEditor({
  disabled = false,
  maxLength,
  initialHtml,
  trackedCommands = RICH_TEXT_FORMAT_COMMANDS,
  onChangeHtml,
}: UseRichTextEditorOptions = {}) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEmpty, setIsEmpty] = useState(() => isHtmlEffectivelyEmpty(initialHtml ?? ''))
  const [length, setLength] = useState(() => getHtmlTextLength(initialHtml ?? ''))
  const [activeFormats, setActiveFormats] = useState(EMPTY_FORMATS)
  const limit = typeof maxLength === 'number' && maxLength > 0 ? maxLength : 0

  const sync = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    const text = el.textContent ?? ''
    setIsEmpty(text.trim() === '')
    setLength(text.length)
  }, [])

  const emit = useCallback(() => {
    const el = editorRef.current
    if (el) onChangeHtml?.(el.innerHTML)
  }, [onChangeHtml])

  const syncFormats = useCallback(
    () => setActiveFormats(queryActiveFormats(trackedCommands)),
    [trackedCommands]
  )

  /** Записать HTML в редактор напрямую (начальное / внешнее значение, сброс). */
  const setHtml = useCallback(
    (html: string) => {
      const el = editorRef.current
      if (!el) return
      el.innerHTML = stripScriptsFromHtml(html)
      sync()
      if (html === '') setActiveFormats(EMPTY_FORMATS)
    },
    [sync]
  )

  useEffect(() => {
    if (initialHtml) setHtml(initialHtml)
    // mount-only: смену initialHtml на лету не поддерживаем
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInput = useCallback(() => {
    sync()
    emit()
  }, [sync, emit])

  const handleBeforeInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      if (!limit) return
      const native = e.nativeEvent as InputEvent
      const inputType = native.inputType ?? ''
      // Удаление и форматирование текст не добавляют
      if (inputType.startsWith('delete') || inputType.startsWith('format')) return
      const el = editorRef.current
      if (!el) return
      const remaining = limit - (el.textContent ?? '').length
      if (remaining <= 0) {
        e.preventDefault()
        return
      }
      const incoming = native.data ?? ''
      if (incoming.length > remaining) {
        e.preventDefault()
        document.execCommand('insertText', false, incoming.slice(0, remaining))
      }
    },
    [limit]
  )

  /** Вставка — всегда plain text, с обрезкой по лимиту. */
  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault()
      let text = e.clipboardData.getData('text/plain')
      if (limit) {
        const remaining = limit - (editorRef.current?.textContent ?? '').length
        if (remaining <= 0) return
        text = text.slice(0, remaining)
      }
      document.execCommand('insertText', false, text)
      sync()
      emit()
    },
    [limit, sync, emit]
  )

  const exec = useCallback(
    (command: string) => {
      const el = editorRef.current
      if (disabled || !el) return
      el.focus()
      document.execCommand(command, false)
      sync()
      syncFormats()
      emit()
    },
    [disabled, sync, syncFormats, emit]
  )

  /** Хендлеры для самого `contenteditable`-узла. */
  const editorProps = useMemo(
    () => ({
      onInput: handleInput,
      onBeforeInput: handleBeforeInput,
      onPaste: handlePaste,
      onKeyUp: syncFormats,
      onMouseUp: syncFormats,
      onSelect: syncFormats,
    }),
    [handleInput, handleBeforeInput, handlePaste, syncFormats]
  )

  return { editorRef, isEmpty, length, activeFormats, editorProps, exec, setHtml, sync }
}
