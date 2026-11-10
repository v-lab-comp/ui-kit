import { useState, type ChangeEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RiBankCardFill, RiPaypalFill } from '@remixicon/react'
import {
  FlagUzbekistan,
  FlagRussia,
  FlagKazakhstan,
  FlagTajikistan,
  FlagKyrgyzstan,
  FlagUnitedStates,
  FlagEuropeanUnion,
} from '@/icons/flags'
import { SelectInput } from './SelectInput'
import type { SelectInputMultipleChangeEvent, SelectInputProps } from './SelectInput.types'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon, GlobeIcon, PersonIcon, FlashIcon } from '@/stories/helpers'

// ── User select helpers ────────────────────────────────────────────────────

const UserAvatar = ({ src, name }: { src: string; name: string }) => (
  <img
    src={src}
    alt={name}
    style={{ width: 20, height: 20, borderRadius: '50%', display: 'block', flexShrink: 0 }}
  />
)

const USER_OPTIONS = [
  {
    value: 'u1',
    label: 'Alice Johnson',
    shortLabel: 'Alice',
    avatar: 'https://i.pravatar.cc/32?img=1',
    icon: <UserAvatar src="https://i.pravatar.cc/32?img=1" name="Alice Johnson" />,
  },
  {
    value: 'u2',
    label: 'Bob Smith',
    shortLabel: 'Bob',
    avatar: 'https://i.pravatar.cc/32?img=2',
    icon: <UserAvatar src="https://i.pravatar.cc/32?img=2" name="Bob Smith" />,
  },
  {
    value: 'u3',
    label: 'Carol White',
    shortLabel: 'Carol',
    avatar: 'https://i.pravatar.cc/32?img=3',
    icon: <UserAvatar src="https://i.pravatar.cc/32?img=3" name="Carol White" />,
  },
  {
    value: 'u4',
    label: 'David Brown',
    shortLabel: 'David',
    avatar: 'https://i.pravatar.cc/32?img=4',
    icon: <UserAvatar src="https://i.pravatar.cc/32?img=4" name="David Brown" />,
  },
]

// ── Payment method helpers ─────────────────────────────────────────────────

const MastercardIcon = () => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: '#EB001B',
        display: 'block',
        marginRight: -5,
      }}
    />
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: '#F79E1B',
        display: 'block',
      }}
    />
  </span>
)

const VisaIcon = () => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 800,
      fontStyle: 'italic',
      letterSpacing: '-0.5px',
      color: '#1A1F71',
      lineHeight: 1,
    }}
  >
    VISA
  </span>
)

const PAYMENT_OPTIONS = [
  { value: 'mc-4242', label: 'Mastercard •••• 4242', shortLabel: 'MC', icon: <MastercardIcon /> },
  { value: 'visa-1234', label: 'Visa •••• 1234', shortLabel: 'Visa', icon: <VisaIcon /> },
  {
    value: 'paypal',
    label: 'PayPal',
    shortLabel: 'PayPal',
    icon: <RiPaypalFill size={18} color="#003087" />,
  },
]

const COUNTRY_OPTIONS = [
  { value: 'uz', label: 'Uzbekistan', shortLabel: 'UZ', icon: <FlagUzbekistan size={20} /> },
  { value: 'ru', label: 'Russia', shortLabel: 'RU', icon: <FlagRussia size={20} /> },
  { value: 'kz', label: 'Kazakhstan', shortLabel: 'KZ', icon: <FlagKazakhstan size={20} /> },
  { value: 'tj', label: 'Tajikistan', shortLabel: 'TJ', icon: <FlagTajikistan size={20} /> },
  { value: 'kg', label: 'Kyrgyzstan', shortLabel: 'KG', icon: <FlagKyrgyzstan size={20} /> },
]

const GROUPED_FOOD_OPTIONS = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
]

const LARGE_LIST_OPTIONS = Array.from({ length: 200 }, (_, i) => ({
  value: `opt-${i}`,
  label: `Option ${i + 1} — ${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'][i % 5]}`,
}))

