import type { CSSProperties } from 'react'
import { RiUserLine } from '@remixicon/react'
import { Avatar, AVATAR_COLOR_OPTIONS, AVATAR_SIZE_OPTIONS } from '@/components/Avatar'

const imageUrl =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face'

const label: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600, #525866)',
}

/** Демо для док-сайта — варианты из Storybook Components/Avatar */
export function AvatarDocsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <section>
        <p style={label}>С изображением</p>
        <Avatar src={imageUrl} alt="User" size={56} />
      </section>
      <section>
        <p style={label}>Плейсхолдер (силуэт)</p>
        <Avatar size={56} />
      </section>
      <section>
        <p style={label}>Инициалы + цвет primary</p>
        <Avatar text="JB" size={56} color="primary" />
      </section>
      <section>
        <p style={label}>Иконка</p>
        <Avatar icon={<RiUserLine size={28} />} size={56} />
      </section>
      <section>
        <p style={label}>Все цвета (инициалы)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 360 }}>
          {AVATAR_COLOR_OPTIONS.map((color) => (
            <Avatar key={color} text="A" size={40} color={color} />
          ))}
        </div>
      </section>
      <section>
        <p style={label}>Размеры</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {AVATAR_SIZE_OPTIONS.map((size) => (
            <Avatar key={size} text="A" size={size} />
          ))}
        </div>
      </section>
    </div>
  )
}
