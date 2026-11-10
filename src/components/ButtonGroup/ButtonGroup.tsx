import clsx from 'clsx'
import { ButtonGroupContext } from './ButtonGroupContext'
import { buttonGroupContract } from '@/theme/contracts/button-group'
import type { ButtonGroupProps } from './ButtonGroup.types'

export type { ButtonGroupProps } from './ButtonGroup.types'

export const ButtonGroup = ({
  children,
  size = 'small',
  className,
  style,
  ...props
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider value={{ size }}>
      <div
        role="group"
        className={clsx(buttonGroupContract.className, className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  )
}

ButtonGroup.displayName = 'ButtonGroup'
