import { describe, expect, it } from 'vitest'
import { lockBodyScroll } from './scrollLock'

describe('lockBodyScroll', () => {
  it('считает ссылки и восстанавливает исходный overflow после последней', () => {
    document.body.style.overflow = 'auto'
    const releaseA = lockBodyScroll()
    const releaseB = lockBodyScroll()
    expect(document.body.style.overflow).toBe('hidden')
    releaseA()
    releaseA() // повторный вызов — no-op
    expect(document.body.style.overflow).toBe('hidden')
    releaseB()
    expect(document.body.style.overflow).toBe('auto')
    document.body.style.overflow = ''
  })
})
