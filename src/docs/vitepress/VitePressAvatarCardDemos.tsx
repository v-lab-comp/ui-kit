import type { CSSProperties } from 'react'
import { RiUserLine } from '@remixicon/react'
import { AvatarCard } from '@/components/AvatarCard'

const photoA =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face'
const photoB =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face'

const label: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600, #525866)',
}

/** Демо для док-сайта — варианты из Storybook Components/AvatarCard */
export function AvatarCardDocsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        maxWidth: 480,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <section>
        <p style={label}>С фото</p>
        <AvatarCard src={photoA} alt="Nuray Aksoy" title="Nuray Aksoy" subtitle="Product Manager" />
      </section>
      <section>
        <p style={label}>Инициалы</p>
        <AvatarCard text="JB" color="primary" title="James Brown" subtitle="Marketing Manager" />
      </section>
      <section>
        <p style={label}>Иконка</p>
        <AvatarCard
          icon={<RiUserLine size={28} />}
          color="feature"
          title="Unknown User"
          subtitle="No photo"
        />
      </section>
      <section>
        <p style={label}>Без фото</p>
        <AvatarCard title="Anna Smith" subtitle="UX Designer" />
      </section>
      <section>
        <p style={label}>Галерея</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AvatarCard
            src={photoA}
            alt="Nuray Aksoy"
            title="Nuray Aksoy"
            subtitle="Product Manager"
          />
          <AvatarCard
            src={photoB}
            alt="James Brown"
            title="James Brown"
            subtitle="Marketing Manager"
          />
          <AvatarCard text="SW" color="away" title="Sarah Wilson" subtitle="UX Designer" />
          <AvatarCard
            text="AT"
            color="primary"
            title="Alex Thompson"
            subtitle="Frontend Engineer"
          />
          <AvatarCard title="No Photo" subtitle="Default silhouette" />
        </div>
      </section>
    </div>
  )
}
