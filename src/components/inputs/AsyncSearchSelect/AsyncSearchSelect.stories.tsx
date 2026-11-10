import { useCallback, useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  FlagUzbekistan,
  FlagRussia,
  FlagKazakhstan,
  FlagTajikistan,
  FlagKyrgyzstan,
} from '@/icons/flags'
import { AsyncSearchSelect } from './AsyncSearchSelect'
import type { SelectOption } from '../SelectInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon, GlobeIcon } from '@/stories/helpers'

const MOCK_OPTIONS: SelectOption[] = [
  {
    value: 'uz',
    label: 'Uzbekistan',
    searchKeywords: ['узбекистан'],
    icon: <FlagUzbekistan size={20} />,
  },
  { value: 'ru', label: 'Russia', searchKeywords: ['россия'], icon: <FlagRussia size={20} /> },
  { value: 'kz', label: 'Kazakhstan', icon: <FlagKazakhstan size={20} /> },
  { value: 'tj', label: 'Tajikistan', icon: <FlagTajikistan size={20} /> },
  { value: 'kg', label: 'Kyrgyzstan', icon: <FlagKyrgyzstan size={20} /> },
]

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const t = window.setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(t)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true }
    )
  })
}

function filterByQuery(options: SelectOption[], query: string): SelectOption[] {
  const q = query.trim().toLowerCase()
  if (!q) return options
  return options.filter((o) => {
    const hay = [o.label, o.value, ...(o.searchKeywords ?? [])].join(' ').toLowerCase()
    return hay.includes(q)
  })
}

const MOCK_OPTIONS_EXTENDED: SelectOption[] = [
  ...MOCK_OPTIONS,
  ...Array.from({ length: 42 }, (_, i) => ({
    value: `demo-city-${i}`,
    label: `Demo city ${i + 1}`,
    searchKeywords: ['city', `${i + 1}`],
  })),
]

const STORY_PAGE_SIZE = 8

/** Имитация API с пагинацией: следующая порция при прокрутке списка к низу. */
async function fetchFilteredOptionsPaged(
  query: string,
  signal: AbortSignal,
  page: number,
  latencyMs = 220
): Promise<{ options: SelectOption[]; hasMore: boolean }> {
  await delay(latencyMs, signal)
  const filtered = filterByQuery(MOCK_OPTIONS_EXTENDED, query)
  const start = page * STORY_PAGE_SIZE
  const slice = filtered.slice(start, start + STORY_PAGE_SIZE)
  return { options: slice, hasMore: start + slice.length < filtered.length }
}

const meta: Meta<typeof AsyncSearchSelect> = {
  component: AsyncSearchSelect,
  title: 'Inputs/AsyncSearchSelect',
  tags: ['autodocs'],
  args: {
    hint: 'Первая порция при открытии / поиске; дальше — дозагрузка при скролле вниз (пагинация).',
    searchPlaceholder: 'Search countries…',
    placeholder: 'Select country',
    debounceMs: 300,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '200px 300px',
          overflow: 'visible',
        }}
      >
        <div style={{ width: 320, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: { excludeStories: ['Gallery'] },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
    completed: {
      control: 'boolean',
      description: 'Акцентная рамка оболочки (как у SelectInput full).',
    },
    completedColor: {
      control: 'text',
      description: 'Пресеты success, error… или hex / var(--…).',
    },
    debounceMs: { control: 'number' },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    loadOptions: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
    selectedOption: { table: { disable: true } },
    placement: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      table: {
        type: { summary: "'bottom' | 'top' | 'left' | 'right'" },
        defaultValue: { summary: "'bottom'" },
      },
    },
    dropdownPortalZIndex: {
      control: 'number',
      description: 'По умолчанию — токен --z-dropdown. Задайте для особых слоёв (модалка).',
    },
    dropdownMaxHeight: {
      control: 'number',
      description: 'Макс. высота выпадающего списка (px). По умолчанию 320.',
    },
    optionTextWrap: {
      control: 'boolean',
      description: 'Перенос длинных подписей опций на несколько строк.',
    },
  },
}

