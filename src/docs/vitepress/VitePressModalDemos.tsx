import { useRef, type CSSProperties } from 'react'
import { RiInformationLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
import { Typography } from '@/components/Typography'
import { useModalContext } from '@/components/overlays/Modal/ModalContext'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  ModalFooterInfo,
  ModalFooterLinkButton,
  ModalFooterStepDots,
  ModalFooterSwitch,
  ModalHeader,
  type ModalHandle,
} from '@/components/overlays'

const shell: CSSProperties = {
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: '8px 0',
  maxWidth: '100%',
}

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--text-sub-600, #64748b)',
}

const row: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
}

/** Визуально как фрагмент `.panel` модалки — для статичных превью тела/футера. */
function PanelSlice({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-20)',
        border: '1px solid var(--stroke-soft-200)',
        background: 'var(--bg-white-0)',
        boxShadow: 'var(--shadow-regular-medium)',
        overflow: 'hidden',
        maxWidth: 480,
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}

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

/** Заголовок в теле при `ModalHeader closeOnly` — связка с `aria-labelledby`. */
function CloseOnlyTitle({ children }: { children: React.ReactNode }) {
  const { titleId } = useModalContext()
  return (
    <Typography
      id={titleId}
      variant="label"
      size="small"
      component="h2"
      style={{ margin: '0 0 8px' }}
    >
      {children}
    </Typography>
  )
}

