---
title: ConfirmModal
description: Готовое окно подтверждения с async onConfirm и состоянием загрузки на кнопке.
---

# ConfirmModal

Обёртка над **`Modal`** + **`ModalHeader`** + **`ModalBody`** + **`ModalFooterConfirmActions`**: заголовок (**`title`**), опционально короткая вторая строка в шапке (**`subtitle`**), основной текст в **`children`**, кнопки «Отмена» и подтверждения. **`subtitle`** имеет смысл для одной дополнительной строки под заголовком; развёрнутое пояснение обычно не дублируют и держат только в теле. **`onConfirm`** может быть **`async`** — пока промис выполняется, на кнопке действия показывается **loading**.

Для деструктивных действий задайте **`isDestructive`** (закрытие по клику на фон отключается, как у базового **`Modal`**).

## Превью

<ComponentDocsPreview name="confirmModal" />

## Импорт

```tsx
import { ConfirmModal } from '@v-lab/ui-kit'
import type { ModalHandle } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useRef } from 'react'
import { Button, ConfirmModal, type ModalHandle } from '@v-lab/ui-kit'

export function DeleteGate() {
  const ref = useRef<ModalHandle>(null)

  return (
    <>
      <Button type="button" onClick={() => ref.current?.open()}>
        Удалить
      </Button>
      <ConfirmModal
        ref={ref}
        title="Удалить запись?"
        confirmText="Удалить"
        cancelText="Отмена"
        confirmColor="error"
        isDestructive
        onCancel={() => ref.current?.close()}
        onConfirm={async () => {
          // await ваш метод удаления на сервере
          ref.current?.close()
        }}
      >
        <p>Это действие необратимо.</p>
      </ConfirmModal>
    </>
  )
}
```

Базовая сборка модалки без ConfirmModal — в разделе [Modal](./modal).

## Пропсы (`ConfirmModalProps`)

Тип **`ConfirmModalProps`** = **`ModalProps`** без **`children`** / **`ariaLabel`** (заголовок задаётся через **`title`**) + поля подтверждения:

| Проп                | Тип                               | Описание                                                                                            |
| ------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| **`title`**         | `string`                          | Заголовок в **`ModalHeader`** (обязателен)                                                          |
| **`subtitle`**      | `string`                          | Вторая строка в шапке                                                                               |
| **`children`**      | **`ReactNode`**                   | Тело между шапкой и футером                                                                         |
| **`onConfirm`**     | **`() => void \| Promise<void>`** | Подтверждение; может быть **async** — на кнопке показывается loading                                |
| **`onCancel`**      | **`() => void`**                  | Отмена                                                                                              |
| **`confirmText`**   | `string`                          | Текст основной кнопки                                                                               |
| **`cancelText`**    | `string`                          | Текст кнопки отмены                                                                                 |
| **`confirmColor`**  | из **`ConfirmModalColor`**        | Семантика основной кнопки (**`primary`**, **`error`**, **`success`**, …)                            |
| **`isDestructive`** | `boolean`                         | Деструктивное действие: поведение как у **`Modal`** с соответствующими флагами (напр. клик по фону) |
| **`onError`**       | **`(error: unknown) => void`**    | Если задан — ошибка из **`onConfirm`** перехватывается; иначе пробрасывается дальше                 |

Размеры панели, **`width`**, **`animation`**, контролируемое **`open`**, **`ref`** (**`ModalHandle`**) и прочие поля **`Modal`** — см. раздел пропсов **[Modal](./modal)** и **`Modal.types.ts`**.

### Полный тип

**`ConfirmModalProps`** — **`ConfirmModal.types.ts`**.

## Галерея

Примеры подтверждений: базовый диалог, деструктивное удаление, **`confirmColor="success"`**, широкая панель, async с loading на кнопке, несколько независимых **`ConfirmModal`**. Как в Storybook **Overlays/ConfirmModal** и **`src/docs/ConfirmModalGalleryPage.tsx`**.

<ComponentDocsPreview name="confirmModalGallery" />

Исходники: `src/components/overlays/Modal/components/ConfirmModal/`.
