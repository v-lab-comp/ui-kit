import { createRef } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ModalBody } from './ModalBody'

describe('ModalBody', () => {
  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = render(<ModalBody ref={ref}>Body</ModalBody>)
    expect(ref.current).toBe(container.firstElementChild)
  })
})
