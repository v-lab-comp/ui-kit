import { render } from '@testing-library/react'
import { createRef, version, type Ref } from 'react'
import { describe, expect, it } from 'vitest'
import { useMergeRefs } from './useMergeRefs'

const REACT_19 = Number.parseInt(version, 10) >= 19

function Box({ refs }: { refs: ReadonlyArray<Ref<HTMLDivElement> | undefined> }) {
  const merged = useMergeRefs(refs)
  return <div ref={merged} data-testid="box" />
}

describe('useMergeRefs', () => {
  it('fills object refs and clears them on unmount', () => {
    const a = createRef<HTMLDivElement>()
    const b = createRef<HTMLDivElement>()
    const { getByTestId, unmount } = render(<Box refs={[a, b, undefined]} />)
    expect(a.current).toBe(getByTestId('box'))
    expect(b.current).toBe(getByTestId('box'))
    unmount()
    expect(a.current).toBeNull()
    expect(b.current).toBeNull()
  })

  it('calls a callback ref with the node, then with null', () => {
    const calls: Array<string | null> = []
    const ref = (el: HTMLDivElement | null) => {
      calls.push(el ? el.tagName : null)
    }
    const { unmount } = render(<Box refs={[ref]} />)
    unmount()
    expect(calls).toEqual(['DIV', null])
  })

  it.runIf(REACT_19)(
    'runs the cleanup a callback ref returns instead of calling it with null',
    () => {
      const calls: Array<string | null> = []
      const ref = (el: HTMLDivElement | null) => {
        calls.push(el ? 'attach' : null)
        return () => {
          calls.push('cleanup')
        }
      }
      const { rerender, unmount } = render(<Box refs={[ref]} />)
      rerender(<Box refs={[ref]} />) // тот же ref — повторного присоединения нет
      unmount()
      expect(calls).toEqual(['attach', 'cleanup'])
    }
  )
})
