import { useLayoutEffect, useRef, useState } from 'react'
import { contractPart } from '@/theme/contract'
import { commentsSectionContract as c } from '@/theme/contracts/comments-section'

type CollapsibleCommentHtmlProps = {
  html: string
  /** > 0 включает сворачивание; 0 — контент рендерится целиком без кнопки */
  collapseAfterLines: number
  expanded: boolean
  onToggle: () => void
  showMoreLabel: string
  showLessLabel: string
}

/**
 * Рендерит `contentHtml` и, при переполнении, сворачивает его до `collapseAfterLines` строк.
 * Кламп задаётся вычисленным пиксельным `max-height` (единый источник для клипа и детекта
 * переполнения), поэтому работает и с вложенными блочными элементами из `execCommand`.
 */
export function CollapsibleCommentHtml({
  html,
  collapseAfterLines,
  expanded,
  onToggle,
  showMoreLabel,
  showLessLabel,
}: CollapsibleCommentHtmlProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  const enabled = collapseAfterLines > 0

  useLayoutEffect(() => {
    const el = contentRef.current
    // Когда сворачивание выключено, `enabled` уже подавляет клип и кнопку в разметке,
    // поэтому сбрасывать `overflowing` синхронно не нужно.
    if (!el || !enabled) return

    let raf = 0
    const measure = () => {
      const cs = window.getComputedStyle(el)
      let lineHeight = Number.parseFloat(cs.lineHeight)
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
        // line-height: normal — считаем от размера шрифта
        const fontSize = Number.parseFloat(cs.fontSize) || 14
        lineHeight = fontSize * 1.4
      }
      const clampPx = Math.round(lineHeight * collapseAfterLines)
      el.style.setProperty('--comment-clamp-max', `${clampPx}px`)
      // scrollHeight — полная высота контента в любом состоянии (клип на неё не влияет)
      setOverflowing(el.scrollHeight > clampPx + 1)
    }

    // Мерить после вставки контента, иначе scrollHeight = 0
    raf = requestAnimationFrame(measure)

    // Пересчёт при ресайзе контейнера (резиновая панель детали) и после смены контента (правка)
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [html, collapseAfterLines, enabled])

  const isClamped = enabled && overflowing && !expanded

  return (
    <>
      <div
        ref={contentRef}
        className={contractPart(c, 'comment-html')}
        data-clamped={isClamped || undefined}
        // HTML должен быть санитизирован приложением / на бэкенде
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {enabled && overflowing ? (
        <button
          type="button"
          className={contractPart(c, 'show-more-button')}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      ) : null}
    </>
  )
}
