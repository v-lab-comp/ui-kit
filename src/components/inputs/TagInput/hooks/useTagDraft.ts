import { useCallback, useRef, useState } from 'react'
import type { ClipboardEvent } from 'react'
import { DEFAULT_TAG_INPUT_SPLIT, isMultiTagPaste, splitTagLabels } from '../model'

export type TagDraft = {
  /** Текст в поле ввода. */
  value: string
  setValue: (next: string) => void
  clear: () => void
  /** Забрать черновик: подписи тегов по разделителям; поле очищается. */
  take: () => string[]
  /**
   * Подписи из вставки, если её нужно разбить на теги (текст в поле тогда не вставляется);
   * `null` — обычная вставка одиночного токена.
   */
  takePaste: (e: ClipboardEvent<HTMLInputElement>) => string[] | null
}

/** Черновик тега: текст в поле, разбор по разделителям и вставки из буфера. */
export function useTagDraft(splitPattern: RegExp | undefined): TagDraft {
  const [value, setValueState] = useState('')
  /* Актуальный текст для обработчиков одного тика: Tab выбирает пункт и очищает поле, а следом
     blur с commitOnBlur не должен увидеть старый текст из замыкания. */
  const valueRef = useRef('')
  const pattern = splitPattern ?? DEFAULT_TAG_INPUT_SPLIT

  const setValue = useCallback((next: string) => {
    valueRef.current = next
    setValueState(next)
  }, [])

  return {
    value,
    setValue,
    clear: () => setValue(''),
    take: () => {
      const raw = valueRef.current.trim()
      if (!raw) return []
      setValue('')
      return splitTagLabels(raw, pattern)
    },
    takePaste: (e) => {
      const text = e.clipboardData.getData('text/plain')
      if (!text) return null
      const parts = splitTagLabels(text, pattern)
      if (!isMultiTagPaste(text, parts)) return null
      e.preventDefault()
      return parts
    },
  }
}
