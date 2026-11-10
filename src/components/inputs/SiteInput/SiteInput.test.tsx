import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { SiteInput } from './SiteInput'

const PROTOCOLS = [
  { value: 'https://', shortLabel: 'https://', label: 'HTTPS' },
  { value: 'http://', shortLabel: 'http://', label: 'HTTP' },
]

beforeAll(() => {
  // jsdom: floating-ui прокручивает к активному пункту
  Element.prototype.scrollIntoView = vi.fn()
})

const formValues = () =>
  [...new FormData(screen.getByRole('form') as HTMLFormElement).entries()].map(([k, v]) => [
    k,
    String(v),
  ])

describe('SiteInput: выбор протокола', () => {
  it('селект протокола подписан label поля, поле пути — тоже', () => {
    render(<SiteInput label="Сайт" protocolOptions={PROTOCOLS} />)
    expect(screen.getByRole('combobox', { name: 'Сайт' })).toHaveTextContent('https://')
    expect(screen.getByRole('textbox', { name: 'Сайт' })).toBeInTheDocument()
  })

  it('protocolAriaLabel задаёт своё имя', () => {
    render(<SiteInput label="Сайт" protocolOptions={PROTOCOLS} protocolAriaLabel="Протокол" />)
    expect(screen.getByRole('combobox', { name: 'Протокол' })).toBeInTheDocument()
  })

  it('без label селект подписан подписью выбранной опции', () => {
    render(<SiteInput protocolOptions={PROTOCOLS} defaultValue="http://a.uz" />)
    expect(screen.getByRole('combobox', { name: 'HTTP' })).toHaveTextContent('http://')
  })

  it('протокол меняется с клавиатуры, значение и скрытые поля обновляются', async () => {
    const user = userEvent.setup()
    const onValue = vi.fn()
    function Demo() {
      const [value, setValue] = useState('https://example.com')
      return (
        <form aria-label="Форма">
          <SiteInput
            label="Сайт"
            name="site"
            protocolOptions={PROTOCOLS}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              onValue(e.target.value)
            }}
          />
        </form>
      )
    }
    render(<Demo />)
    const combobox = screen.getByRole('combobox', { name: 'Сайт' })
    combobox.focus()
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onValue).toHaveBeenLastCalledWith('http://example.com')
    expect(combobox).toHaveTextContent('http://')
    expect(combobox).toHaveFocus()
    expect(formValues()).toEqual([
      ['site', 'http://example.com'],
      ['protocol', 'http://'],
    ])
  })

  it('статичный протокол: в форму уходят полное значение и протокол', async () => {
    const user = userEvent.setup()
    render(
      <form aria-label="Форма">
        <SiteInput label="Сайт" name="site" />
      </form>
    )
    await user.type(screen.getByRole('textbox', { name: 'Сайт' }), 'v-lab.uz')
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(formValues()).toEqual([
      ['site', 'https://v-lab.uz'],
      ['protocol', 'https://'],
    ])
  })

  it('пропсы InputField уходят в оболочку, а не на <input>', () => {
    render(<SiteInput label="Сайт" wrapperClassName="custom-wrapper" endBlock=".uz" />)
    const input = screen.getByRole('textbox', { name: 'Сайт' })
    expect(input.closest('.custom-wrapper')).not.toBeNull()
    expect(input).not.toHaveAttribute('wrapperclassname')
    expect(screen.getByText('.uz')).toBeInTheDocument()
  })
})
