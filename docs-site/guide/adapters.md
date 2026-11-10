---
title: Адаптеры react-hook-form
description: Entry @v-lab/ui-kit/adapters — RHFTextInput, RHFTagInput и RHFCheckbox поверх Controller.
---

# Адаптеры react-hook-form

Отдельный entry **`@v-lab/ui-kit/adapters`**, чтобы приложения без **`react-hook-form`** не тащили его транзитивно из основного бандла.

## Peer-зависимость

Нужен **`react-hook-form`** (версия — см. **`peerDependencies`** в `package.json` пакета). В **`peerDependenciesMeta`** он помечен как **optional**: основной пакет ставится без RHF, адаптеры — только когда формы на **`react-hook-form`** уже в проекте.

Установка:

```bash
npm install react-hook-form
```

## Экспорт

| Компонент          | Обертка над         | Назначение                                                                         |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| **`RHFTextInput`** | **`TextInput`**     | Текстовое поле: **`value`**, ошибка из **`fieldState`**                            |
| **`RHFTagInput`**  | **`TagInput`**      | Массив тегов: **`value`** как **`TagInputTagValue[]`**, ошибка из **`fieldState`** |
| **`RHFCheckbox`**  | **`CheckboxField`** | Чекбокс с **`checked`** из значения поля                                           |

Типы: **`RHFTextInputProps<T>`**, **`RHFTagInputProps<T>`**, **`RHFCheckboxProps<T>`** — **`UseControllerProps<T>`** плюс пропсы обёрнутого компонента без конфликтующих полей (`value` / `name` и т.д., см. исходники).

## Импорт

```tsx
import { RHFTextInput, RHFTagInput, RHFCheckbox } from '@v-lab/ui-kit/adapters'
```

## Пример

```tsx
import { useForm } from 'react-hook-form'
import { RHFTextInput } from '@v-lab/ui-kit/adapters'

type Form = { email: string }

export function LoginFields() {
  const { control } = useForm<Form>({ defaultValues: { email: '' } })
  return <RHFTextInput control={control} name="email" label="Email" />
}
```

Интерактив и дополнительные сценарии — в Storybook: **`Adapters/RHFTextInput`**, **`Adapters/RHFCheckbox`**, **`Adapters/RHFTagInput`**.

Общая фабрика обёрток — **`createRHFAdapter`** в **`src/adapters/rhf/createRHFAdapter.tsx`** (для расширений внутри монорепозитория / форков).
