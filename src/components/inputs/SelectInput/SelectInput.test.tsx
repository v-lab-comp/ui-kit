import { createRef, useState } from 'react'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Modal } from '../../overlays/Modal'
import { SelectInput } from './SelectInput'
import type { SelectOption } from './SelectInput.types'

const COUNTRIES = [
  { value: 'uz', label: 'Uzbekistan', shortLabel: 'UZ' },
  { value: 'ru', label: 'Russia', shortLabel: 'RU' },
  { value: 'kz', label: 'Kazakhstan', shortLabel: 'KZ' },
  { value: 'kg', label: 'Kyrgyzstan', shortLabel: 'KG' },
]

beforeAll(() => {
  // jsdom: floating-ui прокручивает к активному пункту
  Element.prototype.scrollIntoView = vi.fn()
})

const trigger = (name = 'Страна') => screen.getByRole('combobox', { name })
const listbox = () => screen.getByRole('listbox')
const activeOption = (combobox: HTMLElement) => {
  const id = combobox.getAttribute('aria-activedescendant')
  return id ? document.getElementById(id) : null
}

function renderFull(props: Partial<Parameters<typeof SelectInput>[0]> = {}) {
  const onChange = vi.fn()
  render(
    <SelectInput
      label="Страна"
      placeholder="Выберите"
      options={COUNTRIES}
      onChange={onChange}
      {...(props as object)}
    />
  )
  return { onChange }
}

