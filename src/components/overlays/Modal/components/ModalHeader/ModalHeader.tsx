import { forwardRef } from 'react'
import { RiCloseLine } from '@remixicon/react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { modalHeaderContract } from '@/theme/contracts/modal-header'
import { useModalContext } from '../../ModalContext'
import { DialogHeader, type DialogHeaderClasses } from '../../dialog/DialogHeader'
import type { ModalHeaderProps } from './ModalHeader.types'

const CLASSES: DialogHeaderClasses = {
  root: modalHeaderContract.className,
  iconSlot: contractPart(modalHeaderContract, 'icon-slot'),
  textColumn: contractPart(modalHeaderContract, 'text-column'),
  title: contractPart(modalHeaderContract, 'title'),
  subtitle: contractPart(modalHeaderContract, 'subtitle'),
}

const CLOSE_ONLY_ATTRS = contractAttrs(modalHeaderContract, { 'close-only': true })

function renderClose(onClose: () => void) {
  return (
    <button
      type="button"
      className={contractPart(modalHeaderContract, 'close')}
      onClick={onClose}
      aria-label="Закрыть"
    >
      <RiCloseLine size={20} aria-hidden />
    </button>
  )
}

/** Шапка модалки: заголовок даёт имя диалогу, подзаголовок — описание. */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(props, ref) {
    // Проверка, что шапка внутри Modal (бросает ошибку вне контекста)
    useModalContext()
    return (
      <DialogHeader
        ref={ref}
        {...props}
        classes={CLASSES}
        closeOnlyAttrs={CLOSE_ONLY_ATTRS}
        titleLook={{ size: 'small' }}
        subtitleLook={{ size: 'x-small' }}
        renderClose={renderClose}
      />
    )
  }
)

ModalHeader.displayName = 'ModalHeader'
