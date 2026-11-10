import { cloneElement, useState, type ReactElement } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingPortal,
  useHover,
  useInteractions,
  useMergeRefs,
} from '@floating-ui/react'
import { contractAttrs } from '@/theme/contract'
import { tooltipContract } from '@/theme/contracts/tooltip'
import type { TooltipProps } from './Tooltip.types'

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 300,
  zIndex,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    /* Portal renders into `document.body`; `fixed` avoids wrong offset parent (overflow/transform). */
    strategy: 'fixed',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, { delay: { open: delay, close: 0 } })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const child = children as ReactElement & { ref?: React.Ref<Element | null> }
  /* Floating UI: merge reference ref + child ref — обходящих паттерн без чтения .current в render. */
  // eslint-disable-next-line react-hooks/refs -- useMergeRefs merges callbacks; child.ref is forwarded, not read here
  const mergedReferenceRef = useMergeRefs([refs.setReference, child.ref])

  return (
    <>
      {cloneElement(child, getReferenceProps({ ...child.props, ref: mergedReferenceRef }))}
      {isOpen && (
        <FloatingPortal>
          <div
            // eslint-disable-next-line react-hooks/refs
            ref={refs.setFloating}
            className={tooltipContract.className}
            {...contractAttrs(tooltipContract, {})}
            style={{
              ...floatingStyles,
              ...(zIndex !== undefined ? { zIndex } : {}),
            }}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