describe('SelectInput: открытие и закрытие', () => {
  it('мышь: клик по триггеру открывает и закрывает, клик снаружи закрывает', async () => {
    const user = userEvent.setup()
    render(
      <>
        <SelectInput label="Страна" options={COUNTRIES} />
        <button type="button">Снаружи</button>
      </>
    )
    expect(trigger()).toHaveAttribute('aria-expanded', 'false')
    expect(trigger()).not.toHaveAttribute('aria-controls')

    await user.click(trigger())
    expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    expect(trigger()).toHaveAttribute('aria-controls', listbox().id)

    await user.click(trigger())
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.click(trigger())
    await user.click(screen.getByRole('button', { name: 'Снаружи' }))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('клавиатура: Enter открывает, Escape закрывает, фокус остаётся на триггере', async () => {
    const user = userEvent.setup()
    renderFull()
    trigger().focus()
    await user.keyboard('{Enter}')
    expect(listbox()).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
  })

  it('Tab закрывает список и переводит фокус дальше, без выбора', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <>
        <SelectInput label="Страна" options={COUNTRIES} onChange={onChange} />
        <button type="button">Дальше</button>
      </>
    )
    trigger().focus()
    await user.keyboard('{ArrowDown}')
    expect(listbox()).toBeInTheDocument()
    await user.tab()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Дальше' })).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('уход фокуса из виджета закрывает список', async () => {
    const user = userEvent.setup()
    render(
      <>
        <SelectInput label="Страна" options={COUNTRIES} />
        <input aria-label="Другое поле" />
      </>
    )
    await user.click(trigger())
    expect(listbox()).toBeInTheDocument()
    act(() => screen.getByRole('textbox', { name: 'Другое поле' }).focus())
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('Escape внутри Modal закрывает только список, следующий Escape — модалку', async () => {
    const user = userEvent.setup()
    function Demo() {
      const [open, setOpen] = useState(true)
      return (
        <Modal open={open} onOpenChange={setOpen} ariaLabel="Диалог">
          <SelectInput label="Страна" options={COUNTRIES} />
        </Modal>
      )
    }
    render(<Demo />)
    const combobox = await screen.findByRole('combobox', { name: 'Страна' })
    combobox.focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: 'Диалог' })).toBeInTheDocument()
    expect(combobox).toHaveFocus()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('SelectInput: навигация и выбор', () => {
  it('стрелки двигают aria-activedescendant, Enter выбирает и закрывает', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull()
    trigger().focus()
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(activeOption(trigger())).toHaveTextContent('Uzbekistan'))
    await user.keyboard('{ArrowDown}')
    expect(activeOption(trigger())).toHaveTextContent('Russia')
    expect(activeOption(trigger())).toHaveAttribute('data-highlighted')
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('ru', COUNTRIES[1])
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger()).toHaveTextContent('Russia')
    expect(trigger()).toHaveFocus()
  })

  it('Home / End / PageDown / ArrowUp и Space для выбора', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull()
    trigger().focus()
    await user.keyboard('{End}')
    expect(listbox()).toBeInTheDocument()
    expect(activeOption(trigger())).toHaveTextContent('Kyrgyzstan')
    await user.keyboard('{Home}')
    expect(activeOption(trigger())).toHaveTextContent('Uzbekistan')
    await user.keyboard('{PageDown}')
    expect(activeOption(trigger())).toHaveTextContent('Kyrgyzstan')
    await user.keyboard('{ArrowUp}')
    expect(activeOption(trigger())).toHaveTextContent('Kazakhstan')
    await user.keyboard(' ')
    expect(onChange).toHaveBeenLastCalledWith('kz', COUNTRIES[2])
    // Space выбрал и закрыл; keyup не открыл список снова
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('при открытии активен выбранный пункт; повторный выбор того же не вызывает onChange', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull({ defaultValue: 'kz' })
    trigger().focus()
    await user.keyboard('{ArrowDown}')
    expect(activeOption(trigger())).toHaveTextContent('Kazakhstan')
    await user.keyboard('{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('клик по опции выбирает её', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull()
    await user.click(trigger())
    await user.click(screen.getByRole('option', { name: 'Kazakhstan' }))
    expect(onChange).toHaveBeenCalledWith('kz', COUNTRIES[2])
    expect(trigger()).toHaveTextContent('Kazakhstan')
  })

  it('typeahead: символ на закрытом списке открывает и подсвечивает совпадение', async () => {
    const user = userEvent.setup()
    renderFull()
    trigger().focus()
    await user.keyboard('k')
    expect(listbox()).toBeInTheDocument()
    expect(activeOption(trigger())).toHaveTextContent('Kazakhstan')
    await user.keyboard('y')
    expect(activeOption(trigger())).toHaveTextContent('Kyrgyzstan')
  })

  it('плейсхолдер не является опцией listbox', async () => {
    const user = userEvent.setup()
    renderFull()
    await user.click(trigger())
    const options = within(listbox()).getAllByRole('option')
    expect(options.map((o) => o.textContent)).toEqual(COUNTRIES.map((c) => c.label))
    const placeholderRow = within(listbox()).getByText('Выберите').closest('li')
    expect(placeholderRow).toHaveAttribute('aria-hidden', 'true')
  })

  it('Delete / Backspace на триггере очищают значение', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull({ defaultValue: 'ru' })
    trigger().focus()
    await user.keyboard('{Delete}')
    expect(onChange).toHaveBeenLastCalledWith('', null)
    expect(trigger()).toHaveTextContent('Выберите')
  })

  it('кнопка очистки очищает значение и возвращает фокус на триггер', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull({ defaultValue: 'ru' })
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(onChange).toHaveBeenLastCalledWith('', null)
    expect(trigger()).toHaveFocus()
  })

  it('контролируемое значение меняется только снаружи', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [value, setValue] = useState('uz')
      return (
        <>
          <SelectInput label="Страна" options={COUNTRIES} value={value} onChange={setValue} />
          <output>{value}</output>
        </>
      )
    }
    render(<Controlled />)
    await user.click(trigger())
    await user.click(screen.getByRole('option', { name: 'Russia' }))
    expect(document.querySelector('output')).toHaveTextContent('ru')
    expect(trigger()).toHaveTextContent('Russia')
  })
})

