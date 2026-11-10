import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { MarkdownInput } from './MarkdownInput'
import { htmlToMarkdown, markdownToHtml } from './markdownCodec'

beforeAll(() => {
  document.execCommand = vi.fn(() => true)
  document.queryCommandState = vi.fn(() => false)
})

function editorOf(): HTMLElement {
  return screen.getByRole('textbox')
}

/** Правка в contenteditable: jsdom не набирает символы, пишем HTML напрямую. */
function editAs(html: string) {
  const editor = editorOf()
  editor.innerHTML = html
  fireEvent.input(editor)
}

describe('markdownCodec', () => {
  it('converts markdown to html', () => {
    expect(markdownToHtml('**bold** and *italic*')).toContain('<strong>bold</strong>')
    expect(markdownToHtml('- one\n- two')).toContain('<li>one</li>')
  })

  it('converts editor html back to markdown, including execCommand strikethrough', () => {
    expect(htmlToMarkdown('<b>bold</b>')).toBe('**bold**')
    expect(htmlToMarkdown('<i>italic</i>')).toBe('*italic*')
    expect(htmlToMarkdown('<strike>gone</strike>')).toBe('~~gone~~')
    expect(htmlToMarkdown('<ul><li>one</li><li>two</li></ul>')).toBe('-   one\n-   two')
  })

  it('keeps underline as inline html — commonmark has no equivalent', () => {
    expect(htmlToMarkdown('<u>under</u>')).toBe('<u>under</u>')
    expect(markdownToHtml('<u>under</u>')).toContain('<u>under</u>')
  })
})

describe('MarkdownInput', () => {
  it('renders markdown defaultValue as html in the editor', () => {
    render(<MarkdownInput defaultValue="**bold**" />)
    expect(editorOf().innerHTML).toContain('<strong>bold</strong>')
  })

  it('reports markdown, not html, on change', () => {
    const onChange = vi.fn()
    render(<MarkdownInput onChange={onChange} />)
    editAs('<b>hi</b>')
    expect(onChange).toHaveBeenCalledWith('**hi**')
  })

  it('does not rewrite the editor when the parent echoes the same markdown back', () => {
    function Controlled() {
      const [value, setValue] = useState('')
      return <MarkdownInput value={value} onChange={setValue} />
    }
    render(<Controlled />)

    // HTML браузера (<b>) не совпадает с результатом markdownToHtml('**hi**') (<p><strong>),
    // и без моста эхо родителя переписало бы DOM — каретка прыгнула бы в начало
    editAs('<b>hi</b>')
    expect(editorOf().innerHTML).toBe('<b>hi</b>')
  })

  it('still applies a genuinely new value from the parent', () => {
    const { rerender } = render(<MarkdownInput value="**one**" />)
    expect(editorOf().innerHTML).toContain('<strong>one</strong>')

    rerender(<MarkdownInput value="**two**" />)
    expect(editorOf().innerHTML).toContain('<strong>two</strong>')
  })

  it('exposes markdown through the hidden input, not html', () => {
    const { container } = render(<MarkdownInput name="description" defaultValue="**draft**" />)
    expect(container.querySelector('input[type="hidden"]')).toHaveValue('**draft**')

    editAs('<i>edited</i>')
    expect(container.querySelector('input[type="hidden"]')).toHaveValue('*edited*')
  })

  it('drops the underline tool by default and keeps it when asked', () => {
    const { rerender } = render(<MarkdownInput />)
    expect(screen.queryByLabelText('Underline')).not.toBeInTheDocument()

    rerender(<MarkdownInput tools={['bold', 'underline']} />)
    expect(screen.getByLabelText('Underline')).toBeInTheDocument()
  })
})
