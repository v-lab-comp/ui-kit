import { forwardRef, useCallback } from 'react'
import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { baseCheckboxContract } from '@/theme/contracts/base-checkbox'
import { useMergeRefs } from '@/utils/useMergeRefs'
import type { BaseCheckboxProps } from './BaseCheckbox.types'

export const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(
  ({ indeterminate, size = 'medium', className, ...props }, ref) => {
    const setIndeterminate = useCallback(
      (node: HTMLInputElement | null) => {
        if (node) node.indeterminate = indeterminate ?? false
      },
      [indeterminate]
    )
    const setRef = useMergeRefs([setIndeterminate, ref])

    return (
      <input
        ref={setRef}
        type="checkbox"
        className={clsx(baseCheckboxContract.className, className)}
        {...contractAttrs(baseCheckboxContract, { size })}
        {...props}
      />
    )
  }
)

BaseCheckbox.displayName = 'BaseCheckbox'
