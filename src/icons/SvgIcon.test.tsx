import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SvgIcon } from './SvgIcon'
import { FlagRussia } from './flags/FlagRussia'

const svg =
  '<svg viewBox="0 0 24 24"><g clip-path="url(#clip0)"><rect width="24" height="24"/></g><defs><clipPath id="clip0"><rect/></clipPath></defs></svg>'

describe('SvgIcon', () => {
  it('декоративная по умолчанию', () => {
    const { container } = render(<SvgIcon svg={svg} />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('с title — role="img" и доступное имя', () => {
    render(<SvgIcon svg={svg} title="Логотип" />)
    expect(screen.getByRole('img', { name: 'Логотип' })).toBeInTheDocument()
  })

  it('id внутри SVG уникальны для каждого экземпляра', () => {
    const { container } = render(
      <>
        <SvgIcon svg={svg} />
        <SvgIcon svg={svg} />
      </>
    )
    const ids = Array.from(container.querySelectorAll('clipPath')).map((el) => el.id)
    expect(new Set(ids).size).toBe(2)
    const refs = Array.from(container.querySelectorAll('g')).map((g) => g.getAttribute('clip-path'))
    expect(refs).toEqual(ids.map((id) => `url(#${id})`))
  })

  it('флаг: встроенное имя, переопределяется и отключается', () => {
    const { rerender } = render(<FlagRussia />)
    expect(screen.getByRole('img', { name: 'Russia' })).toBeInTheDocument()
    rerender(<FlagRussia title="Россия" />)
    expect(screen.getByRole('img', { name: 'Россия' })).toBeInTheDocument()
    rerender(<FlagRussia title="" />)
    expect(screen.queryByRole('img')).toBeNull()
  })
})
