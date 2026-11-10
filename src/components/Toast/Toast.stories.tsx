import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toast, ToastAction } from './ui/Toast'
import type { ToastProps } from './Toast.types'
import { Button } from '@/components/Button'
import {
  TOAST_COLOR_OPTIONS,
  TOAST_VARIANT_OPTIONS,
  TOAST_POSITION_OPTIONS,
  TOAST_SIZE_OPTIONS,
} from './Toast.types'
import type { ToastColor, ToastPosition } from './Toast.types'
import { ToastProvider } from './ToastProvider'
import { useToast } from './hooks/useToast'

type VirtualArgs = {
  actionLabels: string
  showClose: boolean
}

type InteractiveArgs = Omit<ToastProps, 'actions' | 'onClose'> & VirtualArgs

function parseActions(raw: string) {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((label) => (
      <ToastAction key={label} onClick={() => {}}>
        {label}
      </ToastAction>
    ))
}

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Уведомление-плашка с вариантами по смыслу: error, warning, success, info, neutral. ' +
          'Иконка слева, заголовок, опциональное описание и произвольный набор кнопок действий — ' +
          'разделитель «·» и перенос строки добавляются автоматически.\n\n' +
          '## ToastProvider — подключение\n\n' +
          '```tsx\n' +
          "import { ToastProvider, useToast, ToastAction } from 'v-lab-ui-kit'\n\n" +
          '// 1. Оберните приложение в ToastProvider\n' +
          'function App() {\n' +
          '  return (\n' +
          '    <ToastProvider\n' +
          '      position="top-right"  // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right\n' +
          '      duration={5000}        // ms до авто-закрытия (0 = не закрывать)\n' +
          '      maxToasts={5}          // макс. видимых тостов\n' +
          '      gap={12}               // расстояние между тостами (px)\n' +
          '      offset={24}            // отступ от края экрана (px)\n' +
          '      pauseOnHover           // пауза таймера при наведении\n' +
          '    >\n' +
          '      <MyApp />\n' +
          '    </ToastProvider>\n' +
          '  )\n' +
          '}\n\n' +
          '// 2. Вызывайте useToast() из любого компонента\n' +
          'function SaveButton() {\n' +
          '  const toast = useToast()\n' +
          '  return (\n' +
          "    <button onClick={() => toast.add('success', {\n" +
          "      title: 'Сохранено!',\n" +
          "      description: 'Данные обновлены.',\n" +
          "      variant: 'filled',    // filled | light | lighter | stroke\n" +
          '      duration: 3000,        // переопределение для этого тоста\n' +
          '      actions: [\n' +
          '        <ToastAction key="undo" onClick={handleUndo}>Отменить</ToastAction>,\n' +
          '      ],\n' +
          '    })}>\n' +
          '      Save\n' +
          '    </button>\n' +
          '  )\n' +
          '}\n' +
          '```\n\n' +
          '### ToastProvider Props\n\n' +
          '| Prop | Type | Default | Описание |\n' +
          '|------|------|---------|----------|\n' +
          '| `position` | `ToastPosition` | `top-right` | Позиция на экране (6 вариантов) |\n' +
          '| `duration` | `number` | `5000` | Авто-закрытие (ms), 0 = не закрывать |\n' +
          '| `maxToasts` | `number` | `5` | Макс. видимых тостов |\n' +
          '| `gap` | `number` | `12` | Расстояние между тостами (px) |\n' +
          '| `offset` | `number` | `24` | Отступ от края экрана (px) |\n' +
          '| `pauseOnHover` | `boolean` | `true` | Пауза таймера при наведении |\n' +
          '| `stacking` | `boolean` | `true` | Собирать тосты в стопку (раскрываются при наведении) |\n\n' +
          '### toast.add(color, options)\n\n' +
          '| Поле | Type | Описание |\n' +
          '|------|------|----------|\n' +
          '| `title` | `ReactNode` | Заголовок (обязателен) |\n' +
          '| `description` | `ReactNode` | Текст под заголовком |\n' +
          '| `variant` | `ToastVariant` | filled / light / lighter / stroke |\n' +
          '| `size` | `ToastSize` | x-small (32px) / small (36px) / large — у маленьких одна кнопка в строку с заголовком, без описания |\n' +
          '| `duration` | `number` | Переопределение duration для этого тоста |\n' +
          '| `actions` | `ToastActionElement[]` | Кнопки действий |\n' +
          '| `icon` | `ReactNode` | Своя иконка слева |',
      },
    },
  },
  argTypes: {
    color: {
      description: 'Семантический цвет тоста',
      options: TOAST_COLOR_OPTIONS,
      control: 'select',
    },
    variant: {
      description: 'Визуальный вариант (filled / light / lighter / stroke)',
      options: TOAST_VARIANT_OPTIONS,
      control: 'select',
    },
    size: {
      description:
        'x-small (32px) / small (36px) — одна строка, без описания, одна кнопка рядом с заголовком; large — описание и кнопки снизу',
      options: TOAST_SIZE_OPTIONS,
      control: 'select',
    },
    title: {
      description: 'Основной текст уведомления',
      control: 'text',
    },
    description: {
      description: 'Дополнительный текст под заголовком',
      control: 'text',
    },
    actions: {
      description:
        'Массив ReactNode — кнопки действий. Разделитель «·» и перенос строки автоматические. Используй <ToastAction> для правильного стиля.',
      control: false,
    },
    onClose: {
      description: 'Обработчик закрытия (крестик)',
      control: false,
    },
    icon: {
      description: 'Своя иконка слева; по умолчанию — иконка по варианту',
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof Toast>

const defaultActions = [
  <ToastAction key="upgrade" onClick={() => {}}>
    Upgrade
  </ToastAction>,
  <ToastAction key="learn" onClick={() => {}}>
    Learn More
  </ToastAction>,
]

// ─── Playground — интерактивный рендер для autodocs/controls ────────────────────

export const Playground: StoryObj<InteractiveArgs> = {
  name: 'Playground',
  args: {
    color: 'neutral',
    variant: 'filled',
    size: 'large',
    title: 'Insert your alert title here!',
    description: 'Insert the alert description here. It would look better as two lines of text.',
    actionLabels: 'Upgrade, Learn More',
    showClose: true,
  },
  argTypes: {
    actionLabels: {
      name: 'actions',
      description:
        'Метки кнопок через запятую — каждая превращается в `<ToastAction>`. ' +
        'Оставь пустым чтобы скрыть кнопки.',
      control: 'text',
      table: { type: { summary: 'string (comma-separated)' } },
    },
    showClose: {
      name: 'onClose',
      description: 'Показывать ли кнопку закрытия ×',
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
  },
  render: ({ actionLabels, showClose, ...args }) => (
    <Toast
      {...args}
      actions={parseActions(actionLabels)}
      onClose={showClose ? () => {} : undefined}
    />
  ),
}

// ─── X-Small (32px) — одна строка, одна кнопка ─────────────────────────────────

export const XSmall: Story = {
  name: 'X-Small (32px)',
  args: {
    color: 'warning',
    variant: 'filled',
    size: 'x-small',
    title: 'Insert your alert title here!',
    actions: [
      <ToastAction key="upgrade" onClick={() => {}}>
        Upgrade
      </ToastAction>,
    ],
    onClose: () => {},
  },
}

// ─── Small (36px) ─────────────────────────────────────────────────────────────

export const Small: Story = {
  name: 'Small (36px)',
  args: {
    color: 'success',
    variant: 'filled',
    size: 'small',
    title: 'Insert your alert title here!',
    actions: [
      <ToastAction key="upgrade" onClick={() => {}}>
        Upgrade
      </ToastAction>,
    ],
    onClose: () => {},
  },
}

// ─── Только заголовок ─────────────────────────────────────────────────────────

export const TitleOnly: Story = {
  name: 'Title Only',
  args: {
    color: 'neutral',
    variant: 'filled',
    title: 'Insert your alert title here!',
    actions: [
      <ToastAction key="upgrade" onClick={() => {}}>
        Upgrade
      </ToastAction>,
    ],
    onClose: () => {},
  },
}

// ─── Много кнопок — перенос строки ───────────────────────────────────────────

export const ManyActions: Story = {
  name: 'Many Actions (wrap)',
  args: {
    color: 'info',
    variant: 'filled',
    title: 'Insert your alert title here!',
    description: 'Разделители и перенос строки — автоматически.',
    actions: ['Upgrade', 'Learn More', 'View Details', 'Dismiss'].map((label) => (
      <ToastAction key={label} onClick={() => {}}>
        {label}
      </ToastAction>
    )),
    onClose: () => {},
  },
}

// ─── Все варианты ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants (filled, light, lighter, stroke)',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
      {TOAST_VARIANT_OPTIONS.map((variant) => (
        <Toast
          key={variant}
          variant={variant}
          color="neutral"
          title="Insert your alert title here!"
          description="Insert the alert description here. It would look better as two lines of text."
          actions={defaultActions}
          onClose={() => {}}
        />
      ))}
    </div>
  ),
}

// ─── Хелперы ─────────────────────────────────────────────────────────────────

function getColorLabel(v: ToastColor): string {
  return v.charAt(0).toUpperCase() + v.slice(1)
}

const triggerButtonColor: Record<
  ToastColor,
  'error' | 'warning' | 'success' | 'information' | 'neutral'
> = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'information',
  neutral: 'neutral',
}

