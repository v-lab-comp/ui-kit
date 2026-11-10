import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'
import { CheckboxField } from './CheckboxField'
import { CheckboxCard } from './CheckboxCard'

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('applies checkbox class', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toHaveClass('vl-base-checkbox')
  })

  it('is unchecked by default', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders as checked when checked prop is true', () => {
    render(<Checkbox checked onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('sets indeterminate state via ref', () => {
    render(<Checkbox indeterminate />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange} disabled />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('forwards extra props to input element', () => {
    render(<Checkbox aria-label="custom label" />)
    expect(screen.getByRole('checkbox', { name: 'custom label' })).toBeInTheDocument()
  })
})

describe('CheckboxField', () => {
  it('renders label text', () => {
    render(<CheckboxField label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('renders hint when provided', () => {
    render(<CheckboxField hint="Optional hint" />)
    expect(screen.getByText('Optional hint')).toBeInTheDocument()
  })

  it('renders error instead of hint when both provided', () => {
    render(<CheckboxField hint="Hint" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('Hint')).not.toBeInTheDocument()
  })

  it('clicking label toggles checkbox', async () => {
    const onChange = vi.fn()
    render(<CheckboxField label="Accept terms" onChange={onChange} />)
    await userEvent.click(screen.getByText('Accept terms'))
    expect(onChange).toHaveBeenCalledOnce()
  })
})

describe('CheckboxField a11y', () => {
  it('names the checkbox by the label row only and describes it by description, link and hint', () => {
    const { container } = render(
      <CheckboxField
        label="Accept terms"
        description="Required to continue"
        link={<a href="/terms">Read terms</a>}
        hint="You can change it later"
      />
    )
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    expect(checkbox).toHaveAccessibleDescription(
      'Required to continue Read terms You can change it later'
    )
    expect(container.querySelector('label a')).toBeNull()
    expect(container.firstChild).not.toHaveAttribute('data-error')
  })

  it('links the error and marks the field with data-error / aria-invalid', () => {
    const { container } = render(<CheckboxField label="Accept" error="Must accept" />)
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' })
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    expect(checkbox).toHaveAccessibleDescription('Must accept')
    expect(container.firstChild).toHaveAttribute('data-error')
  })

  it('toggles when the label text is clicked', async () => {
    const onChange = vi.fn()
    render(<CheckboxField label="Accept" description="More" onChange={onChange} />)
    await userEvent.click(screen.getByText('Accept'))
    expect(onChange).toHaveBeenCalledOnce()
  })
})

describe('CheckboxCard a11y', () => {
  it('names the checkbox by the label row and describes it by description', async () => {
    render(<CheckboxCard label="Pro plan" description="Billed yearly" prefix={<span>P</span>} />)
    const checkbox = screen.getByRole('checkbox', { name: 'Pro plan' })
    expect(checkbox).toHaveAccessibleDescription('Billed yearly')
    await userEvent.click(screen.getByText('Billed yearly'))
    expect(checkbox).toBeChecked()
  })
})
