import type { CSSProperties } from 'react'
import { RiUserLine, RiVerifiedBadgeFill } from '@remixicon/react'
import { Tag } from '@/components/Tag'

const section: CSSProperties = {
  marginBottom: 20,
}

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

export function TagDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <section style={section}>
        <p style={label}>Варианты (stroke / gray)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <Tag variant="stroke">Tag</Tag>
          <Tag variant="gray">Tag</Tag>
        </div>
      </section>
      <section style={section}>
        <p style={label}>С sublabel и удалением</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <Tag variant="stroke" sublabel="(4)">
            Inbox
          </Tag>
          <Tag variant="stroke" onDismiss={() => {}}>
            Tag
          </Tag>
          <Tag variant="gray" onDismiss={() => {}}>
            Tag
          </Tag>
        </div>
      </section>
      <section style={section}>
        <p style={label}>С иконкой слева</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <Tag variant="stroke" prefix={<RiUserLine size={16} aria-hidden />}>
            User
          </Tag>
        </div>
      </section>
      <section style={section}>
        <p style={label}>Кликабельный и сложный тег (аватар + суффикс + удаление)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <Tag variant="stroke" onClick={() => {}}>
            Фильтр
          </Tag>
          <Tag
            variant="stroke"
            color="information"
            prefix={<img src="https://i.pravatar.cc/64?img=32" alt="" width={16} height={16} />}
            suffix={<RiVerifiedBadgeFill size={16} aria-hidden />}
            sublabel="(Admin)"
            onDismiss={() => {}}
            onClick={() => {}}
          >
            Jane Cooper
          </Tag>
        </div>
      </section>
      <section style={section}>
        <p style={label}>Палитра и свой hex</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <Tag variant="stroke" color="primary">
            Primary
          </Tag>
          <Tag variant="gray" color="warning">
            Warning
          </Tag>
          <Tag variant="stroke" color="information" onDismiss={() => {}}>
            Info
          </Tag>
          <Tag variant="gray" customColor="#059669">
            #059669
          </Tag>
        </div>
      </section>
    </div>
  )
}
