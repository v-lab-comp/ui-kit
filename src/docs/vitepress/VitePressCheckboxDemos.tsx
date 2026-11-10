import { RiUserLine } from '@remixicon/react'
import { BaseCheckbox, Checkbox, CheckboxCard, CheckboxField } from '@/components/inputs'

/** Примитив BaseCheckbox (размеры) — страница доков симметрична BaseInput. */
export function BaseCheckboxDocsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <BaseCheckbox aria-label="Medium default" />
      <BaseCheckbox aria-label="Medium checked" defaultChecked />
      <BaseCheckbox aria-label="Small" size="small" defaultChecked />
    </div>
  )
}

/** Низкоуровневый checkbox — как Storybook Inputs / Checkbox (экспорт Checkbox = BaseCheckbox). */
export function CheckboxPrimitiveDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <Checkbox aria-label="Demo checkbox" />
    </div>
  )
}

export function CheckboxFieldDocsDemo() {
  return (
    <div style={{ maxWidth: 440, fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <CheckboxField label="Accept terms" hint="Hint text below the control." />
    </div>
  )
}

export function CheckboxCardDocsDemo() {
  return (
    <div style={{ maxWidth: 440, fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <CheckboxCard
        label="Card option"
        description="Additional description or metadata."
        prefix={<RiUserLine size={24} aria-hidden />}
      />
    </div>
  )
}
