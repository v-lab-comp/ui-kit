# Modal Component Testing Guide

Testing patterns for the Modal component with Vitest + React Testing Library.

## Basic Test Structure

```tsx
import { useRef } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalHeader, ModalBody, type ModalHandle } from './Modal'

// Wrapper component for testing (modals need to be in DOM)
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</> // Modal renders to document.body via FloatingPortal
}
```

## Opening and Closing

```tsx
it('opens when ref method is called', async () => {
  const { getByRole } = render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const modal = screen.queryByRole('dialog')
  expect(modal).not.toBeInTheDocument() // Initially hidden

  const openButton = getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

it('closes when ref method is called', async () => {
  const { getByRole } = render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>
        <button onClick={(e) => e.currentTarget.closest('[role="dialog"]')}>Close</button>
      </ModalBody>
    </TestModal>
  )

  const openButton = getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  const closeButton = getByRole('button', { name: 'Close' })
  await userEvent.click(closeButton)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
```

## Testing Dismiss Behavior

```tsx
it('closes on Escape key', async () => {
  render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  expect(screen.getByRole('dialog')).toBeInTheDocument()

  // Press Escape
  await userEvent.keyboard('{Escape}')

  // Modal should close
  await expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

it('closes on backdrop click', async () => {
  const { container } = render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const backdrop = container.querySelector('[aria-hidden]')
  expect(backdrop).toBeInTheDocument()

  await userEvent.click(backdrop!)

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

it('does not close on backdrop click when closeOnBackdropClick=false', async () => {
  const { container } = render(
    <TestModal closeOnBackdropClick={false}>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const backdrop = container.querySelector('[aria-hidden]')
  await userEvent.click(backdrop!)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
```

## Testing Accessibility

```tsx
it('has correct ARIA attributes', async () => {
  render(
    <TestModal>
      <ModalHeader title="Accessible Modal" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-modal', 'true')
  expect(modal).toHaveAttribute('aria-labelledby')
})

it('uses aria-label as fallback', async () => {
  render(
    <TestModal ariaLabel="Custom Label">
      <ModalBody>Content (no ModalHeader)</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', 'Custom Label')
})

it('links title to modal via aria-labelledby', async () => {
  render(
    <TestModal>
      <ModalHeader title="Modal Title" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const modal = screen.getByRole('dialog')
  const labelledById = modal.getAttribute('aria-labelledby')
  expect(labelledById).toBeTruthy()

  const titleElement = document.getElementById(labelledById!)
  expect(titleElement?.textContent).toContain('Modal Title')
})
```

## Testing Body Overflow Management

```tsx
it('sets body overflow to hidden when opened', async () => {
  render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  expect(document.body.style.overflow).not.toBe('hidden')

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  expect(document.body.style.overflow).toBe('hidden')
})

it('restores body overflow when closed', async () => {
  render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)
  expect(document.body.style.overflow).toBe('hidden')

  await userEvent.keyboard('{Escape}')
  expect(document.body.style.overflow).toBe('')
})

afterEach(() => {
  // Clean up body style
  document.body.style.overflow = ''
})
```

## Testing Focus Management

```tsx
it('traps focus inside modal', async () => {
  const { container } = render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>
        <button>Button 1</button>
        <button>Button 2</button>
      </ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  // Focus should be inside modal
  const modal = screen.getByRole('dialog')
  expect(modal).toHaveFocus() // or check focused element is within modal
})

it('returns focus to trigger element on close', async () => {
  render(
    <TestModal>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  openButton.focus()

  await userEvent.click(openButton)
  await userEvent.keyboard('{Escape}')

  expect(openButton).toHaveFocus()
})
```

## Testing Props

```tsx
it('applies width prop', async () => {
  const { container } = render(
    <TestModal width={600}>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const panel = container.querySelector('[role="dialog"]')
  expect(panel).toHaveStyle({ width: '600px' })
})

it('applies className to root', async () => {
  const { container } = render(
    <TestModal className="custom-root">
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const root = container.querySelector('.custom-root')
  expect(root).toBeInTheDocument()
})

it('applies zIndex prop', async () => {
  const { container } = render(
    <TestModal zIndex={9999}>
      <ModalHeader title="Test" />
      <ModalBody>Content</ModalBody>
    </TestModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const root = container.querySelector('[role="presentation"]')
  expect(root).toHaveStyle({ zIndex: '9999' })
})
```

## Test Wrapper Component

```tsx
// Create reusable test wrapper
function TestModal({ children, ...props }: React.ComponentProps<typeof Modal>) {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open</button>
      <Modal ref={modalRef} {...props}>
        {children}
      </Modal>
    </>
  )
}
```

## Common Assertions

```tsx
// Modal is visible
expect(screen.getByRole('dialog')).toBeInTheDocument()

// Modal is hidden
expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

// Modal title is present
expect(screen.getByRole('heading', { name: 'Modal Title' })).toBeInTheDocument()

// Modal has correct content
expect(screen.getByText('Modal content')).toBeInTheDocument()

// Modal is modal dialog
expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')

// Body overflow is managed
expect(document.body.style.overflow).toBe('hidden')

// Close button exists
expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument()
```

## Mocking Modal in Other Components

When testing components that use Modal, you might want to mock it:

```tsx
import { vi } from 'vitest'
import * as Modal from './Modal'

vi.mock('./Modal', async () => {
  const actual = await vi.importActual<typeof Modal>('./Modal')
  return {
    ...actual,
    Modal: vi.fn(({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-modal">{children}</div>
    )),
  }
})
```

## Async Testing Patterns

```tsx
it('handles async operations', async () => {
  const mockFetch = vi.fn().mockResolvedValue({ ok: true })

  render(
    <TestAsyncModal onSubmit={mockFetch}>
      <ModalHeader title="Async Test" />
      <ModalBody>
        <button type="submit">Submit</button>
      </ModalBody>
    </TestAsyncModal>
  )

  const openButton = screen.getByRole('button', { name: 'Open' })
  await userEvent.click(openButton)

  const submitButton = screen.getByRole('button', { name: 'Submit' })
  await userEvent.click(submitButton)

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalled()
  })

  // Modal should close after successful submit
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
```

## Cleanup

Always clean up after modal tests:

```tsx
afterEach(() => {
  // Restore body overflow
  document.body.style.overflow = ''

  // Clear all modals from DOM
  const portals = document.querySelectorAll('[style*="position"]')
  portals.forEach((el) => el.remove())
})
```