const meta: Meta<typeof SelectInput> = {
  component: SelectInput,
  title: 'Inputs/SelectInput',
  tags: ['autodocs'],
  args: {
    hint: 'This is a hint text to help user.',
    options: COUNTRY_OPTIONS,
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
      description: {
        component: `
### Data shape

- **Flat list:** pass **\`options\`**: **\`SelectOption[]\`** (\`value\`, \`label\`, optional \`description\`, \`icon\`, \`searchKeywords\`).
- **Grouped list:** pass **\`groups\`**: **\`SelectOptionGroup[]\`** — each item is **\`{ label, options }\`** (section heading + options). Same pattern as shadcn **SelectGroup** / **SelectLabel**. The visually hidden native **\`<select>\`** emits **\`<optgroup>\`** when **\`groups\`** is used.

Types enforce **either** **\`options\`** **or** **\`groups\`** (**\`SelectInputOptionsProp\`**). If both appear at runtime (e.g. Storybook arg merge), **\`groups\`** wins.

### Behaviour

Search filters options; groups with no matches are hidden. **\`variant\`**: **\`full\`** | **\`compact\`** | **\`compact-label\`** | **\`inline\`**.

### Multiple mode

**\`mode="multiple"\`** (**\`variant="full"\`** only): **\`value: string[]\`**, **\`SelectInputMultipleChangeEvent\`**, checkboxes, trigger summary **\`multipleSummaryLabel (N)\`** or **\`multipleSummaryRender\`**; dropdown stays open while toggling.

### Stories & docs site

**Grouped options**, **Multiple (summary)**, gallery — below. VitePress: **SelectInput** pages (**ru / en / uz**) and **\`selectInputGrouped\`** preview.

### Completed

**\`completed\`** — акцентная рамка (**full** — оболочка как у текстового поля; **compact** / **inline** — триггер). **\`completedColor\`** — hex, **\`rgb()\`** или **\`var(--token)\`**. Сторис **Completed (full)** и **Completed (compact)**; на сайте — блок **completed** на странице **InputField** (**\`inputCompleted\`** preview).
`.trim(),
      },
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
      description:
        'Акцентная рамка (primary по умолчанию). Не с **error** / **disabled**. См. сторис **Completed**.',
    },
    completedColor: {
      control: 'text',
      description: 'Пресеты: success, error, warning, primary… или `#hex`, `rgb()`, `var(--…)`.',
    },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    options: {
      table: { disable: true },
      description:
        'Плоский список. Не передавайте вместе с **`groups`** (тип исключает); в Storybook при приоритете **`groups`** значение из **`meta.args`** игнорируется.',
    },
    groups: {
      table: { disable: true },
      description:
        'Вместо **`options`**: **`{ label: string; options: SelectOption[] }[]`**. Секции с заголовком и разделителем; см. историю **Grouped options** и тип **`SelectOptionGroup`**.',
    },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
    searchThreshold: { control: 'number', table: { type: { summary: 'number' } } },
    searchPlaceholder: { control: 'text' },
    lazyLoadPageSize: { control: 'number', table: { type: { summary: 'number' } } },
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
      description:
        'По умолчанию — токен --z-dropdown (ниже PageHeader). Задайте для особых слоёв (модалка).',
    },
    dropdownMaxHeight: {
      control: 'number',
      description: 'Макс. высота выпадающего списка (px). По умолчанию 320.',
    },
    optionTextWrap: {
      control: 'boolean',
      description: 'Перенос длинных подписей опций на несколько строк.',
    },
    variant: {
      control: 'select',
      options: ['full', 'compact', 'compact-label', 'inline'],
      table: {
        type: { summary: "'full' | 'compact' | 'compact-label' | 'inline'" },
        defaultValue: { summary: "'full'" },
      },
    },
    mode: {
      control: 'inline-radio',
      options: [undefined, 'multiple'],
      description:
        '`multiple` — чекбоксы в списке и сводка в триггере (только **variant="full"**). Значение **`string[]`**.',
      table: { type: { summary: "'multiple' | undefined" } },
    },
    multipleSummaryLabel: { control: 'text' },
    multipleSummaryRender: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof SelectInput>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        {...({
          ...(args as object),
          value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        } as unknown as SelectInputProps)}
      />
    )
  },
  args: {
    label: 'Country',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: 'Select country',
    size: 'medium',
  },
}

