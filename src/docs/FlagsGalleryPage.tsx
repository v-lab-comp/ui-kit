import { useMemo, useState, useEffect } from 'react'
import { FLAG_CODES, FLAG_TITLES } from '@/icons/flags/manifest'
import { GALLERY_TILE_STYLE, SearchableGalleryShell } from './SearchableGalleryShell'

type FlagComponent = React.ComponentType<{ size?: number; title?: string }>

export type FlagsGalleryPageProps = {
  /** Превью в VitePress: компактная вёрстка без полноэкранной высоты */
  embedded?: boolean
}

export function FlagsGalleryPage({ embedded = false }: FlagsGalleryPageProps) {
  const [flagsModule, setFlagsModule] = useState<Record<string, FlagComponent> | null>(null)

  useEffect(() => {
    import('@/icons/flags').then((mod) => {
      const map: Record<string, FlagComponent> = {}
      for (const name of FLAG_CODES) {
        const Comp = (mod as unknown as Record<string, FlagComponent>)[name]
        if (Comp) map[name] = Comp
      }
      setFlagsModule(map)
    })
  }, [])

  const [query, setQuery] = useState('')
  const flagEntries = useMemo(() => {
    if (!flagsModule) return []
    return Object.entries(flagsModule).sort(([a], [b]) => a.localeCompare(b))
  }, [flagsModule])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return flagEntries
    return flagEntries.filter(
      ([compName]) =>
        compName.toLowerCase().includes(q) ||
        (FLAG_TITLES[compName] ?? '').toLowerCase().includes(q)
    )
  }, [query, flagEntries])

  return (
    <SearchableGalleryShell
      embedded={embedded}
      title="Country Flags"
      description={
        <>Флаги из Figma (Design System). Формат 24×24. Всего {flagEntries.length} флагов.</>
      }
      embeddedDescription={
        <>
          Флаги из Figma (24×24). Поиск по имени компонента или стране.
          {!flagsModule ? ' Загрузка…' : ` Всего ${flagEntries.length} шт.`}
        </>
      }
      query={query}
      onQueryChange={setQuery}
      searchPlaceholder="Поиск по названию (например: Russia, Uzbekistan, United States)"
      minTileWidth={115}
      beforeGrid={
        !flagsModule && (
          <p style={{ color: 'var(--text-soft-400)', fontSize: '14px' }}>Загрузка флагов…</p>
        )
      }
      afterGrid={
        flagEntries.length === 0 &&
        flagsModule && (
          <p style={{ color: 'var(--text-soft-400)', fontSize: '14px', marginTop: '24px' }}>
            Флаги ещё не загружены. Запустите:{' '}
            <code style={{ background: 'var(--bg-soft-100)', padding: '2px 6px', borderRadius: 4 }}>
              FIGMA_ACCESS_TOKEN=xxx npm run gen:flags
            </code>
          </p>
        )
      }
      notFound={flagEntries.length > 0 && filtered.length === 0}
    >
      {filtered.map(([compName, Flag]) => {
        const title = FLAG_TITLES[compName] ?? compName.replace(/^Flag/, '')
        const isLong = title.length > 18
        return (
          <div key={compName} style={{ ...GALLERY_TILE_STYLE, padding: '12px 8px', minWidth: 0 }}>
            <Flag size={24} title={title} />
            <span
              style={{
                marginTop: '8px',
                fontSize: isLong ? 9 : 10,
                fontWeight: 500,
                color: 'var(--text-sub-600)',
                textAlign: 'center',
                lineHeight: 1.2,
                wordBreak: 'break-word',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
              }}
              title={title}
            >
              {title}
            </span>
          </div>
        )
      })}
    </SearchableGalleryShell>
  )
}
