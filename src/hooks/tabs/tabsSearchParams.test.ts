import { afterEach, describe, expect, it, vi } from 'vitest'
import { readSearchParam, writeSearchParam } from './tabsSearchParams'

describe('tabsSearchParams', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    history.replaceState(null, '', '/')
  })

  it('readSearchParam returns value from query string', () => {
    history.replaceState(null, '', '/?tab=second&x=1')
    expect(readSearchParam('tab')).toBe('second')
    expect(readSearchParam('missing')).toBeNull()
  })

  it('writeSearchParam updates search with replaceState', () => {
    const spy = vi.spyOn(history, 'replaceState')
    history.replaceState(null, '', '/?foo=1')
    writeSearchParam('tab', 'panel-a', true)
    expect(spy).toHaveBeenCalled()
    expect(window.location.search).toContain('tab=panel-a')
    expect(readSearchParam('tab')).toBe('panel-a')
  })
})
