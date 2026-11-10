# Адаптеры для `react-hook-form`

Адаптеры — это тонкие обёртки над компонентами пакета, которые подключают их к `react-hook-form` через `Controller`. Они живут в `src/adapters/rhf/` и экспортируются как отдельный sub-entry `@v-lab/ui-kit/adapters`. Зачем sub-entry — в [`bundling.md`](bundling.md).

```
src/adapters/rhf/
├── createRHFAdapter.tsx       фабрика адаптеров
├── RHFCheckbox.tsx            обёртка вокруг CheckboxField
├── RHFTextInput.tsx           обёртка вокруг TextInput
├── RHFTagInput.tsx            обёртка вокруг TagInput
└── *.stories.tsx              Storybook
```

`react-hook-form` — **опциональный** peer. Если потребитель не использует sub-entry `/adapters`, RHF в его графе не появится.

## `createRHFAdapter`

Все адаптеры строятся через единую фабрику `createRHFAdapter`. Она принимает:

1. **компонент** (`TextInput`, `CheckboxField`, …),
2. **маппер** `(field, fieldState) => Partial<Props> & { ref? }` — **полностью** решает, какие ключи `field` попадут в компонент (фабрика `field` сама не раскладывает),
3. **`displayName`** для React DevTools.

Второй type-параметр фабрики — ключи, которые выставляет маппер и которые нельзя передать снаружи. Публичный тип пропсов выводится из того же `RHFAdapterProps`, что использует фабрика, — разойтись они не могут.

Эталонный пример — `RHFTextInput`:

```tsx
import type { FieldValues } from 'react-hook-form'
import { TextInput } from '@/components/inputs/TextInput'
import type { TextInputProps } from '@/components/inputs/TextInput'
import { createRHFAdapter, type RHFAdapterProps } from './createRHFAdapter'

type Controlled = 'defaultValue'

export type RHFTextInputProps<T extends FieldValues> = RHFAdapterProps<
  TextInputProps,
  T,
  Controlled
>

export const RHFTextInput = createRHFAdapter<TextInputProps, Controlled>(
  TextInput,
  (field, fieldState) => ({
    ...field,
    value: field.value ?? '',
    error: fieldState.error?.message,
  }),
  'RHFTextInput'
)
```

Что обязательно делает маппер:

- **Передаёт `value` со значением по умолчанию (`?? ''` для строк).** RHF может вернуть `undefined`, а контролируемый input не должен переходить в uncontrolled.
- **Прокидывает `error` из `fieldState.error?.message`**. Никаких ручных проверок `formState.errors[name]`.
- Прокидывает `name`, `ref`, `onChange`, `onBlur` из `field` (для текстовых полей проще всего `...field`).

Для чекбоксов маппер другой — `value` из `field` **не передаётся** (у `<input type="checkbox">` это отправляемое значение, а не состояние), вместо него `checked`:

```tsx
;({ name, ref, onChange, onBlur, disabled, value }, fieldState) => ({
  name,
  ref,
  onChange,
  onBlur,
  ...(disabled !== undefined && { disabled }),
  checked: !!value,
  error: fieldState.error?.message,
})
```

## Когда нужен новый адаптер

Адаптер делается под компонент, у которого:

- есть `value`/`onChange` пара, совместимая с `Controller`,
- или есть `checked`/`onChange` пара (чекбоксы).

Если компонент уже совместим (`value` принимает то, что отдаёт `Controller`, `onChange` принимает то, что нужно RHF) — адаптер сводится к одному вызову `createRHFAdapter`. Если значения требуют форматирования (например, `DateInput` с `valueFormat="iso"` отдаёт ISO-строку, RHF хранит её, обратно DateInput тоже принимает её) — это решается на уровне самого компонента, а не адаптера.

После создания адаптера:

1. Экспортировать из `src/adapters/rhf/index.ts`.
2. Добавить stories в `src/adapters/rhf/RHFNewInput.stories.tsx` рядом.
3. Зафиксировать в [`../reference/components.md`](../reference/components.md) — колонка «RHF-адаптер».

## Использование (для потребителя)

```tsx
import { useForm } from 'react-hook-form'
import { RHFTextInput, RHFCheckbox, RHFTagInput } from '@v-lab/ui-kit/adapters'

const { control, handleSubmit } = useForm({
  defaultValues: { username: '', tags: [], agree: false },
})

<RHFTextInput
  name="username"
  control={control}
  rules={{ required: 'Введите имя' }}
  label="Имя"
/>
```

Ошибки из `rules` подставляются в `error` автоматически. Дополнительной настройки не требуется.
