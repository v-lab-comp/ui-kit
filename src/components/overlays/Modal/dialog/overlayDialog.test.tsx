import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Drawer, DrawerHeader } from '@/components/layout/Drawer'
import { ConfirmModal, Modal, ModalBody, ModalHeader, ModalProvider, ModalStatus } from '..'

afterEach(() => {
  vi.restoreAllMocks()
  document.body.style.overflow = ''
})

describe('Modal / Drawer: общий диалоговый хук', () => {
  it('снимает блокировку прокрутки и выходит из стека при размонтировании открытым', () => {
    const { rerender, unmount } = render(
      <ModalProvider>
        <Modal open ariaLabel="Первая">
          <ModalBody>a</ModalBody>
        </Modal>
        <Drawer open ariaLabel="Вторая">
          b
        </Drawer>
      </ModalProvider>
    )
    expect(document.body.style.overflow).toBe('hidden')

    // Drawer размонтирован открытым — Modal снова верхний, прокрутка ещё заблокирована
    rerender(
      <ModalProvider>
        <Modal open ariaLabel="Первая">
          <ModalBody>a</ModalBody>
        </Modal>
      </ModalProvider>
    )
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('без провайдера закрытие одного оверлея не снимает блокировку другого', () => {
    const { rerender } = render(
      <>
        <Modal open ariaLabel="A">
          a
        </Modal>
        <Modal open ariaLabel="B">
          b
        </Modal>
      </>
    )
    rerender(
      <>
        <Modal open ariaLabel="A">
          a
        </Modal>
        <Modal open={false} ariaLabel="B">
          b
        </Modal>
      </>
    )
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('aria-labelledby / aria-describedby указывают только на существующие элементы', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { rerender } = render(
      <Modal open>
        <ModalHeader title="Заголовок" subtitle="Описание" />
      </Modal>
    )
    const dialog = screen.getByRole('dialog', { name: 'Заголовок' })
    expect(dialog).toHaveAccessibleDescription('Описание')

    rerender(
      <Modal open>
        <ModalHeader closeOnly />
      </Modal>
    )
    const bare = screen.getByRole('dialog')
    expect(bare).not.toHaveAttribute('aria-labelledby')
    expect(bare).not.toHaveAttribute('aria-describedby')
  })

  it('Escape закрывает только верхний оверлей стека', async () => {
    const user = userEvent.setup()
    const onModal = vi.fn()
    const onDrawer = vi.fn()
    render(
      <ModalProvider>
        <Modal open onOpenChange={onModal}>
          <ModalHeader title="Модалка" />
        </Modal>
        <Drawer open onOpenChange={onDrawer}>
          <DrawerHeader title="Панель" />
        </Drawer>
      </ModalProvider>
    )
    await user.keyboard('{Escape}')
    expect(onDrawer).toHaveBeenCalledWith(false)
    expect(onModal).not.toHaveBeenCalled()
  })

  it('ConfirmModal isDestructive — alertdialog с фокусом на Cancel', async () => {
    render(
      <ConfirmModal open isDestructive title="Удалить?" onConfirm={() => {}} cancelText="Нет" />
    )
    const dialog = screen.getByRole('alertdialog', { name: 'Удалить?' })
    expect(dialog).toBeInTheDocument()
    await vi.waitFor(() => expect(screen.getByRole('button', { name: 'Нет' })).toHaveFocus())
  })

  it('ModalStatus отдаёт вариант в data-variant, иконка скрыта от скринридеров', () => {
    render(<ModalStatus open variant="error" title="Ошибка" subtitle="Детали" layout="center" />)
    const icon = document.querySelector('.vl-modal-status__status-icon')
    expect(icon).toHaveAttribute('data-variant', 'error')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).not.toHaveAttribute('style')
    expect(screen.getByRole('dialog', { name: 'Ошибка' })).toHaveAccessibleDescription('Детали')
  })
})
