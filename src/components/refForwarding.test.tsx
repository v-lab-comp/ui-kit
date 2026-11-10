import { render } from '@testing-library/react'
import { useRef, version, type ReactElement, type Ref } from 'react'
import { describe, expect, it } from 'vitest'
import { BaseCheckbox } from '@/components/inputs/base/BaseCheckbox'
import { BaseInput } from '@/components/inputs/base/BaseInput'
import { DateInput } from '@/components/inputs/DateInput'
import { PhoneInput } from '@/components/inputs/PhoneInput'
import { RichInput } from '@/components/inputs/RichInput'
import { SearchInput } from '@/components/inputs/SearchInput'
import { ShareLinkInput } from '@/components/inputs/ShareLinkInput'
import { Popover } from '@/components/overlays/Popover'

const REACT_19 = Number.parseInt(version, 10) >= 19

/** Callback-ref в стиле React 19: возвращает функцию очистки и пишет, что с ним происходило. */
function trackingRef(log: string[]): Ref<HTMLElement> {
  return (el: HTMLElement | null) => {
    log.push(el ? `attach ${el.tagName}` : 'null')
    return () => {
      log.push('cleanup')
    }
  }
}

function PopoverHost({ refProp }: { refProp: Ref<HTMLDivElement> }) {
  const anchorRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button ref={anchorRef} type="button">
        anchor
      </button>
      <Popover open anchorRef={anchorRef} ref={refProp}>
        content
      </Popover>
    </>
  )
}

const cases: Array<[string, (ref: Ref<never>) => ReactElement]> = [
  ['BaseInput', (ref) => <BaseInput ref={ref} aria-label="x" />],
  ['BaseCheckbox', (ref) => <BaseCheckbox ref={ref} aria-label="x" />],
  ['SearchInput', (ref) => <SearchInput ref={ref} aria-label="x" />],
  ['ShareLinkInput', (ref) => <ShareLinkInput ref={ref} value="https://example.com" />],
  ['RichInput', (ref) => <RichInput ref={ref} label="x" />],
  ['DateInput', (ref) => <DateInput ref={ref} label="x" />],
  ['PhoneInput', (ref) => <PhoneInput ref={ref} label="x" />],
  ['Popover', (ref) => <PopoverHost refProp={ref} />],
]

describe.runIf(REACT_19)('ref forwarding keeps React 19 ref cleanups', () => {
  it.each(cases)('%s', (_name, renderWithRef) => {
    const log: string[] = []
    const ref = trackingRef(log) as Ref<never>
    const { rerender, unmount } = render(renderWithRef(ref))
    rerender(renderWithRef(ref))
    unmount()
    expect(log[0]).toMatch(/^attach /)
    expect(log.slice(1)).toEqual(['cleanup'])
  })
})
