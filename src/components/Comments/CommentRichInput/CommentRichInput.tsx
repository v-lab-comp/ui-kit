import { useCallback, useId, type KeyboardEvent } from 'react'
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
  RichTextToolButton,
  RichTextToolbar,
  stripScriptsFromHtml,
  useRichTextEditor,
} from '../../inputs/base/richText'
import { contractPart } from '@/theme/contract'
import { commentRichInputContract as c } from '@/theme/contracts/comment-rich-input'
import { DEFAULT_COMMENT_RICH_INPUT_ARIA_EN } from './commentRichInputDefaults'
import type { CommentRichInputAriaLabels, CommentRichInputProps } from './CommentRichInput.types'

const FORMAT_ICONS = [RiBold, RiItalic, RiUnderline, RiStrikethrough] as const
const FORMAT_COMMANDS = ['bold', 'italic', 'underline', 'strikeThrough'] as const

const DEFAULT_ARIA: CommentRichInputAriaLabels = {
  ...DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
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
  const counterId = useId()

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
            // Имя поля: явный ariaLabels.input, иначе — текст плейсхолдера (он обязателен)
            aria-label={a11y.input ?? placeholder}
            aria-placeholder={placeholder}
            aria-disabled={isDisabled || undefined}
            aria-invalid={overLimit || undefined}
            aria-describedby={hasMaxLength ? counterId : undefined}
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
        <RichTextToolbar className={contractPart(c, 'toolbar')} aria-label={a11y.toolbar}>
          {toolbarStartSlot ? (
            <span className={contractPart(c, 'toolbar-start')}>{toolbarStartSlot}</span>
          ) : null}
          {FORMAT_ICONS.map((Icon, i) => (
            <RichTextToolButton
              key={FORMAT_COMMANDS[i]!}
              disabled={isDisabled}
              pressed={activeFormats.has(FORMAT_COMMANDS[i]!)}
              data-active={activeFormats.has(FORMAT_COMMANDS[i]!)}
              aria-label={[a11y.bold, a11y.italic, a11y.underline, a11y.strikethrough][i]!}
              className={contractPart(c, 'icon-button')}
              onExec={() => exec(FORMAT_COMMANDS[i]!)}
            >
              <Icon size={20} className={contractPart(c, 'icon-shrink')} aria-hidden />
            </RichTextToolButton>
          ))}
          <div className={contractPart(c, 'toolbar-divider')} aria-hidden />
          <RichTextToolButton
            disabled={isDisabled}
            aria-label={a11y.align}
            className={contractPart(c, 'align-button')}
            onExec={() => exec('justifyLeft')}
          >
            <RiAlignLeft size={20} aria-hidden />
            <RiArrowDownSLine size={20} aria-hidden />
          </RichTextToolButton>
        </RichTextToolbar>

        <div className={contractPart(c, 'submit-group')}>
          {hasMaxLength ? (
            <span
              id={counterId}
              className={contractPart(c, 'counter')}
              data-error={overLimit || undefined}
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
