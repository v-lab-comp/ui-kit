import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import { Popover } from '@/components/overlays/Popover'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const trigger: CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid var(--stroke-sub-300)',
  background: 'var(--bg-white-0)',
  color: 'var(--text-strong-950)',
  cursor: 'pointer',
  fontSize: 14,
}

const panel: CSSProperties = {
  padding: 16,
  minWidth: 200,
}

export function PopoverDocsDemo() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', padding: '12px 0' }}>
      <p style={label}>Якорь + Floating UI (placement: bottom)</p>
      <div style={{ position: 'relative' }}>
        <button ref={triggerRef} type="button" style={trigger} onClick={() => setOpen((v) => !v)}>
          {open ? 'Закрыть' : 'Открыть'} Popover
        </button>
        <Popover open={open} anchorRef={triggerRef} placement="bottom" offset={6}>
          <div style={panel}>
            <p style={{ margin: 0 }}>Содержимое поповера.</p>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-sub-600)' }}>
              Клик по кнопке — toggle; снаружи закрытие настраивается в приложении.
            </p>
          </div>
        </Popover>
      </div>
    </div>
  )
}
