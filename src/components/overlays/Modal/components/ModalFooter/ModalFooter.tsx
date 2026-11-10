import clsx from 'clsx'
import { RiLoader4Line } from '@remixicon/react'
import { Button } from '@/components/Button'
import { contractAttrs, contractPart } from '@/theme/contract'
import { modalFooterContract } from '@/theme/contracts/modal-footer'
import type { ModalFooterConfirmActionsProps, ModalFooterProps } from './ModalFooter.types'

/** Подвал: `startContent` слева + произвольные кнопки в `children`. */
export function ModalFooter({
  startContent,
  fullWidth = false,
  className,
  children,
}: ModalFooterProps) {
  const hasStart = startContent != null && startContent !== false

  return (
    <div
      className={clsx(modalFooterContract.className, className)}
      {...contractAttrs(modalFooterContract, { 'with-start': hasStart, 'full-width': fullWidth })}
    >
      {hasStart ? (
        <div className={contractPart(modalFooterContract, 'start')}>{startContent}</div>
      ) : null}
      <div
        className={contractPart(modalFooterContract, 'actions')}
        data-full-width={fullWidth || undefined}
      >
        {children}
      </div>
    </div>
  )
}

ModalFooter.displayName = 'ModalFooter'

/** Две кнопки Cancel + основное действие (спиннер при `loading`). */
export function ModalFooterConfirmActions({
  cancelText = 'Cancel',
  confirmText = 'Continue',
  confirmColor = 'primary',
  loading = false,
  disabled = false,
  onCancel,
  onConfirm,
}: ModalFooterConfirmActionsProps) {
  return (
    <>
      <Button
        type="button"
        variant="stroke"
        color="neutral"
        size="small"
        onClick={onCancel}
        disabled={loading || disabled}
        className={contractPart(modalFooterContract, 'action-button')}
      >
        {cancelText}
      </Button>
      <Button
        type="button"
        color={confirmColor}
        size="small"
        onClick={onConfirm}
        disabled={loading || disabled}
        rightNode={
          loading ? (
            <RiLoader4Line
              size={16}
              className={contractPart(modalFooterContract, 'spinning')}
              aria-hidden
            />
          ) : undefined
        }
        className={contractPart(modalFooterContract, 'action-button')}
      >
        {confirmText}
      </Button>
    </>
  )
}

ModalFooterConfirmActions.displayName = 'ModalFooterConfirmActions'
