import clsx from 'clsx'
import { Avatar, type AvatarColor, type AvatarSize } from '@/components/Avatar'
import { AvatarGroup } from '@/components/AvatarGroup'
import styles from './AvatarGroupGalleryPage.module.css'

const usageCode = `import { AvatarGroup } from '@/components/AvatarGroup'

<AvatarGroup size={40} max={4} overlap={12}>
  <Avatar src="https://..." alt="Sophia" />
  <Avatar src="https://..." alt="James" />
  <Avatar text="AT" color="primary" />
  <Avatar text="EW" color="verified" />
  <Avatar text="MJ" color="feature" />
</AvatarGroup>`

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=128&h=128&fit=crop&crop=face`

/** Участники с фото — первые в каждой группе. */
const PHOTO_MEMBERS = [
  { name: 'Sophia', src: photo('1494790108377-be9c29b29330') },
  { name: 'James', src: photo('1500648767791-00dcc994a43e') },
  { name: 'Arthur', src: photo('1506794778202-cad84cf45f1d') },
  { name: 'Emma', src: photo('1524504388940-b1c1722653e1') },
]

/** Участники-инициалы — уходят в «+N» при max={4}. */
const INITIALS_MEMBERS: { text: string; color: AvatarColor }[] = [
  { text: 'MJ', color: 'feature' },
  { text: 'LP', color: 'error' },
  { text: 'WC', color: 'success' },
  { text: 'LN', color: 'primary' },
  { text: 'JO', color: 'verified' },
  { text: 'NN', color: 'away' },
  { text: 'AK', color: 'neutral' },
  { text: 'TR', color: 'highlighted' },
  { text: 'DV', color: 'stable' },
]

const MOCKUP_SIZES: { size: AvatarSize; overlap: number }[] = [
  { size: 80, overlap: 20 },
  { size: 40, overlap: 12 },
  { size: 24, overlap: 8 },
  { size: 20, overlap: 6 },
]

function teamAvatars(size: AvatarSize, { withInitials = false } = {}) {
  const photos = PHOTO_MEMBERS.map((m) => (
    <Avatar key={m.name} src={m.src} alt={m.name} size={size} />
  ))
  if (!withInitials) return photos
  return [
    ...photos,
    ...INITIALS_MEMBERS.map((m) => (
      <Avatar key={m.text} text={m.text} color={m.color} size={size} />
    )),
  ]
}

export type AvatarGroupGalleryPageProps = {
  embedded?: boolean
}

export function AvatarGroupGalleryPage({ embedded = false }: AvatarGroupGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>AvatarGroup Gallery</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Как на макете</h2>
          <div className={styles.row}>
            {MOCKUP_SIZES.map(({ size, overlap }) => (
              <div key={size} className={styles.item}>
                <AvatarGroup size={size} max={4} overlap={overlap}>
                  {teamAvatars(size, { withInitials: true })}
                </AvatarGroup>
                <span className={styles.label}>size {size} / +9</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Без переполнения</h2>
          <div className={styles.row}>
            <div className={styles.item}>
              <AvatarGroup size={40} max={4} overlap={12}>
                {teamAvatars(40)}
              </AvatarGroup>
              <span className={styles.label}>4 из 4</span>
            </div>
            <div className={styles.item}>
              <AvatarGroup size={56} max={3} overlap={16}>
                {teamAvatars(56)}
              </AvatarGroup>
              <span className={styles.label}>3 из 4 (+1)</span>
            </div>
          </div>
        </section>

        {!embedded && (
          <section className={`${styles.section} ${styles.codeSection}`}>
            <h2 className={styles.sectionTitle}>Пример кода</h2>
            <pre className={styles.code}>{usageCode}</pre>
          </section>
        )}
      </div>
    </div>
  )
}