export const CompletedFull: Story = {
  name: 'Completed (full)',
  render: function Render() {
    const [value, setValue] = useState('uz')
    return (
      <div style={{ width: 320, paddingBottom: 240 }}>
        <SelectInput
          label="Страна"
          completed
          placeholder="Выберите…"
          hint="Рамка оболочки в primary (как у TextInput)."
          options={COUNTRY_OPTIONS}
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: '**`variant="full"`** по умолчанию: **`completed`** красит рамку **`InputField`**.',
      },
    },
  },
}

export const CompletedCompact: Story = {
  name: 'Completed (compact)',
  render: function Render() {
    const [value, setValue] = useState('uz')
    return (
      <div style={{ paddingBottom: 120 }}>
        <SelectInput
          variant="compact"
          completed
          completedColor="var(--orange-500)"
          options={COUNTRY_OPTIONS}
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
          triggerAriaLabel="Страна"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: '**`variant="compact"`**: акцент на триггере; опционально **`completedColor`**.',
      },
    },
  },
}

export const GroupedOptions: Story = {
  name: 'Grouped options',
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        {...({
          ...(args as object),
          groups: GROUPED_FOOD_OPTIONS,
          value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        } as unknown as SelectInputProps)}
      />
    )
  },
  args: {
    label: 'Food',
    placeholder: 'Pick an item…',
    hint: 'Передайте **`groups`** вместо **`options`**. Если с **`meta.args`** попали оба, приоритет у **`groups`**.',
  },
}

const MULTI_FIELD_OPTIONS = [
  { value: 'docDate', label: 'Дата документа', description: 'Входящий' },
  { value: 'correspondent', label: 'Корреспондент', description: 'Входящий' },
  { value: 'delivery', label: 'Вид доставки', description: 'Входящий' },
  { value: 'incomingNo', label: 'Входящий номер', description: 'Входящий' },
  { value: 'outDate', label: 'Исходящая дата', description: 'Исходящий' },
  { value: 'executor', label: 'Исполнитель', description: 'Общий' },
]

/** Готовый фрагмент для вкладки Docs (не минифицированный render стори). */
const MULTIPLE_SUMMARY_DOCS_SOURCE = `import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'
import type { SelectInputMultipleChangeEvent } from '@v-lab/ui-kit'

const OPTIONS = [
  { value: 'docDate', label: 'Дата документа', description: 'Входящий' },
  { value: 'delivery', label: 'Вид доставки', description: 'Входящий' },
  { value: 'incomingNo', label: 'Входящий номер', description: 'Входящий' },
]

export function ExtraFieldsSelect() {
  const [value, setValue] = useState<string[]>(['delivery', 'incomingNo'])

  return (
    <SelectInput
      mode="multiple"
      label="Ещё поля"
      placeholder="Выберите поля…"
      hint="Подсказка под полем (скрывается, если задан error)."
      options={OPTIONS}
      value={value}
      onChange={(e: SelectInputMultipleChangeEvent) => setValue(e.target.value)}
      searchPlaceholder="Поиск поля"
      multipleSummaryLabel="Изменить выбор"
    />
  )
}
`

