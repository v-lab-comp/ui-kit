import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { RHFCheckbox } from './RHFCheckbox'

const meta: Meta = {
  title: 'Adapters/RHFCheckbox',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: { canvas: { sourceState: 'shown' } },
  },
}

export default meta
type Story = StoryObj

interface TermsForm {
  agreed: boolean
  newsletter: boolean
}

function BasicForm() {
  const { control } = useForm<TermsForm>({ defaultValues: { agreed: false, newsletter: false } })
  return (
    <RHFCheckbox
      name="agreed"
      control={control}
      label="I agree to the terms of service"
      hint="You must accept to continue."
    />
  )
}

function WithValidationForm() {
  const { control, handleSubmit } = useForm<TermsForm>({
    defaultValues: { agreed: false, newsletter: false },
  })
  return (
    <form
      onSubmit={handleSubmit(
        (data) => alert(`Submitted: ${JSON.stringify(data)}`),
        () => {}
      )}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <RHFCheckbox
        name="agreed"
        control={control}
        rules={{ required: 'You must accept the terms' }}
        label="I agree to the terms of service"
        hint="Try submitting without checking to see the error."
      />
      <RHFCheckbox
        name="newsletter"
        control={control}
        label="Subscribe to newsletter"
        hint="Optional."
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          background: 'var(--primary-base)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        Submit
      </button>
    </form>
  )
}

function DisabledForm() {
  const { control } = useForm<TermsForm>({ defaultValues: { agreed: true, newsletter: false } })
  return (
    <RHFCheckbox
      name="agreed"
      control={control}
      label="Terms already accepted"
      hint="This field cannot be changed."
      disabled
    />
  )
}

export const Basic: Story = {
  render: () => <BasicForm />,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const { control } = useForm({ defaultValues: { agreed: false } })

<RHFCheckbox
  name="agreed"
  control={control}
  label="I agree to the terms of service"
  hint="You must accept to continue."
/>`,
        format: true,
      },
    },
  },
}

export const WithValidation: Story = {
  name: 'With Validation',
  render: () => <WithValidationForm />,
}

export const Disabled: Story = {
  render: () => <DisabledForm />,
}
