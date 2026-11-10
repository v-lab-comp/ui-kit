import styles from './ShadowsPage.module.css'

const CARD_DESCRIPTION = 'Click on the image to see the applied shadow style.'

interface ShadowCardProps {
  title: string
  tokenName: string
  previewClassName: string
  /** Класс фона области превью (как в Figma: weak-50, blue-50 и т.д. для Colored) */
  previewBgClassName?: string
}

function ShadowCard({ title, tokenName, previewClassName, previewBgClassName }: ShadowCardProps) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{CARD_DESCRIPTION}</p>
      </div>
      <div
        className={previewBgClassName ? `${styles.preview} ${previewBgClassName}` : styles.preview}
      >
        <div className={`${styles.previewBox} ${previewClassName}`} />
      </div>
      <code className={styles.tokenName}>{tokenName}</code>
    </div>
  )
}

export function ShadowsPage() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Shadow</h1>
        <p className={styles.subtitle}>
          Семантические тени по Figma Design-system. Использование:{' '}
          <code>box-shadow: var(--shadow-x-small);</code>
        </p>

        <h2 className={styles.sectionSeparator}>REGULAR SHADOW</h2>
        <div className={styles.grid}>
          <ShadowCard
            title="X-Small"
            tokenName="--shadow-regular-x-small"
            previewClassName={styles.regularXSmall}
          />
          <ShadowCard
            title="Medium"
            tokenName="--shadow-regular-medium"
            previewClassName={styles.regularMedium}
          />
        </div>

        <h2 className={styles.sectionSeparator}>custom SHADOW</h2>
        <div className={styles.grid}>
          <ShadowCard
            title="Large"
            tokenName="--shadow-large, --shadow-large-inner"
            previewClassName={styles.customLarge}
          />
          <ShadowCard
            title="Medium"
            tokenName="--shadow-medium, --shadow-medium-inner"
            previewClassName={styles.customMedium}
          />
          <ShadowCard
            title="Small"
            tokenName="--shadow-small, --shadow-small-inner"
            previewClassName={styles.customSmall}
          />
          <ShadowCard
            title="X-Small"
            tokenName="--shadow-x-small, --shadow-x-small-inner"
            previewClassName={styles.customXSmall}
          />
        </div>

        <h2 className={styles.sectionSeparator}>colored SHADOWs</h2>
        <div className={styles.grid}>
          <ShadowCard
            title="Gray"
            tokenName="--shadow-colored-gray"
            previewClassName={styles.coloredGray}
            previewBgClassName={styles.previewBgWeak50}
          />
          <ShadowCard
            title="Gray"
            tokenName="--shadow-colored-blue"
            previewClassName={styles.coloredBlue}
            previewBgClassName={styles.previewBgBlue50}
          />
          <ShadowCard
            title="Purple"
            tokenName="--shadow-colored-purple"
            previewClassName={styles.coloredPurple}
            previewBgClassName={styles.previewBgPurple50}
          />
          <ShadowCard
            title="Orange"
            tokenName="--shadow-colored-orange"
            previewClassName={styles.coloredOrange}
            previewBgClassName={styles.previewBgOrange50}
          />
          <ShadowCard
            title="Green"
            tokenName="--shadow-colored-green"
            previewClassName={styles.coloredGreen}
            previewBgClassName={styles.previewBgGreen50}
          />
          <ShadowCard
            title="Primary"
            tokenName="--shadow-colored-primary"
            previewClassName={styles.coloredPrimary}
            previewBgClassName={styles.previewBgPrimaryLighter}
          />
        </div>

        <h2 className={styles.sectionSeparator}>card shadow</h2>
        <div className={styles.grid}>
          <ShadowCard
            title="Large"
            tokenName="--shadow-card-large, --shadow-card-large-inner"
            previewClassName={styles.cardLarge}
          />
        </div>
      </div>
    </div>
  )
}
