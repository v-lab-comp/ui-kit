import { act, render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('runs the matching execCommand on click without stealing focus on mousedown', () => {
    render(<RichInput tools={['bold', 'bulletList']} />)
    const button = screen.getByLabelText('Bulleted list')
    // mousedown только сохраняет выделение — команда не выполняется
    expect(fireEvent.mouseDown(button)).toBe(false)
    expect(document.execCommand).not.toHaveBeenCalledWith('insertUnorderedList', false)
    fireEvent.click(button)
    expect(document.execCommand).toHaveBeenCalledWith('insertUnorderedList', false)
  })

  it('toolbar: one tab stop, arrow keys move focus, Enter / Space run the command', async () => {
    const user = userEvent.setup()
    render(<RichInput label="Notes" tools={['bold', 'italic', 'underline']} />)
    const [bold, italic, underline] = screen.getAllByRole('button')
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal')
    expect(bold).toHaveAttribute('tabindex', '0')
    expect(italic).toHaveAttribute('tabindex', '-1')

    await user.click(editorOf())
    await user.tab({ shift: true })
    expect(bold).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(italic).toHaveFocus()
    expect(italic).toHaveAttribute('tabindex', '0')
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(underline).toHaveFocus()

    vi.mocked(document.execCommand).mockClear()
    await user.keyboard('{Enter}')
    expect(document.execCommand).toHaveBeenCalledWith('underline', false)
    act(() => italic!.focus())
    await user.keyboard(' ')
    expect(document.execCommand).toHaveBeenCalledWith('italic', false)
  })

  it('exposes pressed state of format buttons', () => {
    vi.mocked(document.queryCommandState).mockImplementation((cmd) => cmd === 'bold')
    render(<RichInput tools={['bold', 'italic']} />)
    fireEvent.click(screen.getByLabelText('Italic'))
    expect(screen.getByLabelText('Bold')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('Italic')).toHaveAttribute('aria-pressed', 'false')
    vi.mocked(document.queryCommandState).mockImplementation(() => false)
  })

  it('names the textbox by label and describes it by hint and counter', () => {
    render(<RichInput label="Notes" hint="Markdown-free" maxLength={10} placeholder="Type…" />)
    const editor = screen.getByRole('textbox', { name: 'Notes' })
    expect(editor).toHaveAttribute('aria-placeholder', 'Type…')
    expect(editor).toHaveAccessibleDescription('Markdown-free 0/10')
    expect(screen.getByText('0/10')).not.toHaveAttribute('aria-live')
  })

  it('keeps readOnly textbox focusable and marks disabled', () => {
    const { rerender } = render(<RichInput label="Notes" readOnly />)
    expect(editorOf()).toHaveAttribute('tabindex', '0')
    rerender(<RichInput label="Notes" disabled />)
    expect(editorOf()).toHaveAttribute('aria-disabled', 'true')
    expect(editorOf()).not.toHaveAttribute('tabindex')
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