// ─── LiveDemo (с ToastProvider + настройки) ─────────────────────────────────

function LiveDemoTriggers({ variant }: { variant: string }) {
  const toast = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {TOAST_COLOR_OPTIONS.map((color) => (
        <Button
          key={color}
          color={triggerButtonColor[color]}
          variant="filled"
          onClick={() =>
            toast.add(color, {
              title: `${getColorLabel(color)}: your alert title here!`,
              description:
                'Insert the alert description here. It would look better as two lines of text.',
              variant: variant as 'filled' | 'light' | 'lighter' | 'stroke',
              actions: defaultActions,
            })
          }
        >
          {getColorLabel(color)}
        </Button>
      ))}
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: 8,
  border: '1px solid #ddd',
  fontSize: 13,
  background: '#fff',
  minWidth: 140,
}

const inputStyle: React.CSSProperties = {
  ...selectStyle,
  width: 80,
  minWidth: 0,
}

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  fontSize: 12,
  fontWeight: 500,
  color: '#555',
}

export const LiveDemo: Story = {
  name: 'Live Demo (ToastProvider)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Интерактивная песочница: настройте position, duration, maxToasts, gap, offset, pauseOnHover и variant. ' +
          'Нажмите цветную кнопку — тост появится в выбранной позиции.',
      },
    },
  },
  render: function LiveDemoStory() {
    const [position, setPosition] = React.useState<ToastPosition>('top-right')
    const [duration, setDuration] = React.useState(5000)
    const [maxToasts, setMaxToasts] = React.useState(5)
    const [gap, setGap] = React.useState(12)
    const [offset, setOffset] = React.useState(24)
    const [pauseOnHover, setPauseOnHover] = React.useState(true)
    const [stacking, setStacking] = React.useState(true)
    const [variant, setVariant] = React.useState('filled')

    const [key, setKey] = React.useState(0)
    const resetProvider = () => setKey((k) => k + 1)

    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: 32 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'flex-end',
            marginBottom: 24,
            padding: 20,
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e5e5',
          }}
        >
          <label style={labelStyle}>
            Position
            <select
              style={selectStyle}
              value={position}
              onChange={(e) => {
                setPosition(e.target.value as ToastPosition)
                resetProvider()
              }}
            >
              {TOAST_POSITION_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label style={labelStyle}>
            Duration (ms)
            <input
              type="number"
              style={inputStyle}
              value={duration}
              min={0}
              step={500}
              onChange={(e) => {
                setDuration(Number(e.target.value))
                resetProvider()
              }}
            />
          </label>
          <label style={labelStyle}>
            Max Toasts
            <input
              type="number"
              style={inputStyle}
              value={maxToasts}
              min={1}
              max={20}
              onChange={(e) => {
                setMaxToasts(Number(e.target.value))
                resetProvider()
              }}
            />
          </label>
          <label style={labelStyle}>
            Gap (px)
            <input
              type="number"
              style={inputStyle}
              value={gap}
              min={0}
              max={48}
              onChange={(e) => {
                setGap(Number(e.target.value))
                resetProvider()
              }}
            />
          </label>
          <label style={labelStyle}>
            Offset (px)
            <input
              type="number"
              style={inputStyle}
              value={offset}
              min={0}
              max={100}
              onChange={(e) => {
                setOffset(Number(e.target.value))
                resetProvider()
              }}
            />
          </label>
          <label style={labelStyle}>
            Variant
            <select
              style={selectStyle}
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              {TOAST_VARIANT_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label style={{ ...labelStyle, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={pauseOnHover}
              onChange={(e) => {
                setPauseOnHover(e.target.checked)
                resetProvider()
              }}
            />
            Pause on hover
          </label>
          <label style={{ ...labelStyle, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={stacking}
              onChange={(e) => {
                setStacking(e.target.checked)
                resetProvider()
              }}
            />
            Stacking
          </label>
        </div>

        <ToastProvider
          key={key}
          position={position}
          duration={duration}
          maxToasts={maxToasts}
          gap={gap}
          offset={offset}
          pauseOnHover={pauseOnHover}
          stacking={stacking}
        >
          <LiveDemoTriggers variant={variant} />
        </ToastProvider>
      </div>
    )
  },
}

// ─── Отдельные варианты ───────────────────────────────────────────────────────

const colorArgs = {
  variant: 'filled' as const,
  title: 'Insert your alert title here!',
  description: 'Insert the alert description here. It would look better as two lines of text.',
  actions: defaultActions,
  onClose: () => {},
}

export const Error: Story = { args: { ...colorArgs, color: 'error' } }
export const Warning: Story = { args: { ...colorArgs, color: 'warning' } }
export const Success: Story = { args: { ...colorArgs, color: 'success' } }
export const Info: Story = { args: { ...colorArgs, color: 'info' } }
export const Neutral: Story = { args: { ...colorArgs, color: 'neutral' } }
