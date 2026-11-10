import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button'
import { Tabs } from '@/components/Tabs'
import { ToastProvider, useToast } from '@/components/Toast'
import { useClickOutside, useTabsSearchParam } from '@/hooks'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarLayout,
  SidebarMain,
  SidebarSection,
  useSidebar,
} from '@/components/layout/Sidebar'
import { useCompositeInput } from '@/components/inputs'
import { RiDashboardLine } from '@remixicon/react'

const hint: CSSProperties = {
  margin: '12px 0 0',
  fontSize: 12,
  lineHeight: 1.45,
  color: 'var(--text-sub-600)',
}

const panel: CSSProperties = {
  marginTop: 8,
  padding: 12,
  borderRadius: 8,
  border: '1px solid var(--stroke-soft-200)',
  background: 'var(--bg-weak-50)',
  fontSize: 13,
}

/** Демо в духе reactuse.org: зона ref + подсказка про клик снаружи. */
export function HookClickOutsideDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useClickOutside(ref, () => setOpen(false), open)

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 400 }}>
      <p
        style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, color: 'var(--text-soft-400)' }}
      >
        Demo
      </p>
      <div ref={ref} style={panel}>
        <button type="button" onClick={() => setOpen((v) => !v)}>
          {open ? 'Закрыть' : 'Открыть'} панель
        </button>
        {open && (
          <div style={{ marginTop: 8 }}>
            Клик по этому тексту не закрывает панель (внутри ref). Клик по полосе темы превью или по
            полю вне рамки — закрывает.
          </div>
        )}
      </div>
      <p style={hint}>
        Третий аргумент <code>enabled={'{open}'}</code> — слушатель только пока панель открыта.
      </p>
    </div>
  )
}

const TAB_PARAM_VALUES = ['alpha', 'beta'] as const

/** Демо пишет в query текущей страницы параметр `uik_hook_tab` (replaceState). */
export function HookTabsSearchParamDemo() {
  const { value, onChange } = useTabsSearchParam('uik_hook_tab', {
    defaultValue: 'alpha',
    validValues: TAB_PARAM_VALUES,
    replace: true,
  })

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 420 }}>
      <Tabs value={value} onChange={onChange}>
        <Tabs.Tab value="alpha">Alpha</Tabs.Tab>
        <Tabs.Tab value="beta">Beta</Tabs.Tab>
        <Tabs.Panel value="alpha">Панель Alpha — в URL: ?uik_hook_tab=alpha</Tabs.Panel>
        <Tabs.Panel value="beta">Панель Beta — в URL: ?uik_hook_tab=beta</Tabs.Panel>
      </Tabs>
      <p style={hint}>
        Демо меняет строку запроса у этой же вкладки браузера (имя параметра только для
        документации). В приложении задайте своё имя, например <code>tab</code>.
      </p>
    </div>
  )
}

function ToastDemoInner() {
  const toast = useToast()
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <Button
        type="button"
        color="success"
        onClick={() =>
          toast.add('success', {
            title: 'Готово',
            description: 'Тост из useToast() внутри ToastProvider.',
          })
        }
      >
        Показать тост
      </Button>
    </div>
  )
}

export function HookToastDemo() {
  return (
    <ToastProvider position="bottom-center">
      <ToastDemoInner />
    </ToastProvider>
  )
}

function DemoBrandIcon() {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        background: 'var(--primary-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      S
    </div>
  )
}

function SidebarDemoToolbar() {
  const { collapsed, toggle } = useSidebar()
  return (
    <div
      style={{
        padding: '10px 12px',
        borderBottom: '1px solid var(--stroke-soft-200)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
      }}
    >
      <Button type="button" size="small" onClick={toggle}>
        {collapsed ? 'Развернуть' : 'Свернуть'}
      </Button>
      <span style={{ fontSize: 12, color: 'var(--text-sub-600)' }}>
        collapsed: {String(collapsed)}
      </span>
    </div>
  )
}

export function HookSidebarDemo() {
  return (
    <div
      style={{
        height: 280,
        overflow: 'hidden',
        borderRadius: 8,
        border: '1px solid var(--stroke-soft-200)',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <SidebarLayout defaultCollapsed={false}>
        <Sidebar>
          <SidebarHeader icon={<DemoBrandIcon />} title="App" subtitle="Demo" divider />
          <SidebarContent>
            <SidebarSection label="Меню">
              <SidebarItem leftNode={<RiDashboardLine size={20} />} active onClick={() => {}}>
                Раздел
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>
        </Sidebar>
        <SidebarMain>
          <SidebarDemoToolbar />
          <div style={{ padding: 12, fontSize: 13, color: 'var(--text-sub-600)' }}>
            Кнопка вызывает <code>toggle</code> из того же контекста, что и сайдбар.
          </div>
        </SidebarMain>
      </SidebarLayout>
    </div>
  )
}

/** Упрощённый split: локальная часть @ домен (без hiddenInputs по name — только части в UI). */
export function HookCompositeInputDemo() {
  const [composed, setComposed] = useState('user@example.com')

  const { parts, notifyParts } = useCompositeInput<[string, string]>({
    value: composed,
    onChange: (next) => setComposed(next),
    split: (s) => {
      const i = s.indexOf('@')
      if (i === -1) return [s, '']
      return [s.slice(0, i), s.slice(i + 1)]
    },
    join: ([local, domain]) => (domain ? `${local}@${domain}` : local),
  })

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 420 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
          Локальная часть
          <input
            value={parts[0]}
            onChange={(e) => notifyParts([e.target.value, parts[1]])}
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid var(--stroke-sub-300)',
              fontSize: 14,
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
          Домен
          <input
            value={parts[1]}
            onChange={(e) => notifyParts([parts[0], e.target.value])}
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid var(--stroke-sub-300)',
              fontSize: 14,
            }}
          />
        </label>
      </div>
      <p style={{ ...hint, marginTop: 12 }}>
        Собранное значение: <code style={{ wordBreak: 'break-all' }}>{composed}</code>
      </p>
      <p style={hint}>
        Для отправки формы добавьте <code>hiddenInputs</code> и <code>name</code> — см.{' '}
        <code>COMPOSITE_INPUTS.md</code> и <code>SiteInput</code>.
      </p>
    </div>
  )
}
