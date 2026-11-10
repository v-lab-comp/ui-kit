# Tabs

Compound component для горизонтальных вкладок с подчёркиванием активной вкладки.

---

## Compound component

**Compound components** — паттерн, когда несколько связанных компонентов делят общее состояние через React Context. Вместо одного компонента с большим числом пропсов получается гибкая композиция.

### Схема

1. **Контекст** — хранит состояние и методы для дочерних компонентов.
2. **Корень** — создаёт контекст, оборачивает `children` в `Provider`, содержит логику.
3. **Дочерние компоненты** — подписываются на контекст через `useContext`, рендерят свою часть UI.
4. **API** — корень и дети экспортируются одним объектом: `Component.SubComponent`.

### Структура

```
TabsContext (createContext + useTabsContext)
    ↓
Tabs (Provider, сбор values из Tabs.Tab, value/onChange)
    ↓
Tabs.Tab, Tabs.Panel (читают контекст)
```

### Сборка API

```ts
export const Tabs = Object.assign(TabsRoot, {
  Tab: TabsTab,
  Panel: TabsPanel,
})
```

Использование: `<Tabs><Tabs.Tab value="a">A</Tabs.Tab><Tabs.Panel value="a">...</Tabs.Panel></Tabs>`.

---

## Реализация в Tabs

### Контекст (TabsContext.tsx)

- Хранит `value`, `onChange`, `values` и `id` — префикс для `id` / `aria-controls` / `aria-labelledby` вкладок и панелей.
- `useTabsContext()` — хук для Tab/Panel; вне `Tabs` бросает ошибку.

### Корень (Tabs)

- Собирает `values` из `Tabs.Tab` через `Children.forEach`.
- Неконтролируемый: `defaultValue`, внутренний state.
- Контролируемый: `value` + `onChange` (нужны оба, иначе компонент остаётся неконтролируемым).
- Рендерит корень `vl-tabs` со списком вкладок (`vl-tabs__list`, `role="tablist"`) и разделителем (`vl-tabs__separator`), затем панели.

### Tabs.Tab

- Читает контекст, рендерит кнопку `vl-tabs__tab` с `role="tab"` и `aria-selected`.
- При `value === activeValue` получает атрибут `data-active` (состояние `active` из контракта `src/theme/contracts/tabs.ts`); подчёркивание цветом `--primary-base` рисует скин.
- По клику вызывает `onChange(value)`.

### Tabs.Panel

- Рендерит `role="tabpanel"` с `children` всегда; неактивная панель скрыта атрибутом `hidden` (остаётся в DOM).

---

## Использование

### Неконтролируемый

```tsx
<Tabs defaultValue="tab1">
  <Tabs.Tab value="tab1">Вкладка 1</Tabs.Tab>
  <Tabs.Tab value="tab2">Вкладка 2</Tabs.Tab>
  <Tabs.Panel value="tab1">Контент 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Контент 2</Tabs.Panel>
</Tabs>
```

### Контролируемый

```tsx
const [active, setActive] = useState('tab2')

<Tabs value={active} onChange={setActive}>
  <Tabs.Tab value="tab1">Первый</Tabs.Tab>
  <Tabs.Tab value="tab2">Второй</Tabs.Tab>
  <Tabs.Panel value="tab1">Панель 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Панель 2</Tabs.Panel>
</Tabs>
```

---

## API

### Tabs (корень)

| Проп           | Тип                       | По умолчанию | Описание                              |
| -------------- | ------------------------- | ------------ | ------------------------------------- |
| `defaultValue` | `string`                  | первый Tab   | Начальная вкладка (неконтролируемый)  |
| `value`        | `string`                  | —            | Текущая вкладка (контролируемый)      |
| `onChange`     | `(value: string) => void` | —            | Колбэк смены вкладки (контролируемый) |

### Tabs.Tab

| Проп       | Тип         | Описание                         |
| ---------- | ----------- | -------------------------------- |
| `value`    | `string`    | Уникальный идентификатор вкладки |
| `children` | `ReactNode` | Текст/содержимое вкладки         |

### Tabs.Panel

| Проп       | Тип         | Описание                                               |
| ---------- | ----------- | ------------------------------------------------------ |
| `value`    | `string`    | Идентификатор вкладки, при котором показывается панель |
| `children` | `ReactNode` | Контент панели                                         |

---

## Файлы

```
Tabs/
├── TabsContext.tsx   # Context + useTabsContext
├── Tabs.tsx          # TabsRoot, TabsTab, TabsPanel
├── (контракт — src/theme/contracts/tabs.ts, стили — src/skins/corporate/components/tabs.css)
├── index.ts
├── Tabs.stories.tsx
└── README.md
```
