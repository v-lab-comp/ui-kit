/**
 * Утилиты для `contenteditable`-редакторов: HTML-фрагмент рассматривается как текст.
 * Работают только в браузере — в SSR возвращают безопасные значения по умолчанию.
 */

function toElement(html: string): HTMLDivElement | null {
  if (typeof document === 'undefined') return null
  const el = document.createElement('div')
  el.innerHTML = html
  return el
}

/** Есть ли в фрагменте видимый текст (пробелы и пустые теги не считаются). */
export function isHtmlEffectivelyEmpty(html: string): boolean {
  return (toElement(html)?.textContent ?? '').trim() === ''
}

/** Длина текстового содержимого без учёта тегов. */
export function getHtmlTextLength(html: string): number {
  return (toElement(html)?.textContent ?? '').length
}

/** Удаляет `<script>` из фрагмента. Полную санитизацию выполняет приложение / бэкенд. */
export function stripScriptsFromHtml(html: string): string {
  const el = toElement(html)
  if (!el) return html
  el.querySelectorAll('script').forEach((n) => n.remove())
  return el.innerHTML
}
