import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from '@/components/Tag'
import { TagInput } from '.'
import { tagLabel } from './types'
import type { TagInputSuggestion, TagInputTagValue } from './types'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'

const SKILL_POOL = ['React', 'TypeScript', 'Vue', 'Node.js', 'Design', 'QA', 'DevOps'] as const

/** Расширенный список для демо «как с API». */
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

/**
 * Пример для вкладки Docs (история «Список с бэка»): только TagInput и загрузка подсказок в родителе.
 */
const ASYNC_SUGGESTIONS_STORY_SOURCE = `import { useEffect, useState } from 'react'
import { TagInput } from '@v-lab/ui-kit'
import type { TagInputSuggestion } from '@v-lab/ui-kit'

/** Имитация ответа API: стабильный id + подпись для тега. */
const OPTIONS_FROM_BACKEND: TagInputSuggestion[] = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vue', label: 'Vue' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'design', label: 'Design' },
  { id: 'qa', label: 'QA' },
  { id: 'devops', label: 'DevOps' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'figma', label: 'Figma' },
]

export function TagsFieldWithRemoteSuggestions() {
  const [tags, setTags] = useState<TagInputTagValue[]>([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<TagInputSuggestion[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setSuggestions(
        q
          ? OPTIONS_FROM_BACKEND.filter((s) => s.label.toLowerCase().includes(q))
          : [...OPTIONS_FROM_BACKEND]
      )
    }, 220)

    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <TagInput
      label="Стек"
      placeholder="Поиск по справочнику…"
      hint="Родитель по onSuggestionsQueryChange обновляет suggestions (как после ответа API)."
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      suggestionsMatch="server"
      onSuggestionsQueryChange={setQuery}
    />
  )
}
`

const meta: Meta<typeof TagInput> = {
  component: TagInput,
  title: 'Inputs/TagInput',
  tags: ['autodocs'],
  args: {
    hint: 'Свой тег: введите текст → Enter (или запятая/«;»). Из списка: клик, Tab или Enter при пустом поле. ↑↓ — подсветка; Esc — скрыть список.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: { excludeStories: ['Gallery'] },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    completed: {
      control: 'boolean',
      description: 'Акцентная рамка InputField. См. сторис **Completed**.',
    },
    completedColor: {
      control: 'text',
      description: 'Пресет success / error / warning… или var(--…).',
    },
    allowDuplicates: { control: 'boolean' },
    commitOnBlur: { control: 'boolean' },
    maxTags: { control: 'number' },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
    startBlock: { table: { disable: true } },
    endBlock: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    removeTagLabel: { table: { disable: true } },
    splitPattern: { table: { disable: true } },
    wrapperClassName: { table: { disable: true } },
    suggestions: { table: { disable: true } },
    onSuggestionsQueryChange: { table: { disable: true } },
    suggestionsMatch: {
      control: 'select',
      options: ['contains', 'startsWith', 'server'],
    },
    suggestionsExcludeSelected: {
      control: 'boolean',
      description:
        'Старое поведение: выбранные пункты скрываются из списка. По умолчанию **false** — галочки и toggle.',
    },
    wrapperStyle: { table: { disable: true } },
    tagsAreaMaxHeight: {
      control: 'text',
      description: 'Число (px), CSS string или none — см. TagInputProps.tagsAreaMaxHeight',
    },
  },
}

export default meta
type Story = StoryObj<typeof TagInput>

function GallerySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--text-sub-600)' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export const Playground: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    return <TagInput {...args} value={tags} onChange={setTags} />
  },
  args: {
    label: 'Теги',
    placeholder: 'Введите и нажмите Enter…',
    size: 'medium',
  },
}

export const Completed: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>(['React'])
    return <TagInput {...args} value={tags} onChange={setTags} />
  },
  args: {
    label: 'Стек',
    completed: true,
    placeholder: 'Добавьте тег…',
    hint: 'Рамка оболочки — те же **`completed`** / **`completedColor`**, что у TextInput.',
  },
  parameters: {
    docs: {
      description: {
        story: '**TagInput** наследует пропы **InputField**, включая акцентную рамку.',
      },
    },
  },
}

