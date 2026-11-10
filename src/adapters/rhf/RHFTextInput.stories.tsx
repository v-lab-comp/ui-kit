import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { RHFTextInput } from './RHFTextInput'

const meta: Meta = {
  title: 'Adapters/RHFTextInput',
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

// ── helpers ──────────────────────────────────────────────────────────────────

interface SimpleForm {
  username: string
}

interface LoginForm {
  username: string
  password: string
}

// ── story components (hooks must be in components) ──────────────────────────────

function BasicForm() {
  const { control } = useForm<SimpleForm>({ defaultValues: { username: '' } })
  return (
    <RHFTextInput
      name="username"
      control={control}
      label="Username"
      placeholder="johndoe"
      hint="Choose a unique username."
    />
  )
}

function WithValidationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SimpleForm>({ defaultValues: { username: '' } })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RHFTextInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'At least 3 characters' },
        }}
        label="Username"
        placeholder="johndoe"
        hint="Try submitting empty to see error"
      />
      <button
        type="button"
        onClick={handleSubmit(
          (data) => alert(`Submitted: ${JSON.stringify(data)}`),
          () => {}
        )}
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
      {errors.username && (
        <p style={{ fontSize: 12, color: 'var(--error-base)', margin: 0 }}>
          Form error: {errors.username.message}
        </p>
      )}
    </div>
  )
}

function LoginFormStory() {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { username: '', password: '' },
  })
  return (
    <form
      onSubmit={handleSubmit((data) => alert(`Login: ${JSON.stringify(data)}`))}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <RHFTextInput
        name="username"
        control={control}
        rules={{ required: 'Username is required' }}
        label="Username"
        placeholder="johndoe"
      />
      <RHFTextInput
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 characters' },
        }}
        label="Password"
        placeholder="••••••••"
        type="password"
        hint="At least 8 characters"
      />
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          borderRadius: 8,
          background: 'var(--primary-base)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Sign in
      </button>
    </form>
  )
}

function DisabledForm() {
  const { control } = useForm<SimpleForm>({ defaultValues: { username: 'johndoe' } })
  return (
    <RHFTextInput
      name="username"
      control={control}
      label="Username"
      hint="This field cannot be changed"
      disabled
    />
  )
}

// ── stories ──────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => <BasicForm />,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const { control } = useForm({ defaultValues: { username: '' } })

<RHFTextInput
  name="username"
  control={control}
  label="Username"
  placeholder="johndoe"
  hint="Choose a unique username."
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

export const LoginForm: Story = {
  name: 'Login Form',
  render: () => <LoginFormStory />,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const { control } = useForm({ defaultValues: { username: '', password: '' } })

<RHFTextInput
  name="username"
  control={control}
  rules={{ required: 'Username is required' }}
  label="Username"
  placeholder="johndoe"
/>
<RHFTextInput
  name="password"
  control={control}
  rules={{ required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } }}
  label="Password"
  placeholder="••••••••"
  type="password"
  hint="At least 8 characters"
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  render: () => <DisabledForm />,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const { control } = useForm({ defaultValues: { username: 'johndoe' } })

<RHFTextInput
  name="username"
  control={control}
  label="Username"
  hint="This field cannot be changed"
  disabled
/>`,
        format: true,
      },
    },
  },
}
