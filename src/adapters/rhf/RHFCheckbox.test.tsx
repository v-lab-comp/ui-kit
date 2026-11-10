import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { RHFCheckbox } from './RHFCheckbox'

function Form({ onSubmit }: { onSubmit: (data: { agreed: boolean }) => void }) {
  const { control, handleSubmit } = useForm({ defaultValues: { agreed: false } })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFCheckbox name="agreed" control={control} label="Agree" />
      <button type="submit">Submit</button>
    </form>
  )
}

describe('RHFCheckbox', () => {
  it('does not put the boolean field value on the native value attribute', async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)
    const checkbox = screen.getByRole('checkbox', { name: 'Agree' })
    expect(checkbox).not.toHaveAttribute('value')
    expect(checkbox).toHaveAttribute('name', 'agreed')

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalledWith({ agreed: true }, expect.anything())
  })
})
