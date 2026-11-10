import { createRef, useState } from 'react'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Modal } from '../../overlays/Modal'
import type { SelectOption } from '../SelectInput'
import { AsyncSearchSelect } from './AsyncSearchSelect'
import type { AsyncSearchSelectLoadResult, AsyncSearchSelectProps } from './AsyncSearchSelect.types'

const COUNTRIES: SelectOption[] = [
  { value: 'uz', label: 'Uzbekistan' },
  { value: 'ru', label: 'Russia' },
  { value: 'kz', label: 'Kazakhstan' },
]

beforeAll(() => {
  // jsdom: floating-ui прокручивает к активному пункту
  Element.prototype.scrollIntoView = vi.fn()
})

/** loadOptions по фильтру подписи, ответ сразу (debounceMs=0 в тестах) */
const filterLoad = vi.fn(
  async ({ query }: { query: string }): Promise<SelectOption[]> =>
    COUNTRIES.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
)

/** loadOptions, ответ на который тест отдаёт вручную */
function deferredLoad() {
  const calls: Array<{
    query: string
    page: number
    signal: AbortSignal
    resolve: (result: AsyncSearchSelectLoadResult) => void
    reject: (error: unknown) => void
  }> = []
  const loadOptions = vi.fn(
    (args: { query: string; signal: AbortSignal; page: number }) =>
      new Promise<AsyncSearchSelectLoadResult>((resolve, reject) => {
        calls.push({ ...args, resolve, reject })
      })
  )
  return { loadOptions, calls }
}

const trigger = (name = 'Страна') => screen.getByRole('combobox', { name })
const search = () => screen.getByRole('combobox', { name: 'Search...' })
const status = () =>
  within(document.querySelector('[data-floating-ui-portal]')!).getByRole('status')
const activeOption = (combobox: HTMLElement) => {
  const id = combobox.getAttribute('aria-activedescendant')
  return id ? document.getElementById(id) : null
}

function renderSelect(props: Partial<AsyncSearchSelectProps> = {}) {
  const onChange = vi.fn()
  render(
    <AsyncSearchSelect
      label="Страна"
      placeholder="Выберите"
      debounceMs={0}
      loadOptions={filterLoad}
      onChange={onChange}
      {...(props as object)}
    />
  )
  return { onChange }
}

