import { RiCloseLine } from '@remixicon/react'
import { Typography } from '@/components/Typography'
import { useModalContext } from '../../ModalContext'
import { contractAttrs, contractPart } from '@/theme/contract'
import { modalHeaderContract } from '@/theme/contracts/modal-header'
import type { ModalHeaderProps } from './ModalHeader.types'

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className={contractPart(modalHeaderContract, 'close')}
      onClick={onClick}
      aria-label="Закрыть"
    >
      <RiCloseLine size={20} />
    </button>
  )
}

export function ModalHeader(props: ModalHeaderProps) {
  const { titleId, onClose } = useModalContext()
  const hideClose = props.hideCloseButton ?? false

  if ('closeOnly' in props && props.closeOnly) {
    return (
      <div
        className={modalHeaderContract.className}
        {...contractAttrs(modalHeaderContract, { 'close-only': true })}
      >
        {!hideClose ? <CloseButton onClick={onClose} /> : null}
      </div>
    )
  }

  const { title, subtitle, icon } = props
  const hasSubtitle = subtitle != null && subtitle !== ''

  return (
    <div className={modalHeaderContract.className}>
      {icon ? <div className={contractPart(modalHeaderContract, 'icon-slot')}>{icon}</div> : null}
      <div className={contractPart(modalHeaderContract, 'text-column')}>
        <Typography
          id={titleId}
          variant="label"
          size="small"
          component="h2"
          className={contractPart(modalHeaderContract, 'title')}
        >
          {title}
        </Typography>
        {hasSubtitle ? (
          <Typography
            variant="paragraph"
            size="x-small"
            component="p"
            className={contractPart(modalHeaderContract, 'subtitle')}
          >
            {subtitle}
          </Typography>
        ) : null}
      </div>
      {!hideClose ? <CloseButton onClick={onClose} /> : null}
    </div>
  )
}

ModalHeader.displayName = 'ModalHeader'
