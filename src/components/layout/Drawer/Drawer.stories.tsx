import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RiFilter3Line, RiUserLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
import { TextInput } from '@/components/inputs/TextInput'
import { EmailInput } from '@/components/inputs/EmailInput'
import { SelectInput } from '@/components/inputs/SelectInput'
import { SearchInput } from '@/components/inputs/SearchInput'
import { Drawer } from './Drawer'
import { DrawerBody } from './components/DrawerBody'
import { DrawerFooter } from './components/DrawerFooter'
import { DrawerHeader } from './components/DrawerHeader'
import type { DrawerHandle } from './Drawer.types'

const PLAYGROUND_SOURCE = `import { useRef } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  TextInput,
  EmailInput,
  SelectInput,
  type DrawerHandle,
} from '@v-lab/ui-kit'

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Администратор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'viewer', label: 'Просмотр' },
]

export function InviteUserDrawer() {
  const drawerRef = useRef<DrawerHandle>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  function handleSave() {
    // сохранение пользователя
    drawerRef.current?.close()
  }

  return (
    <>
      <Button onClick={() => drawerRef.current?.open()}>
        Пригласить пользователя
      </Button>

      <Drawer ref={drawerRef} size="md">
        <DrawerHeader
          title="Новый пользователь"
          subtitle="Заполните данные и выберите роль"
        />
        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextInput
              label="Полное имя"
              required
              placeholder="Иван Иванов"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <EmailInput
              label="Email"
              required
              placeholder="user@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SelectInput
              label="Роль"
              required
              placeholder="Выберите роль"
              options={ROLE_OPTIONS}
              value={role}
              onChange={setRole}
            />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="stroke"
            color="neutral"
            size="small"
            onClick={() => drawerRef.current?.close()}
          >
            Отмена
          </Button>
          <Button size="small" onClick={handleSave}>
            Пригласить
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}`

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Администратор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'viewer', label: 'Просмотр' },
]

