import { useState, useEffect, type RefObject } from 'react'

export function useToastSlotHeights(
  slotElsRef: RefObject<Map<number, HTMLDivElement>>,
  toasts: { id: number }[]
) {
  const [heights, setHeights] = useState<Record<number, number>>({})

  useEffect(() => {
    const map = slotElsRef.current
    if (!map?.size) return

    const observer = new ResizeObserver(() => {
      const next: Record<number, number> = {}
      map.forEach((el, id) => {
        next[id] = el.offsetHeight
      })
      setHeights((prev) => {
        const changed = Object.keys(next).some((k) => prev[Number(k)] !== next[Number(k)])
        return changed ? next : prev
      })
    })

    map.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [toasts, slotElsRef])

  return heights
}
