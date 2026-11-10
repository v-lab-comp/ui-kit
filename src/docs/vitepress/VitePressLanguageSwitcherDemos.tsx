import { useState } from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

const DEMO_LOCALES = ['uz', 'ru', 'en'] as const

const DEMO_LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
  en: 'English',
}

export function LanguageSwitcherDocsDemo() {
  const [value, setValue] = useState('ru')

  return (
    <div style={{ padding: 8, fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <LanguageSwitcher
        locales={[...DEMO_LOCALES]}
        value={value}
        onLocaleChange={setValue}
        getLocaleLabel={(code) => DEMO_LABELS[code] ?? code}
        triggerAriaLabel="Язык интерфейса"
      />
    </div>
  )
}

/** Как Storybook Components/LanguageSwitcher → Gallery */
export function LanguageSwitcherGalleryEmbed() {
  const [a, setA] = useState('ru')
  const [b, setB] = useState('en')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        width: 280,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <LanguageSwitcher
        locales={[...DEMO_LOCALES]}
        value={a}
        onLocaleChange={setA}
        getLocaleLabel={(code) => DEMO_LABELS[code] ?? code}
        triggerAriaLabel="Language"
      />
      <LanguageSwitcher
        locales={[...DEMO_LOCALES]}
        value={b}
        onLocaleChange={setB}
        getLocaleLabel={(code) => DEMO_LABELS[code] ?? code}
        getLocaleShortLabel={(code) => code}
        triggerAriaLabel="Locale"
        size="medium"
        disabled
      />
    </div>
  )
}
