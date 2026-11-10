import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useControllableState } from './useControllableState'

describe('useControllableState', () => {
  it('неконтролируемый: хранит значение внутри и вызывает onChange', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ value: undefined, defaultValue: 'a', onChange })
    )
    expect(result.current[0]).toBe('a')
    act(() => result.current[1]('b'))
    expect(result.current[0]).toBe('b')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('контролируемый: значение только снаружи, onChange получает доп. аргументы', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) =>
        useControllableState<string, [number]>({ value, defaultValue: 'x', onChange }),
      { initialProps: { value: 'a' } }
    )
    act(() => result.current[1]('b', 42))
    expect(onChange).toHaveBeenCalledWith('b', 42)
    expect(result.current[0]).toBe('a')
    rerender({ value: 'b' })
    expect(result.current[0]).toBe('b')
  })

  it('ленивое начальное значение и значение-функция', () => {
    const init = vi.fn(() => 1)
    const { result, rerender } = renderHook(() =>
      useControllableState({ value: undefined, defaultValue: init })
    )
    rerender()
    expect(init).toHaveBeenCalledTimes(1)
    expect(result.current[0]).toBe(1)

    const fn = () => 'fn'
    const { result: fnResult } = renderHook(() =>
      useControllableState<() => string>({ value: undefined, defaultValue: () => () => 'init' })
    )
    act(() => fnResult.current[1](fn))
    expect(fnResult.current[0]).toBe(fn)
  })
})
