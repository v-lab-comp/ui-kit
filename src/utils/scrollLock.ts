/** Сколько оверлеев сейчас держат блокировку прокрутки body. */
let lockCount = 0
/** Значение overflow до первой блокировки — восстанавливается после последней. */
let previousOverflow = ''

/**
 * Блокирует прокрутку body со счётчиком ссылок: несколько открытых оверлеев
 * (Modal, Drawer — со стеком ModalProvider и без него) не снимают блокировку
 * друг у друга. Возвращает функцию снятия; повторный вызов этой функции ничего не делает.
 * SSR-safe: без document — no-op.
 */
export function lockBodyScroll(): () => void {
  if (typeof document === 'undefined') return () => {}

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount += 1

  let released = false
  return () => {
    if (released) return
    released = true
    lockCount -= 1
    if (lockCount === 0) document.body.style.overflow = previousOverflow
  }
}
