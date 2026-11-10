import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { RichInput } from './RichInput'

// jsdom не реализует execCommand — форматирование проверяем по вызову команды
beforeAll(() => {
  document.execCommand = vi.fn(() => true)
  document.queryCommandState = vi.fn(() => false)
})

function editorOf(): HTMLElement {
  return screen.getByRole('textbox')
}

/** Ввод текста в contenteditable: jsdom не набирает символы, пишем содержимое напрямую. */
function typeInto(editor: HTMLElement, html: string) {
  editor.innerHTML = html
  fireEvent.input(editor)
}

describe('RichInput', () => {
  it('renders placeholder markers while empty and drops them once text is typed', () => {
    render(<RichInput placeholder="Describe…" />)
    const editor = editorOf()
    expect(editor).toHaveAttribute('data-placeholder', 'Describe…')
    expect(editor).toHaveAttribute('data-empty')

    typeInto(editor, 'Hello')
    expect(editor).not.toHaveAttribute('data-empty')
  })

  it('reports HTML on change', () => {
    const onChange = vi.fn()
    render(<RichInput onChange={onChange} />)
    typeInto(editorOf(), '<b>Hi</b>')
    expect(onChange).toHaveBeenCalledWith('<b>Hi</b>')
  })

  it('writes controlled value into the editor', () => {
    const { rerender } = render(<RichInput value="<i>one</i>" />)
    expect(editorOf().innerHTML).toBe('<i>one</i>')

    rerender(<RichInput value="<i>two</i>" />)
    expect(editorOf().innerHTML).toBe('<i>two</i>')
  })

  it('strips scripts from incoming value', () => {
    render(<RichInput value={'safe<script>alert(1)</script>'} />)
    expect(editorOf().innerHTML).toBe('safe')
  })

  it('counts text length without tags and marks the limit overflow', () => {
    render(<RichInput maxLength={5} />)
    typeInto(editorOf(), '<b>abc</b>')
    expect(screen.getByText('3/5')).toBeInTheDocument()

    typeInto(editorOf(), '<b>abcdefg</b>')
    expect(screen.getByText('7/5')).toBeInTheDocument()
    expect(editorOf()).toHaveAttribute('aria-invalid', 'true')
  })

  it('runs the matching execCommand for a toolbar button', () => {
    render(<RichInput tools={['bold', 'bulletList']} />)
    fireEvent.mouseDown(screen.getByLabelText('Bulleted list'))
    expect(document.execCommand).toHaveBeenCalledWith('insertUnorderedList', false)
  })

  it('renders only the requested tools, in order', () => {
    render(<RichInput tools={['italic', 'bold']} />)
    const labels = screen.getAllByRole('button').map((b) => b.getAttribute('aria-label'))
    expect(labels).toEqual(['Italic', 'Bold'])
  })

  it('hides the toolbar in readOnly and only disables it in disabled', () => {
    const { rerender } = render(<RichInput readOnly tools={['bold']} />)
    expect(screen.queryByRole('toolbar')).not.toBeInTheDocument()
    expect(editorOf()).toHaveAttribute('contenteditable', 'false')

    rerender(<RichInput disabled tools={['bold']} />)
    expect(screen.getByRole('toolbar')).toBeInTheDocument()
    expect(screen.getByLabelText('Bold')).toBeDisabled()
    expect(editorOf()).toHaveAttribute('contenteditable', 'false')
  })

  it('exposes the value through a hidden input when name is set', () => {
    const { container } = render(<RichInput name="description" defaultValue="<b>Draft</b>" />)
    const hidden = container.querySelector('input[type="hidden"]')
    expect(hidden).toHaveAttribute('name', 'description')
    expect(hidden).toHaveValue('<b>Draft</b>')

    typeInto(editorOf(), 'Updated')
    expect(container.querySelector('input[type="hidden"]')).toHaveValue('Updated')
  })

  it('pastes clipboard content as plain text, trimmed to maxLength', () => {
    render(<RichInput maxLength={4} />)
    fireEvent.paste(editorOf(), {
      clipboardData: { getData: () => 'abcdefgh' },
    })
    expect(document.execCommand).toHaveBeenCalledWith('insertText', false, 'abcd')
  })
})