const DEPARTMENT_OPTIONS = [
  { value: 'dev', label: 'Разработка' },
  { value: 'design', label: 'Дизайн' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Финансы' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Активный' },
  { value: 'inactive', label: 'Неактивный' },
  { value: 'pending', label: 'Ожидает подтверждения' },
]

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Layout/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          '**Drawer** — панель, выезжающая с края экрана. Два способа открытия: **`ref`** (`open()` / `close()`) или контролируемо (`open` + `onOpenChange`). Сборка: `Drawer` → `DrawerHeader` → `DrawerBody` → `DrawerFooter`. На мобильных (≤640 px) при `mobileBottom` (по умолчанию `true`) панель всегда выезжает снизу.',
      },
      source: {
        excludeStories: ['Gallery'],
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

// ── Playground: форма создания пользователя ───────────────────────────────────

export const Playground: Story = {
  name: '📋 Playground — форма создания',
  parameters: {
    docs: {
      description: {
        story:
          'Типичный сценарий: форма с несколькими полями. **Show code** — готовый фрагмент для копирования.',
      },
      source: { type: 'code', language: 'tsx', code: PLAYGROUND_SOURCE },
    },
  },
  render: function PlaygroundRender() {
    const drawerRef = useRef<DrawerHandle>(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    return (
      <>
        <Button onClick={() => drawerRef.current?.open()}>Пригласить пользователя</Button>

        <Drawer ref={drawerRef} size="md">
          <DrawerHeader title="Новый пользователь" subtitle="Заполните данные и выберите роль" />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput
                label="Полное имя"
                required
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <EmailInput
                label="Email"
                required
                placeholder="user@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SelectInput
                label="Роль"
                placeholder="Выберите роль"
                options={ROLE_OPTIONS}
                value={role}
                onChange={(next) => setRole(next)}
              />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="stroke"
              color="neutral"
              size="small"
              onClick={() => drawerRef.current?.close()}
            >
              Отмена
            </Button>
            <Button size="small" onClick={() => drawerRef.current?.close()}>
              Пригласить
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    )
  },
}

// ── Редактирование записи ─────────────────────────────────────────────────────

export const EditRecord: Story = {
  name: 'Редактирование записи',
  parameters: {
    docs: {
      description: {
        story:
          'Drawer справа — удобно для редактирования выбранной строки в таблице без потери контекста страницы.',
      },
    },
  },
  render: function Render() {
    const ref = useRef<DrawerHandle>(null)
    const [name, setName] = useState('Ахмад Каримов')
    const [dept, setDept] = useState('dev')
    const [status, setStatus] = useState('active')

    return (
      <>
        <Button variant="stroke" color="neutral" onClick={() => ref.current?.open()}>
          Редактировать сотрудника
        </Button>

        <Drawer ref={ref} side="right" size="md">
          <DrawerHeader
            title="Редактировать сотрудника"
            subtitle="ID: EMP-00142"
            icon={
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-soft-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RiUserLine size={20} color="var(--icon-sub-600)" />
              </div>
            }
          />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput
                label="Полное имя"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <SelectInput
                label="Отдел"
                options={DEPARTMENT_OPTIONS}
                value={dept}
                onChange={(next) => setDept(next)}
              />
              <SelectInput
                label="Статус"
                options={STATUS_OPTIONS}
                value={status}
                onChange={(next) => setStatus(next)}
              />
            </div>
          </DrawerBody>
          <DrawerFooter
            startContent={
              <span style={{ fontSize: 13, color: 'var(--text-sub-600)' }}>
                Изменено: 12 мая 2026
              </span>
            }
          >
            <Button
              variant="stroke"
              color="neutral"
              size="small"
              onClick={() => ref.current?.close()}
            >
              Отмена
            </Button>
            <Button size="small" onClick={() => ref.current?.close()}>
              Сохранить
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    )
  },
}

// ── Панель фильтров ───────────────────────────────────────────────────────────

export const Filters: Story = {
  name: 'Панель фильтров',
  parameters: {
    docs: {
      description: {
        story: 'Фильтры выезжают слева или справа — пользователь видит таблицу/список позади.',
      },
    },
  },
  render: function Render() {
    const ref = useRef<DrawerHandle>(null)
    const [dept, setDept] = useState('')
    const [status, setStatus] = useState('')
    const [onlyActive, setOnlyActive] = useState(false)
    const [search, setSearch] = useState('')

    function reset() {
      setDept('')
      setStatus('')
      setOnlyActive(false)
      setSearch('')
    }

    return (
      <>
        <Button
          variant="stroke"
          color="neutral"
          leftNode={<RiFilter3Line size={16} />}
          onClick={() => ref.current?.open()}
        >
          Фильтры
        </Button>

        <Drawer ref={ref} side="left" size="sm">
          <DrawerHeader title="Фильтры" />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SearchInput
                label="Поиск по имени"
                placeholder="Введите имя..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SelectInput
                label="Отдел"
                placeholder="Все отделы"
                options={DEPARTMENT_OPTIONS}
                value={dept}
                onChange={(next) => setDept(next)}
              />
              <SelectInput
                label="Статус"
                placeholder="Любой статус"
                options={STATUS_OPTIONS}
                value={status}
                onChange={(next) => setStatus(next)}
              />
              <CheckboxField
                label="Только активные"
                checked={onlyActive}
                onChange={(e) => setOnlyActive(e.target.checked)}
              />
            </div>
          </DrawerBody>
          <DrawerFooter
            startContent={
              <Button variant="ghost" color="neutral" size="small" onClick={reset}>
                Сбросить
              </Button>
            }
          >
            <Button size="small" onClick={() => ref.current?.close()}>
              Применить
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    )
  },
}

// ── Детали объекта (просмотр) ─────────────────────────────────────────────────

export const DetailView: Story = {
  name: 'Детали объекта (просмотр)',
  parameters: {
    docs: {
      description: {
        story: 'Drawer без футера — только заголовок и тело с деталями выбранного объекта.',
      },
    },
  },
  render: function Render() {
    const ref = useRef<DrawerHandle>(null)

    return (
      <>
        <Button variant="stroke" color="neutral" onClick={() => ref.current?.open()}>
          Просмотр заказа #2847
        </Button>

        <Drawer ref={ref} side="right" size="md">
          <DrawerHeader title="Заказ #2847" subtitle="Создан 10 мая 2026" />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                ['Клиент', 'ООО «Технологии»'],
                ['Статус', 'В обработке'],
                ['Сумма', '1 240 000 сум'],
                ['Менеджер', 'Акбар Рашидов'],
                ['Комментарий', 'Срочная доставка, связаться до 18:00'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 12, color: 'var(--text-soft-400)', marginBottom: 2 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-strong-950)' }}>{value}</div>
                </div>
              ))}
            </div>
          </DrawerBody>
        </Drawer>
      </>
    )
  },
}

// ── Контролируемый (open + onOpenChange) ──────────────────────────────────────

