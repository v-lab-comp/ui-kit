import { forwardRef, useCallback, useMemo, useState } from 'react'
import { RichInput } from '../RichInput'
import type { RichInputTool } from '../RichInput'
import { htmlToMarkdown, markdownToHtml } from './markdownCodec'
import type { MarkdownInputProps } from './MarkdownInput.types'

/** Как у `RichInput`, но без `underline` — Markdown его не выражает. */
export const DEFAULT_MARKDOWN_INPUT_TOOLS = [
  'bold',
  'italic',
  'strikethrough',
  'bulletList',
  'orderedList',
] as const satisfies readonly RichInputTool[]

export const MarkdownInput = forwardRef<HTMLDivElement, MarkdownInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      name,
      tools = DEFAULT_MARKDOWN_INPUT_TOOLS,
      ...richInputProps
    },
    ref
  ) => {
    /*
     * Мост Markdown ↔ HTML. Родитель возвращает наш же Markdown обратно в `value` —
     * если каждый раз конвертировать его заново, HTML не совпадёт с тем, что в DOM
     * (`<b>` против `<strong>`, переносы), RichInput перепишет содержимое и каретка
     * прыгнет в начало. Поэтому храним пару «отданный Markdown → HTML, из которого он получен»:
     * на эхо отдаём сохранённый HTML, а конвертируем только по-настоящему новое значение
     * (сброс формы, загрузка с бэка).
     */
    const [echo, setEcho] = useState(() => {
      const initial = value ?? defaultValue ?? ''
      return { markdown: initial, html: initial && markdownToHtml(initial) }
    })

    const htmlValue = useMemo(() => {
      if (value === undefined) return undefined
      return value === echo.markdown ? echo.html : markdownToHtml(value)
    }, [value, echo])

    const htmlDefaultValue = useMemo(
      () => (defaultValue === undefined ? undefined : markdownToHtml(defaultValue)),
      [defaultValue]
    )

    const handleChange = useCallback(
      (html: string) => {
        const next = htmlToMarkdown(html)
        setEcho({ markdown: next, html })
        onChange?.(next)
      },
      [onChange]
    )

    return (
      <>
        <RichInput
          {...richInputProps}
          ref={ref}
          tools={tools}
          value={htmlValue}
          defaultValue={htmlDefaultValue}
          onChange={handleChange}
        />
        {name ? <input type="hidden" name={name} value={value ?? echo.markdown} /> : null}
      </>
    )
  }
)

MarkdownInput.displayName = 'MarkdownInput'
