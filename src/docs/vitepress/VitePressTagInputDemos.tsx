import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { TagInput } from '@/components/inputs'
import type { TagInputSuggestion, TagInputTagValue } from '@/components/inputs'

const section: CSSProperties = {
  marginBottom: 24,
}

const title: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const wrap: CSSProperties = {
  maxWidth: 440,
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

const SKILL_POOL = ['React', 'TypeScript', 'Vue', 'Node.js', 'Design', 'QA', 'DevOps'] as const

const SKILL_POOL_EXTENDED = [...SKILL_POOL, 'Kubernetes', 'PostgreSQL', 'Figma']

function suggestionFromLabel(label: string): { id: string; label: string } {
  const id = label
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return { id: id || `item-${label}`, label }
}

const SKILL_SUGGESTIONS_WITH_IDS = SKILL_POOL.map((label) => suggestionFromLabel(label))
const SKILL_SUGGESTIONS_EXTENDED = SKILL_POOL_EXTENDED.map((label) => suggestionFromLabel(label))

export function TagInputDocsDemo() {
  const [basicTags, setBasicTags] = useState<TagInputTagValue[]>(['Design'])
  const [skillTags, setSkillTags] = useState<TagInputTagValue[]>([])

  return (
    <div style={wrap}>
      <section style={section}>
        <p style={title}>Базово</p>
        <TagInput
          label="Метки"
          hint="Enter — свой тег; запятая или «;» — новый токен."
          placeholder="Добавить…"
          value={basicTags}
          onChange={setBasicTags}
        />
      </section>

      <section style={section}>
        <p style={title}>Локальный справочник (`id` для ключей списка)</p>
        <TagInput
          label="Навыки"
          placeholder="Выберите или введите свой…"
          value={skillTags}
          onChange={setSkillTags}
          suggestions={SKILL_SUGGESTIONS_WITH_IDS}
          suggestionsMatch="contains"
        />
      </section>

      <section style={section}>
        <p style={title}>
          Как с бэка: onSuggestionsQueryChange + suggestionsMatch=&quot;server&quot;
        </p>
        <TagInputAsyncSection />
      </section>
    </div>
  )
}

function TagInputAsyncSection() {
  const all = useMemo(() => [...SKILL_SUGGESTIONS_EXTENDED], [])
  const [tags, setTags] = useState<TagInputTagValue[]>([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<TagInputSuggestion[]>([])

  useEffect(() => {
    const id = window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setSuggestions(q ? all.filter((row) => row.label.toLowerCase().includes(q)) : [...all])
    }, 220)
    return () => window.clearTimeout(id)
  }, [all, query])

  return (
    <TagInput
      label="Стек"
      placeholder="Поиск по справочнику…"
      hint="Родитель по запросу обновляет suggestions (здесь задержка 220 ms)."
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      suggestionsMatch="server"
      onSuggestionsQueryChange={setQuery}
    />
  )
}
