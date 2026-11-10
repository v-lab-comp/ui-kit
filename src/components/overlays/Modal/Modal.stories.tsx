import { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RiInformationLine, RiSettings3Line } from '@remixicon/react'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
import { Modal } from './Modal'
import type { ModalHandle } from './Modal.types'
import { ModalBody } from './components/ModalBody'
import { ModalHeader } from './components/ModalHeader'
import { ModalFooter, ModalFooterConfirmActions } from './components/ModalFooter'

/** Helper component for icon display in stories */
function ModalIcon({ background, children }: { background: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-full)',
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

/** Эталон для копирования: импорт как у потребителя пакета (`@v-lab/ui-kit`). */
const PLAYGROUND_SOURCE = `import { useRef } from 'react'
import {
  Button,
  CheckboxField,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'

/**
 * Как собрать модалку:
 * 1) useRef<ModalHandle> + кнопка вызывает modalRef.current?.open()
 * 2) <Modal ref={modalRef}> … </Modal> — контент только когда открыта (портал в body)
 * 3) Внутри по порядку: ModalHeader → ModalBody → ModalFooter (опционально startContent + children-кнопки)
 */
export function SaveDialogExample() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <Button type="button" onClick={() => modalRef.current?.open()}>
        Открыть диалог
      </Button>

      <Modal ref={modalRef} width={520}>
        <ModalHeader
          title="Сохранить изменения?"
          subtitle="Текущий файл будет перезаписан."
        />
        <ModalBody>
          <p style={{ margin: 0 }}>Опишите действие или разместите форму.</p>
        </ModalBody>
        <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
          <ModalFooterConfirmActions
            cancelText="Отмена"
            confirmText="Сохранить"
            onCancel={() => modalRef.current?.close()}
            onConfirm={() => {
              // логика сохранения, затем:
              modalRef.current?.close()
            }}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}`

/** Полная модалка: шапка с иконкой, тело, футер — импорты как в приложении с npm-пакетом. */
const BASIC_SOURCE = `import { useRef } from 'react'
import { RiInformationLine } from '@remixicon/react'
import {
  Button,
  CheckboxField,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'

function ModalIcon({ background, children }: { background: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-full)',
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

export function FullModalExample() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <Button type="button" onClick={() => modalRef.current?.open()}>
        Открыть модалку
      </Button>

      <Modal ref={modalRef} width={520}>
        <ModalHeader
          title="Подтвердите действие"
          subtitle="Краткое пояснение для пользователя."
          icon={
            <ModalIcon background="var(--bg-soft-200)">
              <RiInformationLine size={22} color="var(--icon-sub-600)" />
            </ModalIcon>
          }
        />
        <ModalBody>
          <p style={{ margin: '0 0 12px' }}>
            Основной текст: описание ситуации или форма. Закрытие — по Escape, клику на фоне,
            крестику в шапке или «Отмена» в футере.
          </p>
          <p style={{ margin: 0, color: 'var(--text-sub-600)' }}>
            Дополнительная деталь вторичным цветом.
          </p>
        </ModalBody>
        <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
          <ModalFooterConfirmActions
            cancelText="Отмена"
            confirmText="Продолжить"
            onCancel={() => modalRef.current?.close()}
            onConfirm={() => modalRef.current?.close()}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}`

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Overlays/Modal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          '**Modal** — диалог с порталом и фокус-ловушкой (Floating UI). Импорт из пакета: `@v-lab/ui-kit`. Два способа: **ref** (`open()` / `close()`) или **state** (`open` + `onOpenChange`). Сборка: `Modal` → `ModalHeader` → `ModalBody` → при необходимости `ModalFooter` (кнопки и слот слева). Несколько модалок — оберните приложение в `ModalProvider`.',
      },
      source: {
        excludeStories: [
          'HeaderVariants',
          'AssemblyPatterns',
          'SizingAndProps',
          'WithFooter',
          'Playground',
        ],
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// ===== PLAYGROUND — эталонный код в Docs =====
export const Playground: Story = {
  name: 'Playground (пример кода)',
  parameters: {
    docs: {
      description: {
        story:
          'Ниже в панели **Show code** — готовый фрагмент для копирования: импорты, `useRef`, `ModalHeader` + `ModalBody` + `ModalFooter` с `startContent`.',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: PLAYGROUND_SOURCE,
      },
    },
  },
  render: function PlaygroundRender() {
    const modalRef = useRef<ModalHandle>(null)

    return (
      <>
        <Button type="button" onClick={() => modalRef.current?.open()}>
          Открыть диалог
        </Button>
        <Modal ref={modalRef} width={520}>
          <ModalHeader title="Сохранить изменения?" subtitle="Текущий файл будет перезаписан." />
          <ModalBody>
            <p style={{ margin: 0 }}>Опишите действие или разместите форму.</p>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
            <ModalFooterConfirmActions
              cancelText="Отмена"
              confirmText="Сохранить"
              onCancel={() => modalRef.current?.close()}
              onConfirm={() => modalRef.current?.close()}
            />
          </ModalFooter>
        </Modal>
      </>
    )
  },
}

// ===== BASIC MODAL — полная сборка =====
export const Basic: Story = {
  name: 'Базовая модалка',
  parameters: {
    docs: {
      description: {
        story:
          'Собранная модалка целиком: **ModalHeader** (иконка слева, заголовок, подзаголовок, кнопка закрытия), **ModalBody**, **ModalFooter** (чекбокс в слоте слева + Отмена / Продолжить). Ниже — готовый код для копирования.',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: BASIC_SOURCE,
      },
    },
  },
  render: function BasicRender() {
    const modalRef = useRef<ModalHandle>(null)

    return (
      <>
        <Button type="button" onClick={() => modalRef.current?.open()}>
          Открыть модалку
        </Button>
        <Modal ref={modalRef} width={520}>
          <ModalHeader
            title="Подтвердите действие"
            subtitle="Краткое пояснение для пользователя."
            icon={
              <ModalIcon background="var(--bg-soft-200)">
                <RiInformationLine size={22} color="var(--icon-sub-600)" />
              </ModalIcon>
            }
          />
          <ModalBody>
            <p style={{ margin: '0 0 12px' }}>
              Основной текст: описание ситуации или форма. Закрытие — по Escape, клику на фоне,
              крестику в шапке или «Отмена» в футере.
            </p>
            <p style={{ margin: 0, color: 'var(--text-sub-600)' }}>
              Дополнительная деталь вторичным цветом.
            </p>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
            <ModalFooterConfirmActions
              cancelText="Отмена"
              confirmText="Продолжить"
              onCancel={() => modalRef.current?.close()}
              onConfirm={() => modalRef.current?.close()}
            />
          </ModalFooter>
        </Modal>
      </>
    )
  },
}

// ===== MODAL HEADER VARIANTS =====
export const HeaderVariants: Story = {
  name: 'Заголовки: variants',
  render: function HeaderVariantsRender() {
    const ref1 = useRef<ModalHandle>(null)
    const ref2 = useRef<ModalHandle>(null)
    const ref3 = useRef<ModalHandle>(null)

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {/* Только title */}
        <Button onClick={() => ref1.current?.open()}>Title only</Button>
        <Modal ref={ref1}>
          <ModalHeader title="Just title" />
          <ModalBody>
            <p>ModalHeader с одним title.</p>
          </ModalBody>
        </Modal>

        {/* Title + subtitle */}
        <Button onClick={() => ref2.current?.open()}>Title + Subtitle</Button>
        <Modal ref={ref2}>
          <ModalHeader title="Title" subtitle="Subtitle text" />
          <ModalBody>
            <p>ModalHeader с title и subtitle.</p>
          </ModalBody>
        </Modal>

        {/* Title + icon */}
        <Button onClick={() => ref3.current?.open()}>Title + Icon</Button>
        <Modal ref={ref3}>
          <ModalHeader
            title="Settings"
            icon={
              <ModalIcon background="var(--bg-soft-200)">
                <RiSettings3Line size={22} color="var(--icon-sub-600)" />
              </ModalIcon>
            }
          />
          <ModalBody>
            <p>ModalHeader с иконкой в левой части.</p>
          </ModalBody>
        </Modal>
      </div>
    )
  },
}

