import type { CSSProperties } from 'react'
import { useState } from 'react'
import { RiInformationLine } from '@remixicon/react'
import {
  BaseInput,
  EmailInput,
  PasswordInput,
  SearchInput,
  ShareLinkInput,
  SiteInput,
  type SelectOptionWithShortLabel,
} from '@/components/inputs'
import { DateInput } from '@/date'
import { PhoneInput } from '@/phone'

const shell: CSSProperties = {
  width: 'min(100%, 320px)',
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

const PROTOCOL_OPTIONS: SelectOptionWithShortLabel[] = [
  { value: 'https://', shortLabel: 'https://', label: 'HTTPS (Secure)' },
  { value: 'http://', shortLabel: 'http://', label: 'HTTP' },
]

export function EmailInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div style={shell}>
      <EmailInput
        label="Email"
        placeholder="name@example.com"
        hint="Validation on blur."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export function PasswordInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div style={shell}>
      <PasswordInput
        label="Password"
        placeholder="Enter password"
        hint="Toggle visibility via suffix."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export function SearchInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div style={shell}>
      <SearchInput
        label="Search"
        placeholder="Search…"
        hint="Search icon in prefix."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export function SiteInputDocsDemo() {
  const [value, setValue] = useState('https://')
  return (
    <div style={shell}>
      <SiteInput
        label="Website"
        required
        placeholder="www.example.com"
        hint="Protocol + path (composite value)."
        protocolOptions={PROTOCOL_OPTIONS}
        value={value}
        onChange={(next) => setValue(next)}
      />
    </div>
  )
}

export function ShareLinkInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div style={shell}>
      <ShareLinkInput
        label="Share link"
        required
        placeholder="www.example.com"
        hint="Copy action on the right."
        labelTooltip={<RiInformationLine size={16} aria-hidden />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export function BaseInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div
      style={{ ...shell, padding: 16, borderRadius: 8, border: '1px solid var(--stroke-soft-200)' }}
    >
      <BaseInput
        placeholder="Placeholder"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Demo input"
      />
    </div>
  )
}

export function DateInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div style={{ ...shell, width: 'min(100%, 368px)', paddingBottom: 320 }}>
      <DateInput
        label="Date"
        placeholder="DD.MM.YYYY"
        hint='Calendar + mask; use valueFormat="iso" for APIs.'
        value={value}
        onChange={(next) => setValue(next)}
        valueFormat="iso"
      />
    </div>
  )
}

export function PhoneInputDocsDemo() {
  const [value, setValue] = useState('')
  return (
    <div style={shell}>
      <PhoneInput
        label="Phone"
        defaultCountry="UZ"
        hint="Requires peers from @v-lab/ui-kit/phone."
        value={value}
        onChange={(next) => setValue(next)}
      />
    </div>
  )
}
