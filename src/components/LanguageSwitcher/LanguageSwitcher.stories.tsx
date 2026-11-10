import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LanguageSwitcher } from './LanguageSwitcher'

const DEMO_LOCALES = ['uz', 'ru', 'en'] as const

const DEMO_LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
  en: 'English',
}

const meta: Meta<typeof LanguageSwitcher> = {
  component: LanguageSwitcher,
  title: 'Components/LanguageSwitcher',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Только UI: список кодов локалей, текущее значение, `getLocaleLabel` и `onLocaleChange`. Откуда брать строки и как хранить локаль — решает приложение.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LanguageSwitcher>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('ru')
    return (
      <LanguageSwitcher
        {...args}
        locales={DEMO_LOCALES}
        value={value}
        onLocaleChange={setValue}
        getLocaleLabel={(code) => DEMO_LABELS[code] ?? code}
      />
    )
  },
  args: {
    'aria-label': 'Язык интерфейса',
    disabled: false,
  },
}

export const Gallery: Story = {
  name: '📋 Gallery',
  render: function Render() {
    const [a, setA] = useState('ru')
    const [b, setB] = useState('en')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
        <LanguageSwitcher
          locales={DEMO_LOCALES}
          value={a}
          onLocaleChange={setA}
          getLocaleLabel={(code) => DEMO_LABELS[code] ?? code}
          aria-label="Language"
        />
        <LanguageSwitcher
          locales={DEMO_LOCALES}
          value={b}
          onLocaleChange={setB}
          getLocaleLabel={(code) => DEMO_LABELS[code] ?? code}
          getLocaleShortLabel={(code) => code}
          aria-label="Locale"
          size="medium"
          disabled
        />
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}
