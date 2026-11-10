import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

const stubMatchMedia = (initial: boolean) => {
  const state = { matches: initial }
  const listeners = new Set<() => void>()
  const matchMedia = vi.fn((media: string) => ({
    media,
    get matches() {
      return state.matches
    },
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
  }))
  vi.stubGlobal('matchMedia', matchMedia)
  const set = (value: boolean) => {
    state.matches = value
    listeners.forEach((cb) => cb())
  }
  return { set, listeners }
}

describe('useMediaQuery', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reads the query and updates on change through one subscription', () => {
    const mq = stubMatchMedia(false)
    const { result, rerender, unmount } = renderHook(() => useMediaQuery('(hover: hover)', true))
    expect(result.current).toBe(false)
    rerender()
    expect(mq.listeners.size).toBe(1)
    act(() => mq.set(true))
    expect(result.current).toBe(true)
    unmount()
    expect(mq.listeners.size).toBe(0)
  })

  it('falls back to the server value without matchMedia', () => {
    vi.stubGlobal('matchMedia', undefined)
    const { result } = renderHook(() => useMediaQuery('(hover: hover)', true))
    expect(result.current).toBe(true)
  })
})
