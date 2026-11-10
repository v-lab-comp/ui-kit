import type { CSSProperties } from 'react'
import { RiQuestionLine } from '@remixicon/react'
import { Accordion } from '@/components/Accordion'

const description =
  'Insert the accordion description here. It would look better as two lines of text.'

const sectionTitle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600, #525866)',
}

/** Демо для док-сайта — те же варианты, что в Storybook Components/Accordion */
export function AccordionDocsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        maxWidth: 440,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <section>
        <p style={sectionTitle}>С иконкой слева (flipIcon: false)</p>
        <Accordion
          title="Insert your accordion title here"
          leftIcon={<RiQuestionLine size={20} />}
          flipIcon={false}
          defaultOpen={false}
        >
          {description}
        </Accordion>
      </section>
      <section>
        <p style={sectionTitle}>Иконка раскрытия слева (flipIcon: true)</p>
        <Accordion title="Insert your accordion title here" flipIcon defaultOpen={false}>
          {description}
        </Accordion>
      </section>
      <section>
        <p style={sectionTitle}>Раскрыт по умолчанию</p>
        <Accordion
          title="Insert your accordion title here"
          leftIcon={<RiQuestionLine size={20} />}
          flipIcon={false}
          defaultOpen
        >
          {description}
        </Accordion>
      </section>
      <section>
        <p style={sectionTitle}>Без левой иконки</p>
        <Accordion title="Insert your accordion title here" flipIcon={false} defaultOpen={false}>
          {description}
        </Accordion>
      </section>
    </div>
  )
}