describe('AsyncSearchSelect: поиск и выбор с клавиатуры', () => {
  it('↓ открывает список, фокус уходит в поиск — он combobox, связанный с listbox', async () => {
    const user = userEvent.setup()
    renderSelect()
    trigger().focus()
    await user.keyboard('{ArrowDown}')

    expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(search()).toHaveFocus())
    const listbox = screen.getByRole('listbox')
    expect(trigger()).toHaveAttribute('aria-controls', listbox.id)
    expect(search()).toHaveAttribute('aria-controls', listbox.id)
    expect(search()).toHaveAttribute('aria-autocomplete', 'list')
    // Активный пункт объявляет поле с фокусом, а не триггер
    expect(trigger()).not.toHaveAttribute('aria-activedescendant')
    await waitFor(() => expect(within(listbox).getAllByRole('option')).toHaveLength(3))
  })

  it('ввод фильтрует через loadOptions, стрелки двигают aria-activedescendant, Enter выбирает', async () => {
    const user = userEvent.setup()
    const { onChange } = renderSelect()
    await user.click(trigger())
    await waitFor(() => expect(search()).toHaveFocus())
    await screen.findAllByRole('option')

    await user.keyboard('a')
    await waitFor(() =>
      expect(filterLoad).toHaveBeenLastCalledWith(expect.objectContaining({ query: 'a', page: 0 }))
    )
    // «a» есть во всех трёх; после ответа активен первый пункт
    await waitFor(() => expect(activeOption(search())).toHaveTextContent('Uzbekistan'))
    await user.keyboard('{ArrowDown}')
    expect(activeOption(search())).toHaveTextContent('Russia')
    expect(activeOption(search())).toHaveAttribute('data-highlighted', 'true')

    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('ru', COUNTRIES[1])
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
    expect(trigger()).toHaveTextContent('Russia')
  })

  it('при открытии активен выбранный пункт; повторный выбор не вызывает onChange', async () => {
    const user = userEvent.setup()
    const { onChange } = renderSelect({ defaultValue: 'kz' })
    await user.click(trigger())
    await waitFor(() => expect(activeOption(search())).toHaveTextContent('Kazakhstan'))
    expect(screen.getByRole('option', { name: 'Kazakhstan' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await user.keyboard('{Enter}')
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('клик по опции выбирает её', async () => {
    const user = userEvent.setup()
    const { onChange } = renderSelect()
    await user.click(trigger())
    await user.click(await screen.findByRole('option', { name: 'Kazakhstan' }))
    expect(onChange).toHaveBeenCalledWith('kz', COUNTRIES[2])
    expect(trigger()).toHaveTextContent('Kazakhstan')
  })

  it('Escape и Tab из поиска закрывают список без выбора', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <>
        <AsyncSearchSelect
          label="Страна"
          debounceMs={0}
          loadOptions={filterLoad}
          onChange={onChange}
        />
        <button type="button">Дальше</button>
      </>
    )
    await user.click(trigger())
    await waitFor(() => expect(search()).toHaveFocus())
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(search()).toHaveFocus())
    // Куда уйдёт фокус, решает браузер (от триггера); user-event считает от удалённого поля поиска
    await user.tab()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('Escape внутри Modal закрывает только список', async () => {
    const user = userEvent.setup()
    function Demo() {
      const [open, setOpen] = useState(true)
      return (
        <Modal open={open} onOpenChange={setOpen} ariaLabel="Диалог">
          <AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={filterLoad} />
        </Modal>
      )
    }
    render(<Demo />)
    const combobox = await screen.findByRole('combobox', { name: 'Страна' })
    // Модалка сама ставит начальный фокус на первый элемент — дожидаемся, чтобы он не перебил поиск
    await waitFor(() => expect(combobox).toHaveFocus())
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(search()).toHaveFocus())
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: 'Диалог' })).toBeInTheDocument()
    expect(combobox).toHaveFocus()
  })

  it('Delete на триггере и кнопка очистки очищают значение', async () => {
    const user = userEvent.setup()
    const { onChange } = renderSelect({ defaultValue: 'uz', selectedOption: COUNTRIES[0] })
    trigger().focus()
    await user.keyboard('{Delete}')
    expect(onChange).toHaveBeenLastCalledWith('', null)
    expect(trigger()).toHaveTextContent('Выберите')

    await user.click(trigger())
    await user.click(await screen.findByRole('option', { name: 'Russia' }))
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(onChange).toHaveBeenLastCalledWith('', null)
    expect(trigger()).toHaveFocus()
  })
})

describe('AsyncSearchSelect: статусы загрузки', () => {
  it('загрузка, дозагрузка и пустой ответ объявляются в role="status", listbox — aria-busy', async () => {
    const user = userEvent.setup()
    const { loadOptions, calls } = deferredLoad()
    render(<AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={loadOptions} />)
    await user.click(trigger())

    const listbox = screen.getByRole('listbox')
    expect(status()).toHaveTextContent('Loading…')
    expect(listbox).toHaveAttribute('aria-busy', 'true')
    expect(search()).not.toHaveAttribute('aria-activedescendant')

    await act(async () => calls[0].resolve({ options: COUNTRIES, hasMore: true }))
    expect(within(listbox).getAllByRole('option')).toHaveLength(3)
    expect(status()).toHaveTextContent('')
    expect(listbox).not.toHaveAttribute('aria-busy')
    expect(activeOption(search())).toHaveTextContent('Uzbekistan')

    // Прокрутка к низу запрашивает следующую страницу
    const scroller = listbox.parentElement!
    Object.defineProperties(scroller, {
      scrollHeight: { configurable: true, value: 300 },
      clientHeight: { configurable: true, value: 300 },
    })
    act(() => {
      scroller.dispatchEvent(new Event('scroll'))
    })
    expect(calls[1]).toMatchObject({ page: 1, query: '' })
    expect(status()).toHaveTextContent('Loading…')
    expect(listbox).toHaveAttribute('aria-busy', 'true')
    await act(async () =>
      calls[1].resolve({ options: [{ value: 'kg', label: 'Kyrgyzstan' }], hasMore: false })
    )
    expect(within(listbox).getAllByRole('option')).toHaveLength(4)
    // Активный пункт не сбрасывается дозагрузкой
    expect(activeOption(search())).toHaveTextContent('Uzbekistan')

    await user.keyboard('zz')
    await waitFor(() => expect(calls.at(-1)).toMatchObject({ page: 0, query: 'zz' }))
    // Запрос по устаревшей строке «z» отменён
    expect(calls.find((call) => call.query === 'z')?.signal.aborted).toBe(true)
    await act(async () => calls.at(-1)!.resolve([]))
    expect(status()).toHaveTextContent('No results')
    expect(within(listbox).queryAllByRole('option')).toHaveLength(0)
  })

  it('ошибка загрузки — «Failed to load» в role="status»', async () => {
    const user = userEvent.setup()
    const { loadOptions, calls } = deferredLoad()
    render(<AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={loadOptions} />)
    await user.click(trigger())
    await act(async () => calls[0].reject(new Error('network')))
    expect(status()).toHaveTextContent('Failed to load')
    expect(status().firstElementChild).toHaveAttribute('data-error', 'true')
  })

  it('закрытие отменяет запрос, поздний ответ не применяется', async () => {
    const user = userEvent.setup()
    const { loadOptions, calls } = deferredLoad()
    render(<AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={loadOptions} />)
    await user.click(trigger())
    await user.keyboard('{Escape}')
    expect(calls[0].signal.aborted).toBe(true)
    await act(async () => calls[0].resolve(COUNTRIES))

    await user.click(trigger())
    expect(status()).toHaveTextContent('Loading…')
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })
})