export function ModalDocsDemo() {
  const fullRef = useRef<ModalHandle>(null)
  const headerPlainRef = useRef<ModalHandle>(null)
  const headerIconRef = useRef<ModalHandle>(null)
  const headerCloseOnlyRef = useRef<ModalHandle>(null)
  const bodyScrollRef = useRef<ModalHandle>(null)

  return (
    <div style={shell}>
      <section>
        <h3 style={sectionTitle}>Полный диалог</h3>
        <div style={row}>
          <Button type="button" onClick={() => fullRef.current?.open()}>
            Открыть пример
          </Button>
        </div>
        <Modal ref={fullRef} width={520}>
          <ModalHeader title="Сохранить изменения?" subtitle="Текущий файл будет перезаписан." />
          <ModalBody>
            <p style={{ margin: 0 }}>Пример тела модального окна: текст или форма.</p>
          </ModalBody>
          <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
            <ModalFooterConfirmActions
              cancelText="Отмена"
              confirmText="Сохранить"
              onCancel={() => fullRef.current?.close()}
              onConfirm={() => fullRef.current?.close()}
            />
          </ModalFooter>
        </Modal>
      </section>

      <section>
        <h3 style={sectionTitle}>Шапка (ModalHeader)</h3>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-sub-600, #64748b)' }}>
          Открываются отдельные модалки — шапка зависит от контекста модалки.
        </p>
        <div style={row}>
          <Button
            type="button"
            variant="stroke"
            size="small"
            onClick={() => headerPlainRef.current?.open()}
          >
            Заголовок и подзаголовок
          </Button>
          <Button
            type="button"
            variant="stroke"
            size="small"
            onClick={() => headerIconRef.current?.open()}
          >
            С иконкой слева
          </Button>
          <Button
            type="button"
            variant="stroke"
            size="small"
            onClick={() => headerCloseOnlyRef.current?.open()}
          >
            Только кнопка закрыть
          </Button>
        </div>

        <Modal ref={headerPlainRef} width={440}>
          <ModalHeader title="Заголовок" subtitle="Подзаголовок." />
          <ModalBody>
            <p style={{ margin: 0 }}>Контент.</p>
          </ModalBody>
          <ModalFooter>
            <ModalFooterConfirmActions
              cancelText="Закрыть"
              confirmText="ОК"
              onCancel={() => headerPlainRef.current?.close()}
              onConfirm={() => headerPlainRef.current?.close()}
            />
          </ModalFooter>
        </Modal>

        <Modal ref={headerIconRef} width={440}>
          <ModalHeader
            title="С иконкой"
            subtitle="Слот 40×40 слева."
            icon={
              <ModalIcon background="var(--primary-alpha-16)">
                <RiInformationLine size={20} color="var(--primary-base)" />
              </ModalIcon>
            }
          />
          <ModalBody>
            <p style={{ margin: 0 }}>Текст под шапкой.</p>
          </ModalBody>
          <ModalFooter>
            <ModalFooterConfirmActions
              cancelText="Закрыть"
              confirmText="Далее"
              onCancel={() => headerIconRef.current?.close()}
              onConfirm={() => headerIconRef.current?.close()}
            />
          </ModalFooter>
        </Modal>

        <Modal ref={headerCloseOnlyRef} width={400}>
          <ModalHeader closeOnly />
          <ModalBody>
            <CloseOnlyTitle>Заголовок в теле</CloseOnlyTitle>
            <p style={{ margin: 0 }}>
              При closeOnly заголовок задаётся здесь и связывается с aria-labelledby.
            </p>
          </ModalBody>
          <ModalFooter>
            <ModalFooterConfirmActions
              cancelText="Закрыть"
              confirmText="ОК"
              onCancel={() => headerCloseOnlyRef.current?.close()}
              onConfirm={() => headerCloseOnlyRef.current?.close()}
            />
          </ModalFooter>
        </Modal>
      </section>

      <section>
        <h3 style={sectionTitle}>Тело (ModalBody)</h3>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-sub-600, #64748b)' }}>
          Выравнивание <code style={{ fontSize: '0.9em' }}>align</code> и скролл при переполнении.
        </p>
        <div style={{ ...row, alignItems: 'stretch' }}>
          <PanelSlice>
            <ModalBody>
              <p style={{ margin: 0 }}>align=&quot;start&quot; (по умолчанию) — текст слева.</p>
            </ModalBody>
          </PanelSlice>
          <PanelSlice>
            <ModalBody align="center">
              <p style={{ margin: 0 }}>align=&quot;center&quot; — по центру.</p>
            </ModalBody>
          </PanelSlice>
        </div>
        <div style={{ marginTop: 8 }}>
          <Button
            type="button"
            variant="stroke"
            size="small"
            onClick={() => bodyScrollRef.current?.open()}
          >
            Длинный текст — скролл в теле
          </Button>
        </div>
        <Modal ref={bodyScrollRef} width={400} maxHeight={280}>
          <ModalHeader title="Прокрутка" subtitle="Много строк в ModalBody" />
          <ModalBody>
            {Array.from({ length: 16 }, (_, i) => (
              <p key={i} style={{ margin: '0 0 8px' }}>
                Строка контента {i + 1}. При переполнении появляется вертикальный скролл.
              </p>
            ))}
          </ModalBody>
          <ModalFooter>
            <ModalFooterConfirmActions
              cancelText="Закрыть"
              confirmText="Готово"
              onCancel={() => bodyScrollRef.current?.close()}
              onConfirm={() => bodyScrollRef.current?.close()}
            />
          </ModalFooter>
        </Modal>
      </section>

      <section>
        <h3 style={sectionTitle}>Подвал (ModalFooter и слоты)</h3>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-sub-600, #64748b)' }}>
          Статичные срезы панели — без открытия модалки.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PanelSlice>
            <ModalFooter>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="Продолжить"
                onCancel={() => {}}
                onConfirm={() => {}}
              />
            </ModalFooter>
          </PanelSlice>
          <PanelSlice>
            <ModalFooter
              startContent={<ModalFooterInfo>Короткая подсказка слева от кнопок.</ModalFooterInfo>}
            >
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="ОК"
                onCancel={() => {}}
                onConfirm={() => {}}
              />
            </ModalFooter>
          </PanelSlice>
          <PanelSlice>
            <ModalFooter startContent={<ModalFooterStepDots total={4} activeIndex={1} />}>
              <ModalFooterConfirmActions
                cancelText="Назад"
                confirmText="Далее"
                onCancel={() => {}}
                onConfirm={() => {}}
              />
            </ModalFooter>
          </PanelSlice>
          <PanelSlice>
            <ModalFooter
              startContent={
                <ModalFooterLinkButton onClick={() => {}}>Подробнее</ModalFooterLinkButton>
              }
            >
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="ОК"
                onCancel={() => {}}
                onConfirm={() => {}}
              />
            </ModalFooter>
          </PanelSlice>
          <PanelSlice>
            <ModalFooter startContent={<ModalFooterSwitch label="Опция в футере" defaultChecked />}>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="Сохранить"
                onCancel={() => {}}
                onConfirm={() => {}}
              />
            </ModalFooter>
          </PanelSlice>
        </div>
      </section>
    </div>
  )
}
