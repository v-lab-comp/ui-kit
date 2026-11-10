import { useState } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { PhoneInput } from './PhoneInput'
import type { PhoneInputProps } from './PhoneInput.types'

function Controlled(props: PhoneInputProps & { onValue?: (v: string) => void }) {
  const { onValue, ...rest } = props
  const [value, setValue] = useState(props.value ?? '')
  return (
    <PhoneInput
      label="Phone"
      name="phone"
      {...rest}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        onValue?.(e.target.value)
      }}
    />
  )
}

const input = () => screen.getByLabelText('Phone') as HTMLInputElement
const hidden = (name: string) =>
  (document.querySelector(`input[type="hidden"][name="${name}"]`) as HTMLInputElement).value

let consoleError: MockInstance
beforeEach(() => {
  // jsdom: SelectInput прокручивает к выбранной опции
  Element.prototype.scrollIntoView = vi.fn()
  consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  cleanup()
  const calls = consoleError.mock.calls
  consoleError.mockRestore()
  expect(calls).toEqual([])
})

describe('PhoneInput', () => {
  describe('paste', () => {
    it.each([
      ['+998 90 123 45 67', '+998901234567', 'UZ'],
      ['998901234567', '+998901234567', 'UZ'],
      ['90 123 45 67', '+998901234567', 'UZ'],
      ['+7 912 345 67 89', '+79123456789', 'RU'],
    ])('%s → %s (%s)', async (text, e164, country) => {
      const onValue = vi.fn()
      render(<Controlled onValue={onValue} />)
      await userEvent.click(input())
      await userEvent.paste(text)
      expect(onValue).toHaveBeenLastCalledWith(e164)
      expect(hidden('phone')).toBe(e164)
      expect(hidden('country')).toBe(country)
    })

    it('does not switch to a country outside `countries`', async () => {
      const onValue = vi.fn()
      render(<Controlled onValue={onValue} countries={['UZ', 'KZ']} />)
      await userEvent.click(input())
      await userEvent.paste('+1 212 555 0123')
      expect(hidden('country')).toBe('UZ')
      expect(onValue).not.toHaveBeenCalledWith('+12125550123')
    })

    it('replaces the existing number', async () => {
      const onValue = vi.fn()
      render(<Controlled value="+998901234567" onValue={onValue} />)
      await userEvent.click(input())
      await userEvent.paste('+998 93 765 43 21')
      expect(onValue).toHaveBeenLastCalledWith('+998937654321')
    })

    it.each([
      ['+998 90 123 45 67', '+998901234567', 'UZ'],
      ['+7 912 345 67 89', '+79123456789', 'RU'],
    ])(
      'recognizes full number inserted without paste event (autofill): %s',
      (text, e164, country) => {
        const onValue = vi.fn()
        render(<Controlled onValue={onValue} />)
        fireEvent.change(input(), { target: { value: text } })
        expect(onValue).toHaveBeenLastCalledWith(e164)
        expect(hidden('country')).toBe(country)
      }
    )
  })

  describe('external value', () => {
    it('takes country from value set after mount (form reset)', async () => {
      const onChange = vi.fn()
      const { rerender } = render(
        <PhoneInput label="Phone" name="phone" value="" onChange={onChange} />
      )
      rerender(<PhoneInput label="Phone" name="phone" value="+79123456789" onChange={onChange} />)
      expect(hidden('country')).toBe('RU')
      expect(input().value).toBe('912 345 67 89')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('switches country when the form is reopened with another number', () => {
      const { rerender } = render(<PhoneInput label="Phone" name="phone" value="+79123456789" />)
      rerender(<PhoneInput label="Phone" name="phone" value="+998901234567" />)
      expect(hidden('country')).toBe('UZ')
      expect(input().value).toBe('90 123 45 67')
    })

    it.each(['+998901234567', '901234567'])(
      'clears the field when %s is reset to empty',
      (value) => {
        const onChange = vi.fn()
        const { rerender } = render(<PhoneInput label="Phone" value="" onChange={onChange} />)
        rerender(<PhoneInput label="Phone" value={value} onChange={onChange} />)
        expect(input().value).toBe('90 123 45 67')
        rerender(<PhoneInput label="Phone" value="" onChange={onChange} />)
        expect(input().value).toBe('')
        expect(onChange).not.toHaveBeenCalled()
      }
    )

    it('keeps country when value is cleared', () => {
      const { rerender } = render(<PhoneInput label="Phone" name="phone" value="+79123456789" />)
      rerender(<PhoneInput label="Phone" name="phone" value="" />)
      expect(hidden('country')).toBe('RU')
      expect(input().value).toBe('')
    })

    it.each([
      ['+998-901234567', 'UZ'],
      ['+998 90 123-45-67', 'UZ'],
      ['901234567', 'UZ'],
    ])('normalizes non-E.164 value %s without onChange', (value, country) => {
      const onChange = vi.fn()
      render(<PhoneInput label="Phone" name="phone" value={value} onChange={onChange} />)
      expect(input().value).toBe('90 123 45 67')
      expect(hidden('country')).toBe(country)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('normalizes uncontrolled defaultValue', () => {
      render(<PhoneInput label="Phone" name="phone" defaultValue="+7 (912) 345-67-89" />)
      expect(hidden('phone')).toBe('+79123456789')
      expect(hidden('country')).toBe('RU')
    })

    it('shows empty field for unparseable value', () => {
      render(<PhoneInput label="Phone" name="phone" value="abc" />)
      expect(input().value).toBe('')
    })
  })

  describe('typing', () => {
    it('replaces a full number when all is selected', async () => {
      const onValue = vi.fn()
      render(<Controlled value="+998901234567" onValue={onValue} />)
      const el = input()
      await userEvent.click(el)
      el.setSelectionRange(0, el.value.length)
      await userEvent.keyboard('5')
      expect(onValue).toHaveBeenLastCalledWith('+9985')
    })

    it('blocks extra digit when the number is full', async () => {
      const onValue = vi.fn()
      render(<Controlled value="+998901234567" onValue={onValue} />)
      await userEvent.type(input(), '8')
      expect(onValue).not.toHaveBeenCalled()
      expect(hidden('phone')).toBe('+998901234567')
    })

    it('trims extra digit when keydown is not blocked (mobile)', () => {
      const onValue = vi.fn()
      render(<Controlled value="+998901234567" onValue={onValue} />)
      fireEvent.change(input(), { target: { value: '90 123 45 678' } })
      expect(onValue).toHaveBeenLastCalledWith('+998901234567')
      expect(hidden('country')).toBe('UZ')
    })

    it('clears the number when user changes country', async () => {
      const onValue = vi.fn()
      render(<Controlled value="+998901234567" onValue={onValue} countries={['UZ', 'KZ']} />)
      await userEvent.click(screen.getByRole('combobox'))
      await userEvent.click(screen.getAllByRole('option')[1])
      expect(onValue).toHaveBeenLastCalledWith('')
      expect(hidden('country')).toBe('KZ')
      expect(input().value).toBe('')
    })

    it('keeps user-selected country while parent has not cleared value yet', async () => {
      render(
        <PhoneInput label="Phone" name="phone" value="+998901234567" countries={['UZ', 'KZ']} />
      )
      await userEvent.click(screen.getByRole('combobox'))
      await userEvent.click(screen.getAllByRole('option')[1])
      expect(hidden('country')).toBe('KZ')
      expect(input().value).toBe('')
    })
  })
})
