/**
 * Modal Component Usage Examples
 *
 * Copy-paste patterns for common scenarios
 */

import { useRef, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalStatus, type ModalHandle } from '.'

// ===== EXAMPLE 1: Simple Modal =====
export function SimpleModal() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open</button>
      <Modal ref={modalRef}>
        <ModalHeader title="Hello" />
        <ModalBody>
          <p>This is a simple modal.</p>
          <button onClick={() => modalRef.current?.close()}>Close</button>
        </ModalBody>
      </Modal>
    </>
  )
}

// ===== EXAMPLE 2: Confirmation Dialog =====
export function ConfirmationModal() {
  const modalRef = useRef<ModalHandle>(null)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      // await api.deleteItem()
      modalRef.current?.close()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Delete Item</button>
      <Modal ref={modalRef} closeOnBackdropClick={false}>
        <ModalHeader title="Delete Item?" />
        <ModalBody>
          <p>This action cannot be undone.</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <button onClick={() => modalRef.current?.close()} disabled={loading}>
              Cancel
            </button>
            <button onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

// ===== EXAMPLE 3: Modal with Error Handling =====
export function FormModal() {
  const modalRef = useRef<ModalHandle>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // await api.saveForm(formData)
      modalRef.current?.close()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Edit Profile</button>
      <Modal ref={modalRef} width={500}>
        <ModalHeader title="Edit Profile" />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label>Name</label>
              <input type="text" defaultValue="John Doe" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <input type="email" defaultValue="john@example.com" />
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => modalRef.current?.close()} disabled={loading}>
                Cancel
              </button>
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
          {error && <ModalStatus variant="error" title={error} />}
        </ModalBody>
      </Modal>
    </>
  )
}

// ===== EXAMPLE 4: Modal with Subtitle and Icon =====
export function AdvancedModal() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open Advanced</button>
      <Modal ref={modalRef} width={600} maxHeight={500}>
        <ModalHeader
          title="Advanced Modal"
          subtitle="This is a subtitle with more context"
          // icon={<RiInfoLine />}
        />
        <ModalBody>
          <p>Content goes here</p>
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f0f0f0' }}>
            <p>Extra info section</p>
          </div>
          <button style={{ marginTop: 24 }} onClick={() => modalRef.current?.close()}>
            Close
          </button>
        </ModalBody>
      </Modal>
    </>
  )
}

// ===== EXAMPLE 5: Modal that Opens on Condition =====
export function ConditionalModal() {
  const modalRef = useRef<ModalHandle>(null)
  const [userCreated, setUserCreated] = useState(false)

  const handleCreateUser = async () => {
    try {
      // await api.createUser()
      setUserCreated(true)
      modalRef.current?.open() // ✅ Open from event handler, not useEffect
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button onClick={handleCreateUser}>Create User</button>
      <Modal ref={modalRef}>
        <ModalHeader title="Success!" />
        <ModalBody>
          <p>User created successfully.</p>
          <button onClick={() => modalRef.current?.close()}>Done</button>
        </ModalBody>
        {userCreated && <ModalStatus variant="success" title="User saved" />}
      </Modal>
    </>
  )
}

// ===== EXAMPLE 6: Modal with Multiple States =====
export function MultiStateModal() {
  const modalRef = useRef<ModalHandle>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')

  const handleAction = async () => {
    setStatus('loading')
    setMessage('')

    try {
      // await someAsyncAction()
      setStatus('success')
      setMessage('Action completed')
      setTimeout(() => modalRef.current?.close(), 2000)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed')
    }
  }

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open</button>
      <Modal ref={modalRef}>
        <ModalHeader title="Action" />
        <ModalBody>
          {status === 'idle' && (
            <>
              <p>Ready to perform action.</p>
              <button onClick={handleAction}>Perform</button>
            </>
          )}
          {status === 'loading' && <p>Processing...</p>}
          {status === 'error' && <button onClick={() => modalRef.current?.close()}>Close</button>}
          {status === 'success' && <button onClick={() => modalRef.current?.close()}>Done</button>}
        </ModalBody>
        {message && (
          <ModalStatus variant={status === 'error' ? 'error' : 'success'} title={message} />
        )}
      </Modal>
    </>
  )
}

// ===== EXAMPLE 7: Controlling Multiple Modals =====
export function MultipleModals() {
  const confirmRef = useRef<ModalHandle>(null)
  const detailsRef = useRef<ModalHandle>(null)

  const handleOpenConfirm = () => {
    confirmRef.current?.open()
  }

  const handleConfirm = () => {
    confirmRef.current?.close()
    detailsRef.current?.open() // Open another modal
  }

  return (
    <>
      <button onClick={handleOpenConfirm}>Start</button>

      <Modal ref={confirmRef} closeOnBackdropClick={false}>
        <ModalHeader title="Confirm" />
        <ModalBody>
          <p>Are you sure?</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            <button onClick={() => confirmRef.current?.close()}>No</button>
            <button onClick={handleConfirm}>Yes</button>
          </div>
        </ModalBody>
      </Modal>

      <Modal ref={detailsRef}>
        <ModalHeader title="Details" />
        <ModalBody>
          <p>Here are the details.</p>
          <button onClick={() => detailsRef.current?.close()}>Close</button>
        </ModalBody>
      </Modal>
    </>
  )
}

// ===== ANTI-PATTERNS (Don't do this!) =====

/**
 * ❌ WRONG: Using useEffect to control modal
 */
export function WrongExample1() {
  const modalRef = useRef<ModalHandle>(null)

  // ❌ Don't do this!
  // const [shouldOpen, setShouldOpen] = useState(false)
  // useEffect(() => {
  //   if (shouldOpen) {
  //     modalRef.current?.open()
  //   }
  // }, [shouldOpen])

  return (
    <Modal ref={modalRef}>
      <ModalHeader title="Wrong" />
    </Modal>
  )
}

/**
 * ❌ WRONG: Managing body overflow manually
 */
export function WrongExample2() {
  // ❌ Don't do this! Modal handles it automatically
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden'
  //   return () => {
  //     document.body.style.overflow = ''
  //   }
  // }, [])

  return <Modal ref={useRef<ModalHandle>(null)}>{null}</Modal>
}

/**
 * ❌ WRONG: Passing open prop (Modal is imperative, not declarative)
 */
export function WrongExample3() {
  // ❌ Don't do this! Modal doesn't accept 'open' prop
  // const [isOpen, setIsOpen] = useState(false)
  // <Modal open={isOpen} onClose={() => setIsOpen(false)} />

  return <Modal ref={useRef<ModalHandle>(null)}>{null}</Modal>
}
