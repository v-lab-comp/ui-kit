/**
 * Manages document body scroll locking for modals and overlays.
 * SSR-safe: checks for document availability before manipulating styles.
 */
export function setBodyScrollLocked(locked: boolean): void {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = locked ? 'hidden' : ''
  }
}
