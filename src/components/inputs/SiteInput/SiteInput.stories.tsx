import { type FormEvent, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SiteInput } from './SiteInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon } from '@/stories/helpers'
import type { SelectOptionWithShortLabel } from '../SelectInput'

const PROTOCOL_OPTIONS: SelectOptionWithShortLabel[] = [
  { value: 'https://', shortLabel: 'https://', label: 'HTTPS (Secure)' },
  { value: 'http://', shortLabel: 'http://', label: 'HTTP' },
  { value: 'ftp://', shortLabel: 'ftp://', label: 'FTP' },
]

// ── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof SiteInput> = {
  component: SiteInput,
  title: 'Inputs/SiteInput',
  tags: ['autodocs'],
  args: {
    hint: 'This is a hint text to help user.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
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
    protocol: { control: 'text' },
    protocolAriaLabel: {
      control: 'text',
      description:
        'Доступное имя селектора протокола. По умолчанию — label поля, без label — label выбранной опции.',
    },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    endBlock: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof SiteInput>

// ── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('https://')
    return <SiteInput {...args} value={value} onChange={(next) => setValue(next)} />
  },
  args: {
    label: 'Website',
    required: true,
    optional: true,
    placeholder: 'www.example.com',
    size: 'medium',
  },
}

// ── Gallery: all states ───────────────────────────────────────────────────

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <SiteInput
        label="Website"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="www.example.com"
        hint="This is a hint text to help user."
      />
      <SiteInput
        label="Website"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="https://www.example.com"
        hint="This is a hint text to help user."
      />
      <SiteInput
        label="Website"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="www.example.com"
        hint="This is a hint text to help user."
        disabled
      />
      <SiteInput
        label="Website"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="https://www.example.com"
        error="This is a hint text to help user."
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}

// ── Individual stories ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Website',
    placeholder: 'www.example.com',
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Website',
    defaultValue: 'https://not a url',
    error: 'Enter a valid website address',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Website',
    placeholder: 'www.example.com',
    hint: 'This field is unavailable',
    disabled: true,
  },
}

export const CustomProtocol: Story = {
  args: {
    label: 'FTP Server',
    protocol: 'ftp://',
    placeholder: 'files.example.com',
    hint: 'Enter your FTP server address',
  },
}

export const WithProtocolSelect: Story = {
  name: 'With Protocol Selector',
  render: function Render(args) {
    const [value, setValue] = useState('https://')
    return <SiteInput {...args} value={value} onChange={(next) => setValue(next)} />
  },
  args: {
    label: 'Website',
    required: true,
    placeholder: 'www.example.com',
    hint: 'Choose a protocol and enter the address.',
    protocolOptions: PROTOCOL_OPTIONS,
  },
}

export const FormDemo: Story = {
  name: 'Form Submission Demo',
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  render: function Render() {
    const [value, setValue] = useState('https://')
    const [formData, setFormData] = useState<Record<string, string> | null>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(e.currentTarget))
      setFormData(data as Record<string, string>)
    }

    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SiteInput
          name="website"
          label="Website"
          placeholder="www.example.com"
          hint="Change protocol and type a URL, then press Submit."
          protocolOptions={PROTOCOL_OPTIONS}
          value={value}
          onChange={(next) => setValue(next)}
        />
        <button type="submit" style={{ alignSelf: 'flex-start', padding: '8px 16px' }}>
          Submit
        </button>
        {formData && (
          <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 8, fontSize: 13 }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        )}
      </form>
    )
  },
  parameters: { controls: { disable: true } },
}

export const WithProtocolSelectGallery: Story = {
  name: '📋 Gallery — Protocol Selector',
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 340 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <SiteInput
        label="Website"
        placeholder="www.example.com"
        hint="Empty state with protocol selector."
        protocolOptions={PROTOCOL_OPTIONS}
      />
      <SiteInput
        label="Website"
        defaultValue="https://www.example.com"
        hint="Filled with https."
        protocolOptions={PROTOCOL_OPTIONS}
      />
      <SiteInput
        label="Website"
        defaultValue="http://www.example.com"
        hint="Filled with http."
        protocolOptions={PROTOCOL_OPTIONS}
      />
      <SiteInput
        label="Website"
        placeholder="www.example.com"
        hint="Disabled state."
        protocolOptions={PROTOCOL_OPTIONS}
        disabled
      />
      <SiteInput
        label="Website"
        defaultValue="https://bad url"
        error="Enter a valid website address."
        protocolOptions={PROTOCOL_OPTIONS}
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}
