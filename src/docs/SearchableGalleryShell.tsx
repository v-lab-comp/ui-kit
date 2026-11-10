import type { CSSProperties, ReactNode } from 'react'

/** Общая плитка галереи: значок сверху, подпись снизу. Страницы дополняют padding / minWidth. */
export const GALLERY_TILE_STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '12px',
  border: '1px solid var(--stroke-soft-200)',
  background: 'var(--bg-white-0)',
}

export type SearchableGalleryShellProps = {
  /** Превью в VitePress: без полноэкранной высоты и без заголовка страницы */
  embedded: boolean
  title: string
  /** Описание под заголовком (полная страница) */
  description: ReactNode
  /** Короткое описание для embedded-режима */
  embeddedDescription: ReactNode
  query: string
  onQueryChange: (query: string) => void
  searchPlaceholder: string
  /** Минимальная ширина плитки в сетке, px */
  minTileWidth: number
  /** Между полем поиска и сеткой (например, «Загрузка…») */
  beforeGrid?: ReactNode
  /** Сразу после сетки */
  afterGrid?: ReactNode
  /** Показать «Ничего не найдено по запросу» */
  notFound: boolean
  /** Плитки сетки */
  children: ReactNode
}

/** Каркас галереи с поиском — общий для Remix Icon и флагов. */
export function SearchableGalleryShell({
  embedded,
  title,
  description,
  embeddedDescription,
  query,
  onQueryChange,
  searchPlaceholder,
  minTileWidth,
  beforeGrid,
  afterGrid,
  notFound,
  children,
}: SearchableGalleryShellProps) {
  return (
    <div
      style={{
        minHeight: embedded ? undefined : '100vh',
        background: 'var(--bg-white-0)',
        padding: embedded ? '0' : '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {!embedded && (
          <>
            <h1
              style={{
                margin: '0 0 8px 0',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--text-strong-950)',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: '0 0 24px 0',
                fontSize: '14px',
                color: 'var(--text-sub-600)',
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          </>
        )}
        {embedded && (
          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '13px',
              color: 'var(--text-sub-600)',
              lineHeight: 1.45,
            }}
          >
            {embeddedDescription}
          </p>
        )}
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px 14px',
            fontSize: '14px',
            border: '1px solid var(--stroke-soft-200)',
            borderRadius: '8px',
            marginBottom: '24px',
            outline: 'none',
          }}
        />
        {beforeGrid}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${minTileWidth}px, 1fr))`,
            gap: '16px',
          }}
        >
          {children}
        </div>
        {afterGrid}
        {notFound && (
          <p style={{ color: 'var(--text-soft-400)', fontSize: '14px' }}>
            Ничего не найдено по запросу «{query}».
          </p>
        )}
      </div>
    </div>
  )
}
