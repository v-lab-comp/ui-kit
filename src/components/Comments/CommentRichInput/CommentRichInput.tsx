import { useCallback, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiAlignLeft,
  RiArrowDownSLine,
  RiSendPlane2Fill,
} from '@remixicon/react'
import clsx from 'clsx'
import {
  getHtmlTextLength,
  isHtmlEffectivelyEmpty,
  stripScriptsFromHtml,
  useRichTextEditor,
} from '../../inputs/base/richText'
import { contractPart } from '@/theme/contract'
import { commentRichInputContract as c } from '@/theme/contracts/comment-rich-input'
import { DEFAULT_COMMENT_RICH_INPUT_ARIA_EN } from './commentRichInputDefaults'
import type { CommentRichInputAriaLabels, CommentRichInputProps } from './CommentRichInput.types'

const FORMAT_ICONS = [RiBold, RiItalic, RiUnderline, RiStrikethrough] as const
const FORMAT_COMMANDS = ['bold', 'italic', 'underline', 'strikeThrough'] as const

const DEFAULT_ARIA: Required<CommentRichInputAriaLabels> = {
  ...DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
}

function ToolbarIconButton({
  children,
  disabled,
  isActive,
  ariaLabel,
  onMouseDown,
}: {
  children: ReactNode
  disabled?: boolean
  isActive?: boolean
  ariaLabel: string
  onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className={contractPart(c, 'icon-button')}
      data-active={isActive || undefined}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  )
}

export function CommentRichInput({
  onSend,
  isPending = false,
  disabled = false,
  placeholder,
  ariaLabels,
  className,
  rootClassName,
  toolbarStartSlot,
  initialHtml,
  submitLabel,
  resetOnSubmit,
  secondaryAction,
  maxLength,
}: CommentRichInputProps) {
  const a11y = { ...DEFAULT_ARIA, ...ariaLabels }
  const isDisabled = disabled || isPending
  const hasMaxLength = typeof maxLength === 'number' && maxLength > 0

  const { editorRef, isEmpty, length, activeFormats, editorProps, exec, setHtml } =
    useRichTextEditor({
      disabled: isDisabled,
      maxLength,
      initialHtml,
      trackedCommands: FORMAT_COMMANDS,
    })

  const overLimit = hasMaxLength && length > (maxLength as number)
  const shouldReset = resetOnSubmit ?? !initialHtml

  const submit = useCallback(async () => {
    const el = editorRef.current
    if (!el || isDisabled) return
    const raw = el.innerHTML
    if (isHtmlEffectivelyEmpty(raw)) return
    if (hasMaxLength && getHtmlTextLength(raw) > (maxLength as number)) return
    await onSend(stripScriptsFromHtml(raw))
    if (shouldReset) setHtml('')
  }, [editorRef, isDisabled, onSend, shouldReset, hasMaxLength, maxLength, setHtml])

  const handleEditorKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter') return
      if (e.nativeEvent.isComposing) return
      // Shift+Enter — новая строка (дефолт contenteditable)
      if (e.shiftKey) return

      e.preventDefault()
      void submit()
    },
    [submit]
  )

  const runFormatMouseDown = useCallback(
    (e: MouseEvent<HTMLButtonElement>, command: string) => {
      e.preventDefault()
      exec(command)
    },
    [exec]
  )

  const hasTextSubmit = typeof submitLabel === 'string' && submitLabel.length > 0
  const canSubmit = !isDisabled && !isEmpty && !overLimit

  return (
    <div className={clsx(c.className, rootClassName, className)}>
      <div className={contractPart(c, 'body')}>
        <div className={contractPart(c, 'editable-wrap')}>
          <div
            {...editorProps}
            ref={editorRef}
            role="textbox"
            aria-multiline
            contentEditable={!isDisabled}
            suppressContentEditableWarning
            data-placeholder={placeholder}
            data-empty={isEmpty ? 'true' : 'false'}
            className={contractPart(c, 'editable')}
            onKeyDown={handleEditorKeyDown}
          />
        </div>
      </div>

      <div className={contractPart(c, 'footer')}>
        <div className={contractPart(c, 'toolbar')}>
          {toolbarStartSlot ? (
            <span className={contractPart(c, 'toolbar-start')}>{toolbarStartSlot}</span>
          ) : null}
          {FORMAT_ICONS.map((Icon, i) => (
            <ToolbarIconButton
              key={FORMAT_COMMANDS[i]!}
              disabled={isDisabled}
              isActive={activeFormats.has(FORMAT_COMMANDS[i]!)}
              ariaLabel={[a11y.bold, a11y.italic, a11y.underline, a11y.strikethrough][i]!}
              onMouseDown={(e) => runFormatMouseDown(e, FORMAT_COMMANDS[i]!)}
            >
              <Icon size={20} className={contractPart(c, 'icon-shrink')} aria-hidden />
            </ToolbarIconButton>
          ))}
          <div className={contractPart(c, 'toolbar-divider')} aria-hidden />
          <button
            type="button"
            disabled={isDisabled}
            aria-label={a11y.align}
            className={contractPart(c, 'align-button')}
            onMouseDown={(e) => runFormatMouseDown(e, 'justifyLeft')}
          >
            <RiAlignLeft size={20} aria-hidden />
            <RiArrowDownSLine size={20} aria-hidden />
          </button>
        </div>

        <div className={contractPart(c, 'submit-group')}>
          {hasMaxLength ? (
            <span
              className={contractPart(c, 'counter')}
              data-error={overLimit || undefined}
              aria-live="polite"
            >
              {length}/{maxLength}
            </span>
          ) : null}
          {secondaryAction ? (
            <button
              type="button"
              disabled={isPending}
              aria-label={secondaryAction.ariaLabel ?? secondaryAction.label}
              className={contractPart(c, 'secondary-button')}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          ) : null}
          {hasTextSubmit ? (
            <button
              type="button"
              disabled={!canSubmit}
              className={contractPart(c, 'send-text-button')}
              onClick={() => void submit()}
            >
              {submitLabel}
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSubmit}
              aria-label={a11y.send}
              className={contractPart(c, 'send-button')}
              onClick={() => void submit()}
            >
              <RiSendPlane2Fill size={20} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

CommentRichInput.displayName = 'CommentRichInput'
