import { useId, type ReactNode } from 'react'
import { RiInformationLine } from '@remixicon/react'
import clsx from 'clsx'
import { contractPart } from '@/theme/contract'
import { modalFooterSlotsContract } from '@/theme/contracts/modal-footer-slots'

const part = (name: (typeof modalFooterSlotsContract.parts)[number]) =>
  contractPart(modalFooterSlotsContract, name)

export type ModalFooterInfoProps = {
  /** Текст рядом с иконкой */
  children: ReactNode
  className?: string
}

/** Иконка информации в круге + текст — как в макете футера. */
export function ModalFooterInfo({ children, className }: ModalFooterInfoProps) {
  return (
    <div className={clsx(part('info'), className)}>
      <span className={part('info-icon')} aria-hidden>
        <RiInformationLine size={14} />
      </span>
      <span className={part('info-text')}>{children}</span>
    </div>
  )
}

ModalFooterInfo.displayName = 'ModalFooterInfo'

export type ModalFooterStepDotsProps = {
  /** Число шагов (точек) */
  total: number
  /** Активный шаг, 0-based */
  activeIndex: number
  className?: string
}

/** Индикатор шагов точками. */
export function ModalFooterStepDots({ total, activeIndex, className }: ModalFooterStepDotsProps) {
  return (
    <div className={clsx(part('dots'), className)} role="presentation">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={part('dot')} data-active={i === activeIndex || undefined} />
      ))}
    </div>
  )
}

ModalFooterStepDots.displayName = 'ModalFooterStepDots'

export type ModalFooterLinkButtonProps = {
  children: ReactNode
  className?: string
} & ({ href: string; onClick?: never } | { href?: undefined; onClick?: () => void })

/** Подчёркнутая ссылка слева в футере (кнопка или <a>). */
export function ModalFooterLinkButton(props: ModalFooterLinkButtonProps) {
  const { children, className } = props
  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={clsx(part('link-button'), className)} data-anchor="">
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={clsx(part('link-button'), className)} onClick={props.onClick}>
      {children}
    </button>
  )
}

ModalFooterLinkButton.displayName = 'ModalFooterLinkButton'

export type ModalFooterSwitchProps = {
  label: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  className?: string
  name?: string
  value?: string
}

/** Переключатель + подпись — визуально как toggle в макете. */
export function ModalFooterSwitch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  name,
  value,
}: ModalFooterSwitchProps) {
  const id = useId()
  return (
    <label className={clsx(part('switch-row'), className)} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={part('switch-input')}
        role="switch"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        value={value}
      />
      <span className={part('switch-track')} aria-hidden>
        <span className={part('switch-thumb')} />
      </span>
      <span className={part('switch-label')}>{label}</span>
    </label>
  )
}

ModalFooterSwitch.displayName = 'ModalFooterSwitch'
