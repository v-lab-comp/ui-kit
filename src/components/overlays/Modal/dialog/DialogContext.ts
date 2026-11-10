import { createContext, useContext, useLayoutEffect } from 'react'

/** Части диалога, которые дают ему доступное имя и описание. */
export type DialogPart = 'title' | 'description'

export type DialogContextValue = {
  /** id заголовка — ставится на элемент, который называет диалог (aria-labelledby) */
  titleId: string
  /** id описания — ставится на подзаголовок (aria-describedby) */
  descriptionId: string
  onClose: () => void
  /** Сообщает диалогу, что элемент с titleId / descriptionId отрисован. Возвращает отписку. */
  registerPart: (part: DialogPart) => () => void
}

/** Общий контекст Modal и Drawer: шапки и статус-блоки работают в обоих. */
export const DialogContext = createContext<DialogContextValue | null>(null)

export function useDialogContext() {
  return useContext(DialogContext)
}

/**
 * Регистрирует часть (заголовок / описание), пока она смонтирована, — диалог ставит
 * aria-labelledby / aria-describedby только на существующие элементы.
 */
export function useDialogPart(part: DialogPart, enabled = true) {
  const registerPart = useContext(DialogContext)?.registerPart
  useLayoutEffect(() => {
    if (!enabled || !registerPart) return
    return registerPart(part)
  }, [part, enabled, registerPart])
}
