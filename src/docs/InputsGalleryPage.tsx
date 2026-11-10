import clsx from 'clsx'
import type { ReactNode } from 'react'
import { FlagUzbekistan, FlagRussia, FlagKazakhstan } from '@/icons/flags'
import { TextInput } from '@/components/inputs/TextInput'
import { EmailInput } from '@/components/inputs/EmailInput'
import { PasswordInput } from '@/components/inputs/PasswordInput'
import { SearchInput } from '@/components/inputs/SearchInput'
import { DateInput } from '@/components/inputs/DateInput'
import { SiteInput } from '@/components/inputs/SiteInput'
import { ShareLinkInput } from '@/components/inputs/ShareLinkInput'
import { SelectInput } from '@/components/inputs/SelectInput'
import { PhoneInput } from '@/components/inputs/PhoneInput'
import { InfoIcon } from '@/stories/helpers'
import styles from './InputsGalleryPage.module.css'

const COUNTRY_OPTIONS = [
  { value: 'uz', label: 'Uzbekistan', icon: <FlagUzbekistan size={20} /> },
  { value: 'ru', label: 'Russia', icon: <FlagRussia size={20} /> },
  { value: 'kz', label: 'Kazakhstan', icon: <FlagKazakhstan size={20} /> },
]

const SIZES: { size: 'big' | 'medium' | 'small'; label: string }[] = [
  { size: 'big', label: 'Big — 40px' },
  { size: 'medium', label: 'Medium — 36px' },
  { size: 'small', label: 'Small — 32px' },
]

function Section({
  title,
  renderColumn,
}: {
  title: string
  renderColumn: (size: 'big' | 'medium' | 'small') => ReactNode
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.columns}>
        {SIZES.map(({ size, label }) => (
          <div key={size} className={styles.column}>
            <div className={styles.columnLabel}>{label}</div>
            {renderColumn(size)}
          </div>
        ))}
      </div>
    </section>
  )
}

export type InputsGalleryPageProps = {
  embedded?: boolean
}

