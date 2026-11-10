import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PdfPreview } from './PdfPreview'

describe('PdfPreview', () => {
  it('у холста есть доступное имя из имени файла', () => {
    render(<PdfPreview fileName="contract.pdf" />)
    expect(screen.getByRole('img', { name: 'contract.pdf' })).toBeInTheDocument()
  })
})
