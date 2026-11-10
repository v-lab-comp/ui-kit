import { useState, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RiCheckLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  ConfirmModal,
  ModalProvider,
  MODAL_SIZES,
  type ModalHandle,
} from './index'

/**
 * Storybook по умолчанию показывает весь `render` (режим source `auto`).
 * Задаём `type: 'code'` + `code`, чтобы в Docs / Code panel был только фрагмент с Modal.
 */
function docsModalSnippet(code: string) {
  return { type: 'code' as const, code, language: 'tsx' as const }
}

const IMPORT_LINE = `import { CheckboxField, Modal, ModalBody, ModalHeader, ModalFooter, ModalFooterConfirmActions } from '@v-lab/ui-kit'`

/** Только сборка Modal + пояснение state (без обёртки demo). */
const LAB1_MODAL_SNIPPET = `// const [open, setOpen] = useState(false)
${IMPORT_LINE}

<Modal open={open} onOpenChange={setOpen} size="medium">
  <ModalHeader title="Заголовок" />
  <ModalBody>Контент</ModalBody>
  <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
    <ModalFooterConfirmActions
      cancelText="Отмена"
      confirmText="Понятно"
      onCancel={() => setOpen(false)}
      onConfirm={() => setOpen(false)}
    />
  </ModalFooter>
</Modal>`

const LAB2_MODAL_SNIPPET = `// const [open, setOpen] = useState(false)
// const [animationType, setAnimationType] = useState<ModalAnimation>('scale')
${IMPORT_LINE}

<Modal
  open={open}
  onOpenChange={setOpen}
  animation={animationType}
  animationDuration={300}
  size="medium"
>
  <ModalHeader title="Заголовок" subtitle="Подзаголовок" />
  <ModalBody>Контент</ModalBody>
  <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
    <ModalFooterConfirmActions
      cancelText="Отмена"
      confirmText="Закрыть"
      onCancel={() => setOpen(false)}
      onConfirm={() => setOpen(false)}
    />
  </ModalFooter>
</Modal>`

const LAB3_MODAL_SNIPPET = `// const [open, setOpen] = useState(false)
// const [size, setSize] = useState<ModalSize>('medium')
${IMPORT_LINE}

<Modal open={open} onOpenChange={setOpen} size={size}>
  <ModalHeader title="Заголовок" subtitle="ширина из пресета" />
  <ModalBody>Контент</ModalBody>
  <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
    <ModalFooterConfirmActions
      cancelText="Отмена"
      confirmText="Продолжить"
      onCancel={() => setOpen(false)}
      onConfirm={() => setOpen(false)}
    />
  </ModalFooter>
</Modal>`

const LAB4_MODAL_SNIPPET = `import { ConfirmModal } from '@v-lab/ui-kit'

<ConfirmModal
  ref={modalRef}
  title="Операция"
  subtitle="Описание"
  onConfirm={handleConfirm}
  onError={(err) => setError(String(err))}
  onCancel={() => setError(null)}
>
  <p>Текст в теле.</p>
</ConfirmModal>`

const LAB5_MODAL_SNIPPET = `import {
  CheckboxField,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalFooterConfirmActions,
  ModalProvider,
  type ModalHandle,
} from '@v-lab/ui-kit'

// const a = useRef<ModalHandle>(null)
// const b = useRef<ModalHandle>(null)

<ModalProvider baseZIndex={1000}>
  <Modal ref={a} size="medium">
    <ModalHeader title="Первая" />
    <ModalBody>...</ModalBody>
    <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
      <ModalFooterConfirmActions
        cancelText="Отмена"
        confirmText="ОК"
        onCancel={() => a.current?.close()}
        onConfirm={() => a.current?.close()}
      />
    </ModalFooter>
  </Modal>

  <Modal ref={b} size="medium">
    <ModalHeader title="Вторая" subtitle="Поверх первой" />
    <ModalBody>...</ModalBody>
    <ModalFooter>
      <ModalFooterConfirmActions
        cancelText="Отмена"
        confirmText="ОК"
        onCancel={() => b.current?.close()}
        onConfirm={() => b.current?.close()}
      />
    </ModalFooter>
  </Modal>
</ModalProvider>`

