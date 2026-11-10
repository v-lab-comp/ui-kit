import { useCallback, useRef, type Ref, type RefCallback } from 'react'

type RefCleanup = () => void

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): RefCleanup | undefined {
  if (typeof ref === 'function') {
    // React 19: callback-ref может вернуть функцию очистки; в React 18 вернёт undefined
    const result: unknown = ref(value)
    return typeof result === 'function' ? (result as RefCleanup) : undefined
  }
  if (ref) (ref as { current: T | null }).current = value
  return undefined
}

/**
 * Один callback-ref из нескольких: ref компонента (`forwardRef`) + внутренние ref.
 * Ведёт себя как сам React с одиночным ref — одинаково в React 18 и 19:
 * при отсоединении вызывает функцию очистки, которую вернул callback-ref (React 19),
 * а callback-ref без очистки и объектные ref получают `null`.
 * Ручная пересылка (`if (typeof ref === 'function') ref(el)`) очистку теряет.
 */
export function useMergeRefs<T>(refs: ReadonlyArray<Ref<T> | undefined>): RefCallback<T> {
  const cleanups = useRef<Array<RefCleanup | undefined>>([])

  return useCallback(
    (node: T | null) => {
      if (node === null) {
        refs.forEach((ref, i) => {
          const cleanup = cleanups.current[i]
          if (cleanup) cleanup()
          else assignRef(ref, null)
        })
        cleanups.current = []
        return
      }
      cleanups.current = refs.map((ref) => assignRef(ref, node))
    },
    // Зависимости — сами ref: новый ref → React отсоединит старый callback и присоединит новый
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}
