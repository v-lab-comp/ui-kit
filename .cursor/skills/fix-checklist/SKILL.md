---
name: fix-checklist
description: Работа с чеклистом проблем v-lab-ui-kit. Используй когда пользователь говорит "иди по чеклисту", "исправляй по списку", "продолжай фиксы", "следующая задача из чеклиста".
---

# Скилл: работа по чеклисту проблем

## Когда использовать

- Пользователь говорит "иди по чеклисту" / "продолжай" / "следующая задача"
- Пользователь говорит "исправь все минусы" / "фикс по списку"
- Нужно продолжить серию правок после прерывания

---

## Протокол работы

### 1. Читай чеклист перед стартом

```
docs/checklists/PROBLEMS_CHECKLIST.md   — основные проблемы кода
docs/checklists/QUALITY_CHECKLIST.md    — оценочные минусы (build/arch/settings)
```

Найди первый пункт со статусом ⬜ (не начато) или 🔄 (в процессе).

### 2. Одна задача за раз

- Берёшь **один** пункт
- Читаешь нужные файлы
- Делаешь изменение
- Сразу отмечаешь ✅ в чеклисте
- Пишешь пользователю коротко: что сделал

### 3. После каждой группы (4-5 пунктов) — верификация

```bash
npm run build       # должен пройти без ошибок
npm run test:run    # тесты не должны упасть (`npm run test` — watch-режим, не завершается)
```

Если сборка упала — разбираешься с причиной сразу, не двигаешься дальше.

### 4. Обновляй счётчики в чеклисте

В таблице "Прогресс" — обновляй числа после каждого исправленного пункта.

---

## Приоритеты

1. 🔴 Critical — всегда первые
2. 🟠 High — после critical
3. 🟡 Medium — технический долг, не блокирующий
4. 🟢 Low — только если нет ничего важнее

---

## Типичные паттерны фиксов

Компоненты без CSS: в TSX — только класс контракта (`<contract>.className`), части (`contractPart`) и data-атрибуты; стили — в файле скина `src/skins/corporate/components/<name>.css`: все правила файла внутри **одного** блока `:where([data-vl-skin~='corporate']) { … }` (нативная вложенность CSS; `@keyframes` — вне блока). Компонент CSS не импортирует. Правила — `docs/architecture/theming.md`.

### Inline style → часть контракта + data-атрибут + скин

```tsx
// ❌ До
<span style={{ display: 'flex', cursor: disabled ? 'not-allowed' : 'pointer' }}>

// ✅ После — в TSX (DateInput.tsx; часть `calendar-btn` описана в src/theme/contracts/date-input.ts)
<span className={contractPart(dateInputContract, 'calendar-btn')} data-disabled={disabled || undefined}>
```

```css
/* ✅ После — в скине (src/skins/corporate/components/date-input.css), внутри общего блока файла */
:where([data-vl-skin~='corporate']) {
  .vl-date-input__calendar-btn {
    display: flex;
    cursor: pointer;
  }

  :where(.vl-date-input__calendar-btn)[data-disabled] {
    cursor: not-allowed;
  }
}
```

Если части ещё нет в контракте — добавь её в `parts` контракта (`src/theme/contracts/<name>.ts`). Модификатор части (`data-disabled` выше) пока ставится напрямую и в контракте не описан — `docs/tech-debt/contract-part-modifiers.md`.

### Условный inline transform → data-атрибут + скин

```tsx
// ❌ До
<Icon style={isOpen ? { transform: 'rotate(180deg)' } : undefined} />

// ✅ После — в TSX (HeaderCard.tsx: data-атрибут на родителе-части)
<span
  className={contractPart(sidebarHeaderCardContract, 'right-button')}
  data-open={isOpen || undefined}
>
  <RiExpandUpDownLine />
</span>
```

```css
/* ✅ После — в скине (src/skins/corporate/components/sidebar-header-card.css), внутри общего блока файла */
:where([data-vl-skin~='corporate']) {
  .vl-sidebar-header-card__right-button[data-open] svg {
    transform: rotate(180deg);
  }
}
```

### Hardcoded цвет → token

```css
/* ❌ */
fill: #fff;
/* ✅ */
fill: var(--bg-white-0);

/* ❌ */
box-shadow: 0 1px 2px rgba(10, 13, 20, 0.03);
/* ✅ */
box-shadow: var(--shadow-regular-x-small);
```

### eslint-disable вместо правильного кода

```tsx
// ❌ setState в useEffect с зависимостью → loop → eslint-disable
useEffect(() => {
  setState(computed)
}, [computed]) // eslint-disable-line

// ✅ useMemo или useRef вместо state
const value = useMemo(() => compute(), [dep])
```

---

## Что НЕ делать

- Не трогай файлы не из текущего пункта чеклиста
- Не добавляй "попутные улучшения" — только то, что в пункте
- Не коммить без сборки
- Не пропускай update счётчика в чеклисте

---

## Формат отчёта пользователю

После каждого пункта:

```
✅ H2 — DateInput.tsx: убрал inline style, часть `calendar-btn` + `data-disabled`, стили в `date-input.css`
✅ H3 — HeaderCard.tsx: `data-open` + CSS transition вместо inline transform
⬜ H4 — следующая: Table.tsx hidden select
```
