import { useState, type CSSProperties } from 'react'
import { RiBankCardLine, RiDashboardLine, RiSettings3Line } from '@remixicon/react'
import { PageHeader, PageHeaderDemoContent } from '@/components/layout/Header'
import { SidebarInset, SidebarInsetContent } from '@/components/layout/Inset'
import { LayoutRoot } from '@/components/layout/LayoutRoot'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLayout,
  SidebarMain,
  SidebarSection,
  SidebarTrigger,
} from '@/components/layout/Sidebar'

/** Совпадает с макетом Full Page в Storybook: фиксированные ширины полосы сайдбара */
const SIDEBAR_WIDTH = 272
const SIDEBAR_WIDTH_COLLAPSED = 80

function DemoBrandIcon() {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: 'var(--primary-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 600,
      }}
    >
      A
    </div>
  )
}

const NAV = [
  { id: 'home', icon: RiDashboardLine, label: 'Home' },
  { id: 'cards', icon: RiBankCardLine, label: 'Cards' },
  { id: 'settings', icon: RiSettings3Line, label: 'Settings' },
] as const

const previewChrome: CSSProperties = {
  height: 440,
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  borderRadius: 8,
  border: '1px solid var(--stroke-soft-200)',
  boxSizing: 'border-box',
}

/**
 * Только сайдбар + **SidebarMain** (связка **SidebarLayout**, без **LayoutRoot** и без **PageHeader**).
 * Как Storybook **Sidebar / Sidebar** — колонка и область справа с плейсхолдером.
 */
export function LayoutSidebarDocsDemo() {
  const [activeId, setActiveId] = useState<(typeof NAV)[number]['id']>('home')

  return (
    <div style={previewChrome}>
      <SidebarLayout style={{ minHeight: '100%', height: '100%' }}>
        <Sidebar>
          <SidebarHeader
            icon={<DemoBrandIcon />}
            title="Demo"
            subtitle="Sidebar only"
            divider
            trigger={<SidebarTrigger />}
          />
          <SidebarContent>
            <SidebarSection label="Navigation">
              {NAV.map(({ id, icon: Icon, label }) => (
                <SidebarItem
                  key={id}
                  leftNode={<Icon size={20} />}
                  active={activeId === id}
                  onClick={() => setActiveId(id)}
                >
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarContent>
          <SidebarFooter
            src="https://i.pravatar.cc/80?img=12"
            alt=""
            title="Arthur Taylor"
            description="arthur@example.com"
            divider
          />
        </Sidebar>
        <SidebarMain style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div
            style={{
              flex: 1,
              padding: 24,
              background: 'var(--bg-weak-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-sub-600)',
              fontSize: 14,
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            SidebarMain — no PageHeader strip
          </div>
        </SidebarMain>
      </SidebarLayout>
    </div>
  )
}

/**
 * Только **PageHeader** в ширину «основной колонки» + плейсхолдер под ним (как **SidebarInsetContent**).
 */
export function LayoutHeaderDocsDemo() {
  return (
    <div
      style={{
        maxWidth: '100%',
        overflow: 'hidden',
        borderRadius: 8,
        border: '1px solid var(--stroke-soft-200)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ overflow: 'auto' }}>
        {/* Фиксированная minWidth: иначе узкая колонка доков &lt;640px даёт @container в PageHeader → два ряда (заголовок сверху, кнопки снизу) и выглядит как «кривая» вертикальная сборка. */}
        <div style={{ minWidth: 720 }}>
          <PageHeader>
            <PageHeaderDemoContent />
          </PageHeader>
          <div
            style={{
              padding: 16,
              background: 'var(--bg-weak-50)',
              fontSize: 13,
              lineHeight: 1.5,
              color: 'var(--text-sub-600)',
            }}
          >
            Below — content area (SidebarInsetContent). Placeholder; API details —{' '}
            <a href="/guide/components/page-header" style={{ color: 'var(--primary-base)' }}>
              PageHeader
            </a>{' '}
            docs.
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Полная сборка как в Storybook **Layout / Full Page**, но в ограниченной высоте превью:
 * LayoutRoot → Sidebar (header + навигация + footer с профилем) → SidebarInset (PageHeader + скролл контента).
 */
export function LayoutDocsDemo() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeId, setActiveId] = useState<(typeof NAV)[number]['id']>('home')
  const insetLeft = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH

  return (
    <div
      style={{
        height: 520,
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        borderRadius: 8,
        border: '1px solid var(--stroke-soft-200)',
        boxSizing: 'border-box',
      }}
    >
      <LayoutRoot style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <Sidebar collapsed={collapsed}>
          <SidebarHeader
            icon={<DemoBrandIcon />}
            title="Demo"
            subtitle="Layout"
            divider
            collapsed={collapsed}
            trigger={
              <SidebarTrigger collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
            }
          />
          <SidebarContent>
            <SidebarSection label="Navigation" collapsed={collapsed}>
              {NAV.map(({ id, icon: Icon, label }) => (
                <SidebarItem
                  key={id}
                  leftNode={<Icon size={20} />}
                  active={activeId === id}
                  collapsed={collapsed}
                  onClick={() => setActiveId(id)}
                >
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarContent>
          <SidebarFooter
            src="https://i.pravatar.cc/80?img=12"
            alt=""
            title="Arthur Taylor"
            description="arthur@example.com"
            divider
            collapsed={collapsed}
          />
        </Sidebar>

        <SidebarInset
          insetLeft={insetLeft}
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            height: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <PageHeader>
            <div
              style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-strong-950)' }}>
                  Page title
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-sub-600)', marginTop: 4 }}>
                  Top bar — PageHeader; below — SidebarInsetContent (scroll).
                </div>
              </div>
            </div>
          </PageHeader>
          <SidebarInsetContent style={{ position: 'relative', padding: 16 }}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--text-sub-600)' }}>
              Root — LayoutRoot (scroll only in the content area). Sidebar on the left; main column
              offset via SidebarInset insetLeft (from collapsed and sidebar width). Alternative —
              SidebarLayout + SidebarMain (see docs).
            </p>
          </SidebarInsetContent>
        </SidebarInset>
      </LayoutRoot>
    </div>
  )
}