export function InputsGalleryPage({ embedded = false }: InputsGalleryPageProps) {
  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Inputs Gallery</h1>

        <Section
          title="TextInput"
          renderColumn={(size) => (
            <>
              <TextInput
                size={size}
                label="Full name"
                placeholder="Placeholder text..."
                hint="This is a hint text to help user."
              />
              <TextInput
                size={size}
                label="Full name"
                defaultValue="John Doe"
                hint="This is a hint text to help user."
              />
              <TextInput
                size={size}
                label="Full name"
                placeholder="Placeholder text..."
                hint="This is a hint text to help user."
                disabled
              />
              <TextInput
                size={size}
                label="Full name"
                defaultValue="John Doe"
                error="This field is required."
              />
            </>
          )}
        />

        <Section
          title="EmailInput"
          renderColumn={(size) => (
            <>
              <EmailInput
                size={size}
                label="Email"
                placeholder="user@example.com"
                hint="This is a hint text to help user."
              />
              <EmailInput
                size={size}
                label="Email"
                defaultValue="user@example.com"
                hint="This is a hint text to help user."
              />
              <EmailInput
                size={size}
                label="Email"
                placeholder="user@example.com"
                hint="This is a hint text to help user."
                disabled
              />
              <EmailInput
                size={size}
                label="Email"
                defaultValue="notanemail"
                error="Invalid email address."
              />
            </>
          )}
        />

        <Section
          title="PasswordInput"
          renderColumn={(size) => (
            <>
              <PasswordInput
                size={size}
                label="Password"
                placeholder="············"
                hint="This is a hint text to help user."
              />
              <PasswordInput
                size={size}
                label="Password"
                defaultValue="mysecretpassword"
                hint="This is a hint text to help user."
              />
              <PasswordInput
                size={size}
                label="Password"
                placeholder="············"
                hint="This is a hint text to help user."
                disabled
              />
              <PasswordInput
                size={size}
                label="Password"
                defaultValue="wrongpassword"
                error="Password is incorrect."
              />
            </>
          )}
        />

        <Section
          title="SearchInput"
          renderColumn={(size) => (
            <>
              <SearchInput
                size={size}
                label="Search"
                placeholder="Search..."
                hint="This is a hint text to help user."
              />
              <SearchInput
                size={size}
                label="Search"
                defaultValue="react components"
                hint="This is a hint text to help user."
              />
              <SearchInput
                size={size}
                label="Search"
                placeholder="Search..."
                hint="This is a hint text to help user."
                disabled
              />
              <SearchInput
                size={size}
                label="Search"
                defaultValue="bad query"
                error="No results found."
              />
            </>
          )}
        />

        <Section
          title="SiteInput"
          renderColumn={(size) => (
            <>
              <SiteInput
                size={size}
                label="Website"
                required
                optional
                placeholder="www.example.com"
                hint="This is a hint text to help user."
              />
              <SiteInput
                size={size}
                label="Website"
                required
                optional
                defaultValue="www.example.com"
                hint="This is a hint text to help user."
              />
              <SiteInput
                size={size}
                label="Website"
                required
                optional
                placeholder="www.example.com"
                hint="This is a hint text to help user."
                disabled
              />
              <SiteInput
                size={size}
                label="Website"
                required
                optional
                defaultValue="www.example.com"
                error="This is a hint text to help user."
              />
            </>
          )}
        />

        <Section
          title="ShareLinkInput"
          renderColumn={(size) => (
            <>
              <ShareLinkInput
                size={size}
                label="Share Link"
                required
                optional
                labelTooltip={<InfoIcon />}
                placeholder="www.example.com"
                hint="This is a hint text to help user."
              />
              <ShareLinkInput
                size={size}
                label="Share Link"
                required
                optional
                labelTooltip={<InfoIcon />}
                defaultValue="www.example.com"
                hint="This is a hint text to help user."
              />
              <ShareLinkInput
                size={size}
                label="Share Link"
                required
                optional
                labelTooltip={<InfoIcon />}
                placeholder="www.example.com"
                hint="This is a hint text to help user."
                disabled
              />
              <ShareLinkInput
                size={size}
                label="Share Link"
                required
                optional
                labelTooltip={<InfoIcon />}
                defaultValue="www.example.com"
                error="This is a hint text to help user."
              />
            </>
          )}
        />

        <Section
          title="SelectInput"
          renderColumn={(size) => (
            <>
              <SelectInput
                size={size}
                label="Country"
                placeholder="Select country"
                options={COUNTRY_OPTIONS}
                hint="This is a hint text to help user."
              />
              <SelectInput
                size={size}
                label="Country"
                placeholder="Select country"
                options={COUNTRY_OPTIONS}
                defaultValue="uz"
                hint="This is a hint text to help user."
              />
              <SelectInput
                size={size}
                label="Country"
                placeholder="Select country"
                options={COUNTRY_OPTIONS}
                hint="This is a hint text to help user."
                disabled
              />
              <SelectInput
                size={size}
                label="Country"
                placeholder="Select country"
                options={COUNTRY_OPTIONS}
                defaultValue="uz"
                error="Please select a country."
              />
            </>
          )}
        />

        <Section
          title="PhoneInput"
          renderColumn={(size) => (
            <>
              <PhoneInput
                size={size}
                label="Phone"
                defaultCountry="UZ"
                placeholder="90 123 45 67"
                hint="This is a hint text to help user."
              />
              <PhoneInput
                size={size}
                label="Phone"
                defaultCountry="UZ"
                defaultValue="+998 901234567"
                hint="This is a hint text to help user."
              />
              <PhoneInput
                size={size}
                label="Phone"
                defaultCountry="UZ"
                placeholder="90 123 45 67"
                hint="This is a hint text to help user."
                disabled
              />
              <PhoneInput
                size={size}
                label="Phone"
                defaultCountry="UZ"
                defaultValue="+998 901"
                error="Please enter a valid phone number."
              />
            </>
          )}
        />

        <Section
          title="DateInput"
          renderColumn={(size) => (
            <>
              <DateInput size={size} label="Date" hint="This is a hint text to help user." />
              <DateInput
                size={size}
                label="Date"
                defaultValue="2024-03-15"
                hint="This is a hint text to help user."
              />
              <DateInput
                size={size}
                label="Date"
                hint="This is a hint text to help user."
                disabled
              />
              <DateInput size={size} label="Date" defaultValue="2020-01-01" error="Invalid date." />
            </>
          )}
        />
      </div>
    </div>
  )
}
