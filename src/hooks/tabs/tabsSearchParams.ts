/** Чтение/запись одного query-параметра без зависимости от react-router. */

export function readSearchParam(name: string): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get(name)
}

export function writeSearchParam(name: string, value: string, replace: boolean): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set(name, value)
  const fn = replace ? window.history.replaceState : window.history.pushState
  fn.call(window.history, null, '', url.toString())
}
