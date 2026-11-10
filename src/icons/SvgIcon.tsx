import { forwardRef, useId, useMemo, type HTMLAttributes } from 'react'

export interface SvgIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'title'> {
  /** Разметка SVG строкой */
  svg: string
  size?: number
  /**
   * Доступное имя иконки (и всплывающая подсказка). Без `title` и `aria-label`
   * иконка декоративная — скрыта от вспомогательных технологий.
   * Пустая строка тоже делает иконку декоративной.
   */
  title?: string
}

/** Свойства готовых иконок-флагов: всё, кроме самой разметки */
export type FlagProps = Omit<SvgIconProps, 'svg'>

/**
 * Делает id внутри SVG уникальными для экземпляра: одинаковые `clipPath id`
 * у нескольких иконок на странице ломают `url(#…)`-ссылки и дают дубли id.
 */
function scopeSvgIds(svg: string, scope: string): string {
  const ids = Array.from(svg.matchAll(/\sid="([^"]+)"/g), (m) => m[1])
  if (ids.length === 0) return svg
  return ids.reduce((result, id) => {
    const scoped = `${id}-${scope}`
    return result
      .split(`id="${id}"`)
      .join(`id="${scoped}"`)
      .split(`url(#${id})`)
      .join(`url(#${scoped})`)
      .split(`href="#${id}"`)
      .join(`href="#${scoped}"`)
  }, svg)
}

export const SvgIcon = forwardRef<HTMLSpanElement, SvgIconProps>(function SvgIcon(
  { svg, size = 24, title, className, style, ...props },
  ref
) {
  // useId содержит «:» — в id это допустимо, но в url(#…) надёжнее без спецсимволов
  const scope = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const html = useMemo(
    () =>
      scopeSvgIds(svg, scope).replace(
        /<svg/,
        `<svg width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" `
      ),
    [svg, scope, size]
  )
  const label = title || props['aria-label']
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const }

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', width: size, height: size, overflow: 'hidden', ...style }}
      title={title || undefined}
      {...a11y}
      {...props}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
})

SvgIcon.displayName = 'SvgIcon'
