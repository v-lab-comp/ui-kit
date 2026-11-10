import { forwardRef, type ReactNode } from 'react'
import {
  Typography,
  type LabelSize,
  type ParagraphSize,
  type TypographyWeight,
} from '@/components/Typography'
import { useDialogContext, useDialogPart } from './DialogContext'

/** Общие пропсы шапки диалога (ModalHeader / DrawerHeader) */
type DialogHeaderBase = {
  /** Скрыть кнопку закрытия */
  hideCloseButton?: boolean
}

/** Обычная шапка: заголовок, опционально подзаголовок и иконка 40×40 слева */
export type DialogHeaderDefaultProps = DialogHeaderBase & {
  closeOnly?: false
  title: ReactNode
  /** Подзаголовок — становится описанием диалога (aria-describedby) */
  subtitle?: ReactNode
  /** Слот 40×40 слева (иконка или статус-круг) */
  icon?: ReactNode
}

/** Только кнопка закрытия — заголовок ставится отдельно (id из контекста: `titleId`) */
export type DialogHeaderCloseOnlyProps = DialogHeaderBase & {
  closeOnly: true
  title?: never
  subtitle?: never
  icon?: never
}

export type DialogHeaderProps = DialogHeaderDefaultProps | DialogHeaderCloseOnlyProps

/** Классы конкретного контракта (modal-header / drawer-header) — вид не зависит от общей части */
export type DialogHeaderClasses = {
  root: string
  iconSlot: string
  textColumn: string
  title: string
  subtitle: string
}

type DialogHeaderViewProps = DialogHeaderProps & {
  classes: DialogHeaderClasses
  /** data-атрибуты корня в режиме closeOnly (из контракта) */
  closeOnlyAttrs: Record<string, string>
  titleLook: { size: LabelSize; weight?: TypographyWeight }
  subtitleLook: { size: ParagraphSize }
  renderClose: (onClose: () => void) => ReactNode
}

const NOOP = () => {}

/**
 * Общая шапка Modal и Drawer: заголовок регистрируется как имя диалога,
 * подзаголовок — как описание. Классы и кнопка закрытия приходят от обёртки.
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderViewProps>(
  function DialogHeader(props, ref) {
    const { classes, closeOnlyAttrs, titleLook, subtitleLook, renderClose, hideCloseButton } = props
    const ctx = useDialogContext()
    const onClose = ctx?.onClose ?? NOOP
    const closeOnly = props.closeOnly === true
    const hasSubtitle = !closeOnly && props.subtitle != null && props.subtitle !== ''

    useDialogPart('title', !closeOnly)
    useDialogPart('description', hasSubtitle)

    const closeButton = hideCloseButton ? null : renderClose(onClose)

    if (closeOnly) {
      return (
        <div ref={ref} className={classes.root} {...closeOnlyAttrs}>
          {closeButton}
        </div>
      )
    }

    return (
      <div ref={ref} className={classes.root}>
        {props.icon ? <div className={classes.iconSlot}>{props.icon}</div> : null}
        <div className={classes.textColumn}>
          <Typography
            id={ctx?.titleId}
            variant="label"
            {...titleLook}
            component="h2"
            className={classes.title}
          >
            {props.title}
          </Typography>
          {hasSubtitle ? (
            <Typography
              id={ctx?.descriptionId}
              variant="paragraph"
              {...subtitleLook}
              component="p"
              className={classes.subtitle}
            >
              {props.subtitle}
            </Typography>
          ) : null}
        </div>
        {closeButton}
      </div>
    )
  }
)

DialogHeader.displayName = 'DialogHeader'