const LAB6_MODAL_SNIPPET = `// Полные сценарии — в историях Lab 1–5. Минимальный каркас:
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@v-lab/ui-kit'

<Modal open={open} onOpenChange={setOpen} size="large" animation="scale" animationDuration={300}>
  <ModalHeader title="Заголовок" subtitle="Подзаголовок" />
  <ModalBody>Контент</ModalBody>
  <ModalFooter>{/* кнопки или ModalFooterConfirmActions */}</ModalFooter>
</Modal>`

const meta: Meta = {
  title: 'Overlays/Modal/🧪 Laboratory',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      codePanel: true,
      description: {
        component:
          '🧪 Лаборатория Modal: декларативное и imperative API, анимации, размеры, ConfirmModal, стек с **ModalProvider**. В панели **Code** показывается только сборка **Modal** (не весь render демо): `parameters.docs.source.type` = `code` + поле `code`.',
      },
    },
  },
}

export default meta

// ============================================================================
// LAB 1: DECLARATIVE CONTROL — useState + open/onOpenChange
// ============================================================================

export const Lab1_DeclaredativeControl: StoryObj = {
  name: '1️⃣ Declarative Control — useState паттерн',
  parameters: {
    docs: {
      description: {
        story:
          'Откройте **Docs** ниже — полный код с импортом из `@v-lab/ui-kit`: `open` + `onOpenChange` без ref.',
      },
      source: docsModalSnippet(LAB1_MODAL_SNIPPET),
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <div style={{ padding: 12, background: '#f0f0f0', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
            Управление через <code>useState</code>: пропы <code>open</code> и{' '}
            <code>onOpenChange</code>. Готовый фрагмент — в Docs → Show code.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>Open Modal (Declarative)</Button>

        <Modal open={open} onOpenChange={setOpen} size="medium">
          <ModalHeader title="Declarative Control Demo" />
          <ModalBody>
            <p style={{ margin: 0 }}>
              Модалка синхронизирована с React state. Закрытие — по кнопкам, Escape и клику на фоне
              (если включено в Modal).
            </p>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
            <ModalFooterConfirmActions
              cancelText="Отмена"
              confirmText="Понятно"
              onCancel={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
            />
          </ModalFooter>
        </Modal>
      </div>
    )
  },
}

// ============================================================================
// LAB 2: ANIMATION VARIANTS — scale, slide, fade, none
// ============================================================================

export const Lab2_AnimationVariants: StoryObj = {
  name: '2️⃣ Animation Variants — scale, slide, fade, none',
  parameters: {
    docs: {
      description: {
        story: '**Docs → Show code** — пропы `animation`, `animationDuration` на `Modal`.',
      },
      source: docsModalSnippet(LAB2_MODAL_SNIPPET),
    },
  },
  render: function Render() {
    const [animationType, setAnimationType] = useState<'scale' | 'slide' | 'fade' | 'none'>('scale')
    const [open, setOpen] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <div style={{ padding: 12, background: '#f0f0f0', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
            ✨ Новое: 4 варианта анимации вход + control длительности!
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['scale', 'slide', 'fade', 'none'] as const).map((type) => (
            <Button
              key={type}
              variant={animationType === type ? 'filled' : 'stroke'}
              onClick={() => setAnimationType(type)}
            >
              {type === 'scale' && '📈 Scale'}
              {type === 'slide' && '📤 Slide'}
              {type === 'fade' && '👻 Fade'}
              {type === 'none' && '⏸ None'}
            </Button>
          ))}
        </div>

        <Button onClick={() => setOpen(true)}>Open Modal with {animationType} animation</Button>

        <Modal
          open={open}
          onOpenChange={setOpen}
          animation={animationType}
          animationDuration={300}
          size="medium"
        >
          <ModalHeader
            title={`${animationType} Animation Demo`}
            subtitle="Watch the entrance effect"
          />
          <ModalBody>
            <p style={{ margin: 0 }}>
              Текущая анимация: <strong>{animationType}</strong>
            </p>
            <p style={{ margin: '12px 0 0', color: '#666', fontSize: 13 }}>
              • scale: Scale up + fade (по умолчанию)
              <br />• slide: Слайд вверх + fade
              <br />• fade: Только fade (без трансформаций)
              <br />• none: Без анимации
            </p>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
            <ModalFooterConfirmActions
              cancelText="Отмена"
              confirmText="Закрыть"
              onCancel={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
            />
          </ModalFooter>
        </Modal>
      </div>
    )
  },
}

// ============================================================================
// LAB 3: SIZE PRESETS — small, medium, large, fullWidth
// ============================================================================

export const Lab3_SizePresets: StoryObj = {
  name: '3️⃣ Size Presets — small, medium, large, fullWidth',
  parameters: {
    docs: {
      description: {
        story: '**Docs → Show code** — пресет ширины через `size` или свойство `width`.',
      },
      source: docsModalSnippet(LAB3_MODAL_SNIPPET),
    },
  },
  render: function Render() {
    const [size, setSize] = useState<'small' | 'medium' | 'large' | 'fullWidth'>('medium')
    const [open, setOpen] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <div style={{ padding: 12, background: '#f0f0f0', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
            ✨ Новое: Готовые размеры вместо магических чисел!
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['small', 'medium', 'large', 'fullWidth'] as const).map((s) => (
            <Button key={s} variant={size === s ? 'filled' : 'stroke'} onClick={() => setSize(s)}>
              {s === 'small' && '📦 Small (400px)'}
              {s === 'medium' && '📋 Medium (520px)'}
              {s === 'large' && '📺 Large (720px)'}
              {s === 'fullWidth' && '🖥 Full Width'}
            </Button>
          ))}
        </div>

        <Button onClick={() => setOpen(true)}>Open {size} Modal</Button>

        <Modal open={open} onOpenChange={setOpen} size={size}>
          <ModalHeader
            title={`${size} Modal`}
            subtitle={
              size === 'fullWidth'
                ? `Ширина: 100%, max ${MODAL_SIZES.fullWidth.maxWidth}`
                : `Ширина: ${MODAL_SIZES[size].width}px`
            }
          />
          <ModalBody>
            <p style={{ margin: 0 }}>Это Modal с размером «{size}».</p>
            <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, marginTop: 12 }}>
              <code style={{ fontSize: 12 }}>&lt;Modal size="{size}"&gt;...&lt;/Modal&gt;</code>
            </div>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
            <ModalFooterConfirmActions
              cancelText="Отмена"
              confirmText="Продолжить"
              onCancel={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
            />
          </ModalFooter>
        </Modal>
      </div>
    )
  },
}

// ============================================================================
// LAB 4: ERROR HANDLING IN CONFIRMMODAL
// ============================================================================

export const Lab4_ErrorHandling: StoryObj = {
  name: '4️⃣ Error Handling — onError callback',
  parameters: {
    docs: {
      description: {
        story:
          '**Docs → Show code** — готовая сборка `ConfirmModal` с `onError` при отклонённом `onConfirm`.',
      },
      source: docsModalSnippet(LAB4_MODAL_SNIPPET),
    },
  },
  render: function Render() {
    const modalRef = useRef<ModalHandle>(null)
    const [error, setError] = useState<string | null>(null)

    const handleConfirm = async () => {
      // Симуляция ошибки
      await new Promise((resolve) => setTimeout(resolve, 800))
      throw new Error('Operation failed: Server error 500')
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <div style={{ padding: 12, background: '#f0f0f0', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
            ✨ Новое: onError callback для graceful error handling!
          </p>
        </div>

        {error && (
          <div
            style={{ padding: 12, background: '#fee', border: '1px solid #f44', borderRadius: 4 }}
          >
            <p style={{ margin: 0, color: '#c33', fontSize: 13 }}>❌ {error}</p>
          </div>
        )}

        <Button onClick={() => modalRef.current?.open()}>
          Open ConfirmModal with Error Handler
        </Button>

        <ConfirmModal
          ref={modalRef}
          title="Perform Operation"
          subtitle="This will demonstrate error handling"
          onConfirm={handleConfirm}
          onError={(err) => {
            setError((err as Error).message)
            // Modal stays open, user can retry
          }}
          onCancel={() => setError(null)}
        >
          <p>Click "Confirm" to trigger an error and see the error handler in action.</p>
        </ConfirmModal>
      </div>
    )
  },
}

// ============================================================================
// LAB 5: MULTI-MODAL WITH MODALPROVIDER
// ============================================================================

export const Lab5_MultiModal: StoryObj = {
  name: '5️⃣ Multi-Modal Support — ModalProvider + z-index management',
  parameters: {
    docs: {
      description: {
        story:
          '**Docs → Show code** — `ModalProvider` при нескольких модалках (z-index, scroll lock, закрытие только верхней). Ниже — интерактив с тремя модалками.',
      },
      source: docsModalSnippet(LAB5_MODAL_SNIPPET),
    },
  },
  render: function Render() {
    const modal1Ref = useRef<ModalHandle>(null)
    const modal2Ref = useRef<ModalHandle>(null)
    const modal3Ref = useRef<ModalHandle>(null)

    return (
      <ModalProvider baseZIndex={1000}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
          <div style={{ padding: 12, background: '#f0f0f0', borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
              ✨ Новое: ModalProvider автоматически управляет z-index и body scroll lock!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button onClick={() => modal1Ref.current?.open()}>
              🔵 Open Modal 1 (z-index: 1100)
            </Button>
            <Button onClick={() => modal2Ref.current?.open()}>
              🟢 Open Modal 2 (z-index: 1200)
            </Button>
            <Button onClick={() => modal3Ref.current?.open()}>
              🟡 Open Modal 3 (z-index: 1300)
            </Button>
          </div>

          <div
            style={{
              fontSize: 12,
              color: '#666',
              padding: 8,
              background: '#f9f9f9',
              borderRadius: 4,
            }}
          >
            <strong>Попробуйте:</strong>
            <br />• Открыть несколько модалей одновременно
            <br />• Закрыть одну - остальные будут видны позади
            <br />• z-index автоматически управляется
            <br />• Body scroll lock координируется
          </div>

          {/* Modal 1 */}
          <Modal ref={modal1Ref} size="medium" animation="scale">
            <ModalHeader title="Modal 1 — Blue" />
            <ModalBody>
              <p style={{ margin: '0 0 12px' }}>
                Это первая модаль. z-index управляется ModalProvider автоматически.
              </p>
              <Button onClick={() => modal2Ref.current?.open()}>Open Modal 2 from here</Button>
            </ModalBody>
            <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="ОК"
                onCancel={() => {
                  modal1Ref.current?.close()
                }}
                onConfirm={() => {
                  modal1Ref.current?.close()
                }}
              />
            </ModalFooter>
          </Modal>

          {/* Modal 2 */}
          <Modal ref={modal2Ref} size="medium" animation="slide">
            <ModalHeader title="Modal 2 — Green" subtitle="Поверх Modal 1" />
            <ModalBody>
              <p style={{ margin: '0 0 12px' }}>
                Вторая модаль автоматически имеет более высокий z-index.
              </p>
              <Button onClick={() => modal3Ref.current?.open()}>Open Modal 3 from here</Button>
            </ModalBody>
            <ModalFooter>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="ОК"
                onCancel={() => {
                  modal2Ref.current?.close()
                }}
                onConfirm={() => {
                  modal2Ref.current?.close()
                }}
              />
            </ModalFooter>
          </Modal>

          {/* Modal 3 */}
          <Modal ref={modal3Ref} size="medium" animation="fade">
            <ModalHeader title="Modal 3 — Yellow" subtitle="Верх стека" />
            <ModalBody>
              <p style={{ margin: '0 0 8px' }}>Третья модаль имеет максимальный z-index в стеке.</p>
              <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
                Когда её закроешь, вернёшься к Modal 2, потом к Modal 1.
              </p>
            </ModalBody>
            <ModalFooter>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="ОК"
                onCancel={() => {
                  modal3Ref.current?.close()
                }}
                onConfirm={() => {
                  modal3Ref.current?.close()
                }}
              />
            </ModalFooter>
          </Modal>
        </div>
      </ModalProvider>
    )
  },
}

// ============================================================================
// LAB 6: COMPLETE SHOWCASE — ВСЕ НОВЫЕ ФИЧИ ВМЕСТЕ
// ============================================================================

export const Lab6_CompleteShowcase: StoryObj = {
  name: '6️⃣ Complete Showcase — Все новые фичи вместе',
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное демо без отдельного «эталонного» кода — смотрите **Lab 1–5** и панель **Code** там.',
      },
      source: docsModalSnippet(LAB6_MODAL_SNIPPET),
    },
  },
  render: function Render() {
    const [declarative, setDeclarative] = useState(false)

    return (
      <ModalProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 500 }}>
          <div
            style={{
              padding: 16,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 8,
            }}
          >
            <h3 style={{ margin: '0 0 8px' }}>🎨 Modal Laboratory — Showcase</h3>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>
              Все 5 улучшений Modal компонента в одном месте
            </p>
          </div>

          <div>
            <h4 style={{ marginTop: 0 }}>1. Declarative Control</h4>
            <p style={{ fontSize: 13, color: '#666' }}>useState + open/onOpenChange пропы</p>
            <Button onClick={() => setDeclarative(true)}>Open Declarative Modal</Button>
          </div>

          <div>
            <h4 style={{ marginTop: 0 }}>2. Animations</h4>
            <p style={{ fontSize: 13, color: '#666' }}>4 варианта: scale, slide, fade, none</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <ModalButton animation="scale" label="Scale" />
              <ModalButton animation="slide" label="Slide" />
              <ModalButton animation="fade" label="Fade" />
            </div>
          </div>

          <div>
            <h4 style={{ marginTop: 0 }}>3. Size Presets</h4>
            <p style={{ fontSize: 13, color: '#666' }}>
              small (400px), medium (520px), large (720px), fullWidth
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <SizeButton size="small" label="S" />
              <SizeButton size="medium" label="M" />
              <SizeButton size="large" label="L" />
            </div>
          </div>

          {/* Declarative Modal */}
          <Modal
            open={declarative}
            onOpenChange={setDeclarative}
            size="large"
            animation="scale"
            animationDuration={300}
          >
            <ModalHeader
              title="✨ All New Features"
              subtitle="Modal Component v9.2"
              icon={<RiCheckLine size={20} color="#4CAF50" />}
            />
            <ModalBody>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                <li>✅ Declarative control (useState + open/onOpenChange)</li>
                <li>✅ Animation variants (scale, slide, fade, none)</li>
                <li>✅ Size presets (small, medium, large, fullWidth)</li>
                <li>✅ Error handling (onError callback)</li>
                <li>✅ Multi-modal support (ModalProvider)</li>
              </ul>
            </ModalBody>
            <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="Закрыть"
                onCancel={() => setDeclarative(false)}
                onConfirm={() => setDeclarative(false)}
              />
            </ModalFooter>
          </Modal>
        </div>
      </ModalProvider>
    )
  },
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function ModalButton({
  animation,
  label,
}: {
  animation: 'scale' | 'slide' | 'fade' | 'none'
  label: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="stroke" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal open={open} onOpenChange={setOpen} animation={animation} size="medium">
        <ModalHeader title={`${label} Animation`} />
        <ModalBody>
          <p style={{ margin: 0 }}>Это Modal с animation=&quot;{animation}&quot;</p>
        </ModalBody>
        <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
          <ModalFooterConfirmActions
            cancelText="Отмена"
            confirmText="ОК"
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}

function SizeButton({ size, label }: { size: 'small' | 'medium' | 'large'; label: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="stroke" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal open={open} onOpenChange={setOpen} size={size}>
        <ModalHeader title={`${size} Modal`} />
        <ModalBody>
          <p style={{ margin: 0 }}>Ширина: {MODAL_SIZES[size].width}px</p>
        </ModalBody>
        <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
          <ModalFooterConfirmActions
            cancelText="Отмена"
            confirmText="ОК"
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}