export const Controlled: Story = {
  name: 'Контролируемый (open + onOpenChange)',
  parameters: {
    docs: {
      description: {
        story:
          'Альтернатива `ref`: управление через `open` + `onOpenChange`. Удобно когда состояние живёт в сторе или роутере.',
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    return (
      <>
        <Button onClick={() => setOpen(true)}>Создать проект</Button>

        <Drawer open={open} onOpenChange={setOpen} size="md">
          <DrawerHeader title="Новый проект" subtitle="Укажите основные параметры" />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput
                label="Название проекта"
                required
                placeholder="Мой проект"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <SelectInput
                label="Отдел"
                placeholder="Выберите отдел"
                options={DEPARTMENT_OPTIONS}
                value=""
                onChange={() => {}}
              />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="stroke" color="neutral" size="small" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button size="small" onClick={() => setOpen(false)}>
              Создать
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    )
  },
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'hidden' } },
  },
  render: function Render() {
    const leftRef = useRef<DrawerHandle>(null)
    const rightRef = useRef<DrawerHandle>(null)
    const topRef = useRef<DrawerHandle>(null)
    const bottomRef = useRef<DrawerHandle>(null)
    const noHeaderRef = useRef<DrawerHandle>(null)
    const closeOnlyRef = useRef<DrawerHandle>(null)

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Button size="small" onClick={() => leftRef.current?.open()}>
          side=left
        </Button>
        <Button size="small" onClick={() => rightRef.current?.open()}>
          side=right
        </Button>
        <Button size="small" onClick={() => topRef.current?.open()}>
          side=top
        </Button>
        <Button size="small" onClick={() => bottomRef.current?.open()}>
          side=bottom
        </Button>
        <Button size="small" variant="stroke" onClick={() => noHeaderRef.current?.open()}>
          No backdrop
        </Button>
        <Button size="small" variant="stroke" onClick={() => closeOnlyRef.current?.open()}>
          closeOnly header
        </Button>

        <Drawer ref={leftRef} side="left" size="sm">
          <DrawerHeader title="Left drawer" subtitle="side=left, size=sm" />
          <DrawerBody>
            <p style={{ margin: 0, fontSize: 14 }}>Content area</p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" variant="ghost" onClick={() => leftRef.current?.close()}>
              Close
            </Button>
          </DrawerFooter>
        </Drawer>

        <Drawer ref={rightRef} side="right" size="md">
          <DrawerHeader title="Right drawer" subtitle="side=right, size=md" />
          <DrawerBody>
            <p style={{ margin: 0, fontSize: 14 }}>Content area</p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" variant="ghost" onClick={() => rightRef.current?.close()}>
              Close
            </Button>
            <Button size="small" onClick={() => rightRef.current?.close()}>
              Save
            </Button>
          </DrawerFooter>
        </Drawer>

        <Drawer ref={topRef} side="top" size="sm">
          <DrawerHeader title="Top drawer" subtitle="side=top" />
          <DrawerBody>
            <p style={{ margin: 0, fontSize: 14 }}>Content area</p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" variant="ghost" onClick={() => topRef.current?.close()}>
              Close
            </Button>
          </DrawerFooter>
        </Drawer>

        <Drawer ref={bottomRef} side="bottom" size="sm">
          <DrawerHeader title="Bottom drawer" subtitle="side=bottom" />
          <DrawerBody>
            <p style={{ margin: 0, fontSize: 14 }}>Content area</p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" variant="ghost" onClick={() => bottomRef.current?.close()}>
              Close
            </Button>
          </DrawerFooter>
        </Drawer>

        <Drawer ref={noHeaderRef} side="right" size="sm" hideBackdrop>
          <DrawerHeader title="No backdrop" subtitle="hideBackdrop=true" />
          <DrawerBody>
            <p style={{ margin: 0, fontSize: 14 }}>Click outside to close</p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" variant="ghost" onClick={() => noHeaderRef.current?.close()}>
              Close
            </Button>
          </DrawerFooter>
        </Drawer>

        <Drawer ref={closeOnlyRef} side="right" size="sm">
          <DrawerHeader closeOnly />
          <DrawerBody>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Custom content</p>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-sub-600)' }}>
              DrawerHeader with closeOnly=true — renders only the × button.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => closeOnlyRef.current?.close()}>
              Done
            </Button>
          </DrawerFooter>
        </Drawer>
      </div>
    )
  },
}

// ── Размеры ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Размеры — sm / md / lg / xl',
  parameters: {
    docs: {
      description: {
        story:
          'Пресеты: `sm` 360px, `md` 440px (default), `lg` 560px, `xl` 720px. Кастомный через `width`.',
      },
    },
  },
  render: function Render() {
    const refs = {
      sm: useRef<DrawerHandle>(null),
      md: useRef<DrawerHandle>(null),
      lg: useRef<DrawerHandle>(null),
      xl: useRef<DrawerHandle>(null),
    }
    const widths = { sm: 360, md: 440, lg: 560, xl: 720 }

    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Button
            key={s}
            size="small"
            variant="stroke"
            color="neutral"
            onClick={() => refs[s].current?.open()}
          >
            {s} — {widths[s]}px
          </Button>
        ))}

        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Drawer key={s} ref={refs[s]} size={s}>
            <DrawerHeader title={`size="${s}"`} subtitle={`Ширина панели ${widths[s]}px`} />
            <DrawerBody>
              <TextInput label="Поле" placeholder="Пример поля внутри drawer" />
            </DrawerBody>
            <DrawerFooter>
              <Button size="small" onClick={() => refs[s].current?.close()}>
                Закрыть
              </Button>
            </DrawerFooter>
          </Drawer>
        ))}
      </div>
    )
  },
}
