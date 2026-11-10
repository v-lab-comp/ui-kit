import { useState, type FormEvent } from 'react'
import { InputField } from '@/components/inputs/base/InputField'
import { BaseInput } from '@/components/inputs/base/BaseInput'
import { useCompositeInput } from '@/components/inputs/base/useCompositeInput'
import { SiteInput } from '@/components/inputs/SiteInput'
import { SelectInput } from '@/components/inputs/SelectInput'
import { Button } from '@/components/Button'
import type { SelectOptionWithShortLabel } from '@/components/inputs/SelectInput'
import styles from './CompositeInputsGuide.module.css'

const PROTOCOL_OPTIONS: SelectOptionWithShortLabel[] = [
  { value: 'https://', shortLabel: 'https://', label: 'HTTPS' },
  { value: 'http://', shortLabel: 'http://', label: 'HTTP' },
]

const TLD_OPTIONS: SelectOptionWithShortLabel[] = [
  { value: '.com', shortLabel: '.com', label: '.com' },
  { value: '.uz', shortLabel: '.uz', label: '.uz' },
  { value: '.ru', shortLabel: '.ru', label: '.ru' },
]

function splitDomain(domain: string, fallbackTld: string): [string, string] {
  const match = domain.match(/\.(com|uz|ru)$/i)
  if (match) {
    const tld = '.' + match[1].toLowerCase()
    return [domain.slice(0, -match[0].length), tld]
  }
  return [domain, fallbackTld]
}

const PROTOCOL_RE = /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//

function splitProtocol(url: string, fallback: string): [string, string] {
  const match = url.match(PROTOCOL_RE)
  if (match) return [match[0], url.slice(match[0].length)]
  return [fallback, url]
}

/** Полный URL: протокол (Select) + путь + зона (Select). Один инпут с обоими Select. */
function FullUrlInput({
  value,
  defaultValue,
  onChange,
  name,
  label = 'URL',
  hint,
}: {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
  label?: string
  hint?: string
}) {
  const defaultProtocol = PROTOCOL_OPTIONS[0].value
  const defaultTld = TLD_OPTIONS[0].value

  const { parts, notifyParts, hiddenInputs } = useCompositeInput({
    value,
    defaultValue,
    onChange,
    name,
    split: (url) => {
      const [proto, rest] = splitProtocol(url, defaultProtocol)
      const [namePart, tld] = splitDomain(rest || 'example', defaultTld)
      return [proto, namePart, tld]
    },
    join: ([proto, namePart, tld]) => proto + namePart + tld,
    formNames: ['protocol', undefined, 'tld'],
  })
  const [protocol, namePart, tld] = parts
  const startBlock = (
    <SelectInput
      variant="inline"
      aria-label="Протокол"
      options={PROTOCOL_OPTIONS}
      value={protocol}
      onChange={(next) => notifyParts([next, namePart, tld])}
      size="medium"
      placement="bottom"
    />
  )
  const endBlock = (
    <SelectInput
      variant="inline"
      aria-label="Доменная зона"
      options={TLD_OPTIONS}
      value={tld}
      onChange={(next) => notifyParts([protocol, namePart, next])}
      size="medium"
      placement="bottom"
    />
  )
  return (
    <>
      {hiddenInputs}
      <InputField
        label={label}
        hint={hint}
        startBlock={startBlock}
        endBlock={endBlock}
        size="medium"
      >
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            value={namePart}
            onChange={(e) => notifyParts([protocol, e.target.value, tld])}
            placeholder="example"
            className={styles.inputInner}
          />
        )}
      </InputField>
    </>
  )
}

