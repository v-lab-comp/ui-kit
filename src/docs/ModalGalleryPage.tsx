import { useRef } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { RiInformationLine, RiSettings3Line } from '@remixicon/react'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
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
import styles from './ModalGalleryPage.module.css'

function ModalIcon({ background, children }: { background: string; children: ReactNode }) {
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

export type ModalGalleryPageProps = {
  embedded?: boolean
}

export function ModalGalleryPage({ embedded = false }: ModalGalleryPageProps) {
  const fullRef = useRef<ModalHandle>(null)
  const h1Ref = useRef<ModalHandle>(null)
  const h2Ref = useRef<ModalHandle>(null)
  const h3Ref = useRef<ModalHandle>(null)
  const sz1Ref = useRef<ModalHandle>(null)
  const sz2Ref = useRef<ModalHandle>(null)
  const sz3Ref = useRef<ModalHandle>(null)
  const fbRef = useRef<ModalHandle>(null)
  const fdRef = useRef<ModalHandle>(null)
  const fcRef = useRef<ModalHandle>(null)
  const fiRef = useRef<ModalHandle>(null)
  const ftRef = useRef<ModalHandle>(null)
  const flRef = useRef<ModalHandle>(null)
  const fsRef = useRef<ModalHandle>(null)

  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Modal Gallery</h1>
        <p className={styles.subtitle}>
          Набор кнопок — каждая открывает свой вариант. Соответствует сценариям Storybook{' '}
          <strong>Overlays/Modal</strong> (Basic, заголовки, размеры, ModalFooter).
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Полная сборка</h2>
          <div className={styles.itemLabel}>Иконка в шапке, тело, футер с чекбоксом и кнопками</div>
          <div className={styles.row}>
            <Button type="button" onClick={() => fullRef.current?.open()}>
              Открыть
            </Button>
          </div>
          <Modal ref={fullRef} width={520}>
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
              <p style={{ margin: '0 0 12px' }}>Основной текст или форма.</p>
              <p style={{ margin: 0, color: 'var(--text-sub-600)' }}>Вторичная строка.</p>
            </ModalBody>
            <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="Продолжить"
                onCancel={() => fullRef.current?.close()}
                onConfirm={() => fullRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Заголовки ModalHeader</h2>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => h1Ref.current?.open()}
            >
              Только title
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => h2Ref.current?.open()}
            >
              Title + subtitle
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => h3Ref.current?.open()}
            >
              Title + иконка
            </Button>
          </div>
          <Modal ref={h1Ref}>
            <ModalHeader title="Только заголовок" />
            <ModalBody>
              <p style={{ margin: 0 }}>Шапка без подзаголовка и без иконки.</p>
            </ModalBody>
          </Modal>
          <Modal ref={h2Ref}>
            <ModalHeader title="Заголовок" subtitle="Подзаголовок под пояснение." />
            <ModalBody>
              <p style={{ margin: 0 }}>Две строки в шапке.</p>
            </ModalBody>
          </Modal>
          <Modal ref={h3Ref}>
            <ModalHeader
              title="Настройки"
              icon={
                <ModalIcon background="var(--bg-soft-200)">
                  <RiSettings3Line size={22} color="var(--icon-sub-600)" />
                </ModalIcon>
              }
            />
            <ModalBody>
              <p style={{ margin: 0 }}>Иконка 40×40 слева от заголовка.</p>
            </ModalBody>
          </Modal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ширина и высота панели</h2>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => sz1Ref.current?.open()}
            >
              По контенту
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => sz2Ref.current?.open()}
            >
              width 600
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => sz3Ref.current?.open()}
            >
              maxHeight + скролл
            </Button>
          </div>
          <Modal ref={sz1Ref}>
            <ModalHeader title="Ширина по контенту" />
            <ModalBody>
              <p style={{ margin: 0 }}>Дефолтная ширина панели.</p>
            </ModalBody>
          </Modal>
          <Modal ref={sz2Ref} width={600}>
            <ModalHeader title="Широкая панель" subtitle="width={600}" />
            <ModalBody>
              <p style={{ margin: 0 }}>Фиксированная ширина 600px.</p>
            </ModalBody>
          </Modal>
          <Modal ref={sz3Ref} width={480} maxHeight={260}>
            <ModalHeader title="Много текста" />
            <ModalBody>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i} style={{ margin: '0 0 8px' }}>
                  Строка {i + 1} — при переполнении тело прокручивается.
                </p>
              ))}
            </ModalBody>
          </Modal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ModalFooter и слоты</h2>
          <div className={styles.itemLabel}>Разные варианты футера с ModalFooterConfirmActions</div>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => fbRef.current?.open()}
            >
              Базовые кнопки
            </Button>
            <Button
              type="button"
              variant="stroke"
              color="error"
              size="small"
              onClick={() => fdRef.current?.open()}
            >
              Удаление (error)
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => fcRef.current?.open()}
            >
              + Чекбокс слева
            </Button>
          </div>
          <div className={styles.row} style={{ marginTop: 8 }}>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => fiRef.current?.open()}
            >
              + ModalFooterInfo
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => ftRef.current?.open()}
            >
              + StepDots
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => flRef.current?.open()}
            >
              + Link
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => fsRef.current?.open()}
            >
              + Switch
            </Button>
          </div>

          <Modal ref={fbRef}>
            <ModalHeader title="Подтверждение" />
            <ModalBody>
              <p style={{ margin: 0 }}>Базовый футер: Отмена и основное действие.</p>
            </ModalBody>
            <ModalFooter>
              <ModalFooterConfirmActions
                onCancel={() => fbRef.current?.close()}
                onConfirm={() => fbRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
          <Modal ref={fdRef}>
            <ModalHeader title="Удалить элемент?" subtitle="Действие необратимо." />
            <ModalBody>
              <p style={{ margin: 0 }}>Красная кнопка подтверждения.</p>
            </ModalBody>
            <ModalFooter>
              <ModalFooterConfirmActions
                confirmColor="error"
                confirmText="Удалить"
                cancelText="Отмена"
                onCancel={() => fdRef.current?.close()}
                onConfirm={() => fdRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
          <Modal ref={fcRef}>
            <ModalHeader title="Сохранить?" />
            <ModalBody>
              <p style={{ margin: 0 }}>Слот слева — чекбокс.</p>
            </ModalBody>
            <ModalFooter startContent={<CheckboxField label="Не показывать снова" size="small" />}>
              <ModalFooterConfirmActions
                onCancel={() => fcRef.current?.close()}
                onConfirm={() => fcRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
          <Modal ref={fiRef}>
            <ModalHeader title="Внимание" />
            <ModalBody>
              <p style={{ margin: 0 }}>Текст с иконкой информации слева от кнопок.</p>
            </ModalBody>
            <ModalFooter
              startContent={<ModalFooterInfo>Прочитайте перед продолжением.</ModalFooterInfo>}
            >
              <ModalFooterConfirmActions
                onCancel={() => fiRef.current?.close()}
                onConfirm={() => fiRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
          <Modal ref={ftRef}>
            <ModalHeader title="Шаг 2 из 4" />
            <ModalBody>
              <p style={{ margin: 0 }}>Индикатор шагов в футере.</p>
            </ModalBody>
            <ModalFooter startContent={<ModalFooterStepDots total={4} activeIndex={1} />}>
              <ModalFooterConfirmActions
                cancelText="Назад"
                confirmText="Далее"
                onCancel={() => ftRef.current?.close()}
                onConfirm={() => ftRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
          <Modal ref={flRef}>
            <ModalHeader title="Дополнительно" />
            <ModalBody>
              <p style={{ margin: 0 }}>Ссылка слева от кнопок.</p>
            </ModalBody>
            <ModalFooter
              startContent={
                <ModalFooterLinkButton onClick={() => {}}>Подробнее</ModalFooterLinkButton>
              }
            >
              <ModalFooterConfirmActions
                onCancel={() => flRef.current?.close()}
                onConfirm={() => flRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
          <Modal ref={fsRef}>
            <ModalHeader title="Опция" />
            <ModalBody>
              <p style={{ margin: 0 }}>Переключатель в футере.</p>
            </ModalBody>
            <ModalFooter
              startContent={<ModalFooterSwitch label="Запомнить выбор" defaultChecked />}
            >
              <ModalFooterConfirmActions
                onCancel={() => fsRef.current?.close()}
                onConfirm={() => fsRef.current?.close()}
              />
            </ModalFooter>
          </Modal>
        </section>
      </div>
    </div>
  )
}
