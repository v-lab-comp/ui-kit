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
import type { ModalHandle } from '../../Modal.types'
import { Modal } from '../../Modal'
import { ModalBody } from '../ModalBody'
import { ModalHeader } from '../ModalHeader'
import { contractPart } from '@/theme/contract'
import { modalStatusContract } from '@/theme/contracts/modal-status'
import type { ModalStatusProps, ModalStatusVariant } from './ModalStatus.types'

const STATUS_ICONS: Record<
  ModalStatusVariant,
  { bg: string; Icon: typeof RiAlertLine; color: string }
> = {
  error: { bg: 'var(--error-lighter)', Icon: RiAlertLine, color: 'var(--error-base)' },
  warning: {
    bg: 'var(--warning-lighter)',
    Icon: RiErrorWarningLine,
    color: 'var(--warning-base)',
  },
  success: {
    bg: 'var(--success-lighter)',
    Icon: RiCheckboxCircleLine,
    color: 'var(--success-base)',
  },
  info: {
    bg: 'var(--information-lighter)',
    Icon: RiInformationLine,
    color: 'var(--information-base)',
  },
}

function StatusIcon({ variant, className }: { variant: ModalStatusVariant; className?: string }) {
  const { bg, Icon, color } = STATUS_ICONS[variant]
  return (
    <div
      className={clsx(contractPart(modalStatusContract, 'status-icon'), className)}
      style={{ background: bg }}
    >
      <Icon size={20} color={color} />
    </div>
  )
}

function CenterBlock({
  variant,
  title,
  subtitle,
  children,
}: Pick<ModalStatusProps, 'variant' | 'title' | 'subtitle' | 'children'>) {
  const { titleId } = useModalContext()
  const showSubtitle = subtitle != null && subtitle !== ''

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