describe('AsyncSearchSelect: значение, ref, форма, имя', () => {
  it('контролируемое значение с selectedOption показывает подпись из него', async () => {
    const user = userEvent.setup()
    function Demo() {
      const [value, setValue] = useState('custom')
      return (
        <AsyncSearchSelect
          label="Страна"
          debounceMs={0}
          value={value}
          selectedOption={{ value: 'custom', label: 'Из API' }}
          onChange={(next) => setValue(next)}
          loadOptions={filterLoad}
        />
      )
    }
    render(<Demo />)
    expect(trigger()).toHaveTextContent('Из API')
    await user.click(trigger())
    await user.click(await screen.findByRole('option', { name: 'Russia' }))
    expect(trigger()).toHaveTextContent('Russia')
  })

  it('ref указывает на кнопку-триггер', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<AsyncSearchSelect ref={ref} label="Страна" loadOptions={filterLoad} />)
    expect(ref.current).toBe(trigger())
    act(() => ref.current?.focus())
    expect(trigger()).toHaveFocus()
  })

  it('name отправляет значение в форму; без значения — пустая строка', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
    render(
      <form aria-label="Форма" onSubmit={(e) => onSubmit(e.nativeEvent as SubmitEvent)}>
        <AsyncSearchSelect label="Страна" name="country" debounceMs={0} loadOptions={filterLoad} />
      </form>
    )
    const form = screen.getByRole('form', { name: 'Форма' }) as HTMLFormElement
    expect(new FormData(form).getAll('country')).toEqual([''])

    await user.click(trigger())
    await user.click(await screen.findByRole('option', { name: 'Uzbekistan' }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(new FormData(form).getAll('country')).toEqual(['uz'])
  })

  it('без label имя триггера — aria-label; обработчики уходят на триггер', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    render(<AsyncSearchSelect aria-label="Компания" onFocus={onFocus} loadOptions={filterLoad} />)
    await user.click(trigger('Компания'))
    expect(onFocus).toHaveBeenCalled()
  })

  it('disabled: не открывается', async () => {
    const user = userEvent.setup()
    const loadOptions = vi.fn(async () => COUNTRIES)
    renderSelect({ disabled: true, loadOptions })
    await user.click(trigger())
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(loadOptions).not.toHaveBeenCalled()
  })
})

describe('AsyncSearchSelect: отключение на открытом списке', () => {
  it('закрывает список, отменяет запрос и не грузит опции после включения', async () => {
    const user = userEvent.setup()
    const { loadOptions, calls } = deferredLoad()
    const { rerender } = render(
      <AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={loadOptions} />
    )
    await user.click(trigger())
    expect(calls).toHaveLength(1)

    rerender(<AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={loadOptions} disabled />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(calls[0].signal.aborted).toBe(true)

    rerender(<AsyncSearchSelect label="Страна" debounceMs={0} loadOptions={loadOptions} />)
    await act(async () => {})
    expect(calls).toHaveLength(1)
  })
})