describe('SelectInput: поле поиска', () => {
  it('фокус уходит в поиск, оно — combobox; навигация из него и возврат фокуса', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFull({ searchThreshold: 2, searchPlaceholder: 'Поиск' })
    trigger().focus()
    await user.keyboard('{Enter}')

    const search = await screen.findByRole('combobox', { name: 'Поиск' })
    await waitFor(() => expect(search).toHaveFocus())
    expect(search).toHaveAttribute('aria-expanded', 'true')
    expect(search).toHaveAttribute('aria-controls', listbox().id)

    await user.keyboard('ky')
    expect(within(listbox()).getAllByRole('option')).toHaveLength(1)
    expect(activeOption(search)).toHaveTextContent('Kyrgyzstan')

    await user.clear(search)
    await user.keyboard('{ArrowDown}')
    expect(activeOption(search)).toHaveTextContent('Russia')
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalledWith('ru', COUNTRIES[1])
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
  })

  it('Escape в поиске закрывает список и возвращает фокус на триггер', async () => {
    const user = userEvent.setup()
    renderFull({ searchThreshold: 2, searchPlaceholder: 'Поиск' })
    await user.click(trigger())
    const search = await screen.findByRole('combobox', { name: 'Поиск' })
    await waitFor(() => expect(search).toHaveFocus())
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
  })

  it('Tab из поиска закрывает список', async () => {
    const user = userEvent.setup()
    renderFull({ searchThreshold: 2, searchPlaceholder: 'Поиск' })
    await user.click(trigger())
    const search = await screen.findByRole('combobox', { name: 'Поиск' })
    await waitFor(() => expect(search).toHaveFocus())
    await user.tab()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('нет совпадений — статус в живой области role="status"', async () => {
    const user = userEvent.setup()
    renderFull({ searchThreshold: 2, searchPlaceholder: 'Поиск' })
    await user.click(trigger())
    const search = await screen.findByRole('combobox', { name: 'Поиск' })
    await waitFor(() => expect(search).toHaveFocus())
    await user.keyboard('zzz')
    expect(screen.getByRole('status')).toHaveTextContent('No results')
    expect(search).not.toHaveAttribute('aria-activedescendant')
  })
})

describe('SelectInput: поиск внутри Modal и длинные списки', () => {
  it('в Modal фокус уходит в поиск, ввод фильтрует, Escape закрывает только список', async () => {
    const user = userEvent.setup()
    function Demo() {
      const [open, setOpen] = useState(true)
      return (
        <Modal open={open} onOpenChange={setOpen} ariaLabel="Диалог">
          <SelectInput label="Страна" options={COUNTRIES} searchThreshold={2} />
        </Modal>
      )
    }
    render(<Demo />)
    const combobox = await screen.findByRole('combobox', { name: 'Страна' })
    await user.click(combobox)
    const search = await screen.findByRole('combobox', { name: 'Search...' })
    await waitFor(() => expect(search).toHaveFocus())
    await user.keyboard('rus')
    expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(1)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(combobox).toHaveFocus()
  })

  it('End дорисовывает ленивый список до последнего пункта', async () => {
    const user = userEvent.setup()
    const many = Array.from({ length: 120 }, (_, i) => ({ value: `o${i}`, label: `Option ${i}` }))
    render(
      <SelectInput label="Пункт" options={many} searchThreshold={1000} lazyLoadPageSize={50} />
    )
    trigger('Пункт').focus()
    await user.keyboard('{ArrowDown}')
    expect(within(listbox()).getAllByRole('option')).toHaveLength(50)
    await user.keyboard('{End}')
    expect(within(listbox()).getAllByRole('option')).toHaveLength(120)
    expect(activeOption(trigger('Пункт'))).toHaveTextContent('Option 119')
  })

  it('выбранный пункт за пределами первой страницы отрисован и активен при открытии', async () => {
    const user = userEvent.setup()
    const many = Array.from({ length: 120 }, (_, i) => ({ value: `o${i}`, label: `Option ${i}` }))
    render(
      <SelectInput
        label="Пункт"
        options={many}
        defaultValue="o100"
        searchThreshold={1000}
        lazyLoadPageSize={50}
      />
    )
    await user.click(trigger('Пункт'))
    const active = activeOption(trigger('Пункт'))
    expect(active).toHaveTextContent('Option 100')
    expect(active).toHaveAttribute('aria-selected', 'true')
  })

  it('обработчики и aria-describedby пользователя доходят до триггера', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(
      <>
        <span id="extra-hint">Доп. описание</span>
        <SelectInput
          label="Страна"
          hint="Подсказка"
          options={COUNTRIES}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-describedby="extra-hint"
          data-testid="country-trigger"
        />
      </>
    )
    await user.tab()
    expect(trigger()).toHaveFocus()
    expect(onFocus).toHaveBeenCalled()
    expect(trigger()).toHaveAttribute('data-testid', 'country-trigger')
    expect(trigger()).toHaveAccessibleDescription('Подсказка Доп. описание')
    await user.tab()
    expect(onBlur).toHaveBeenCalled()
  })
})

