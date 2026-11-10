import clsx from 'clsx'
import { RiFlashlightFill } from '@remixicon/react'
import { Badge } from '@/components/Badge'
import { BADGE_COLOR_OPTIONS } from '@/components/Badge/Badge.types'
import type { BadgeColor, BadgeVariant, BadgeSize } from '@/components/Badge/Badge.types'
import styles from './BadgeGalleryPage.module.css'

function getColorLabel(color: BadgeColor): string {
  return color.charAt(0).toUpperCase() + color.slice(1)
}

const Dot = () => (
  <span
    style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }}
  />
)

const CONFIGS: { label: string; props: object }[] = [
  { label: 'Text', props: { children: 'Badge' } },
  { label: 'Dot + Text', props: { children: 'Badge', leftNode: <Dot /> } },
  { label: 'Icon + Text', props: { children: 'Badge', leftNode: <RiFlashlightFill size={12} /> } },
  { label: 'Text + Icon', props: { children: 'Badge', rightNode: <RiFlashlightFill size={12} /> } },
  { label: 'Rounded', props: { children: 'Badge', shape: 'rounded' } },
  { label: 'Circle', props: { children: '2', shape: 'circle' } },
]

const VARIANTS: BadgeVariant[] = ['filled', 'light', 'lighter', 'stroke']
const SIZES: BadgeSize[] = ['small', 'medium']

function Section({ variant }: { variant: BadgeVariant }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.cellHeader} />
          {CONFIGS.map(({ label }) => (
            <div key={label} className={styles.cellHeader}>
              {label}
            </div>
          ))}
        </div>
        {BADGE_COLOR_OPTIONS.map((color) => (
          <div key={color} className={styles.tableRow}>
            <div className={styles.rowLabel}>{getColorLabel(color)}</div>
            {CONFIGS.map(({ label, props }) => (
              <div key={label} className={styles.cell}>
                <Badge color={color} variant={variant} size="small" {...props} />
              </div>
            ))}
          </div>
        ))}
        <div className={styles.tableRow}>
          <div className={styles.rowLabel}>Disabled</div>
          {CONFIGS.map(({ label, props }) => (
            <div key={label} className={styles.cell}>
              <Badge variant={variant} size="small" disabled {...props} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SizesSection() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Sizes</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.cellHeader} />
          {CONFIGS.map(({ label }) => (
            <div key={label} className={styles.cellHeader}>
              {label}
            </div>
          ))}
        </div>
        {SIZES.map((size) => (
          <div key={size} className={styles.tableRow}>
            <div className={styles.rowLabel}>{size.charAt(0).toUpperCase() + size.slice(1)}</div>
            {CONFIGS.map(({ label, props }) => (
              <div key={label} className={styles.cell}>
                <Badge size={size} {...props} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export type BadgeGalleryPageProps = {
  embedded?: boolean
}

export function BadgeGalleryPage({ embedded = false }: BadgeGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Badge Gallery</h1>
        {VARIANTS.map((variant) => (
          <Section key={variant} variant={variant} />
        ))}
        <SizesSection />
      </div>
    </div>
  )
}