function DomainWithEndBlock({
  value,
  defaultValue,
  onChange,
  name,
  label = 'Домен',
  hint = 'Имя сайта + зона в конце (endBlock).',
  endBlockAsSelect = true,
}: {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
  label?: string
  hint?: string
  /** false = статичный текст (например .com), true = Select выбора зоны */
  endBlockAsSelect?: boolean
}) {
  const { parts, notifyParts, hiddenInputs } = useCompositeInput({
    value,
    defaultValue,
    onChange,
    name,
    split: (s) => splitDomain(s, '.com'),
    join: ([namePart, tld]) => namePart + tld,
    formNames: [undefined, 'tld'],
  })
  const [namePart, tld] = parts
  const endBlock = endBlockAsSelect ? (
    <SelectInput
      variant="inline"
      aria-label="Доменная зона"
      options={TLD_OPTIONS}
      value={tld}
      onChange={(next) => notifyParts([namePart, next])}
      size="medium"
      placement="bottom"
    />
  ) : (
    <span>{tld}</span>
  )
  return (
    <>
      {hiddenInputs}
      <InputField label={label} hint={hint} endBlock={endBlock} size="medium">
        {(id) => (
          <BaseInput
            id={id}
            size="medium"
            value={namePart}
            onChange={(e) => notifyParts([e.target.value, tld])}
            placeholder="example"
            className={styles.inputInner}
          />
        )}
      </InputField>
    </>
  )
}