export const WithInitialTags: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>(['Design', 'React'])
    return <TagInput {...args} value={tags} onChange={setTags} />
  },
  args: {
    label: 'Команда',
    placeholder: 'Добавить…',
  },
}

export const MaxThree: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>(['A'])
    return <TagInput {...args} value={tags} onChange={setTags} />
  },
  args: {
    label: 'Не больше трёх',
    maxTags: 3,
    placeholder: 'Лимит 3',
  },
}

export const WithSuggestions: Story = {
  name: 'Список предложений (локально)',
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    return (
      <TagInput
        {...args}
        value={tags}
        onChange={setTags}
        suggestions={SKILL_SUGGESTIONS_WITH_IDS}
        hint="Выберите из списка или введите свой навык и нажмите Enter."
      />
    )
  },
  args: {
    label: 'Навыки',
    placeholder: 'Начните ввод или откройте список…',
  },
}

function TagInputAsyncSuggestionsDemo() {
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
      hint="Родитель по onSuggestionsQueryChange обновляет suggestions (как после ответа API)."
      placeholder="Поиск по справочнику…"
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      suggestionsMatch="server"
      onSuggestionsQueryChange={setQuery}
    />
  )
}

export const AsyncSuggestions: Story = {
  name: 'Список с «бэка» (onSuggestionsQueryChange)',
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: ASYNC_SUGGESTIONS_STORY_SOURCE,
      },
    },
  },
  render: () => <TagInputAsyncSuggestionsDemo />,
}

export const LimitedHeightScroll: Story = {
  name: 'Ограничение высоты + скролл',
  render: function Render() {
    const [tags, setTags] = useState<TagInputTagValue[]>(() =>
      Array.from({ length: 14 }, (_, i) => `Тег ${i + 1}`)
    )
    return (
      <TagInput
        label="Много меток"
        hint="tagsAreaMaxHeight=120 — скролл только у области тегов; полоска как у SelectInput."
        value={tags}
        onChange={setTags}
        tagsAreaMaxHeight={120}
      />
    )
  },
}

export const GrayTags: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>(['staging'])
    return <TagInput {...args} value={tags} onChange={setTags} />
  },
  args: {
    label: 'Окружение',
    tagVariant: 'gray',
  },
}

export const ListOnlyNoCustomTags: Story = {
  name: 'Только из списка (allowCustomTags=false)',
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    return (
      <TagInput
        {...args}
        value={tags}
        onChange={setTags}
        suggestions={SKILL_SUGGESTIONS_WITH_IDS}
        allowCustomTags={false}
        hint="Свой текст не добавляется — только выбор из списка (или точное совпадение label при Enter)."
      />
    )
  },
  args: {
    label: 'Навыки (строго)',
    placeholder: 'Фильтр и выбор…',
  },
}

export const SuggestionsLoadingAndEmpty: Story = {
  name: 'Загрузка и пустой список',
  render: function Render() {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<TagInputSuggestion[]>([])

    useEffect(() => {
      setLoading(true)
      const id = window.setTimeout(() => {
        const q = query.trim().toLowerCase()
        const next =
          q === 'zzz'
            ? []
            : SKILL_SUGGESTIONS_EXTENDED.filter((row) => row.label.toLowerCase().includes(q))
        setSuggestions(next)
        setLoading(false)
      }, 400)
      return () => window.clearTimeout(id)
    }, [query])

    return (
      <TagInput
        label="Поиск"
        hint="Введите «zzz» — пустой список; иначе подсказки после задержки."
        placeholder="Начните ввод…"
        value={tags}
        onChange={setTags}
        suggestions={suggestions}
        suggestionsMatch="server"
        suggestionsLoading={loading}
        suggestionsEmptyText="Ничего не найдено"
        suggestionsLoadingText="Загрузка…"
        onSuggestionsQueryChange={setQuery}
      />
    )
  },
}

