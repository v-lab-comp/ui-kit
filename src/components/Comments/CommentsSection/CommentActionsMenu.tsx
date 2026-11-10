import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react'
import { RiDeleteBinLine, RiMore2Fill, RiPencilLine } from '@remixicon/react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { commentsSectionContract as c } from '@/theme/contracts/comments-section'
import { popoverContract } from '@/theme/contracts/popover'

export type CommentActionsMenuProps = {
  triggerAriaLabel: string
  editLabel?: string
  deleteLabel?: string
  onEdit?: () => void
  onDelete?: () => void
  disabled?: boolean
}

type MenuAction = {
  key: string
  label: string
  icon: ReactNode
  danger?: boolean
  run: () => void
}

function buildActions({
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: CommentActionsMenuProps): MenuAction[] {
  const actions: MenuAction[] = []
  if (onEdit && editLabel) {
    actions.push({
      key: 'edit',
      label: editLabel,
      icon: <RiPencilLine size={16} aria-hidden />,
      run: onEdit,
    })
  }
  if (onDelete && deleteLabel) {
    actions.push({
      key: 'delete',
      label: deleteLabel,
      icon: <RiDeleteBinLine size={16} aria-hidden />,
      danger: true,
      run: onDelete,
    })
  }
  return actions
}

/**
 * Меню действий комментария по паттерну APG Menu Button:
 * ArrowUp/Down/Home/End и поиск по первой букве, Escape/клик снаружи/Tab закрывают,
 * фокус возвращается на кнопку. Подсвеченный пункт помечен `data-active`.
 */
export function CommentActionsMenu(props: CommentActionsMenuProps) {
  const { triggerAriaLabel, disabled } = props
  const actions = buildActions(props)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<Array<HTMLElement | null>>([])
  // Подписи для поиска по первой букве (useTypeahead читает их только в обработчиках клавиш)
  const labelsRef = useRef<Array<string | null>>([])
  const labelsKey = actions.map((a) => a.label).join('\n')
  useLayoutEffect(() => {
    labelsRef.current = labelsKey.split('\n')
  }, [labelsKey])

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    strategy: 'fixed',
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, { enabled: !disabled }),
    useDismiss(context),
    useRole(context, { role: 'menu' }),
    useListNavigation(context, { listRef, activeIndex, onNavigate: setActiveIndex, loop: true }),
    useTypeahead(context, {
      listRef: labelsRef,
      activeIndex,
      onMatch: open ? setActiveIndex : undefined,
    }),
  ])

  return (
    <>
      <button
        ref={setReference}
        type="button"
        aria-label={triggerAriaLabel}
        disabled={disabled}
        className={contractPart(c, 'menu-trigger')}
        {...getReferenceProps()}
      >
        <RiMore2Fill size={18} aria-hidden />
      </button>
      {open ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={setFloating}
              className={popoverContract.className}
              {...contractAttrs(popoverContract, {})}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <ul role="none" className={contractPart(c, 'menu-list')}>
                {actions.map((action, index) => (
                  <li key={action.key} role="none">
                    <button
                      ref={(node) => {
                        listRef.current[index] = node
                      }}
                      type="button"
                      role="menuitem"
                      className={contractPart(c, 'menu-item')}
                      data-danger={action.danger || undefined}
                      data-active={activeIndex === index || undefined}
                      tabIndex={activeIndex === index ? 0 : -1}
                      {...getItemProps({
                        onClick() {
                          setOpen(false)
                          action.run()
                        },
                      })}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </>
  )
}
