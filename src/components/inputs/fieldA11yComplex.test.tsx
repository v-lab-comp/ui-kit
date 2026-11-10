import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { AsyncSearchSelect } from './AsyncSearchSelect'
import { PhoneInput } from './PhoneInput'
import { RichInput } from './RichInput'
import { SelectInput } from './SelectInput'
import { SiteInput } from './SiteInput'
import { TagInput } from './TagInput'

const ERROR = 'Обязательное поле'

beforeAll(() => {
  // jsdom: SelectInput прокручивает к выбранной опции, RichInput вызывает execCommand
  Element.prototype.scrollIntoView = vi.fn()
  document.execCommand = vi.fn(() => true)
  document.queryCommandState = vi.fn(() => false)
})

/** Контрол связан с текстом ошибки и сообщает об ошибке и обязательности */
function expectFieldA11y(control: HTMLElement) {
  const describedBy = control.getAttribute('aria-describedby')
  expect(describedBy).toBeTruthy()
  const texts = describedBy!.split(/\s+/).map((id) => document.getElementById(id)?.textContent)
  expect(texts).toContain(ERROR)
  expect(control).toHaveAccessibleDescription(ERROR)
  expect(control).toHaveAttribute('aria-invalid', 'true')
  expect(control).toHaveAttribute('aria-required', 'true')
}

describe('a11y связки поля: сложные инпуты', () => {
  it('SelectInput (full): combobox-триггер', () => {
    render(
      <SelectInput
        label="Город"
        error={ERROR}
        required
        id="city"
        options={[
          { value: 'tas', label: 'Ташкент' },
          { value: 'sam', label: 'Самарканд' },
        ]}
      />
    )
    const trigger = screen.getByRole('combobox', { name: 'Город' })
    expect(trigger).toHaveAttribute('id', 'city')
    expectFieldA11y(trigger)
  })

  it('AsyncSearchSelect: combobox-триггер', () => {
    render(
      <AsyncSearchSelect
        label="Компания"
        error={ERROR}
        required
        id="company"
        loadOptions={async () => []}
      />
    )
    const trigger = screen.getByRole('combobox', { name: 'Компания' })
    expect(trigger).toHaveAttribute('id', 'company')
    expectFieldA11y(trigger)
  })

  it('TagInput: текстовое поле', () => {
    render(<TagInput label="Теги" error={ERROR} required id="tags" />)
    const input = screen.getByRole('textbox', { name: 'Теги' })
    expect(input).toHaveAttribute('id', 'tags')
    expectFieldA11y(input)
  })

  it('PhoneInput: поле номера', () => {
    render(<PhoneInput label="Телефон" error={ERROR} required id="phone" />)
    const input = screen.getByRole('textbox', { name: 'Телефон' })
    expect(input.tagName).toBe('INPUT')
    expect(input).toHaveAttribute('id', 'phone')
    expectFieldA11y(input)
  })

  it('SiteInput: поле пути', () => {
    render(<SiteInput label="Сайт" error={ERROR} required id="site" />)
    const input = screen.getByRole('textbox', { name: 'Сайт' })
    expect(input).toHaveAttribute('id', 'site')
    expectFieldA11y(input)
  })

  it('RichInput: contenteditable назван label и не дублирует aria-invalid', () => {
    render(<RichInput label="Описание" error={ERROR} required id="desc" />)
    const editor = screen.getByRole('textbox', { name: 'Описание' })
    expect(editor).toHaveAttribute('id', 'desc')
    expectFieldA11y(editor)
  })

  it('RichInput: без label не ссылается на несуществующий label, превышение лимита — aria-invalid', () => {
    render(<RichInput maxLength={2} defaultValue="abc" />)
    const editor = screen.getByRole('textbox')
    expect(editor).not.toHaveAttribute('aria-labelledby')
    // aria-describedby (счётчик символов) допустим, но только на существующие элементы
    for (const id of editor.getAttribute('aria-describedby')?.split(' ') ?? []) {
      expect(document.getElementById(id)).not.toBeNull()
    }
    expect(editor).not.toHaveAttribute('aria-required')
    expect(editor).toHaveAttribute('aria-invalid', 'true')
  })
})
