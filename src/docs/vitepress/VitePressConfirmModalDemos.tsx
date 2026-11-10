import { useRef } from 'react'
import { Button } from '@/components/Button'
import { ConfirmModal } from '@/components/overlays'
import type { ModalHandle } from '@/components/overlays'

export function ConfirmModalDocsDemo() {
  const ref = useRef<ModalHandle>(null)

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <Button type="button" color="error" variant="stroke" onClick={() => ref.current?.open()}>
        Открыть подтверждение
      </Button>
      <ConfirmModal
        ref={ref}
        title="Удалить элемент?"
        confirmText="Удалить"
        cancelText="Отмена"
        confirmColor="error"
        isDestructive
        onCancel={() => ref.current?.close()}
        onConfirm={async () => {
          await new Promise((r) => setTimeout(r, 400))
          ref.current?.close()
        }}
      >
        <p style={{ margin: 0 }}>Связанные данные будут удалены без возможности восстановления.</p>
      </ConfirmModal>
    </div>
  )
}
