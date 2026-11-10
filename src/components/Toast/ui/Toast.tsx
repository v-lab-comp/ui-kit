import { isValidElement, type ReactNode } from 'react'
import clsx from 'clsx'
import {
  RiErrorWarningFill,
  RiAlertFill,
  RiCheckboxCircleFill,
  RiInformationFill,
  RiStarFill,
  RiCloseLine,
} from '@remixicon/react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { toastContract } from '@/theme/contracts/toast'
import type {
  ToastActionElement,
  ToastActionProps,
  ToastProps,
  ToastColor,
  ToastSize,
} from '../Toast.types'

const COLOR_ICON: Record<ToastColor, ReactNode> = {
  error: <RiErrorWarningFill size={20} />,
  warning: <RiAlertFill size={20} />,
  success: <RiCheckboxCircleFill size={20} />,
  info: <RiInformationFill size={20} />,
  neutral: <RiStarFill size={20} />,
}

const COLOR_PALETTE: Record<ToastColor, (typeof toastContract.attributes.color)[number]> = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'information',
  neutral: 'neutral',
}

export const ToastAction = ({
  children,
  className,
  ...props
}: ToastActionProps): ToastActionElement =>
  (
    <button
      type="button"
      className={clsx(contractPart(toastContract, 'action'), className)}
      {...props}
    >
      {children}
    </button>
  ) as ToastActionElement

const ASSERTIVE_COLORS = new Set<ToastColor>(['error', 'warning'])

const isCompactSize = (size: ToastSize | undefined) => size === 'x-small' || size === 'small'

/** Компактный тост (x-small/small): только первое действие — в строку с заголовком */
const CompactContent = ({ action }: { action: ToastActionElement | undefined }) =>
  action != null ? (
    <span className={contractPart(toastContract, 'action-inline')}>{action}</span>
  ) : null

/** Полный тост: описание и ряд действий с разделителями */
const FullContent = ({ description, actions }: Pick<ToastProps, 'description' | 'actions'>) => (
  <>
    {description != null && (
      <span className={contractPart(toastContract, 'description')}>{description}</span>
    )}
    {actions != null && actions.length > 0 && (
      <div className={contractPart(toastContract, 'actions')}>
        {actions.map((action, i) => (
          <span
            key={isValidElement(action) ? (action.key ?? i) : i}
            className={contractPart(toastContract, 'action-item')}
            data-sep-after={i < actions.length - 1 || undefined}
          >
            {action}
          </span>
        ))}
      </div>
    )}
  </>
)

export const Toast = ({
  color = 'neutral',
  variant = 'filled',
  size = 'large',
  title,
  description,
  actions,
  onClose,
  icon,
  className,
  ...props
}: ToastProps) => {
  const iconNode = icon ?? COLOR_ICON[color]
  const compact = isCompactSize(size)

  return (
    <div
      // Одна озвучка на тост: ошибка и предупреждение — assertive (alert), остальное — polite (status)
      role={ASSERTIVE_COLORS.has(color) ? 'alert' : 'status'}
      className={clsx(toastContract.className, className)}
      {...contractAttrs(toastContract, { variant, color: COLOR_PALETTE[color], size })}
      {...props}
    >
      <span className={contractPart(toastContract, 'icon')} aria-hidden>
        {iconNode}
      </span>
      <div className={contractPart(toastContract, 'content')} data-row={compact || undefined}>
        <span className={contractPart(toastContract, 'title')}>{title}</span>
        {compact ? (
          <CompactContent action={actions?.[0]} />
        ) : (
          <FullContent description={description} actions={actions} />
        )}
      </div>
      {onClose != null && (
        <button
          type="button"
          className={contractPart(toastContract, 'close')}
          onClick={onClose}
          aria-label="Close"
        >
          <RiCloseLine size={compact ? 16 : 20} aria-hidden />
        </button>
      )}
    </div>
  )
}

Toast.displayName = 'Toast'
ToastAction.displayName = 'ToastAction'