export default meta
type Story = StoryObj<typeof AsyncSearchSelect>

const defaultLoadOptions = ({
  query,
  signal,
  page,
}: {
  query: string
  signal: AbortSignal
  page: number
}) => fetchFilteredOptionsPaged(query, signal, page)

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    const loadOptions = useCallback(
      ({ query, signal, page }: { query: string; signal: AbortSignal; page: number }) =>
        fetchFilteredOptionsPaged(query, signal, page),
      []
    )
    return (
      <AsyncSearchSelect
        {...args}
        loadOptions={loadOptions}
        value={value}
        onChange={(next) => setValue(next)}
      />
    )
  },
  args: {
    label: 'Country',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    size: 'medium',
  },
}

export const Completed: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('uz')
    const loadOptions = useCallback(
      ({ query, signal, page }: { query: string; signal: AbortSignal; page: number }) =>
        fetchFilteredOptionsPaged(query, signal, page),
      []
    )
    return (
      <AsyncSearchSelect
        {...args}
        loadOptions={loadOptions}
        value={value}
        onChange={(next) => setValue(next)}
      />
    )
  },
  args: {
    label: 'Country',
    placeholder: 'Select country',
    completed: true,
    hint: '**`completed`** / **`completedColor`** — как у **SelectInput** variant full.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле на **InputField**; рамка в primary (или **completedColor**).',
      },
    },
  },
}

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: 300,
          overflow: 'visible',
          paddingBottom: 320,
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <AsyncSearchSelect
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        hint="Пустое состояние; откройте список и введите запрос."
        loadOptions={defaultLoadOptions}
      />
      <AsyncSearchSelect
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        defaultValue="uz"
        hint="Значение по умолчанию."
        loadOptions={defaultLoadOptions}
      />
      <AsyncSearchSelect
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        hint="Отключено."
        disabled
        loadOptions={defaultLoadOptions}
      />
      <AsyncSearchSelect
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        error="Выберите страну из списка."
        loadOptions={defaultLoadOptions}
      />
      <AsyncSearchSelect
        label="Region"
        placeholder="Select country"
        prefix={<GlobeIcon />}
        hint="Статический prefix, иконка опции в триггере после выбора."
        loadOptions={defaultLoadOptions}
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    hint: 'Откройте список — данные подгрузятся с небольшой задержкой.',
    loadOptions: defaultLoadOptions,
  },
}

export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    value: '',
    error: 'Please select a country',
    loadOptions: defaultLoadOptions,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    hint: 'This field is unavailable',
    disabled: true,
    loadOptions: defaultLoadOptions,
  },
}

/** Контролируемое значение с подписью, пока выбранного id ещё нет в последнем ответе API */
export const WithSelectedOption: Story = {
  name: 'Controlled value + selectedOption',
  render: function Render() {
    const [value, setValue] = useState('custom-id')
    const selectedOption = useMemo(
      () => ({ value: 'custom-id', label: 'Label from parent (API)' }),
      []
    )
    return (
      <AsyncSearchSelect
        label="External id"
        hint="Триггер показывает label из selectedOption, пока опция не попала в список."
        placeholder="Pick…"
        value={value}
        selectedOption={selectedOption}
        onChange={(next) => setValue(next)}
        loadOptions={defaultLoadOptions}
      />
    )
  },
}

export const LoadFailure: Story = {
  name: 'Load error state',
  render: function Render() {
    const [value, setValue] = useState('')
    const failLoad = useCallback(
      async ({ signal }: { query: string; signal: AbortSignal; page: number }) => {
        await delay(400, signal)
        throw new Error('network')
      },
      []
    )
    return (
      <AsyncSearchSelect
        label="Broken endpoint"
        hint="Откройте список — имитация ошибки загрузки (Failed to load)."
        placeholder="Try open…"
        value={value}
        onChange={(next) => setValue(next)}
        loadOptions={failLoad}
      />
    )
  },
  parameters: { controls: { disable: true } },
}