function CodeBlock({ title, code }: { title?: string; code: string }) {
  return (
    <div className={styles.codeBlock}>
      {title && <div className={styles.codeBlockTitle}>{title}</div>}
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

const CODE_STARTBLOCK_STATIC = `// Готовый компонент — статичный протокол
<SiteInput
  label="Сайт"
  protocol="https://"
  placeholder="example.com"
  hint="Протокол задан один раз."
/>`

const CODE_STARTBLOCK_SELECT = `const { parts, notifyParts, hiddenInputs } = useCompositeInput({
  value, defaultValue, onChange, name,
  split: (url) => splitProtocol(url, 'https://'),
  join: ([proto, path]) => proto + path,
  formNames: ['protocol'],
})
const [currentProtocol, currentPath] = parts

const startBlock = (
  <SelectInput
    variant="inline"
    aria-label="Протокол"
    options={protocolOptions}
    value={currentProtocol}
    onChange={(next) => notifyParts([next, currentPath])}
    size={size}
    placement="bottom"
  />
)

return (
  <>
    {hiddenInputs}
    <InputField startBlock={startBlock} label={label} hint={hint} ...>
      {(id) => (
        <BaseInput
          id={id}
          value={currentPath}
          onChange={(e) => notifyParts([currentProtocol, e.target.value])}
          ...
        />
      )}
    </InputField>
  </>
)`

const CODE_ENDBLOCK_STATIC = `const { parts, notifyParts, hiddenInputs } = useCompositeInput({
  value, defaultValue, onChange, name,
  split: (s) => splitDomain(s, '.com'),
  join: ([namePart, tld]) => namePart + tld,
  formNames: [undefined, 'tld'],
})
const [namePart, tld] = parts

// endBlock — просто текст (текущая часть)
const endBlock = <span>{tld}</span>

return (
  <>
    {hiddenInputs}
    <InputField endBlock={endBlock} label={label} hint={hint} ...>
      {(id) => (
        <BaseInput
          id={id}
          value={namePart}
          onChange={(e) => notifyParts([e.target.value, tld])}
          ...
        />
      )}
    </InputField>
  </>
)`

const CODE_ENDBLOCK_SELECT = `const { parts, notifyParts, hiddenInputs } = useCompositeInput({
  value, defaultValue, onChange, name,
  split: (s) => splitDomain(s, '.com'),
  join: ([namePart, tld]) => namePart + tld,
  formNames: [undefined, 'tld'],
})
const [namePart, tld] = parts

const endBlock = (
  <SelectInput
    variant="inline"
    aria-label="Доменная зона"
    options={TLD_OPTIONS}
    value={tld}
    onChange={(next) => notifyParts([namePart, next])}
    size="medium"
    placement="bottom"
  />
)

return (
  <>
    {hiddenInputs}
    <InputField endBlock={endBlock} label={label} hint={hint} ...>
      {(id) => (
        <BaseInput
          id={id}
          value={namePart}
          onChange={(e) => notifyParts([e.target.value, tld])}
          ...
        />
      )}
    </InputField>
  </>
)`

const CODE_BOTH_STATIC = `// startBlock и endBlock — оба статичный текст
<SiteInput
  label="Сайт"
  protocol="https://"
  placeholder="path"
  endBlock="/"
  hint="Протокол слева, суффикс / справа."
/>`

const CODE_BOTH_SELECT = `// startBlock = Select (протокол), endBlock = Select (зона) — оба в одном поле
const { parts, notifyParts, hiddenInputs } = useCompositeInput({
  value, defaultValue, onChange, name,
  split: (url) => {
    const [proto, rest] = splitProtocol(url, 'https://')
    const [namePart, tld] = splitDomain(rest, '.com')
    return [proto, namePart, tld]
  },
  join: ([proto, namePart, tld]) => proto + namePart + tld,
  formNames: ['protocol', undefined, 'tld'],
})
const [protocol, namePart, tld] = parts

const startBlock = (
  <SelectInput variant="inline" aria-label="Протокол" options={PROTOCOL_OPTIONS} value={protocol}
    onChange={(next) => notifyParts([next, namePart, tld])} ... />
)
const endBlock = (
  <SelectInput variant="inline" aria-label="Доменная зона" options={TLD_OPTIONS} value={tld}
    onChange={(next) => notifyParts([protocol, namePart, next])} ... />
)

return (
  <>
    {hiddenInputs}
    <InputField startBlock={startBlock} endBlock={endBlock} ...>
      {(id) => <BaseInput value={namePart} onChange={...} ... />}
    </InputField>
  </>
)`

const CODE_PLAYGROUND = `const [website, setWebsite] = useState('https://')
const [domain, setDomain] = useState('')

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget))
  alert(JSON.stringify(data, null, 2))
}

return (
  <form onSubmit={handleSubmit}>
    <SiteInput name="website" value={website} onChange={...} protocolOptions={...} />
    <DomainWithEndBlock name="domain" value={domain} onChange={...} />
    <Button type="submit">Отправить</Button>
  </form>
)`

type PlaygroundVariantId =
  | 'form'
  | 'startBlockStatic'
  | 'startBlockSelect'
  | 'endBlockStatic'
  | 'endBlockSelect'
  | 'bothStatic'
  | 'bothSelect'

const PLAYGROUND_VARIANTS: {
  id: PlaygroundVariantId
  label: string
  code: string
}[] = [
  { id: 'form', label: 'Форма (оба поля + Submit)', code: CODE_PLAYGROUND },
  { id: 'startBlockStatic', label: 'startBlock без Select', code: CODE_STARTBLOCK_STATIC },
  { id: 'startBlockSelect', label: 'startBlock с Select', code: CODE_STARTBLOCK_SELECT },
  { id: 'endBlockStatic', label: 'endBlock без Select', code: CODE_ENDBLOCK_STATIC },
  { id: 'endBlockSelect', label: 'endBlock с Select', code: CODE_ENDBLOCK_SELECT },
  { id: 'bothStatic', label: 'Оба без Select', code: CODE_BOTH_STATIC },
  { id: 'bothSelect', label: 'Оба с Select', code: CODE_BOTH_SELECT },
]

function renderVariantPreview(
  variantId: PlaygroundVariantId,
  formProps: {
    website: string
    setWebsite: (v: string) => void
    domain: string
    setDomain: (v: string) => void
    fullUrl: string
    setFullUrl: (v: string) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  }
) {
  const wrapWithForm = (content: React.ReactNode) => (
    <form onSubmit={formProps.handleSubmit} className={styles.formPlayground} noValidate>
      {content}
      <Button type="submit" className={styles.formPlaygroundButton}>
        Отправить
      </Button>
    </form>
  )

  switch (variantId) {
    case 'form':
      return wrapWithForm(
        <>
          <div>
            <div className={styles.formPlaygroundTitle}>Сайт (startBlock)</div>
            <div className={styles.formPlaygroundHint}>Протокол слева, путь справа.</div>
            <SiteInput
              name="website"
              label="Website"
              placeholder="example.com"
              protocolOptions={PROTOCOL_OPTIONS}
              value={formProps.website}
              onChange={(next) => formProps.setWebsite(next)}
            />
          </div>
          <div>
            <div className={styles.formPlaygroundTitle}>Домен (endBlock)</div>
            <div className={styles.formPlaygroundHint}>Имя слева, зона справа.</div>
            <DomainWithEndBlock
              name="domain"
              label="Domain"
              hint=""
              value={formProps.domain}
              onChange={(next) => formProps.setDomain(next)}
            />
          </div>
        </>
      )
    case 'startBlockStatic':
      return wrapWithForm(
        <SiteInput
          name="website"
          label="Сайт"
          protocol="https://"
          placeholder="example.com"
          hint="Протокол задан один раз."
          defaultValue="https://example.com"
        />
      )
    case 'startBlockSelect':
      return wrapWithForm(
        <SiteInput
          name="website"
          label="Сайт"
          placeholder="example.com"
          hint="Выбери протокол слева."
          protocolOptions={PROTOCOL_OPTIONS}
          defaultValue="https://example.com"
        />
      )
    case 'endBlockStatic':
      return wrapWithForm(
        <DomainWithEndBlock
          name="domain"
          label="Домен"
          hint="Зона справа — статичный текст."
          endBlockAsSelect={false}
          defaultValue="example.com"
        />
      )
    case 'endBlockSelect':
      return wrapWithForm(
        <DomainWithEndBlock
          name="domain"
          label="Домен"
          hint="Выбери зону справа."
          endBlockAsSelect
          defaultValue="example.com"
        />
      )
    case 'bothStatic':
      return wrapWithForm(
        <SiteInput
          name="website"
          label="Сайт"
          protocol="https://"
          placeholder="path"
          hint="Протокол слева, суффикс / справа."
          endBlock="/"
          defaultValue="https://path/"
        />
      )
    case 'bothSelect':
      return wrapWithForm(
        <FullUrlInput
          name="website"
          label="URL"
          hint="Протокол слева (Select), зона справа (Select)."
          value={formProps.fullUrl}
          onChange={(next) => formProps.setFullUrl(next)}
        />
      )
    default:
      return null
  }
}

export function CompositeInputsGuide() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Составные инпуты: startBlock, endBlock и оба</h1>
        <p className={styles.subtitle}>
          Как собрать поле из нескольких частей: блок слева (startBlock), блок справа (endBlock) и
          оба сразу. Под каждым примером — код, который это делает.
        </p>

        {/* ── Шаг 1: startBlock ───────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Шаг 1: startBlock — часть слева</h2>
          <p className={styles.sectionDesc}>
            Часть значения показывается слева от поля ввода. Можно показать статичный текст или
            Select для выбора (например протокол). В форме уходит одна строка и при необходимости
            отдельное поле для этой части.
          </p>

          <div className={styles.demoBox}>
            <div className={styles.demoBoxTitle}>startBlock без Select — статичный протокол</div>
            <div className={styles.demoBoxContent}>
              <SiteInput
                label="Сайт"
                protocol="https://"
                placeholder="example.com"
                hint="Протокол задан один раз, вводится только путь."
              />
            </div>
            <CodeBlock title="Как сделать" code={CODE_STARTBLOCK_STATIC} />
          </div>

          <div className={styles.demoBox}>
            <div className={styles.demoBoxTitle}>startBlock с Select — выбор протокола</div>
            <div className={styles.demoBoxContentWithSelect}>
              <SiteInput
                label="Сайт"
                placeholder="example.com"
                hint="Выбери протокол слева, введи путь справа."
                protocolOptions={PROTOCOL_OPTIONS}
              />
            </div>
            <CodeBlock
              title="Как сделать (useCompositeInput + Select в startBlock)"
              code={CODE_STARTBLOCK_SELECT}
            />
          </div>
        </section>

        {/* ── Шаг 2: endBlock ───────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Шаг 2: endBlock — часть справа</h2>
          <p className={styles.sectionDesc}>
            Часть значения показывается справа (например зона домена). Без Select — просто текст
            (.com). С Select — выбор зоны .com / .uz / .ru.
          </p>

          <div className={styles.demoBox}>
            <div className={styles.demoBoxTitle}>endBlock без Select — статичная зона</div>
            <div className={styles.demoBoxContent}>
              <DomainWithEndBlock
                label="Домен"
                hint="Зона справа — статичный текст (текущее значение части)."
                endBlockAsSelect={false}
              />
            </div>
            <CodeBlock title="Как сделать (endBlock = текст части)" code={CODE_ENDBLOCK_STATIC} />
          </div>

          <div className={styles.demoBox}>
            <div className={styles.demoBoxTitle}>endBlock с Select — выбор зоны</div>
            <div className={styles.demoBoxContentWithSelect}>
              <DomainWithEndBlock
                label="Домен"
                hint="Выбери зону справа (.com / .uz / .ru)."
                endBlockAsSelect
              />
            </div>
            <CodeBlock title="Как сделать (endBlock = Select)" code={CODE_ENDBLOCK_SELECT} />
          </div>
        </section>

        {/* ── Шаг 3: Оба блока ─────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Шаг 3: startBlock и endBlock вместе</h2>
          <p className={styles.sectionDesc}>
            В одном поле можно использовать и startBlock, и endBlock. Ниже: оба блока без Select,
            затем startBlock с Select (выбор протокола) и статичный endBlock.
          </p>

          <div className={styles.demoBox}>
            <div className={styles.demoBoxTitle}>Оба блока без Select</div>
            <div className={styles.demoBoxContent}>
              <SiteInput
                label="Сайт"
                protocol="https://"
                placeholder="path"
                hint="Статичный протокол слева, статичный суффикс / справа."
                endBlock="/"
              />
            </div>
            <CodeBlock title="Как сделать" code={CODE_BOTH_STATIC} />
          </div>

          <div className={styles.demoBox}>
            <div className={styles.demoBoxTitle}>startBlock с Select + endBlock статичный</div>
            <div className={styles.demoBoxContentWithSelect}>
              <SiteInput
                label="Сайт"
                placeholder="path"
                hint="Выбор протокола слева, суффикс / справа."
                protocolOptions={PROTOCOL_OPTIONS}
                endBlock="/"
              />
            </div>
            <CodeBlock
              title="Как сделать (startBlock = Select, endBlock = текст)"
              code={CODE_BOTH_SELECT}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export function CompositeInputsPlayground() {
  const [website, setWebsite] = useState('https://')
  const [domain, setDomain] = useState('')
  const [fullUrl, setFullUrl] = useState('https://example.com')
  const [activeVariant, setActiveVariant] = useState<PlaygroundVariantId>('form')
  const [codeByVariant, setCodeByVariant] = useState<Partial<Record<PlaygroundVariantId, string>>>(
    {}
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    alert(JSON.stringify(data, null, 2))
  }

  const formProps = {
    website,
    setWebsite,
    domain,
    setDomain,
    fullUrl,
    setFullUrl,
    handleSubmit,
  }

  const currentVariantConfig = PLAYGROUND_VARIANTS.find((v) => v.id === activeVariant)!
  const displayedCode = codeByVariant[activeVariant] ?? currentVariantConfig.code

  const setDisplayedCode = (value: string) => {
    setCodeByVariant((prev) => ({ ...prev, [activeVariant]: value }))
  }

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Playground: код и превью</h1>
        <p className={styles.subtitle}>
          Выбери вариант, смотри код и превью. Код можно править (для копирования). Превью
          показывает живой компонент. В любом варианте нажми «Отправить» — в alert выведется объект
          с данными формы.
        </p>

        <div className={styles.playgroundLayout}>
          <div className={styles.playgroundTabs}>
            {PLAYGROUND_VARIANTS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={
                  activeVariant === v.id
                    ? `${styles.playgroundTab} ${styles.playgroundTabActive}`
                    : styles.playgroundTab
                }
                onClick={() => setActiveVariant(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className={styles.playgroundSplit}>
            <div className={styles.playgroundCodeColumn}>
              <div id="composite-playground-code-label" className={styles.playgroundCodeLabel}>
                Код (можно редактировать и копировать)
              </div>
              <textarea
                aria-labelledby="composite-playground-code-label"
                className={styles.playgroundCodeTextarea}
                value={displayedCode}
                onChange={(e) => setDisplayedCode(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div className={styles.playgroundPreviewColumn}>
              <div className={styles.playgroundPreviewLabel}>Превью</div>
              <div className={styles.playgroundPreviewBox}>
                {renderVariantPreview(activeVariant, formProps)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
