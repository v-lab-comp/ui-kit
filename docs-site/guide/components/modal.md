---
title: Modal
description: Модальное окно с порталом, фокусом и стеком при нескольких диалогах (ModalProvider).
---

# Modal

**`Modal`** — диалог на весь экран с затемнением: контент в **`FloatingPortal`**, блокировка прокрутки **`body`**, управление фокусом. Открытие через **`ref`** (**`ModalHandle.open()`** / **`close()`**) или контролируемо (**`open`** + **`onOpenChange`**).

Ниже — превью полной модалки и **наглядные примеры составных частей** (шапка — отдельные модалки; тело и подвал — статичные «срезы» панели и один пример со скроллом).

## Превью

<ComponentDocsPreview name="modal" />

## Из чего состоит модалка

### Корень — компонент `Modal`

**`Modal`** — это оболочка диалога: не «экран со статусом» целиком, а **контейнер**, в который вы вкладываете **`children`**. Он сам отвечает за инфраструктуру:

| Часть                  | Что делает                                                                                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Портал**             | Рендер в **`document.body`** через **`FloatingPortal`**, чтобы диалог был поверх приложения                                                                                      |
| **Backdrop**           | Затемнённый фон; закрытие по клику при **`closeOnBackdropClick`** (по умолчанию включено)                                                                                        |
| **Панель**             | Окно с контентом: **`width`** / **`maxHeight`**, пресеты **`size`** (**`MODAL_SIZES`**), **`animation`** (**`MODAL_ANIMATIONS`**), классы **`className`** / **`panelClassName`** |
| **Фокус и клавиатура** | **`FloatingFocusManager`** — фокус остаётся внутри модалки при открытии                                                                                                          |
| **Стек окон**          | При **`ModalProvider`**: несколько модалок получают возрастающий **z-index**, корректный порядок закрытия и общий учёт открытых диалогов                                         |

Без **`ModalProvider`** для одной модалки всё работает; для **нескольких наложенных** диалогов провайдер нужен.

### Типичное содержимое (`children`)

Рекомендуемая «трёхслойная» сборка — шапка, тело, футер (любой блок можно опустить или заменить своей вёрсткой):

```text
Modal                          ← оболочка: backdrop + панель + фокус
├── ModalHeader                ← заголовок, подзаголовок, крестик / режим «только закрыть»
├── ModalBody                  ← основной текст, форма, скролл при переполнении
└── ModalFooter                ← полоса действий внизу панели
    └── …                      ← см. готовые блоки футера ниже
```

### Готовые блоки шапки и тела

| Компонент         | Роль                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`ModalHeader`** | Заголовок (**`title`**), подзаголовок (**`subtitle`**), кнопка закрытия; есть вариант только с иконкой закрыть (см. типы **`ModalHeaderProps`**) |
| **`ModalBody`**   | Область контента; выравнивание через **`align`** (**`start`** \| **`center`**)                                                                   |

### Футер и вложенные блоки

**`ModalFooter`** — обёртка полосы внизу. Внутрь неё кладут либо свой JSX, либо один из готовых блоков:

| Компонент                       | Когда использовать                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| **`ModalFooterConfirmActions`** | Две кнопки «Отмена» и подтверждение (**`cancelText`** / **`confirmText`**, колбэки) |
| **`ModalFooterInfo`**           | Текст-пояснение или второстепенное действие в одну линию                            |
| **`ModalFooterStepDots`**       | Пошаговый сценарий: точки **`total`** / **`activeIndex`**                           |
| **`ModalFooterLinkButton`**     | Ссылка-кнопка (например «Подробнее»)                                                |
| **`ModalFooterSwitch`**         | Переключатель в футере                                                              |

### Отдельные «целиком экран» модалки

Не **`children` внутри обычного `Modal`**, а готовые композиции на базе того же стека:

| Компонент          | Назначение                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`ConfirmModal`** | Диалог подтверждения с преднастроенной разметкой — см. [ConfirmModal](./confirm-modal)       |
| **`ModalStatus`**  | Экран статуса (иконка + текст, варианты **`success`** / **`error`** и др.), отдельный layout |

Исходники разнесены по папкам: **`Modal.tsx`**, **`ModalHeader/`**, **`ModalBody/`**, **`ModalFooter/`** (включая слоты), **`ConfirmModal/`**, **`ModalStatus/`**, **`ModalProvider.tsx`**.

## Импорт

```tsx
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useRef } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'

export function SaveDialog() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button type="button" onClick={() => modalRef.current?.open()}>
        Открыть
      </button>
      <Modal ref={modalRef} width={480}>
        <ModalHeader title="Заголовок" subtitle="Подзаголовок" />
        <ModalBody>
          <p>Содержимое</p>
        </ModalBody>
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
}
```

Дополнительные сценарии (иконка в шапке, **`ConfirmModal`**, **`ModalStatus`**) — в Storybook **Overlays/Modal**.

### Сводная таблица экспортов

Те же части кратко списком (импорт из **`@v-lab/ui-kit`**):

| Экспорт                                                                                                                                 | Роль                                          |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **`ModalHeader`**, **`ModalBody`**, **`ModalFooter`**                                                                                   | Три зоны контента внутри панели               |
| **`ModalFooterConfirmActions`**, **`ModalFooterInfo`**, **`ModalFooterStepDots`**, **`ModalFooterLinkButton`**, **`ModalFooterSwitch`** | Варианты наполнения **`ModalFooter`**         |
| **`ModalStatus`**, **`ConfirmModal`**                                                                                                   | Готовые композиции «целиком»                  |
| **`ModalProvider`**                                                                                                                     | Стек и **z-index** для нескольких **`Modal`** |

Константы **`MODAL_SIZES`**, **`MODAL_ANIMATIONS`** — для **`size`** и **`animation`** у **`Modal`**.

## Основные пропсы (Modal)

| Проп                   | Тип                           | Описание                                               |
| ---------------------- | ----------------------------- | ------------------------------------------------------ |
| `width` / `maxHeight`  | число или CSS                 | Размер панели                                          |
| `closeOnBackdropClick` | `boolean`                     | Закрытие по клику на фон, по умолч. true               |
| `size`                 | из **`MODAL_SIZES`**          | Предустановленная ширина                               |
| `animation`            | из **`MODAL_ANIMATIONS`**     | Анимация появления                                     |
| `role`                 | `'dialog'` \| `'alertdialog'` | Роль панели; `alertdialog` — для срочных подтверждений |
| `initialFocus`         | индекс или ref                | Куда поставить фокус при открытии                      |

## Галерея

Набор кнопок — каждая открывает свой вариант модалки. Как сценарии в Storybook **Overlays/Modal** и страница **`src/docs/ModalGalleryPage.tsx`**.

<ComponentDocsPreview name="modalGallery" />

Исходники: `src/components/overlays/Modal/`.
