import type { ComponentType } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { TextInput } from './TextInput'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { SearchInput } from './SearchInput'
import { ShareLinkInput } from './ShareLinkInput'
import { DateInput } from './DateInput'

/** Общие пропсы InputField, которые принимает каждое поле */
type FieldA11yProps = {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  wrapperClassName?: string
}

const inputs: [string, ComponentType<FieldA11yProps>][] = [
  ['TextInput', TextInput],
  ['EmailInput', EmailInput],
  ['PasswordInput', PasswordInput],
  ['SearchInput', SearchInput],
  ['ShareLinkInput', ShareLinkInput],
  ['DateInput', DateInput],
]

afterEach(cleanup)

// textContent label включает aria-hidden маркер «*» у обязательного поля
const LABEL = /^Поле/

describe.each(inputs)('%s: доступность поля', (_name, Input) => {
  it('связывает input с label, ошибкой и обязательностью', () => {
    render(<Input label="Поле" hint="Подсказка" error="Ошибка поля" required />)

    const input = screen.getByLabelText(LABEL)
    expect(input.tagName).toBe('INPUT')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-required', 'true')

    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const description = document.getElementById(describedBy!)
    expect(description).not.toBeNull()
    expect(description).toHaveTextContent('Ошибка поля')
  })

  it('без ошибки и подсказки не выставляет aria-invalid / aria-describedby', () => {
    render(<Input label="Поле" />)
    const input = screen.getByLabelText(LABEL)
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-required')
  })

  it('не пробрасывает пропсы InputField на <input>', () => {
    render(<Input label="Поле" wrapperClassName="custom-wrapper" />)
    const input = screen.getByLabelText(LABEL)
    expect(input).not.toHaveAttribute('wrapperClassName')
    expect(input).not.toHaveAttribute('wrapperclassname')
    expect(input).not.toHaveClass('custom-wrapper')
    // проп дошёл до оболочки поля
    expect(document.querySelector('.custom-wrapper')).toContainElement(input)
  })
})
