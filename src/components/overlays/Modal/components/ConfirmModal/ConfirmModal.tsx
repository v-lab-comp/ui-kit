import { forwardRef, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Modal } from '../../Modal'
import type { ModalHandle } from '../../Modal.types'
import { ModalBody } from '../ModalBody'
import { ModalFooter, ModalFooterConfirmActions } from '../ModalFooter'
import { ModalHeader } from '../ModalHeader'
import { contractPart } from '@/theme/contract'
import { confirmModalContract } from '@/theme/contracts/confirm-modal'
import type { ConfirmModalProps } from './ConfirmModal.types'

export const ConfirmModal = forwardRef<ModalHandle, ConfirmModalProps>(
  (
    {
      title,
      subtitle,
      children,
      onConfirm,
      onCancel,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      confirmColor = 'primary',
      isDestructive = false,
      onError,
      ...modalProps
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false)
    const footerRef = useRef<HTMLDivElement>(null)
    /* APG alertdialog: начальный фокус — на наименее опасном действии (Cancel — первая
       кнопка футера). Ref читается FloatingFocusManager при открытии, когда футер уже в DOM. */
    const cancelFocusRef = useMemo<MutableRefObject<HTMLElement | null>>(
      () => ({
        get current() {
          return footerRef.current?.querySelector<HTMLElement>('button') ?? null
        },
        set current(_value) {},
      }),
      []
    )

    const handleConfirm = async () => {
      setLoading(true)
      try {
        await onConfirm()
        setLoading(false)
      } catch (error) {
        setLoading(false)
        if (onError) {
          onError(error)
        } else {
          throw error
        }
      }
    }

    return (
      <Modal
        ref={ref}
        closeOnBackdropClick={!isDestructive}
        role={isDestructive ? 'alertdialog' : 'dialog'}
        initialFocus={isDestructive ? cancelFocusRef : undefined}
        {...modalProps}
      >
        <ModalHeader title={title} subtitle={subtitle} />
        <ModalBody>
          {children && (
            <div className={contractPart(confirmModalContract, 'content')}>{children}</div>
          )}
        </ModalBody>
        <ModalFooter ref={footerRef}>
          <ModalFooterConfirmActions
            cancelText={cancelText}
            confirmText={confirmText}
            confirmColor={confirmColor}
            loading={loading}
            onCancel={() => onCancel?.()}
            onConfirm={handleConfirm}
          />
        </ModalFooter>
      </Modal>
    )
  }
)

ConfirmModal.displayName = 'ConfirmModal'
