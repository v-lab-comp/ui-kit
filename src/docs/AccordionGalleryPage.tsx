import clsx from 'clsx'
import { RiQuestionLine } from '@remixicon/react'
import { Accordion } from '@/components/Accordion'
import styles from './AccordionGalleryPage.module.css'

const defaultTitle = 'Insert your accordion title here'
const defaultDescription =
  'Insert the accordion description here. It would look better as two lines of text.'

export type AccordionGalleryPageProps = {
  embedded?: boolean
}

export function AccordionGalleryPage({ embedded = false }: AccordionGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Accordion Gallery</h1>
        <p className={styles.subtitle}>
          Варианты: с иконкой слева и +/− справа; с иконкой +/− слева (flip). Состояния: default,
          hover, expanded.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>With left icon (Flip Icon Off)</h2>
          <div className={styles.item}>
            <div className={styles.itemLabel}>Collapsed (default / hover)</div>
            <Accordion
              title={defaultTitle}
              leftIcon={<RiQuestionLine size={20} />}
              flipIcon={false}
              defaultOpen={false}
            >
              {defaultDescription}
            </Accordion>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>Expanded</div>
            <Accordion
              title={defaultTitle}
              leftIcon={<RiQuestionLine size={20} />}
              flipIcon={false}
              defaultOpen
            >
              {defaultDescription}
            </Accordion>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Expand icon on left (Flip Icon On)</h2>
          <div className={styles.item}>
            <div className={styles.itemLabel}>Collapsed</div>
            <Accordion title={defaultTitle} flipIcon defaultOpen={false}>
              {defaultDescription}
            </Accordion>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>Expanded</div>
            <Accordion title={defaultTitle} flipIcon defaultOpen>
              {defaultDescription}
            </Accordion>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Disabled</h2>
          <Accordion
            title={defaultTitle}
            leftIcon={<RiQuestionLine size={20} />}
            flipIcon={false}
            disabled
          >
            {defaultDescription}
          </Accordion>
        </section>
      </div>
    </div>
  )
}
