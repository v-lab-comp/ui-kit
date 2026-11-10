import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { modalBodyContract } from '@/theme/contracts/modal-body'
import type { ModalBodyProps } from './ModalBody.types'

export function ModalBody({
  className,
  children,
  align = 'start',
  compactTop,
  ...rest
}: ModalBodyProps) {
  return (
    <div
      className={clsx(modalBodyContract.className, className)}
      {...contractAttrs(modalBodyContract, { align, 'compact-top': Boolean(compactTop) })}
      {...rest}
    >
      {children}
    </div>
  )
}

ModalBody.displayName = 'ModalBody'
