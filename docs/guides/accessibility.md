# Accessibility

Требования к доступности для всех новых и существующих компонентов пакета. Базовый стандарт — [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/WAI/ARIA/apg/), уровень контраста — WCAG 2.1 AA.

## ARIA-атрибуты

Минимальный набор, который применяется по ситуации:

| Атрибут                          | Где                                                                        |
| -------------------------------- | -------------------------------------------------------------------------- |
| `aria-label` / `aria-labelledby` | Интерактивные элементы без видимого текста (icon-only кнопки)              |
| `aria-describedby`               | Поля ввода с подсказкой / ошибкой (на id из `hint`/`error` в `InputField`) |
| `aria-invalid`                   | Поля в состоянии ошибки                                                    |
| `aria-disabled`                  | Заблокированные интерактивные элементы                                     |
| `aria-expanded`                  | Аккордеоны, выпадающие списки, comboboxes                                  |
| `aria-haspopup`                  | Триггеры, открывающие оверлей                                              |
| `aria-live`                      | Динамические области, о которых должен узнать screen reader                |

## Роли для компонентов

| Компонент         | Роль                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `Modal`, `Drawer` | `role="dialog"` + `aria-modal="true"` (управляется Floating UI)                            |
| `Popover`         | `role="dialog"` если внутри фокусируемое; иначе — без роли                                 |
| `Tooltip`         | `role="tooltip"`, на триггере `aria-describedby` ссылается на id                           |
| `Toast`           | `role="status"` для `neutral` / `info` / `success`; `role="alert"` для `warning` / `error` |
| `Accordion`       | `role="region"` на панели; `aria-controls`, `aria-expanded` на кнопке                      |
| `Tabs`            | `role="tablist"`, `role="tab"`, `role="tabpanel"`; `aria-selected` на активном табе        |
| `Breadcrumb`      | `<nav aria-label="Breadcrumb">`; `aria-current="page"` на последнем                        |
| `Tag` с dismiss   | `role="button"` на dismiss-кнопке + `aria-label="Dismiss"`                                 |

## Клавиатура

Все интерактивные элементы доступны по `Tab` / `Shift+Tab`. Декоративные — `tabIndex={-1}` или вне tab-потока.

| Компонент                       | Клавиши                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------ |
| `Button`, `ToggleButton`        | `Enter`, `Space`                                                               |
| `CheckboxField`, `CheckboxCard` | `Space`                                                                        |
| `Tabs`                          | `←` / `→` между табами; `Enter` / `Space` активирует                           |
| `Accordion`                     | `Enter` / `Space` раскрыть/закрыть                                             |
| `Modal`, `Drawer`               | `Escape` закрывает (только верхний в стеке); фокус возвращается на триггер     |
| `Tooltip`                       | Показ по hover/focus; `Escape` скрывает                                        |
| `SelectInput`                   | `↑` / `↓` для навигации; `Enter` выбор; `Home` / `End` / `PageUp` / `PageDown` |
| `Toast`                         | `Escape` закрывает; dismiss-кнопка фокусируема                                 |

## Focus management

- **Modal** и **Drawer** используют `FloatingFocusManager` из `@floating-ui/react`. Фокус не выходит за пределы открытого оверлея.
- При закрытии фокус возвращается на элемент, который открыл оверлей (`returnFocus` по умолчанию у `FloatingFocusManager`).
- Стек оверлеев обрабатывается через `useModalStack` — Escape реагирует только у верхнего. Подробнее — в [`../architecture/overlays.md`](../architecture/overlays.md).

## Контраст

Дизайн-токены пакета настроены под WCAG 2.1 AA:

- Текст на фонах: `--text-strong-950` / `--bg-white-0` — ≥ 7:1.
- `--error-base` различим на светлом и тёмном фоне.
- `--text-soft-400` — намеренно мягкий placeholder; основной текст не делается этим цветом.

Информация **не** передаётся только цветом: всегда дополняется иконкой или текстом.

## Тёмная тема

Тёмная схема — часть скина: `data-vl-scheme="dark"` на `<html>` (ставит `ThemeProvider` по `colorScheme`, включая `'system'` по `prefers-color-scheme`) переключает семантические токены, и компоненты, написанные на токенах, меняются сами. Провайдер также ставит `color-scheme` — нативные контролы и скроллбары следуют схеме. Все компоненты учитывают:

- Контраст текст/фон в обоих режимах.
- `focus-visible` остаётся хорошо различим.

## Анимации

Любая CSS-анимация / `transition` в скине отключается в media-query — внутри блока `:where([data-vl-skin~='corporate'])` файла компонента:

```css
:where([data-vl-skin~='corporate']) {
  @media (prefers-reduced-motion: reduce) {
    .vl-my-component {
      animation: none;
      transition: none;
    }
  }
}
```

Это обязательно для всех новых компонентов.

## Чек-лист на новый компонент

- [ ] Кликабельные элементы — `<button>` или `<a>`, не `<div onClick>`.
- [ ] Icon-only элементы имеют `aria-label`.
- [ ] Декоративные изображения — `alt=""`.
- [ ] Поля формы связаны с `<label>` через `htmlFor` / `id` (внутри `InputField` это сделано автоматически).
- [ ] Ошибки связаны через `aria-describedby` (так же — `InputField`).
- [ ] Компонент работает только с клавиатурой.
- [ ] `focus-visible` стиль виден.
- [ ] `outline: none` без альтернативного индикатора фокуса не используется.
- [ ] Динамические изменения объявляются через `aria-live` или `role="status"` (Toast уже умеет).
- [ ] Анимации уважают `prefers-reduced-motion`.

## Инструменты проверки

| Инструмент                                                               | Что проверяет                   |
| ------------------------------------------------------------------------ | ------------------------------- |
| [axe DevTools](https://www.deque.com/axe/)                               | ARIA, контраст, структура       |
| [WAVE](https://wave.webaim.org/)                                         | Визуальный аудит                |
| [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) | Контраст цветов                 |
| NVDA / VoiceOver / Orca                                                  | Реальная проверка screen reader |
| `Tab`-навигация вручную                                                  | Первичный smoke-тест            |

## Ссылки

- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM WCAG 2.1 Checklist](https://webaim.org/standards/wcag/checklist)
- [Floating UI: FloatingFocusManager](https://floating-ui.com/docs/FloatingFocusManager)
- [MDN ARIA reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