export const ValueWithObjectTags: Story = {
  name: 'Значение с id (объекты из списка)',
  render: function Render() {
    const [tags, setTags] = useState<TagInputTagValue[]>([{ id: 'react', label: 'React' }, 'Notes'])
    return (
      <TagInput
        label="Стек"
        hint="Из списка добавляются объекты { id, label }; свой текст — строка."
        value={tags}
        onChange={setTags}
        suggestions={SKILL_SUGGESTIONS_WITH_IDS}
      />
    )
  },
}

export const ValidateTagStory: Story = {
  name: 'validateTag (блокировка)',
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    return (
      <TagInput
        {...args}
        value={tags}
        onChange={setTags}
        validateTag={(lbl) => lbl.length >= 2 && !lbl.toLowerCase().includes('bad')}
        hint="Не добавятся теги короче 2 символов или со словом «bad»."
      />
    )
  },
  args: {
    label: 'Фильтр ввода',
    placeholder: 'Попробуйте «a» или «bad»…',
  },
}

export const DisabledSuggestions: Story = {
  name: 'Отключённые пункты (getOptionDisabled)',
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    return (
      <TagInput
        {...args}
        value={tags}
        onChange={setTags}
        suggestions={SKILL_SUGGESTIONS_WITH_IDS}
        getOptionDisabled={(row) => row.id === 'vue'}
        hint="Vue в списке недоступен для выбора."
      />
    )
  },
  args: {
    label: 'Навыки',
    placeholder: 'Откройте список…',
  },
}

export const CollapsedTagRow: Story = {
  name: 'Свёртка отображения (maxTagCount)',
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>(['One', 'Two', 'Three', 'Four', 'Five'])
    return (
      <TagInput
        {...args}
        value={tags}
        onChange={setTags}
        maxTagCount={3}
        hint="В поле до 5 тегов; видны первые 3 и +2."
      />
    )
  },
  args: {
    label: 'Много меток',
  },
}

export const CustomRenderTag: Story = {
  name: 'Кастомный чип (renderTag)',
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>(['alpha', 'beta'])
    return (
      <TagInput
        {...args}
        value={tags}
        onChange={setTags}
        renderTag={({ tag, onRemove, disabled: chipDisabled }) => (
          <Tag
            variant="gray"
            disabled={chipDisabled}
            onDismiss={onRemove}
            dismissLabel={`Удалить ${tagLabel(tag)}`}
          >
            [{tagLabel(tag)}]
          </Tag>
        )}
      />
    )
  },
  args: {
    label: 'Кастомный вид',
  },
}

export const WithError: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState<TagInputTagValue[]>([])
    return <TagInput {...args} value={tags} onChange={setTags} />
  },
  args: {
    label: 'Обязательные теги',
    error: 'Добавьте хотя бы один тег.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Только чтение',
    disabled: true,
    value: ['alpha', 'beta'],
    onChange: () => {},
  },
}

function TagInputGalleryDemo() {
  const [a, setA] = useState<TagInputTagValue[]>(['Vue', 'Vite'])
  const [b, setB] = useState<TagInputTagValue[]>([])
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <GallerySection title="С тегами и подсказкой">
        <TagInput
          label="Стек"
          hint="Вставьте список через запятую — разобьётся на теги."
          value={a}
          onChange={setA}
        />
      </GallerySection>
      <GallerySection title="Пустое + предложения">
        <TagInput
          label="Метки"
          placeholder="keywords…"
          value={b}
          onChange={setB}
          suggestions={SKILL_SUGGESTIONS_WITH_IDS}
        />
      </GallerySection>
      <GallerySection title="Small / Big">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TagInput label="Small" size="small" value={['x']} onChange={() => {}} />
          <TagInput label="Big" size="big" value={['y']} onChange={() => {}} />
        </div>
      </GallerySection>
    </div>
  )
}

export const Gallery: Story = {
  name: '📋 Gallery',
  parameters: { controls: { disable: true } },
  render: () => <TagInputGalleryDemo />,
}