describe('SelectInput: multiple', () => {
  it('Space / Enter переключают пункты, список остаётся открытым', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <SelectInput
        mode="multiple"
        label="Поля"
        options={COUNTRIES}
        onChange={onChange}
        multipleSummaryLabel="Выбрано"
      />
    )
    await user.click(trigger('Поля'))
    const search = await screen.findByRole('combobox', { name: 'Search...' })
    await waitFor(() => expect(search).toHaveFocus())
    expect(listbox()).toHaveAttribute('aria-multiselectable', 'true')

    await user.keyboard('{ArrowDown}{Enter}{ArrowDown}{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(['uz', 'ru'], [COUNTRIES[0], COUNTRIES[1]])
    expect(listbox()).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Russia' })).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByRole('option', { name: 'Uzbekistan' }))
    expect(onChange).toHaveBeenLastCalledWith(['ru'], [COUNTRIES[1]])
    expect(trigger('Поля')).toHaveTextContent('Выбрано (1)')
  })
})

describe('SelectInput: ref, форма, compact', () => {
  it('ref указывает на кнопку-триггер', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<SelectInput ref={ref} label="Страна" options={COUNTRIES} />)
    expect(ref.current).toBe(trigger())
    act(() => ref.current?.focus())
    expect(trigger()).toHaveFocus()
  })

  it('name отправляет значение в форму; Button-триггер не отправляет форму', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
    render(
      <form aria-label="Форма" onSubmit={(e) => onSubmit(e.nativeEvent as SubmitEvent)}>
        <SelectInput label="Страна" name="country" options={COUNTRIES} defaultValue="kz" />
        <SelectInput
          mode="multiple"
          label="Ещё"
          name="extra"
          options={COUNTRIES}
          defaultValue={['uz', 'kg']}
        />
      </form>
    )
    await user.click(trigger())
    await user.click(screen.getByRole('option', { name: 'Russia' }))
    expect(onSubmit).not.toHaveBeenCalled()

    const data = new FormData(screen.getByRole('form', { name: 'Форма' }) as HTMLFormElement)
    expect(data.getAll('country')).toEqual(['ru'])
    expect(data.getAll('extra')).toEqual(['uz', 'kg'])
  })

  it('пустое значение отправляется пустой строкой', () => {
    render(
      <form aria-label="Форма">
        <SelectInput label="Страна" name="country" options={COUNTRIES} />
      </form>
    )
    const data = new FormData(screen.getByRole('form') as HTMLFormElement)
    expect(data.get('country')).toBe('')
  })

  it('compact: имя из aria-label, aria-activedescendant на триггере', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn<(value: string, option: SelectOption | null) => void>()
    render(
      <SelectInput
        variant="compact-label"
        aria-label="Валюта"
        options={COUNTRIES}
        onChange={onChange}
        error="Ошибка"
      />
    )
    const combobox = trigger('Валюта')
    expect(combobox).toHaveAttribute('aria-invalid', 'true')
    combobox.focus()
    await user.keyboard('{ArrowDown}')
    expect(combobox).toHaveAttribute('aria-expanded', 'true')
    expect(activeOption(combobox)).toHaveTextContent('Uzbekistan')
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onChange).toHaveBeenCalledWith('ru', COUNTRIES[1])
    expect(combobox).toHaveTextContent('RU')
  })

  it('inline: имя из aria-labelledby', () => {
    render(
      <>
        <span id="proto-label">Протокол</span>
        <SelectInput variant="inline" aria-labelledby="proto-label" options={COUNTRIES} />
      </>
    )
    expect(trigger('Протокол')).toBeInTheDocument()
  })

  it('disabled: не открывается', async () => {
    const user = userEvent.setup()
    renderFull({ disabled: true })
    await user.click(trigger())
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