/** `mode="multiple"`: чекбоксы в списке, сводка «Label (N)» в триггере (как Ant Design multi). */
export const MultipleSummary: Story = {
  name: 'Multiple (summary)',
  render: function Render() {
    const [value, setValue] = useState<string[]>(['delivery', 'incomingNo'])
    return (
      <div style={{ width: 360 }}>
        <SelectInput
          mode="multiple"
          label="Ещё поля"
          placeholder="Выберите поля…"
          hint="Подсказка под полем (скрывается, если задан error)."
          options={MULTI_FIELD_OPTIONS}
          value={value}
          onChange={(e: SelectInputMultipleChangeEvent) => setValue(e.target.value)}
          searchPlaceholder="Поиск поля"
          multipleSummaryLabel="Изменить выбор"
        />
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Значение — **`string[]`**, **`onChange`** — **`SelectInputMultipleChangeEvent`**. Выпадающая панель **не закрывается** при переключении пунктов. Поле поиска в списке показывается, когда опций **больше одной**.',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: MULTIPLE_SUMMARY_DOCS_SOURCE,
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
      <SelectInput
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        options={COUNTRY_OPTIONS}
        hint="This is a hint text to help user."
      />
      <SelectInput
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        options={COUNTRY_OPTIONS}
        defaultValue="uz"
        hint="This is a hint text to help user."
      />
      <SelectInput
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        options={COUNTRY_OPTIONS}
        hint="This is a hint text to help user."
        disabled
      />
      <SelectInput
        label="Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select country"
        options={COUNTRY_OPTIONS}
        defaultValue="uz"
        error="This is a hint text to help user."
      />

      {/* With prefix — static icon */}
      <SelectInput
        label="Change Label"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Placeholder text..."
        options={COUNTRY_OPTIONS}
        prefix={<FlashIcon />}
        hint="This is a hint text to help user."
      />
      <SelectInput
        label="Select Country"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select a country..."
        options={COUNTRY_OPTIONS}
        prefix={<GlobeIcon />}
        hint="This is a hint text to help user."
      />

      {/* With prefix — dynamic avatar (user selected) */}
      <SelectInput
        label="Select User"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select a user..."
        options={USER_OPTIONS}
        defaultValue="u2"
        prefix={<UserAvatar src="https://i.pravatar.cc/32?img=2" name="Bob Smith" />}
        hint="This is a hint text to help user."
      />
      <SelectInput
        label="Select User"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select a user..."
        options={USER_OPTIONS}
        prefix={<PersonIcon />}
        hint="This is a hint text to help user."
        disabled
      />

      {/* With prefix — dynamic payment icon */}
      <SelectInput
        label="Payment Method"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select a provider..."
        options={PAYMENT_OPTIONS}
        defaultValue="mc-4242"
        prefix={<MastercardIcon />}
        hint="This is a hint text to help user."
      />
      <SelectInput
        label="Payment Method"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Select a provider..."
        options={PAYMENT_OPTIONS}
        defaultValue="mc-4242"
        prefix={<MastercardIcon />}
        error="This is a hint text to help user."
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: COUNTRY_OPTIONS,
    hint: 'This is a hint text to help user.',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: COUNTRY_OPTIONS,
    defaultValue: 'uz',
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: COUNTRY_OPTIONS,
    value: '',
    error: 'Please select a country',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: COUNTRY_OPTIONS,
    hint: 'This field is unavailable',
    disabled: true,
  },
}

export const WithPrefix: Story = {
  name: 'With Prefix Icon',
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        {...({
          ...(args as object),
          value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        } as unknown as SelectInputProps)}
      />
    )
  },
  args: {
    label: 'Select Country',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: 'Select a country...',
    options: COUNTRY_OPTIONS,
    prefix: <GlobeIcon />,
    hint: 'This is a hint text to help user.',
  },
}

export const UserSelect: Story = {
  name: 'User Select with Avatar',
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        {...({
          ...(args as object),
          options: USER_OPTIONS,
          value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        } as unknown as SelectInputProps)}
      />
    )
  },
  args: {
    label: 'Select User',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: 'Select a user...',
    prefix: <PersonIcon />,
    hint: 'Avatar подставляется автоматически из option.icon при выборе.',
  },
}

export const PaymentMethodSelect: Story = {
  name: 'Payment Method Select',
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        {...({
          ...(args as object),
          options: PAYMENT_OPTIONS,
          value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        } as unknown as SelectInputProps)}
      />
    )
  },
  args: {
    label: 'Payment Method',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: 'Select a provider...',
    prefix: <RiBankCardFill size={16} />,
    hint: 'Иконка подставляется автоматически из option.icon при выборе.',
  },
}

const TEXT_OPTIONS = [
  { value: '48', label: '48' },
  { value: '24', label: '24' },
  { value: '16', label: '16' },
]

const CURRENCY_OPTIONS = [
  {
    value: 'usd',
    label: 'US Dollar',
    shortLabel: 'USD',
    icon: <FlagUnitedStates size={20} />,
  },
  {
    value: 'eur',
    label: 'Euro',
    shortLabel: 'EUR',
    icon: <FlagEuropeanUnion size={20} />,
  },
  {
    value: 'uzs',
    label: 'Uzbekistani Sum',
    shortLabel: 'UZS',
    icon: <FlagUzbekistan size={20} />,
  },
  {
    value: 'rub',
    label: 'Russian Ruble',
    shortLabel: 'RUB',
    icon: <FlagRussia size={20} />,
  },
  {
    value: 'kzt',
    label: 'Kazakhstani Tenge',
    shortLabel: 'KZT',
    icon: <FlagKazakhstan size={20} />,
  },
]

