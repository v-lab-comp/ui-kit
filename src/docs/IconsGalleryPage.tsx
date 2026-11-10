import { useMemo, useState } from 'react'
import * as RemixIcon from '@remixicon/react'
import { GALLERY_TILE_STYLE, SearchableGalleryShell } from './SearchableGalleryShell'

const ICON_NAMES = Object.keys(RemixIcon).filter(
  (k): k is keyof typeof RemixIcon =>
    k.startsWith('Ri') && typeof (RemixIcon as Record<string, unknown>)[k] === 'function'
) as Array<keyof typeof RemixIcon>

export type IconsGalleryPageProps = {
  /** Превью в VitePress: без полноэкранной высоты и дубля заголовка страницы */
  embedded?: boolean
}

export function IconsGalleryPage({ embedded = false }: IconsGalleryPageProps) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ICON_NAMES
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(q))
  }, [query])

  return (
    <SearchableGalleryShell
      embedded={embedded}
      title="Remix Icon"
      description={
        <>
          Иконки из{' '}
          <a href="https://remixicon.com" target="_blank" rel="noreferrer">
            remixicon.com
          </a>
          . В Figma используется тот же набор. Всего {ICON_NAMES.length} иконок.
        </>
      }
      embeddedDescription={
        <>
          Набор из{' '}
          <a href="https://remixicon.com" target="_blank" rel="noreferrer">
            remixicon.com
          </a>
          , всего {ICON_NAMES.length} имён. Поиск по имени компонента (например:&nbsp;
          <code style={{ fontSize: '12px' }}>RiUserLine</code>).
        </>
      }
      query={query}
      onQueryChange={setQuery}
      searchPlaceholder="Поиск по имени (например: add, arrow, user)"
      minTileWidth={100}
      notFound={filtered.length === 0}
    >
      {filtered.map((name) => {
        const Icon = RemixIcon[name] as React.ComponentType<{ size?: number; color?: string }>
        return (
          <div key={name} style={{ ...GALLERY_TILE_STYLE, padding: '16px' }}>
            <Icon size={28} color="var(--icon-strong-950)" />
            <span
              style={{
                marginTop: '8px',
                fontSize: '11px',
                color: 'var(--text-sub-600)',
                textAlign: 'center',
                wordBreak: 'break-all',
              }}
            >
              {name}
            </span>
          </div>
        )
      })}
    </SearchableGalleryShell>
  )
}
