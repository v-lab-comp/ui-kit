import { createRef, useState } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TagInput } from '.'
import type { TagInputProps, TagInputTagValue } from './types'

const SKILLS = [
  { id: 'react', label: 'React' },
  { id: 'redux', label: 'Redux' },
  { id: 'vue', label: 'Vue' },
]

/** Controlled-обёртка: значение живёт в state, как в приложении. */
function Controlled({
  initial = [],
  onTags,
  ...props
}: Omit<TagInputProps, 'value' | 'onChange'> & {
  initial?: TagInputTagValue[]
  onTags?: (tags: TagInputTagValue[]) => void
}) {
  const [tags, setTags] = useState<TagInputTagValue[]>(initial)
  return (
    <TagInput
      {...props}
      value={tags}
      onChange={(next) => {
        setTags(next)
        onTags?.(next)
      }}
    />
  )
}

const chipLabels = () =>
  Array.from(document.querySelectorAll('.vl-tag .vl-tag__label')).map((el) => el.textContent)

describe('TagInput: ввод своих тегов', () => {
  it('Enter, запятая и «;» добавляют набранный текст и очищают поле', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput label="Теги" onChange={onChange} />)
    const input = screen.getByRole('textbox', { name: 'Теги' })

    await user.type(input, 'alpha{Enter}beta,gamma;')

    expect(chipLabels()).toEqual(['alpha', 'beta', 'gamma'])
    expect(onChange).toHaveBeenLastCalledWith(['alpha', 'beta', 'gamma'])
    expect(input).toHaveValue('')
  })

  it('вставка списка добавляет все теги одним onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput label="Теги" onChange={onChange} />)
    await user.click(screen.getByRole('textbox'))

    await user.paste('a, b;c\nd')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
  })

  it('вставка одного токена попадает в поле как текст', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput label="Теги" onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.click(input)

    await user.paste('single')

    expect(input).toHaveValue('single')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('учитывает maxTags, дубли и validateTag', async () => {
    const user = userEvent.setup()
    render(
      <Controlled label="Теги" maxTags={2} validateTag={(lbl) => lbl !== 'bad'} initial={['a']} />
    )
    const input = screen.getByRole('textbox')

    await user.type(input, 'a{Enter}bad{Enter}b{Enter}c{Enter}')

    expect(chipLabels()).toEqual(['a', 'b'])
  })

  it('commitOnBlur фиксирует черновик при уходе фокуса', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Теги" />)

    await user.type(screen.getByRole('textbox'), 'draft')
    await user.tab()

    expect(chipLabels()).toEqual(['draft'])
  })

  it('Enter не отправляет форму', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((e: { preventDefault: () => void }) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <TagInput label="Теги" name="tags" />
        <button type="submit">Сохранить</button>
      </form>
    )
    const input = screen.getByRole('textbox')

    await user.type(input, 'x{Enter}{Enter}')
    expect(onSubmit).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Сохранить' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('пробрасывает ref на поле ввода и уважает preventDefault в onKeyDown', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLInputElement>()
    const onChange = vi.fn()
    render(
      <TagInput
        ref={ref}
        label="Теги"
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
      />
    )
    expect(ref.current).toBe(screen.getByRole('textbox'))

    await user.type(ref.current!, 'x{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('TagInput: удаление тегов', () => {
  it('кнопка удаления названа текстом тега и возвращает фокус в поле', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Теги" initial={['React', 'Vue']} />)

    expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove Vue' }))

    expect(chipLabels()).toEqual(['React'])
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('removeTagLabel задаёт имя кнопки, renderTag получает его как removeLabel', () => {
    render(
      <>
        <TagInput label="A" value={['x']} removeTagLabel={(tag) => `Удалить ${String(tag)}`} />
        <TagInput
          label="B"
          value={['y']}
          removeTagLabel={(tag) => `Убрать ${String(tag)}`}
          renderTag={({ removeLabel, onRemove }) => (
            <button type="button" aria-label={removeLabel} onClick={onRemove} />
          )}
        />
      </>
    )
    expect(screen.getByRole('button', { name: 'Удалить x' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Убрать y' })).toBeInTheDocument()
  })

  it('Backspace в пустом поле удаляет последний тег, в непустом — только символ', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Теги" initial={['a', 'b']} />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'c{Backspace}')
    expect(chipLabels()).toEqual(['a', 'b'])

    await user.keyboard('{Backspace}')
    expect(chipLabels()).toEqual(['a'])
  })

  it('в disabled нет кнопок удаления', () => {
    render(<TagInput label="Теги" value={['a']} disabled />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

describe('TagInput: список подсказок (combobox + listbox)', () => {
  it('поле — combobox, связанный со списком только пока список открыт', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Навыки" suggestions={SKILLS} />)
    const input = screen.getByRole('combobox', { name: 'Навыки' })

    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(input).toHaveAttribute('aria-autocomplete', 'list')
    expect(input).not.toHaveAttribute('aria-controls')

    await user.click(input)

    const listbox = screen.getByRole('listbox', { name: 'Навыки' })
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(input).toHaveAttribute('aria-controls', listbox.id)
    expect(within(listbox).getAllByRole('option')).toHaveLength(3)
    // Без навигации стрелками активного пункта нет
    expect(input).not.toHaveAttribute('aria-activedescendant')
  })

  it('пункты не в порядке Tab: Tab без подсветки уводит фокус и ничего не выбирает', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Controlled label="Навыки" suggestions={SKILLS} commitOnBlur={false} />
        <button type="button">Дальше</button>
      </>
    )
    await user.click(screen.getByRole('combobox'))
    for (const option of screen.getAllByRole('option')) {
      expect(option).toHaveAttribute('tabindex', '-1')
    }

    await user.tab()

    expect(screen.getByRole('button', { name: 'Дальше' })).toHaveFocus()
    expect(chipLabels()).toEqual([])
  })

  it('↓ подсвечивает пункт через aria-activedescendant, Enter добавляет его, а не набранный текст', async () => {
    const user = userEvent.setup()
    const onTags = vi.fn()
    render(<Controlled label="Навыки" suggestions={SKILLS} onTags={onTags} />)
    const input = screen.getByRole('combobox')

    await user.type(input, 're')
    await user.keyboard('{ArrowDown}{ArrowDown}')

    const options = screen.getAllByRole('option')
    expect(options.map((o) => o.textContent)).toEqual(['React', 'Redux'])
    expect(input).toHaveAttribute('aria-activedescendant', options[1].id)
    expect(options[1]).toHaveAttribute('data-active', 'true')
    expect(input).toHaveFocus()

    await user.keyboard('{Enter}')

    expect(onTags).toHaveBeenLastCalledWith([{ id: 'redux', label: 'Redux' }])
    expect(input).toHaveValue('')
  })

  it('без навигации Enter добавляет набранный текст, даже если есть совпадения', async () => {
    const user = userEvent.setup()
    const onTags = vi.fn()
    render(<Controlled label="Навыки" suggestions={SKILLS} onTags={onTags} />)

    await user.type(screen.getByRole('combobox'), 're{Enter}')

    expect(onTags).toHaveBeenLastCalledWith(['re'])
  })

  it('ввод сбрасывает подсветку', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Навыки" suggestions={SKILLS} />)
    const input = screen.getByRole('combobox')

    await user.click(input)
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveAttribute('aria-activedescendant')

    await user.keyboard('r')
    expect(input).not.toHaveAttribute('aria-activedescendant')
  })

  it('стрелки пропускают отключённые пункты и ходят по кругу', async () => {
    const user = userEvent.setup()
    render(
      <Controlled
        label="Навыки"
        suggestions={SKILLS}
        getOptionDisabled={(row) => row.id === 'redux'}
      />
    )
    const input = screen.getByRole('combobox')
    await user.click(input)
    const [react, redux, vue] = screen.getAllByRole('option')
    expect(redux).toHaveAttribute('aria-disabled', 'true')

    await user.keyboard('{ArrowDown}')
    expect(input).toHaveAttribute('aria-activedescendant', react.id)
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveAttribute('aria-activedescendant', vue.id)
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveAttribute('aria-activedescendant', react.id)
    await user.keyboard('{ArrowUp}')
    expect(input).toHaveAttribute('aria-activedescendant', vue.id)
  })

  it('Tab принимает подсвеченный пункт и уводит фокус дальше', async () => {
    const user = userEvent.setup()
    const onTags = vi.fn()
    render(
      <>
        <Controlled label="Навыки" suggestions={SKILLS} onTags={onTags} />
        <button type="button">Дальше</button>
      </>
    )
    await user.type(screen.getByRole('combobox'), 'vu')
    await user.keyboard('{ArrowDown}')

    await user.tab()

    // Черновик «vu» не превращается в тег при blur
    expect(onTags).toHaveBeenCalledTimes(1)
    expect(onTags).toHaveBeenLastCalledWith([{ id: 'vue', label: 'Vue' }])
    expect(screen.getByRole('button', { name: 'Дальше' })).toHaveFocus()
  })

  it('Escape закрывает список, не всплывая выше; ввод открывает снова', async () => {
    const user = userEvent.setup()
    const onDocumentKeyDown = vi.fn()
    document.addEventListener('keydown', onDocumentKeyDown)
    render(<Controlled label="Навыки" suggestions={SKILLS} />)
    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.keyboard('{ArrowDown}')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(input).not.toHaveAttribute('aria-activedescendant')
    expect(input).toHaveFocus()
    // Escape закрыл только список: родительская модалка его не получит
    expect(onDocumentKeyDown).not.toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }))

    await user.keyboard('{Escape}')
    expect(onDocumentKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }))

    await user.keyboard('v')
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await user.click(input)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    document.removeEventListener('keydown', onDocumentKeyDown)
  })

  it('после удаления чипа фокус в поле, но список не открывается сам', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Навыки" suggestions={SKILLS} initial={['Notes']} />)

    await user.click(screen.getByRole('button', { name: 'Remove Notes' }))

    expect(screen.getByRole('combobox')).toHaveFocus()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('↓ на закрытом списке открывает его с первым пунктом', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Навыки" suggestions={SKILLS} />)
    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.keyboard('{Escape}')

    await user.keyboard('{ArrowDown}')

    const [first] = screen.getAllByRole('option')
    expect(input).toHaveAttribute('aria-activedescendant', first.id)
  })

  it('клик по пункту добавляет тег и оставляет фокус в поле', async () => {
    const user = userEvent.setup()
    const onTags = vi.fn()
    render(<Controlled label="Навыки" suggestions={SKILLS} onTags={onTags} />)
    const input = screen.getByRole('combobox')
    await user.click(input)

    await user.click(screen.getByRole('option', { name: 'Vue' }))

    expect(onTags).toHaveBeenLastCalledWith([{ id: 'vue', label: 'Vue' }])
    expect(input).toHaveFocus()
  })

  it('с галочками список мультивыборный, Enter на выбранном пункте снимает тег', async () => {
    const user = userEvent.setup()
    render(
      <Controlled label="Навыки" suggestions={SKILLS} initial={[{ id: 'react', label: 'React' }]} />
    )
    const input = screen.getByRole('combobox')
    await user.click(input)

    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true')
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'false')

    await user.keyboard('{ArrowDown}{Enter}')

    expect(chipLabels()).toEqual([])
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'false')
  })

  it('suggestionsExcludeSelected: выбранные скрыты, aria-selected у подсвеченного пункта', async () => {
    const user = userEvent.setup()
    render(
      <Controlled
        label="Навыки"
        suggestions={SKILLS}
        suggestionsExcludeSelected
        initial={[{ id: 'react', label: 'React' }]}
      />
    )
    const input = screen.getByRole('combobox')
    await user.click(input)
    const listbox = screen.getByRole('listbox')

    expect(listbox).not.toHaveAttribute('aria-multiselectable')
    expect(
      within(listbox)
        .getAllByRole('option')
        .map((o) => o.textContent)
    ).toEqual(['Redux', 'Vue'])

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('option', { name: 'Redux' })).toHaveAttribute('aria-selected', 'true')
  })

  it('allowCustomTags={false}: Enter принимает только точное совпадение с пунктом', async () => {
    const user = userEvent.setup()
    render(<Controlled label="Навыки" suggestions={SKILLS} allowCustomTags={false} />)
    const input = screen.getByRole('combobox')

    await user.type(input, 'unknown{Enter}vue{Enter}')

    expect(chipLabels()).toEqual(['Vue'])
  })

  it('пустой результат и загрузка показываются сообщением, без listbox', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<TagInput label="Навыки" suggestions={SKILLS} />)
    const input = screen.getByRole('combobox')

    await user.type(input, 'zzz')
    expect(screen.getByRole('status')).toHaveTextContent('No matches')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveAttribute('aria-expanded', 'false')

    rerender(<TagInput label="Навыки" suggestions={SKILLS} suggestionsLoading />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading…')
  })

  it('onSuggestionsQueryChange получает текст поля', async () => {
    const user = userEvent.setup()
    const onQuery = vi.fn()
    render(<TagInput label="Навыки" suggestions={[]} onSuggestionsQueryChange={onQuery} />)

    await user.type(screen.getByRole('combobox'), 'ab')

    expect(onQuery).toHaveBeenLastCalledWith('ab')
  })

  it('без suggestions поле остаётся textbox без ARIA combobox', () => {
    render(<TagInput label="Теги" />)
    const input = screen.getByRole('textbox', { name: 'Теги' })
    expect(input).not.toHaveAttribute('aria-expanded')
    expect(input).not.toHaveAttribute('aria-haspopup')
  })
})
