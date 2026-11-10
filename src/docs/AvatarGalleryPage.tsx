import clsx from 'clsx'
import { Avatar } from '@/components/Avatar'
import { AvatarGroup } from '@/components/AvatarGroup'
import { AVATAR_SIZE_OPTIONS, AVATAR_COLOR_OPTIONS } from '@/components/Avatar/Avatar.types'
import styles from './AvatarGalleryPage.module.css'

const imageUrl =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face'

export type AvatarGalleryPageProps = {
  embedded?: boolean
}

export function AvatarGalleryPage({ embedded = false }: AvatarGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Avatar Gallery</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Все размеры (20, 24, 32, 40, 48, 56, 64, 72, 80)</h2>
          <div className={styles.sizesRow}>
            {AVATAR_SIZE_OPTIONS.map((size) => (
              <div key={size} className={styles.sizeItem}>
                <Avatar text="A" size={size} />
                <span className={styles.sizeLabel}>{size}px</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Варианты (size 56)</h2>
          <div className={styles.variantsRow}>
            <div className={styles.variantItem}>
              <Avatar src={imageUrl} alt="User" size={56} />
              <span className={styles.variantLabel}>Image</span>
            </div>
            <div className={styles.variantItem}>
              <Avatar size={56} />
              <span className={styles.variantLabel}>Дефолт</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>AvatarGroup</h2>
          <div className={styles.variantsRow}>
            <div className={styles.variantItem}>
              <AvatarGroup size={40} max={4} overlap={12}>
                <Avatar src={imageUrl} alt="James Brown" />
                <Avatar text="SW" color="away" />
                <Avatar text="AT" color="primary" />
                <Avatar text="EW" color="verified" />
                <Avatar text="MJ" color="feature" />
              </AvatarGroup>
              <span className={styles.variantLabel}>Size 40 / max 4</span>
            </div>
            <div className={styles.variantItem}>
              <AvatarGroup size={56} max={4} overlap={16}>
                <Avatar src={imageUrl} alt="James Brown" />
                <Avatar text="SW" color="away" />
                <Avatar text="AT" color="primary" />
                <Avatar text="EW" color="verified" />
                <Avatar text="MJ" color="feature" />
              </AvatarGroup>
              <span className={styles.variantLabel}>Size 56 / max 4</span>
            </div>
            <div className={styles.variantItem}>
              <AvatarGroup size={40} max={3}>
                <Avatar src={imageUrl} alt="James Brown" />
                <Avatar
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
                  alt="Sophia"
                />
                <Avatar
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face"
                  alt="Arthur"
                />
                <Avatar
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=128&h=128&fit=crop&crop=face"
                  alt="Emma"
                />
                <Avatar text="MJ" color="feature" />
                <Avatar text="LP" color="error" />
                <Avatar text="WC" color="success" />
              </AvatarGroup>
              <span className={styles.variantLabel}>Size 40 / max 3</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Все размеры — с изображением</h2>
          <div className={styles.sizesRow}>
            {AVATAR_SIZE_OPTIONS.map((size) => (
              <div key={size} className={styles.sizeItem}>
                <Avatar src={imageUrl} alt="User" size={size} />
                <span className={styles.sizeLabel}>{size}px</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Все размеры — инициалы</h2>
          <div className={styles.sizesRow}>
            {AVATAR_SIZE_OPTIONS.map((size) => (
              <div key={size} className={styles.sizeItem}>
                <Avatar text="JB" size={size} />
                <span className={styles.sizeLabel}>{size}px</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Цвета палитры — инициалы</h2>
          <div className={styles.variantsRow}>
            {AVATAR_COLOR_OPTIONS.map((color) => (
              <div key={color} className={styles.variantItem}>
                <Avatar text="A" size={48} color={color} />
                <span className={styles.variantLabel}>{color}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Цвета палитры — дефолтная иконка человечка</h2>
          <div className={styles.variantsRow}>
            {AVATAR_COLOR_OPTIONS.map((color) => (
              <div key={color} className={styles.variantItem}>
                <Avatar size={48} color={color} />
                <span className={styles.variantLabel}>{color}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
