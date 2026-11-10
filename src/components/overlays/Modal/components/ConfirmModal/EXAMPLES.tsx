/**
 * ConfirmModal Examples
 */

/* eslint-disable no-console -- примеры для копирования в приложение; в проде заменить на реальные обработчики */

import { useRef } from 'react'
import { ConfirmModal, type ModalHandle } from '../..'

// ===== EXAMPLE 1: Simple Confirmation =====
export function SimpleConfirm() {
  const confirmRef = useRef<ModalHandle>(null)

  const handleDelete = async () => {
    // await api.delete()
    console.log('Deleted')
  }

  return (
    <>
      <button onClick={() => confirmRef.current?.open()}>Delete</button>
      <ConfirmModal
        ref={confirmRef}
        title="Delete item?"
        confirmText="Delete"
        confirmColor="error"
        isDestructive
        onConfirm={handleDelete}
      >
        <p>This action cannot be undone.</p>
      </ConfirmModal>
    </>
  )
}

// ===== EXAMPLE 2: With Loading State =====
export function ConfirmWithAsync() {
  const confirmRef = useRef<ModalHandle>(null)

  const handleApprove = async () => {
    // Async operation - loading state is handled automatically
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Approved')
  }

  return (
    <>
      <button onClick={() => confirmRef.current?.open()}>Approve</button>
      <ConfirmModal
        ref={confirmRef}
        title="Approve changes?"
        subtitle="This will publish to production"
        confirmText="Approve"
        confirmColor="success"
        onConfirm={handleApprove}
      >
        <p>Review and confirm the changes.</p>
      </ConfirmModal>
    </>
  )
}

// ===== EXAMPLE 3: Warning Confirmation =====
export function WarningConfirm() {
  const confirmRef = useRef<ModalHandle>(null)

  const handleProceed = async () => {
    console.log('Proceeded despite warning')
  }

  return (
    <>
      <button onClick={() => confirmRef.current?.open()}>Continue</button>
      <ConfirmModal
        ref={confirmRef}
        title="Continue anyway?"
        subtitle="This might cause data loss"
        confirmText="Continue"
        confirmColor="primary"
        cancelText="Go back"
        onConfirm={handleProceed}
      >
        <p>⚠️ Warning: This action has consequences.</p>
      </ConfirmModal>
    </>
  )
}

// ===== EXAMPLE 4: With onCancel Callback =====
export function ConfirmWithCancel() {
  const confirmRef = useRef<ModalHandle>(null)

  const handleConfirm = async () => {
    console.log('User confirmed')
  }

  const handleCancel = () => {
    console.log('User cancelled')
  }

  return (
    <>
      <button onClick={() => confirmRef.current?.open()}>Submit</button>
      <ConfirmModal
        ref={confirmRef}
        title="Submit form?"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <p>Once submitted, you won't be able to edit.</p>
      </ConfirmModal>
    </>
  )
}

// ===== EXAMPLE 5: Custom Size =====
export function ConfirmLarge() {
  const confirmRef = useRef<ModalHandle>(null)

  const handleConfirm = async () => {
    console.log('Confirmed')
  }

  return (
    <>
      <button onClick={() => confirmRef.current?.open()}>Proceed</button>
      <ConfirmModal
        ref={confirmRef}
        title="Long confirmation message"
        subtitle="Additional context"
        width={600}
        confirmText="I understand"
        confirmColor="primary"
        onConfirm={handleConfirm}
      >
        <p>This is a longer confirmation dialog with more space for content.</p>
        <p>You can include multiple paragraphs or other elements.</p>
      </ConfirmModal>
    </>
  )
}

// ===== EXAMPLE 6: Inline Usage Pattern =====
export function InlineConfirm() {
  const deleteConfirmRef = useRef<ModalHandle>(null)
  const archiveConfirmRef = useRef<ModalHandle>(null)

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => deleteConfirmRef.current?.open()}>Delete</button>
      <button onClick={() => archiveConfirmRef.current?.open()}>Archive</button>

      <ConfirmModal
        ref={deleteConfirmRef}
        title="Delete permanently?"
        confirmText="Delete"
        confirmColor="error"
        isDestructive
        onConfirm={async () => console.log('Deleted')}
      >
        <p>This cannot be undone.</p>
      </ConfirmModal>

      <ConfirmModal
        ref={archiveConfirmRef}
        title="Archive this?"
        confirmText="Archive"
        confirmColor="primary"
        onConfirm={async () => console.log('Archived')}
      >
        <p>You can restore it later.</p>
      </ConfirmModal>
    </div>
  )
}