const LANG_OPTIONS = [
  { value: 'en', label: 'English', shortLabel: 'EN', icon: <GlobeIcon /> },
  { value: 'ru', label: 'Russian', shortLabel: 'RU', icon: <GlobeIcon /> },
  { value: 'uz', label: 'Uzbek', shortLabel: 'UZ', icon: <GlobeIcon /> },
]

export const CompactGallery: Story = {
  name: '📋 Compact — All States',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 48,
          overflow: 'visible',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => {
    const SIZES = ['big', 'medium', 'small'] as const
    type RowConfig = {
      label: string
      iconProps?: object
      textProps?: object
    }
    const rows: RowConfig[] = [
      { label: 'Default (empty)', iconProps: {}, textProps: {} },
      {
        label: 'Filled',
        iconProps: { defaultValue: 'uz' },
        textProps: { defaultValue: '48' },
      },
      { label: 'Disabled', iconProps: { disabled: true }, textProps: { disabled: true } },
      { label: 'Error', iconProps: { error: 'Error' }, textProps: { error: 'Error' } },
    ]
    return (
      <>
        {rows.map(({ label, iconProps = {}, textProps = {} }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#888', width: 100, flexShrink: 0 }}>{label}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {SIZES.map((size) => (
                <SelectInput
                  key={`flash-${size}`}
                  variant="compact"
                  size={size}
                  prefix={<FlashIcon />}
                  options={COUNTRY_OPTIONS}
                  placeholder="..."
                  {...iconProps}
                />
              ))}
              {SIZES.map((size) => (
                <SelectInput
                  key={`globe-${size}`}
                  variant="compact"
                  size={size}
                  prefix={<GlobeIcon />}
                  options={COUNTRY_OPTIONS}
                  placeholder="..."
                  {...iconProps}
                />
              ))}
              {SIZES.map((size) => (
                <SelectInput
                  key={`text-${size}`}
                  variant="compact"
                  size={size}
                  options={TEXT_OPTIONS}
                  placeholder="—"
                  {...textProps}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const CompactWithLabelGallery: Story = {
  name: '📋 Compact + Label — All States',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 48,
          overflow: 'visible',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => {
    const SIZES = ['big', 'medium', 'small'] as const
    type RowConfig = { label: string; extraProps?: object }
    const rows: RowConfig[] = [
      { label: 'Default (empty)', extraProps: {} },
      { label: 'Filled', extraProps: { defaultValue: 'usd' } },
      { label: 'Disabled', extraProps: { disabled: true } },
      { label: 'Error', extraProps: { error: 'Error' } },
    ]
    return (
      <>
        {rows.map(({ label, extraProps = {} }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#888', width: 100, flexShrink: 0 }}>{label}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* Currency: $ / € / UZS symbols */}
              {SIZES.map((size) => (
                <SelectInput
                  key={`cur-${size}`}
                  variant="compact-label"
                  size={size}
                  options={CURRENCY_OPTIONS}
                  placeholder="USD"
                  {...extraProps}
                />
              ))}
              {/* Language with globe icon */}
              {SIZES.map((size) => (
                <SelectInput
                  key={`lang-${size}`}
                  variant="compact-label"
                  size={size}
                  prefix={<GlobeIcon />}
                  options={LANG_OPTIONS}
                  placeholder="EN"
                  {...extraProps}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const InlineGallery: Story = {
  name: '📋 Inline — All States',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 48,
          overflow: 'visible',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => {
    const SIZES = ['big', 'medium', 'small'] as const
    type RowConfig = { label: string; extraProps?: object }
    const rows: RowConfig[] = [
      { label: 'Default (empty)', extraProps: {} },
      { label: 'Filled', extraProps: { defaultValue: 'usd' } },
      { label: 'Disabled', extraProps: { disabled: true } },
      { label: 'Error', extraProps: { error: 'Error' } },
    ]
    return (
      <>
        {rows.map(({ label, extraProps = {} }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#888', width: 100, flexShrink: 0 }}>{label}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {SIZES.map((size) => (
                <SelectInput
                  key={`cur-${size}`}
                  variant="inline"
                  size={size}
                  options={CURRENCY_OPTIONS}
                  placeholder="USD"
                  {...extraProps}
                />
              ))}
              {SIZES.map((size) => (
                <SelectInput
                  key={`lang-${size}`}
                  variant="inline"
                  size={size}
                  prefix={<GlobeIcon />}
                  options={LANG_OPTIONS}
                  placeholder="EN"
                  {...extraProps}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const Compact: Story = {
  name: 'Compact Mode',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 48,
          minHeight: 200,
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        {...({
          ...(args as object),
          value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        } as unknown as SelectInputProps)}
      />
    )
  },
  args: {
    variant: 'compact',
    prefix: <GlobeIcon />,
    options: CURRENCY_OPTIONS,
    placeholder: 'USD',
    size: 'medium',
  },
}

export const Placements: Story = {
  name: 'Dropdown Placements',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(200px, 280px))',
          gap: 32,
          padding: 40,
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#737373' }}>placement="bottom"</div>
        <SelectInput
          variant="compact"
          placeholder="Select..."
          options={COUNTRY_OPTIONS}
          placement="bottom"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#737373' }}>placement="top"</div>
        <SelectInput
          variant="compact"
          placeholder="Select..."
          options={COUNTRY_OPTIONS}
          placement="top"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#737373' }}>placement="left"</div>
        <SelectInput
          variant="compact"
          placeholder="Select..."
          options={COUNTRY_OPTIONS}
          placement="left"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#737373' }}>placement="right"</div>
        <SelectInput
          variant="compact"
          placeholder="Select..."
          options={COUNTRY_OPTIONS}
          placement="right"
        />
      </div>
    </>
  ),
  parameters: { controls: { disable: true } },
}

export const LargeListWithSearch: Story = {
  name: 'Large list (search + lazy load)',
  args: {
    label: 'Select option',
    placeholder: 'Select...',
    options: LARGE_LIST_OPTIONS,
    hint: 'Поиск и подгрузка при скролле (200 элементов)',
    searchPlaceholder: 'Search...',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px 300px 400px',
          overflow: 'visible',
        }}
      >
        <div style={{ width: 320, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

const LONG_LABEL_OPTIONS = [
  {
    value: 'a',
    label:
      'Очень длинное название опции — перенос и ограничение высоты списка задаются пропсами dropdownMaxHeight и optionTextWrap',
  },
  { value: 'b', label: 'Короткая опция' },
  {
    value: 'c',
    label:
      'Ещё одна длинная строка для проверки переноса и скролла внутри выпадающего списка без глобальных стилей в приложении',
  },
]

export const LongLabelsWrapAndMaxHeight: Story = {
  name: 'Длинные подписи (optionTextWrap + dropdownMaxHeight)',
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        label="Выбор"
        placeholder="Выберите…"
        options={LONG_LABEL_OPTIONS}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
        optionTextWrap
        dropdownMaxHeight={200}
        hint="optionTextWrap и dropdownMaxHeight — без переопределения классов в CSS приложения"
      />
    )
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px 300px 400px',
          overflow: 'visible',
        }}
      >
        <div style={{ width: 320, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: { controls: { disable: true } },
}

const MEGA_LONG_OPTIONS = [
  {
    value: 'contract',
    label:
      'Договор на оказание услуг по разработке программного обеспечения для автоматизации бизнес-процессов предприятия №12345 от 15 марта 2026 года',
  },
  {
    value: 'report',
    label:
      'Ежеквартальный отчёт о выполнении плана работ по модернизации инфраструктуры центра обработки данных за IV квартал 2025 финансового года',
  },
  {
    value: 'policy',
    label:
      'Политика информационной безопасности и защиты персональных данных сотрудников и клиентов организации (с учётом изменений и дополнений)',
  },
  { value: 'short', label: 'Короткая' },
  {
    value: 'spec',
    label:
      'Техническое задание на проектирование и внедрение системы мониторинга и управления серверным оборудованием в рамках проекта «Облачная платформа V-Lab» — версия 3.2.1-rc1',
  },
]

export const MegaLongLabels: Story = {
  name: 'Мега-длинный текст в опциях',
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <SelectInput
        label="Документ"
        placeholder="Выберите документ…"
        options={MEGA_LONG_OPTIONS}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)}
        optionTextWrap
        hint="Проверка dropdown ширины при длинных опциях."
      />
    )
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px 300px 400px',
          overflow: 'visible',
        }}
      >
        <div style={{ width: 320, overflow: 'visible' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: { controls: { disable: true } },
}
