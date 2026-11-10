import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InputField, inputFieldLabelId } from './InputField'
import { splitInputFieldProps } from './splitInputFieldProps'

const renderField = (props: Partial<Parameters<typeof InputField>[0]> = {}) =>
  render(
    <InputField label="Имя" {...props}>
      {(_id, control) => <input {...control} />}
    </InputField>
  )

describe('InputField a11y contract', () => {
  it('names the control by its label and links the hint', () => {
    renderField({ hint: 'Как в паспорте' })
    const input = screen.getByLabelText('Имя')
    expect(input).toHaveAccessibleDescription('Как в паспорте')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).not.toHaveAttribute('aria-required')
  })

  it('marks an error: aria-invalid + description is the error, not the hint', () => {
    renderField({ hint: 'Подсказка', error: 'Обязательное поле' })
    const input = screen.getByLabelText('Имя')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Обязательное поле')
  })

  it('announces required via aria-required, the visual marker is hidden', () => {
    const { container } = renderField({ required: true })
    const input = screen.getByRole('textbox', { name: 'Имя' })
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(container.querySelector('.vl-input-field__required')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('exposes the label id for controls that <label for> cannot name', () => {
    render(
      <InputField label="Описание" id="desc">
        {(id) => <div role="textbox" tabIndex={0} aria-labelledby={inputFieldLabelId(id)} />}
      </InputField>
    )
    expect(screen.getByRole('textbox', { name: 'Описание' })).toBeInTheDocument()
  })

  it('shows the default optional text, a string prop replaces it', () => {
    const { rerender } = renderField({ optional: true })
    expect(screen.getByText('(Optional)')).toBeInTheDocument()
    rerender(
      <InputField label="Имя" optional="необязательно">
        {(_id, control) => <input {...control} />}
      </InputField>
    )
    expect(screen.getByText('(необязательно)')).toBeInTheDocument()
  })
})

describe('splitInputFieldProps', () => {
  it('separates InputField props from control props', () => {
    const [field, rest] = splitInputFieldProps({
      label: 'L',
      wrapperClassName: 'w',
      filled: true,
      placeholder: 'p',
      onChange: () => {},
    })
    expect(Object.keys(field).sort()).toEqual(['filled', 'label', 'wrapperClassName'])
    expect(Object.keys(rest).sort()).toEqual(['onChange', 'placeholder'])
  })
})
