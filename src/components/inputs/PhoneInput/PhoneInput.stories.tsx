import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PhoneInput } from './index'
import { InfoIcon } from '@/stories/helpers'
import { Button } from '../../Button'

const meta: Meta<typeof PhoneInput> = {
  component: PhoneInput,
  title: 'Inputs/PhoneInput',
  tags: ['autodocs'],
  args: {
    defaultCountry: 'UZ',
    hint: 'This is a hint text to help user.',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: 320 }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    defaultCountry: { control: 'text' },
    locale: {
      control: 'select',
      options: ['ru', 'en', 'uz'],
      table: {
        type: { summary: "'ru' | 'en' | 'uz'" },
        defaultValue: { summary: "'ru'" },
      },
    },
    label: { control: 'text' },
    countryAriaLabel: {
      control: 'text',
      description:
        'Доступное имя селектора страны. По умолчанию — label поля, без label — название выбранной страны.',
    },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof PhoneInput>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <PhoneInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Phone',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: '90 123 45 67',
  },
}

export const ExternalValue: Story = {
  name: 'External value (form reset)',
  parameters: {
    docs: {
      description: {
        story:
          'Значение, пришедшее снаружи после монтирования (`reset` формы, другая запись в дровере), переключает страну по номеру. Значения не в E.164 нормализуются только для отображения — `onChange` не вызывается. Вставка полного номера (`+7 912 345 67 89`, `998901234567`) заменяет поле и переключает страну.',
      },
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PhoneInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['+79123456789', '+998901234567', '+998-901234567', '901234567', ''].map((v) => (
            <Button key={v} size="small" variant="stroke" onClick={() => setValue(v)}>
              {v || 'clear'}
            </Button>
          ))}
        </div>
        <code>value: {JSON.stringify(value)}</code>
      </div>
    )
  },
  args: {
    label: 'Phone',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Phone',
    defaultValue: '+998 901234567',
    hint: 'Pre-filled with Uzbekistan number.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Phone',
    defaultValue: '+998 901234567',
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Phone',
    defaultValue: '+998 901',
    error: 'Please enter a valid phone number.',
  },
}

export const LocaleEnglish: Story = {
  name: 'Locale: English',
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <PhoneInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Phone number',
    locale: 'en',
    defaultCountry: 'US',
  },
}

export const LocaleUzbek: Story = {
  name: 'Locale: Uzbek',
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <PhoneInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Telefon raqami',
    locale: 'uz',
    defaultCountry: 'UZ',
  },
}
