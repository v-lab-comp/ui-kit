import type { Meta, StoryObj } from '@storybook/react'
import { RiMailLine, RiUserLine, RiEyeLine, RiInformationLine } from '@remixicon/react'
import { InputField } from './InputField'
import { BaseInput } from '../BaseInput'

const meta: Meta<typeof InputField> = {
  component: InputField,
  title: 'Inputs/InputField',
  tags: ['autodocs'],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          '**InputField** — shared field wrapper used inside every input component. ' +
          'Provides: `label`, `hint`, `error`, `prefix`/`suffix`, `startBlock`/`endBlock`, `size`, `disabled`, `completed`/`completedColor`. ' +
          'Accepts `children` as a render function `(id: string) => ReactNode` for automatic label-input linking.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['big', 'medium', 'small'],
      table: { defaultValue: { summary: "'medium'" } },
    },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
    completed: { control: 'boolean' },
    completedColor: { control: 'text' },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
    startBlock: { table: { disable: true } },
    endBlock: { table: { disable: true } },
    children: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof InputField>

function InputInside(fieldId: string) {
  return (
    <BaseInput
      id={fieldId}
      size="medium"
      placeholder="Placeholder..."
      style={{
        flex: 1,
        minWidth: 0,
        height: 'auto',
        padding: 0,
        border: 'none',
        background: 'transparent',
        outline: 'none',
      }}
    />
  )
}

export const Playground: Story = {
  name: 'Playground',
  args: {
    label: 'Field label',
    hint: 'This is a hint text to help the user.',
    required: true,
    size: 'medium',
    disabled: false,
    completed: false,
  },
  render: (args) => <InputField {...args}>{InputInside}</InputField>,
}

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <InputField label="Default" hint="Hint text below the field.">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            placeholder="Empty state"
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="Required" hint="Required field." required>
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            placeholder="Required..."
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="Optional" optional hint="Optional field.">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            placeholder="Optional..."
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="With prefix" prefix={<RiMailLine size={16} />} hint="Email field.">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            placeholder="user@example.com"
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="With suffix" suffix={<RiEyeLine size={16} />} hint="Password field.">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            placeholder="••••••••"
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="Completed" completed hint="Field is completed." completedColor="success">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            defaultValue="John Doe"
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="Error" error="This field is required.">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            hasError
            placeholder="Empty..."
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>

      <InputField label="Disabled" hint="Cannot edit." disabled>
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            placeholder="Disabled..."
            disabled
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              padding: 0,
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        )}
      </InputField>
    </>
  ),
}

export const WithPrefixAndSuffix: Story = {
  name: 'Prefix & Suffix',
  args: {
    label: 'Username',
    hint: 'Choose your username.',
    prefix: <RiUserLine size={16} />,
    suffix: <RiInformationLine size={16} />,
  },
  render: (args) => (
    <InputField {...args}>
      {(id) => (
        <BaseInput
          id={id}
          size="medium"
          placeholder="johndoe"
          style={{
            flex: 1,
            minWidth: 0,
            height: 'auto',
            padding: 0,
            border: 'none',
            background: 'transparent',
            outline: 'none',
          }}
        />
      )}
    </InputField>
  ),
}

export const Sizes: Story = {
  name: 'Sizes — big / medium / small',
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      {(['big', 'medium', 'small'] as const).map((size) => (
        <InputField
          key={size}
          label={`Size: ${size}`}
          hint={`height: ${size === 'big' ? 40 : size === 'medium' ? 36 : 32}px`}
          size={size}
        >
          {(id) => (
            <BaseInput
              id={id}
              size={size}
              placeholder={`${size} input`}
              style={{
                flex: 1,
                minWidth: 0,
                height: 'auto',
                padding: 0,
                border: 'none',
                background: 'transparent',
                outline: 'none',
              }}
            />
          )}
        </InputField>
      ))}
    </>
  ),
}

export const WithLabelTooltip: Story = {
  name: 'Label Tooltip',
  args: {
    label: 'Billing address',
    hint: 'Address used for invoice.',
    labelTooltip: <RiInformationLine size={14} style={{ color: 'var(--text-soft-400)' }} />,
  },
  render: (args) => (
    <InputField {...args}>
      {(id) => (
        <BaseInput
          id={id}
          size="medium"
          placeholder="123 Main St"
          style={{
            flex: 1,
            minWidth: 0,
            height: 'auto',
            padding: 0,
            border: 'none',
            background: 'transparent',
            outline: 'none',
          }}
        />
      )}
    </InputField>
  ),
}
