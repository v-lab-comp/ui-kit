# Overlays

Все оверлеи в пакете построены на `@floating-ui/react` и общем стеке оверлеев. Это касается `Modal` (с `ConfirmModal` и `ModalStatus`), `Popover`, `Tooltip` из `src/components/overlays/` и **`Drawer`** из `src/components/layout/Drawer/` — последний живёт в `layout/`, потому что используется как часть каркаса страницы, но устроен по тому же паттерну.

## Инфраструктура

### `@floating-ui/react`

```ts
import {
  FloatingFocusManager, // фокус-ловушка внутри панели
  FloatingPortal, // рендер в document.body
  useFloating, // позиция + open state
  useDismiss, // Escape, outside click
  useInteractions, // объединяет хуки взаимодействия
  useTransitionStatus, // mount/unmount для CSS-анимации
} from '@floating-ui/react'
```

### `ModalProvider` и `useModalStack`

`src/components/overlays/Modal/ModalProvider` ведёт **стек оверлеев** на странице. Каждый Modal/Drawer регистрируется в стеке через `useModalStack().register(id)` и снимается при размонтировании.

Из стека выводятся два правила:

- **z-index растёт по глубине стека.** Базовый токен `--z-overlay` сдвигается за счёт позиции в `stackIds`.
- **На клавишу Escape и outside-press реагирует только верхний оверлей** (`stackIds.at(-1) === ownId`). Остальные игнорируют клавиатуру и мышь до того, как над ними закроется верхний.

Если оверлей рендерится без `ModalProvider` — он остаётся самодостаточным, но рассчитывает на то, что других оверлеев на странице нет.

### `setBodyScrollLocked`

`src/utils/scrollLock.ts` блокирует прокрутку `<body>` при открытии модалок. Если оверлей под `ModalProvider` — блокировка уже централизованно управляется им; вручную дёргать `setBodyScrollLocked` не нужно.

## Паттерн Modal / Drawer

```tsx
export const MyOverlay = forwardRef<MyOverlayHandle, MyOverlayProps>(
  function MyOverlay({ open: controlledOpen, onOpenChange, children, ... }, ref) {
    const titleId = useId()
    const stack = useModalStack()
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const openState = isControlled ? controlledOpen : uncontrolledOpen

    // Регистрация в стеке
    useLayoutEffect(() => {
      if (!stack || !openState) return
      stack.register(titleId)
      return () => stack.unregister(titleId)
    }, [openState, stack, titleId])

    // Scroll lock (только когда нет ModalProvider)
    useEffect(() => {
      if (stack) return
      setBodyScrollLocked(openState)
    }, [openState, stack])

    const close = useCallback(() => {
      if (!isControlled) setUncontrolledOpen(false)
      onOpenChange?.(false)
    }, [isControlled, onOpenChange])

    const isTop = !stack || stack.stackIds.at(-1) === titleId

    const { refs, context } = useFloating({ open: openState, onOpenChange: (v) => !v && close() })
    const dismiss = useDismiss(context, { escapeKey: isTop, outsidePress: isTop })
    const { getFloatingProps } = useInteractions([dismiss])
    const { isMounted, status } = useTransitionStatus(context, { duration: 280 })

    if (!isMounted) return null

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context} modal>
          <div
            ref={refs.setFloating}
            role="dialog"
            aria-modal
            aria-labelledby={titleId}
            data-status={status}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    )
  }
)
```

Ключевые места:

- **Controlled + uncontrolled в одном компоненте.** `open` приходит снаружи — компонент следует ему; не приходит — ведёт своё состояние. То же `onOpenChange` обязательно вызывается в обоих режимах.
- **Императивный API через `ref`.** Тип `MyOverlayHandle = { open: () => void; close: () => void }`. Удобно для триггеров, которые не хотят держать состояние.
- **Анимация через `data-status`.** `useTransitionStatus` возвращает `'initial' | 'open' | 'close' | 'unmounted'`; CSS реагирует на `data-status`:

```css
.panel {
  opacity: 0;
  transform: translateX(-100%);
  transition:
    opacity 280ms,
    transform 280ms;
}
.panel[data-status='open'] {
  opacity: 1;
  transform: translateX(0);
}
@media (prefers-reduced-motion: reduce) {
  .panel {
    transition: none;
  }
}
```

- **Compound-составляющие** (`ModalHeader`, `ModalBody`, `ModalFooter`, `DrawerHeader`, …) ходят к родителю через React Context (`ModalContext`, `DrawerContext`). Контекст содержит как минимум `titleId` (для `aria-labelledby`) и `onClose`. Fallback с пустым `titleId` нужен для статических превью в Storybook/VitePress, где compound может рендериться отдельно.

## Popover и Tooltip

`Popover` и `Tooltip` — якорные оверлеи без блокировки скролла и focus-ловушки. Они не регистрируются в `ModalProvider` и не блокируют тело страницы.

```tsx
const { refs, floatingStyles, context } = useFloating({
  open,
  onOpenChange,
  middleware: [offset(8), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate,
})

const hover = useHover(context, { delay: { open: 600 } }) // Tooltip
const click = useClick(context) // Popover
const dismiss = useDismiss(context)
const role = useRole(context, { role: 'tooltip' }) // или 'dialog'

const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role])
```

`Popover` показывает контент по клику, `Tooltip` — по hover/focus с задержкой. Закрытие — клик мимо, Escape, повторный клик на триггер.

## Чек-лист accessibility

- `role="dialog"` + `aria-modal` для Modal/Drawer; `role="tooltip"` для Tooltip; `role="dialog"` для Popover с фокусируемым контентом.
- `aria-labelledby` ссылается на id заголовка панели (`useId()` → передаётся через контекст).
- Фокус остаётся внутри открытого диалога — `FloatingFocusManager` с `modal`.
- При закрытии фокус возвращается на триггер — поведение по умолчанию у `FloatingFocusManager`.
- Escape реагирует только у верхнего в стеке (см. `useModalStack`).
- Анимации уважают `prefers-reduced-motion`.
