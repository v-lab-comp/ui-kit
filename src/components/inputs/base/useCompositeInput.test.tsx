import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { formFields, useCompositeInput } from './useCompositeInput'

const formValues = () =>
  [...new FormData(screen.getByRole('form') as HTMLFormElement).entries()].map(([k, v]) => [
    k,
    String(v),
  ])

function Triple({ name }: { name?: string }) {
  const { parts, notifyParts, hiddenInputs } = useCompositeInput<[string, string, string]>({
    defaultValue: 'a|b|c',
    name,
    split: (value) => value.split('|') as [string, string, string],
    join: (parts) => parts.join('|'),
    formNames: ['first', undefined, 'third'],
  })
  return (
    <form aria-label="Форма">
      {hiddenInputs}
      <button type="button" onClick={() => notifyParts([parts[0], parts[1], 'z'])}>
        Сменить
      </button>
    </form>
  )
}

describe('useCompositeInput: скрытые поля формы', () => {
  it('отправляет полное значение и именованные части в прежнем порядке', async () => {
    const user = userEvent.setup()
    render(<Triple name="whole" />)
    expect(formValues()).toEqual([
      ['whole', 'a|b|c'],
      ['first', 'a'],
      ['third', 'c'],
    ])

    await user.click(screen.getByRole('button', { name: 'Сменить' }))
    expect(formValues()).toEqual([
      ['whole', 'a|b|z'],
      ['first', 'a'],
      ['third', 'z'],
    ])
  })

  it('та же разметка, что и раньше: span[hidden] с readonly hidden-полями', () => {
    render(<Triple name="whole" />)
    const fields = document.querySelectorAll('span[hidden] > input[type="hidden"]')
    expect([...fields].map((field) => field.getAttribute('name'))).toEqual([
      'whole',
      'first',
      'third',
    ])
    fields.forEach((field) => expect(field).toHaveAttribute('readonly'))
  })

  it('без name скрытых полей нет', () => {
    render(<Triple />)
    expect(formValues()).toEqual([])
  })
})

describe('formFields', () => {
  it('объект: по полю на ключ', () => {
    render(<form aria-label="Форма">{formFields({ phone: '+998901234567', country: 'UZ' })}</form>)
    expect(formValues()).toEqual([
      ['phone', '+998901234567'],
      ['country', 'UZ'],
    ])
  })

  it('массив пар сохраняет порядок и повторяющиеся имена', () => {
    render(
      <form aria-label="Форма">
        {formFields([
          ['tag', 'a'],
          ['tag', 'b'],
          ['1', 'num'],
        ])}
      </form>
    )
    expect(formValues()).toEqual([
      ['tag', 'a'],
      ['tag', 'b'],
      ['1', 'num'],
    ])
  })

  it('пустой набор — null', () => {
    expect(formFields({})).toBeNull()
    expect(formFields([])).toBeNull()
  })
})
