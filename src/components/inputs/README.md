# Inputs

## Зачем такая структура

Все инпуты в UI-ките устроены по одному принципу: есть **базовый примитив** (сам элемент `<input>` / чекбокс) и **готовый компонент** (примитив + label + hint + error; у текстовых полей эту обёртку даёт `InputField`).

Это сделано для того, чтобы можно было легко добавлять новые типы полей — `NumberInput`, `CurrencyInput`, `PhoneInput` и другие — не переписывая стили каждый раз заново. Все они будут выглядеть одинаково, потому что внутри используют один и тот же `BaseInput`: он рендерит класс `vl-base-input` и data-атрибуты своего контракта (`size`, `error`, `filled`), а оформление для них уже есть в скине (`src/skins/corporate/components/base-input.css`).

```
base/InputField + base/BaseInput  →  TextInput (label + hint + error)
                                  →  NumberInput (с маской числа)
                                  →  CurrencyInput (с форматированием валюты)
                                  →  PhoneInput (с маской телефона)
                                  →  ...

base/BaseCheckbox                 →  CheckboxField (label + hint + error)
                                  →  CheckboxCard (карточка)
                                  →  ...
```

---

## Когда что использовать

**Используй готовые компоненты** (`TextInput`, `CheckboxField`) — в 99% случаев они подходят. Они уже содержат всё что нужно: label, hint, сообщение об ошибке, правильные отступы.

**Используй `BaseInput` / `BaseCheckbox` напрямую** только если:

- строишь новый тип поля поверх них
- нужна нестандартная обёртка, которая не вписывается в стандартный field-паттерн
- пишешь низкоуровневый компонент внутри UI-кита

---

## Как работать с готовыми компонентами

### TextInput — текстовое поле

Поле принимает `label`, `hint` (подсказка под полем) и `error` (сообщение об ошибке — автоматически подсвечивает поле красным).

```tsx
import { TextInput } from '@v-lab/ui-kit'

// Обычное поле
<TextInput label="Full name" placeholder="John Doe" />

// С подсказкой
<TextInput
  label="Username"
  placeholder="johndoe"
  hint="Выберите уникальное имя"
/>

// С ошибкой — hint скрывается, показывается error
<TextInput
  label="Username"
  placeholder="johndoe"
  error="Имя должно быть не менее 3 символов"
/>

// Задизейблен
<TextInput label="Full name" disabled />

// Маленький размер
<TextInput label="Username" size="small" />
```

### CheckboxField — чекбокс с текстом

```tsx
import { CheckboxField } from '@v-lab/ui-kit'

<CheckboxField label="Принять условия использования" />
<CheckboxField label="Подписка на рассылку" hint="Можно отписаться в любой момент" />
<CheckboxField label="Обязательное согласие" error="Необходимо принять условия" />
```

### CheckboxCard — чекбокс в виде карточки

Используется когда нужно выбрать один или несколько вариантов из набора карточек.

```tsx
import { CheckboxCard } from '@v-lab/ui-kit'

<CheckboxCard label="Стандарт" description="Базовый тариф" />
<CheckboxCard label="Про" sublabel="Популярный" description="Расширенные возможности" />
```

---

## Как работать с формами (react-hook-form)

RHF-адаптеры импортируются отдельно. Они сами управляют состоянием и показывают ошибки валидации автоматически.

```tsx
import { RHFTextInput, RHFCheckbox } from '@v-lab/ui-kit/adapters'
import { useForm } from 'react-hook-form'

function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', password: '', agree: false },
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <RHFTextInput
        name="username"
        control={control}
        rules={{ required: 'Введите имя пользователя' }}
        label="Имя пользователя"
        placeholder="johndoe"
      />
      <RHFTextInput
        name="password"
        control={control}
        rules={{
          required: 'Введите пароль',
          minLength: { value: 8, message: 'Минимум 8 символов' },
        }}
        label="Пароль"
        placeholder="••••••••"
        type="password"
      />
      <RHFCheckbox
        name="agree"
        control={control}
        rules={{ required: 'Необходимо согласие' }}
        label="Принять условия"
      />
      <button type="submit">Войти</button>
    </form>
  )
}
```

Ошибки из `rules` подставляются в `error` автоматически — ничего дополнительно настраивать не нужно.

---

## Как добавить новый тип поля

Допустим, нужен `CurrencyInput`. Алгоритм такой:

**1. Создай компонент в `inputs/CurrencyInput/`**

Наследуй пропсы от `BaseInputProps` и добавь свои. Внутри рендери `BaseInput`.

```tsx
// inputs/CurrencyInput/CurrencyInput.tsx
import { forwardRef } from 'react'
import { BaseInput } from '../base/BaseInput'
import type { BaseInputProps } from '../base/BaseInput'

interface CurrencyInputProps extends BaseInputProps {
  currency?: string
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currency = 'UZS', onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // форматирование — твоя логика
      onChange?.(e)
    }
    return <BaseInput ref={ref} inputMode="decimal" onChange={handleChange} {...props} />
  }
)
```

**2. Добавь field-вариант** (по аналогии с `TextInput`: `InputField` + `BaseInput`) если нужны label/hint/error.

**3. Экспортируй** из `inputs/index.ts` и `src/index.ts`.

**4. Стили — в скине, не в компоненте.** Компонент своих CSS-файлов не содержит: заведи контракт `src/theme/contracts/currency-input.ts` (класс `vl-currency-input`, части и data-атрибуты) и добавь его в реестр `themeContracts` (`src/theme/contracts/index.ts`). Стили — файл `src/skins/corporate/components/currency-input.css`: все правила в одном блоке `:where([data-vl-skin~='corporate']) { … }`, `@keyframes` — после блока; подключи его строкой `@import` в `src/skins/corporate/index.css`. Правила селекторов — `docs/architecture/theming.md` и `src/skins/corporate/README.md`, пошагово — `docs/guides/new-component.md`.

Стили, размеры, состояния (hover, focus, error, disabled) для самого поля достанутся бесплатно: их уже задаёт скин для `vl-base-input`.

**Если делаешь обёртку** (label + hint, как TextInput): используй переменные из `src/skins/corporate/components/base-input.variables.css` — там все размеры, отступы и радиусы. Обёртка должна использовать те же `--base-input-*` переменные, чтобы визуально совпадать с BaseInput.
