import { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '@/components/Button'
import { ConfirmModal, type ModalHandle } from '../..'

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  title: 'Overlays/ConfirmModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Ready-to-use confirmation dialog. Handles loading state, async operations, and destructive action warnings automatically.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    confirmColor: { control: 'select', options: ['primary', 'error', 'success'] },
    isDestructive: { control: 'boolean' },
    width: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmModal>

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const confirmRef = useRef<ModalHandle>(null)

    const handleConfirm = async () => {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    return (
      <>
        <Button onClick={() => confirmRef.current?.open()}>Open ConfirmModal</Button>
        <ConfirmModal
          ref={confirmRef}
          title={args.title}
          subtitle={args.subtitle}
          confirmText={args.confirmText}
          cancelText={args.cancelText}
          confirmColor={args.confirmColor}
          isDestructive={args.isDestructive}
          width={args.width}
          onConfirm={handleConfirm}
        >
          {args.children}
        </ConfirmModal>
      </>
    )
  },
  args: {
    title: 'Confirm action?',
    subtitle: 'Are you sure about this?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmColor: 'primary',
    isDestructive: false,
    children: 'This action cannot be easily undone.',
  },
}

export const DeleteAction: Story = {
  name: 'Example: Delete (destructive)',
  render: function DeleteStory() {
    const confirmRef = useRef<ModalHandle>(null)
    const logDeleted = fn()

    const handleDelete = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      logDeleted()
    }

    return (
      <>
        <Button variant="stroke" color="error" onClick={() => confirmRef.current?.open()}>
          Delete Item
        </Button>
        <ConfirmModal
          ref={confirmRef}
          title="Delete item permanently?"
          subtitle="This action cannot be undone."
          confirmText="Delete"
          confirmColor="error"
          isDestructive
          onConfirm={handleDelete}
        >
          <p>All associated data will be removed.</p>
        </ConfirmModal>
      </>
    )
  },
}

export const ApproveAction: Story = {
  name: 'Example: Approve (success)',
  render: function ApproveStory() {
    const confirmRef = useRef<ModalHandle>(null)
    const logApproved = fn()

    const handleApprove = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      logApproved()
    }

    return (
      <>
        <Button color="success" onClick={() => confirmRef.current?.open()}>
          Approve Changes
        </Button>
        <ConfirmModal
          ref={confirmRef}
          title="Approve changes?"
          subtitle="This will publish to production."
          confirmText="Approve"
          confirmColor="success"
          onConfirm={handleApprove}
        >
          <p>Review all changes before approving.</p>
        </ConfirmModal>
      </>
    )
  },
}

export const WithCallback: Story = {
  name: 'Example: With cancel callback',
  render: function CallbackStory() {
    const confirmRef = useRef<ModalHandle>(null)
    const logConfirmed = fn()
    const logCancelled = fn()

    const handleConfirm = async () => {
      logConfirmed()
    }

    const handleCancel = () => {
      logCancelled()
    }

    return (
      <>
        <Button onClick={() => confirmRef.current?.open()}>Continue</Button>
        <ConfirmModal
          ref={confirmRef}
          title="Continue to next step?"
          confirmText="Continue"
          cancelText="Go Back"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        >
          <p>You can always come back later.</p>
        </ConfirmModal>
      </>
    )
  },
}

export const CustomSize: Story = {
  name: 'Example: Custom size with more content',
  render: function CustomSizeStory() {
    const confirmRef = useRef<ModalHandle>(null)

    return (
      <>
        <Button onClick={() => confirmRef.current?.open()}>Show Large Confirm</Button>
        <ConfirmModal
          ref={confirmRef}
          title="Important Confirmation"
          subtitle="Please read carefully before confirming"
          width={600}
          confirmText="I understand"
          onConfirm={async () => {}}
        >
          <p>
            This dialog has custom width and can contain more content. You can use it for longer
            explanations or lists.
          </p>
          <ul style={{ marginTop: 12 }}>
            <li>First point</li>
            <li>Second point</li>
            <li>Third point</li>
          </ul>
        </ConfirmModal>
      </>
    )
  },
}

export const LoadingState: Story = {
  name: 'Example: Simulated async operation',
  render: function LoadingStory() {
    const confirmRef = useRef<ModalHandle>(null)

    const handleAsyncAction = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    return (
      <>
        <Button onClick={() => confirmRef.current?.open()}>Trigger Async</Button>
        <ConfirmModal
          ref={confirmRef}
          title="Process data?"
          confirmText="Process"
          onConfirm={handleAsyncAction}
        >
          <p>This will process your data (simulated: 2 seconds).</p>
          <p>The button shows "..." while processing.</p>
        </ConfirmModal>
      </>
    )
  },
}

export const MultipleConfirms: Story = {
  name: 'Example: Multiple independent confirmations',
  render: function MultipleStory() {
    const deleteRef = useRef<ModalHandle>(null)
    const archiveRef = useRef<ModalHandle>(null)
    const resetRef = useRef<ModalHandle>(null)
    const logDeleted = fn()
    const logArchived = fn()
    const logReset = fn()

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="stroke" color="error" onClick={() => deleteRef.current?.open()}>
          Delete
        </Button>
        <Button variant="stroke" onClick={() => archiveRef.current?.open()}>
          Archive
        </Button>
        <Button variant="stroke" onClick={() => resetRef.current?.open()}>
          Reset
        </Button>

        <ConfirmModal
          ref={deleteRef}
          title="Delete permanently?"
          confirmText="Delete"
          confirmColor="error"
          isDestructive
          onConfirm={async () => {
            logDeleted()
          }}
        >
          <p>This cannot be undone.</p>
        </ConfirmModal>

        <ConfirmModal
          ref={archiveRef}
          title="Archive this?"
          confirmText="Archive"
          onConfirm={async () => {
            logArchived()
          }}
        >
          <p>You can restore it later.</p>
        </ConfirmModal>

        <ConfirmModal
          ref={resetRef}
          title="Reset to defaults?"
          confirmText="Reset"
          confirmColor="error"
          onConfirm={async () => {
            logReset()
          }}
        >
          <p>Current settings will be lost.</p>
        </ConfirmModal>
      </div>
    )
  },
}
