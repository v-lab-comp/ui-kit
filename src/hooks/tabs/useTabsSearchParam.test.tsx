import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTabsSearchParam } from './useTabsSearchParam'

describe('useTabsSearchParam', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    history.replaceState(null, '', '/')
  })

  it('reads initial value from search param', () => {
    history.replaceState(null, '', '/?tab=second')
    const { result } = renderHook(() =>
      useTabsSearchParam('tab', { defaultValue: 'first', validValues: ['first', 'second'] })
    )
    expect(result.current.value).toBe('second')
  })

  it('setTab / onChange updates URL', () => {
    const spy = vi.spyOn(history, 'replaceState')
    const { result } = renderHook(() =>
      useTabsSearchParam('tab', { defaultValue: 'a', validValues: ['a', 'b'] })
    )
    act(() => {
      result.current.setTab('b')
    })
    expect(result.current.value).toBe('b')
    expect(spy).toHaveBeenCalled()
    expect(window.location.search).toContain('tab=b')
  })

  it('getTabFromUrl returns current query value', () => {
    history.replaceState(null, '', '/?tab=second')
    const { result } = renderHook(() =>
      useTabsSearchParam('tab', { defaultValue: 'first', validValues: ['first', 'second'] })
    )
    expect(result.current.getTabFromUrl()).toBe('second')
  })
})