// ===== ASSEMBLING MODALS =====
export const AssemblyPatterns: Story = {
  name: 'Сборка: как составить модалку',
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { useRef } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'

/** Минимальная сборка: ref → open/close, внутри Header + Body + Footer по необходимости. */
export function ModalAssemblyExample() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <Button type="button" onClick={() => modalRef.current?.open()}>
        Открыть
      </Button>

      <Modal ref={modalRef} width={520}>
        <ModalHeader title="Заголовок" subtitle="Подзаголовок (необязательно)" />
        <ModalBody>Основной контент.</ModalBody>
        <ModalFooter>
          <ModalFooterConfirmActions
            cancelText="Отмена"
            confirmText="ОК"
            onCancel={() => modalRef.current?.close()}
            onConfirm={() => modalRef.current?.close()}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}`,
      },
    },
  },
  render: function AssemblyPatternsRender() {
    const ref1 = useRef<ModalHandle>(null)
    const ref2 = useRef<ModalHandle>(null)
    const ref3 = useRef<ModalHandle>(null)
    const ref4 = useRef<ModalHandle>(null)

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {/* Pattern 1 */}
        <Button onClick={() => ref1.current?.open()}>Паттерн 1: Просто</Button>
        <Modal ref={ref1}>
          <ModalHeader title="Заголовок" />
          <ModalBody>Простая модалка с заголовком и контентом.</ModalBody>
        </Modal>

        {/* Pattern 2 */}
        <Button onClick={() => ref2.current?.open()}>Паттерн 2: Title + Subtitle</Button>
        <Modal ref={ref2}>
          <ModalHeader title="Заголовок" subtitle="Пояснение ситуации" />
          <ModalBody>Модалка с пояснением в подзаголовке.</ModalBody>
        </Modal>

        {/* Pattern 3 */}
        <Button onClick={() => ref3.current?.open()}>Паттерн 3: С иконкой</Button>
        <Modal ref={ref3}>
          <ModalHeader
            title="Информация"
            icon={
              <ModalIcon background="var(--bg-soft-200)">
                <RiInformationLine size={22} color="var(--icon-sub-600)" />
              </ModalIcon>
            }
          />
          <ModalBody>Модалка с иконкой слева от заголовка.</ModalBody>
        </Modal>

        {/* Pattern 4 */}
        <Button onClick={() => ref4.current?.open()}>Паттерн 4: С кнопками</Button>
        <Modal ref={ref4}>
          <ModalHeader title="Подтверждение" />
          <ModalBody>
            <p>Модалка с контентом и кнопками действий.</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button variant="stroke" onClick={() => ref4.current?.close()}>
                Отмена
              </Button>
              <Button onClick={() => ref4.current?.close()}>Подтвердить</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  },
}

// ===== PROPS & SIZING =====
export const SizingAndProps: Story = {
  name: 'Props: width, maxHeight, zIndex',
  render: function SizingRender() {
    const defaultRef = useRef<ModalHandle>(null)
    const largeRef = useRef<ModalHandle>(null)
    const scrollRef = useRef<ModalHandle>(null)

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => defaultRef.current?.open()}>Дефолт (авто)</Button>
        <Modal ref={defaultRef}>
          <ModalHeader title="Default width" />
          <ModalBody>Ширина определяется контентом.</ModalBody>
        </Modal>

        <Button onClick={() => largeRef.current?.open()}>Width: 600</Button>
        <Modal ref={largeRef} width={600}>
          <ModalHeader title="Широкая модалка" />
          <ModalBody>Фиксированная ширина 600px.</ModalBody>
        </Modal>

        <Button onClick={() => scrollRef.current?.open()}>MaxHeight: 300</Button>
        <Modal ref={scrollRef} width={500} maxHeight={300}>
          <ModalHeader title="Со скроллом" />
          <ModalBody>
            <p>Контент со скроллом внутри.</p>
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i}>Строка {i + 1}</p>
            ))}
          </ModalBody>
        </Modal>
      </div>
    )
  },
}

// ===== MODAL FOOTER =====
export const WithFooter: Story = {
  name: 'С ModalFooter',
  render: function WithFooterRender() {
    const basicRef = useRef<ModalHandle>(null)
    const deleteRef = useRef<ModalHandle>(null)
    const checkboxRef = useRef<ModalHandle>(null)

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {/* Basic footer */}
        <Button onClick={() => basicRef.current?.open()}>Базовый footer</Button>
        <Modal ref={basicRef}>
          <ModalHeader title="Confirm?" />
          <ModalBody>
            <p>Контент модалки с ModalFooter для кнопок.</p>
          </ModalBody>
          <ModalFooter>
            <ModalFooterConfirmActions
              onCancel={() => basicRef.current?.close()}
              onConfirm={() => basicRef.current?.close()}
            />
          </ModalFooter>
        </Modal>

        {/* Delete with error color */}
        <Button variant="stroke" color="error" onClick={() => deleteRef.current?.open()}>
          Delete with footer
        </Button>
        <Modal ref={deleteRef}>
          <ModalHeader title="Delete item?" subtitle="This cannot be undone" />
          <ModalBody>
            <p>Are you sure?</p>
          </ModalBody>
          <ModalFooter>
            <ModalFooterConfirmActions
              confirmColor="error"
              confirmText="Delete"
              onCancel={() => deleteRef.current?.close()}
              onConfirm={() => deleteRef.current?.close()}
            />
          </ModalFooter>
        </Modal>

        {/* With checkbox */}
        <Button onClick={() => checkboxRef.current?.open()}>Footer + Checkbox</Button>
        <Modal ref={checkboxRef}>
          <ModalHeader title="Save changes?" />
          <ModalBody>
            <p>Контент модалки и чекбокс в футере.</p>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Don't show again" size="small" />}>
            <ModalFooterConfirmActions
              onCancel={() => checkboxRef.current?.close()}
              onConfirm={() => checkboxRef.current?.close()}
            />
          </ModalFooter>
        </Modal>
      </div>
    )
  },
}
