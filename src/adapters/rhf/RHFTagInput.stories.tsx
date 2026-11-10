import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { RHFTagInput } from './RHFTagInput'

const meta: Meta = {
  title: 'Adapters/RHFTagInput',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
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

interface TagsForm {
  tags: { id: string; label: string }[]
}

const SUGGESTIONS = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'docker', label: 'Docker' },
]

function BasicForm() {
  const { control } = useForm<TagsForm>({ defaultValues: { tags: [] } })
  return (
    <RHFTagInput
      name="tags"
      control={control}
      label="Skills"
      hint="Add skills relevant to the position."
      placeholder="Add a skill..."
      suggestions={SUGGESTIONS}
    />
  )
}

function WithValidationForm() {
  const { control, handleSubmit } = useForm<TagsForm>({ defaultValues: { tags: [] } })
  return (
    <form
      onSubmit={handleSubmit(
        (data) => alert(`Tags: ${data.tags.map((t) => t.label).join(', ')}`),
        () => {}
      )}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <RHFTagInput
        name="tags"
        control={control}
        rules={{
          validate: (v) => (Array.isArray(v) ? v.length > 0 : false) || 'Add at least one tag',
        }}
        label="Skills"
        hint="Try submitting without tags to see validation."
        placeholder="Add a skill..."
        suggestions={SUGGESTIONS}
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

export const Basic: Story = {
  render: () => <BasicForm />,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const { control } = useForm({ defaultValues: { tags: [] } })

<RHFTagInput
  name="tags"
  control={control}
  label="Skills"
  hint="Add skills relevant to the position."
  placeholder="Add a skill..."
  suggestions={SUGGESTIONS}
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
