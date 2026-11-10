import type { CSSProperties } from 'react'
import { Avatar } from '@/components/Avatar'
import { AvatarGroup } from '@/components/AvatarGroup'

const photo = (n: number) =>
  n === 0
    ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face'
    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

export function AvatarGroupDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <section style={{ marginBottom: 24 }}>
        <p style={label}>По умолчанию (overflow)</p>
        <AvatarGroup size={40} max={4} overlap={12}>
          <Avatar src={photo(0)} alt="James Brown" />
          <Avatar text="SW" color="away" />
          <Avatar text="AT" color="primary" />
          <Avatar text="EW" color="verified" />
          <Avatar text="MJ" color="feature" />
        </AvatarGroup>
      </section>
      <section style={{ marginBottom: 24 }}>
        <p style={label}>Compact</p>
        <AvatarGroup mode="compact" size={40} max={3}>
          <Avatar src={photo(0)} alt="James" />
          <Avatar src={photo(1)} alt="Sophia" />
          <Avatar text="EW" color="verified" />
          <Avatar text="MJ" color="feature" />
          <Avatar text="LP" color="error" />
        </AvatarGroup>
      </section>
      <section>
        <p style={label}>Крупнее (56)</p>
        <AvatarGroup size={56} max={4} overlap={16}>
          <Avatar src={photo(0)} alt="James Brown" />
          <Avatar text="SW" color="away" />
          <Avatar text="AT" color="primary" />
          <Avatar text="EW" color="verified" />
          <Avatar text="MJ" color="feature" />
        </AvatarGroup>
      </section>
    </div>
  )
}
