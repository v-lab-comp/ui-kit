import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react'
import {
  RiBold,
  RiFormatClear,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiStrikethrough,
  RiUnderline,
  type RemixiconComponentType,
} from '@remixicon/react'
import clsx from 'clsx'
import { InputField } from '../base/InputField'
import { useRichTextEditor } from '../base/richText'
import { contractPart } from '@/theme/contract'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { richInputContract } from '@/theme/contracts/rich-input'
import { DEFAULT_RICH_INPUT_ARIA_EN, DEFAULT_RICH_INPUT_TOOLS } from './richInputDefaults'
import type { RichInputProps, RichInputTool } from './RichInput.types'

const TOOLS: Record<RichInputTool, { command: string; Icon: RemixiconComponentType }> = {
  bold: { command: 'bold', Icon: RiBold },
  italic: { command: 'italic', Icon: RiItalic },
  underline: { command: 'underline', Icon: RiUnderline },
  strikethrough: { command: 'strikeThrough', Icon: RiStrikethrough },
  bulletList: { command: 'insertUnorderedList', Icon: RiListUnordered },
  orderedList: { command: 'insertOrderedList', Icon: RiListOrdered },
  clear: { command: 'removeFormat', Icon: RiFormatClear },
}

export const RichInput = forwardRef<HTMLDivElement, RichInputProps>(
  (
    {
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      prefix,
      suffix,
      startBlock,
      endBlock,
      id,
      size = 'medium',
      disabled,
      className,
      wrapperClassName,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      name,
      readOnly,
      maxLength,
      tools = DEFAULT_RICH_INPUT_TOOLS,
      toolbarPlacement = 'top',
      minRows = 3,
      maxRows,
      ariaLabels,
    },
    ref
  ) => {
    const [html, setHtmlValue] = useState(value ?? defaultValue ?? '')
    const a11y = { ...DEFAULT_RICH_INPUT_ARIA_EN, ...ariaLabels }

    const toolItems = useMemo(() => tools.map((tool) => ({ tool, ...TOOLS[tool] })), [tools])
    const trackedCommands = useMemo(() => toolItems.map((item) => item.command), [toolItems])

    const handleChangeHtml = useCallback(
      (next: string) => {
        setHtmlValue(next)
        onChange?.(next)
      },
      [onChange]
    )

    const editor = useRichTextEditor({
      disabled: disabled || readOnly,
      maxLength,
      initialHtml: value ?? defaultValue,
      trackedCommands,
      onChangeHtml: handleChangeHtml,
    })
    const { editorRef, isEmpty, length, activeFormats, editorProps, exec, setHtml } = editor

    // Контролируемый режим: пишем в DOM только при реальном расхождении — иначе прыгает каретка
    useEffect(() => {
      const el = editorRef.current
      if (value === undefined || !el || value === el.innerHTML) return
      setHtml(value)
    }, [value, setHtml, editorRef])

    const setEditorRef = useMergeRefs<HTMLDivElement>([editorRef, ref])

    const runTool = useCallback(
      (e: MouseEvent<HTMLButtonElement>, command: string) => {
        // Не отдаём фокус кнопке — иначе теряется выделение в редакторе
        e.preventDefault()
        exec(command)
      },
      [exec]
    )

    const isEditable = !disabled && !readOnly
    const editorStyle = {
      '--rich-input-min-rows': minRows,
      '--rich-input-max-rows': maxRows,
    } as CSSProperties
    const overLimit = !!maxLength && length > maxLength
    // В disabled тулбар остаётся, но неактивен — поле не меняет форму. В readOnly он не нужен.
    const showToolbar = !readOnly && toolItems.length > 0

    const toolbar = showToolbar ? (
      <div
        className={contractPart(richInputContract, 'toolbar')}
        data-placement={toolbarPlacement}
        role="toolbar"
        aria-label={a11y.toolbar}
      >
        {toolItems.map(({ tool, command, Icon }) => (
          <button
            key={tool}
            type="button"
            disabled={disabled}
            aria-label={a11y[tool]}
            aria-pressed={activeFormats.has(command)}
            className={contractPart(richInputContract, 'tool-button')}
            data-on={activeFormats.has(command) || undefined}
            onMouseDown={(e) => runTool(e, command)}
          >
            <Icon size={18} aria-hidden />
          </button>
        ))}
      </div>
    ) : null

    return (
      <InputField
        label={label}
        required={required}
        requiredMarker={requiredMarker}
        optional={optional}
        labelTooltip={labelTooltip}
        hint={hint}
        error={error}
        completed={completed}
        completedColor={completedColor}
        filled={!isEmpty}
        prefix={prefix}
        suffix={suffix}
        startBlock={startBlock}
        endBlock={endBlock}
        size={size}
        disabled={disabled}
        className={clsx(richInputContract.className, className)}
        wrapperClassName={clsx(contractPart(richInputContract, 'wrapper'), wrapperClassName)}
        id={id}
      >
        {(fieldId) => (
          <>
            {toolbarPlacement === 'top' ? toolbar : null}

            <div
              {...editorProps}
              ref={setEditorRef}
              id={fieldId}
              role="textbox"
              aria-multiline
              aria-invalid={!!error || overLimit || undefined}
              aria-readonly={readOnly || undefined}
              contentEditable={isEditable}
              suppressContentEditableWarning
              data-placeholder={placeholder}
              data-empty={isEmpty || undefined}
              data-max-rows={maxRows ? '' : undefined}
              className={contractPart(richInputContract, 'editable')}
              style={editorStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            {maxLength ? (
              <div className={contractPart(richInputContract, 'footer')}>
                <span
                  className={contractPart(richInputContract, 'counter')}
                  data-error={overLimit || undefined}
                  aria-live="polite"
                >
                  {length}/{maxLength}
                </span>
              </div>
            ) : null}

            {toolbarPlacement === 'bottom' ? toolbar : null}

            {name ? <input type="hidden" name={name} value={value ?? html} /> : null}
          </>
        )}
      </InputField>
    )
  }
)

RichInput.displayName = 'RichInput'
