import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiFileCopyLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import { BUTTON_COLOR_OPTIONS } from '@/components/Button/Button.types'
import type { ButtonColor, ButtonVariant } from '@/components/Button/Button.types'
import styles from './ButtonGalleryPage.module.css'

const VARIANTS: ButtonVariant[] = ['filled', 'stroke', 'lighter', 'ghost']
type Variant = ButtonVariant

const STATE_ROWS: { key: 'default' | 'hover' | 'active' | 'disabled'; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'disabled', label: 'Disabled' },
]

function getColorLabel(color: ButtonColor): string {
  return color.charAt(0).toUpperCase() + color.slice(1)
}

/** Стили hover/active через shared palette переменные (--pal-*), заданные классом цвета. */
function getGalleryOverrideStyle(variant: Variant, state: 'hover' | 'active'): CSSProperties {
  if (state === 'hover') {
    if (variant === 'filled') return { ['--pal-base' as string]: 'var(--pal-hover)' }
    if (variant === 'stroke')
      return { backgroundColor: 'var(--pal-bg-hover)', borderColor: 'transparent' }
    if (variant === 'lighter')
      return { backgroundColor: 'transparent', borderColor: 'var(--pal-base)' }
    if (variant === 'ghost') return { backgroundColor: 'var(--pal-bg-hover)' }
  }
  if (state === 'active') {
    if (variant === 'filled') return { ['--pal-base' as string]: 'var(--pal-active)' }
    if (variant === 'stroke')
      return { backgroundColor: 'var(--pal-bg-active)', borderColor: 'transparent' }
    if (variant === 'lighter')
      return { backgroundColor: 'transparent', borderColor: 'var(--pal-base)' }
    if (variant === 'ghost') return { backgroundColor: 'var(--pal-bg-active)' }
  }
  return {}
}

function Cell({
  color,
  variant,
  state,
}: {
  color: ButtonColor
  variant: Variant
  state: 'default' | 'hover' | 'active' | 'disabled'
}) {
  const disabled = state === 'disabled'
  const overrideStyle =
    state === 'hover' || state === 'active' ? getGalleryOverrideStyle(variant, state) : undefined

  return (
    <div className={styles.cell}>
      <div className={styles.cellButtons}>
        <Button
          color={color}
          variant={variant}
          leftNode={<RiArrowLeftSLine size={16} />}
          rightNode={<RiArrowRightSLine size={16} />}
          style={overrideStyle}
          disabled={disabled}
        >
          Button
        </Button>
        <Button
          color={color}
          variant={variant}
          leftNode={<RiFileCopyLine size={16} />}
          style={overrideStyle}
          disabled={disabled}
          aria-label="Копировать"
        />
      </div>
    </div>
  )
}

function Section({ color }: { color: ButtonColor }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{getColorLabel(color)}</h2>
      <div className={styles.tableScroll}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.cellHeader} />
            {VARIANTS.map((v) => (
              <div key={v} className={styles.cellHeader}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </div>
            ))}
          </div>
          {STATE_ROWS.map(({ key, label }) => (
            <div key={key} className={styles.tableRow}>
              <div className={styles.rowLabel}>{label}</div>
              {VARIANTS.map((variant) => (
                <Cell key={variant} color={color} variant={variant} state={key} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export type ButtonGalleryPageProps = {
  embedded?: boolean
}

export function ButtonGalleryPage({ embedded = false }: ButtonGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Button Gallery</h1>
        <p className={styles.subtitle}>
          Все цвета и варианты кнопок, состояния Default / Hover / Active / Disabled — как в Figma.
        </p>
        {BUTTON_COLOR_OPTIONS.map((color) => (
          <Section key={color} color={color} />
        ))}
      </div>
    </div>
  )
}
