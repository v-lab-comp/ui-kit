import type { CSSProperties } from 'react'
import { RiAddLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import { ContentDivider } from '@/components/ContentDivider'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const stack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
  maxWidth: 480,
}

export function ContentDividerDocsDemo() {
  return (
    <div style={{ ...stack, fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <section>
        <p style={label}>Line</p>
        <ContentDivider variant="line" />
      </section>
      <section>
        <p style={label}>Line spacing</p>
        <ContentDivider variant="lineSpacing" />
      </section>
      <section>
        <p style={label}>Text + line</p>
        <ContentDivider variant="textAndLine" text="OR" />
      </section>
      <section>
        <p style={label}>Solid text</p>
        <ContentDivider variant="solidText" text="Amount & Account" />
      </section>
      <section>
        <p style={label}>With slot</p>
        <ContentDivider variant="withSlot">
          <Button
            variant="stroke"
            color="neutral"
            size="x-small"
            leftNode={<RiAddLine size={20} />}
            aria-label="Add"
          />
        </ContentDivider>
      </section>
    </div>
  )
}
