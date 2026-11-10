import { forwardRef } from 'react'
import clsx from 'clsx'
import {
  RiAlertLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
} from '@remixicon/react'
import { Typography } from '@/components/Typography'
import { useModalContext } from '../../ModalContext'
import { useDialogPart } from '../../dialog/DialogContext'
import type { ModalHandle } from '../../Modal.types'
import { Modal } from '../../Modal'
import { ModalBody } from '../ModalBody'
import { ModalHeader } from '../ModalHeader'
import { contractAttrs, contractPart } from '@/theme/contract'
import { modalStatusContract } from '@/theme/contracts/modal-status'
import type { ModalStatusProps, ModalStatusVariant } from './ModalStatus.types'

const STATUS_ICONS: Record<ModalStatusVariant, typeof RiAlertLine> = {
  error: RiAlertLine,
  warning: RiErrorWarningLine,
  success: RiCheckboxCircleLine,
  info: RiInformationLine,
}

/** Декоративная иконка статуса: вариант — data-variant, цвета задаёт скин. */
function StatusIcon({ variant, className }: { variant: ModalStatusVariant; className?: string }) {
  const Icon = STATUS_ICONS[variant]
  return (
    <div
      className={clsx(contractPart(modalStatusContract, 'status-icon'), className)}
      {...contractAttrs(modalStatusContract, { variant })}
      aria-hidden
    >
      <Icon size={20} />
    </div>
  )
}

function CenterBlock({
  variant,
  title,
  subtitle,
  children,
}: Pick<ModalStatusProps, 'variant' | 'title' | 'subtitle' | 'children'>) {
  const { titleId, descriptionId } = useModalContext()
  const showSubtitle = subtitle != null && subtitle !== ''
  useDialogPart('title')
  useDialogPart('description', showSubtitle)

  return (
    <div className={contractPart(modalStatusContract, 'status-center')}>
      <StatusIcon variant={variant} />
      <Typography
        id={titleId}
        variant="label"
        size="small"
        component="h2"
        className={contractPart(modalStatusContract, 'status-title-center')}
      >
        {title}
      </Typography>
      {showSubtitle ? (
        <Typography
          id={descriptionId}
          variant="paragraph"
          size="x-small"
          component="p"
          className={contractPart(modalStatusContract, 'status-desc-center')}
        >
          {subtitle}
        </Typography>
      ) : null}
      {children}
    </div>
  )
}

export const ModalStatus = forwardRef<ModalHandle, ModalStatusProps>(
  (
    { variant, title, subtitle, children, hideCloseButton, layout = 'left', footer, ...modalProps },
    ref
  ) => {
    const isCenter = layout === 'center'

    return (
      <Modal ref={ref} {...modalProps}>
        {isCenter ? (
          <>
            <ModalHeader closeOnly hideCloseButton={hideCloseButton} />
            <ModalBody align="center" compactTop>
              <CenterBlock variant={variant} title={title} subtitle={subtitle}>
                {children}
              </CenterBlock>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader
              title={title}
              subtitle={subtitle}
              icon={<StatusIcon variant={variant} />}
              hideCloseButton={hideCloseButton}
            />
            {children != null ? <ModalBody>{children}</ModalBody> : null}
          </>
        )}
        {footer}
      </Modal>
    )
  }
)

ModalStatus.displayName = 'ModalStatus'
