import { useEffect, type Dispatch, type SetStateAction } from 'react'
import type { SelectOption } from '../SelectInput'

export function useAsyncSearchSelectListboxKeyboard(options: {
  open: boolean
  options: SelectOption[]
  hi: number
  setHi: Dispatch<SetStateAction<number>>
  loading: boolean
  loadingMore: boolean
  loadError: boolean
  emit: (value: string, opt: SelectOption | null) => void
  close: () => void
}) {
  const { open, options: opts, hi, setHi, loading, loadingMore, loadError, emit, close } = options

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (loading || loadingMore || loadError || opts.length === 0) return
      const last = opts.length - 1
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHi((i) => Math.min(i < 0 ? 0 : i + 1, last))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHi((i) => Math.max((i < 0 ? 0 : i) - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const opt = opts[hi]
        if (opt) {
          emit(opt.value, opt)
          close()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, opts, hi, emit, close, loading, loadingMore, loadError, setHi])
}
