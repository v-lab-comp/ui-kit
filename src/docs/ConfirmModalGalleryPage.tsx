import { useRef } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { ConfirmModal, type ModalHandle } from '@/components/overlays'
import styles from './ModalGalleryPage.module.css'

export type ConfirmModalGalleryPageProps = {
  embedded?: boolean
}

export function ConfirmModalGalleryPage({ embedded = false }: ConfirmModalGalleryPageProps) {
  const primaryRef = useRef<ModalHandle>(null)
  const deleteRef = useRef<ModalHandle>(null)
  const approveRef = useRef<ModalHandle>(null)
  const wideRef = useRef<ModalHandle>(null)
  const asyncRef = useRef<ModalHandle>(null)
  const delRef = useRef<ModalHandle>(null)
  const archiveRef = useRef<ModalHandle>(null)
  const resetRef = useRef<ModalHandle>(null)

  const noop = async () => {}

  return (
    <div className={clsx(styles.root, embedded && styles.rootEmbedded)}>
      <div className={styles.inner}>
        <h1 className={styles.title}>ConfirmModal Gallery</h1>
        <p className={styles.subtitle}>
          Примеры как в Storybook <strong>Overlays/ConfirmModal</strong>: цвета кнопки,
          деструктивный режим, ширина, async и несколько независимых диалогов.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Базовое подтверждение</h2>
          <div className={styles.row}>
            <Button type="button" onClick={() => primaryRef.current?.open()}>
              Открыть ConfirmModal
            </Button>
          </div>
          <ConfirmModal
            ref={primaryRef}
            title="Подтвердить действие?"
            confirmText="Подтвердить"
            cancelText="Отмена"
            onConfirm={noop}
          >
            <p style={{ margin: 0 }}>Основной текст: условия, детали действия или форма.</p>
          </ConfirmModal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Деструктивное действие</h2>
          <div className={styles.itemLabel}>
            confirmColor error + isDestructive (фон не закрывает)
          </div>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              color="error"
              onClick={() => deleteRef.current?.open()}
            >
              Удалить
            </Button>
          </div>
          <ConfirmModal
            ref={deleteRef}
            title="Удалить безвозвратно?"
            confirmText="Удалить"
            confirmColor="error"
            isDestructive
            onConfirm={async () => {
              await new Promise((r) => setTimeout(r, 600))
              deleteRef.current?.close()
            }}
          >
            <p style={{ margin: 0 }}>Связанные данные будут удалены.</p>
          </ConfirmModal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Успех / публикация</h2>
          <div className={styles.row}>
            <Button type="button" color="success" onClick={() => approveRef.current?.open()}>
              Утвердить изменения
            </Button>
          </div>
          <ConfirmModal
            ref={approveRef}
            title="Утвердить изменения?"
            confirmText="Утвердить"
            confirmColor="success"
            onConfirm={async () => {
              await new Promise((r) => setTimeout(r, 500))
              approveRef.current?.close()
            }}
          >
            <p style={{ margin: 0 }}>
              После утверждения изменения попадут в production. Проверьте список перед отправкой.
            </p>
          </ConfirmModal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ширина и много контента</h2>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => wideRef.current?.open()}
            >
              Ширина 600px
            </Button>
          </div>
          <ConfirmModal
            ref={wideRef}
            title="Важное подтверждение"
            width={600}
            confirmText="Понятно"
            onConfirm={noop}
          >
            <p style={{ margin: '0 0 12px' }}>
              Диалог с увеличенной шириной и списком пунктов — как длинное пояснение или условия.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Первый пункт</li>
              <li>Второй пункт</li>
              <li>Третий пункт</li>
            </ul>
          </ConfirmModal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Async и loading на кнопке</h2>
          <div className={styles.itemLabel}>Пока выполняется onConfirm — индикатор на кнопке</div>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => asyncRef.current?.open()}
            >
              Запустить ~2 с
            </Button>
          </div>
          <ConfirmModal
            ref={asyncRef}
            title="Обработать данные?"
            confirmText="Обработать"
            onConfirm={async () => {
              await new Promise((r) => setTimeout(r, 2000))
              asyncRef.current?.close()
            }}
          >
            <p style={{ margin: 0 }}>Имитация запроса на сервер.</p>
          </ConfirmModal>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Несколько независимых диалогов</h2>
          <div className={styles.row}>
            <Button
              type="button"
              variant="stroke"
              color="error"
              size="small"
              onClick={() => delRef.current?.open()}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => archiveRef.current?.open()}
            >
              Archive
            </Button>
            <Button
              type="button"
              variant="stroke"
              size="small"
              onClick={() => resetRef.current?.open()}
            >
              Reset
            </Button>
          </div>
          <ConfirmModal
            ref={delRef}
            title="Удалить навсегда?"
            confirmText="Удалить"
            confirmColor="error"
            isDestructive
            onConfirm={noop}
          >
            <p style={{ margin: 0 }}>Нельзя будет восстановить.</p>
          </ConfirmModal>
          <ConfirmModal ref={archiveRef} title="В архив?" confirmText="В архив" onConfirm={noop}>
            <p style={{ margin: 0 }}>Позже можно восстановить.</p>
          </ConfirmModal>
          <ConfirmModal
            ref={resetRef}
            title="Сбросить настройки?"
            confirmText="Сбросить"
            confirmColor="error"
            onConfirm={noop}
          >
            <p style={{ margin: 0 }}>Текущие значения будут потеряны.</p>
          </ConfirmModal>
        </section>
      </div>
    </div>
  )
}
