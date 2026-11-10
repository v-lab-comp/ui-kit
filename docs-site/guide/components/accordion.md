---
title: Accordion
description: Раскрывающаяся панель — заголовок, контент, иконки и режим flipIcon.
---

# Accordion

Одноступенчатый аккордеон: кнопка-заголовок и анимированная панель контента. Поддерживаются необязательная иконка слева от заголовка и режим **`flipIcon`**, когда переключатель «плюс/минус» переносится влево.

## Превью

<ComponentDocsPreview name="accordion" />

## Импорт

```tsx
import { Accordion } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { RiQuestionLine } from '@remixicon/react'
import { Accordion } from '@v-lab/ui-kit'

export function FaqBlock() {
  return (
    <Accordion title="Заголовок" leftIcon={<RiQuestionLine size={20} />} defaultOpen={false}>
      Текст ответа или любой React-контент.
    </Accordion>
  )
}
```

## Основные пропсы

| Проп           | Тип                       | Описание                                                                                       |
| -------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `title`        | `ReactNode`               | Заголовок кнопки                                                                               |
| `children`     | `ReactNode`               | Контент панели                                                                                 |
| `defaultOpen`  | `boolean`                 | Начальное состояние раскрытия                                                                  |
| `open`         | `boolean`                 | Управляемый режим (вместе с `onOpenChange`)                                                    |
| `onOpenChange` | `(open: boolean) => void` | Смена состояния                                                                                |
| `disabled`     | `boolean`                 | Отключить раскрытие                                                                            |
| `leftIcon`     | `ReactNode`               | Иконка слева от заголовка (при `flipIcon === false`)                                           |
| `flipIcon`     | `boolean`                 | `true` — «плюс/минус» слева; `false` — справа (при наличии `leftIcon` — порядок как в дизайне) |
| `region`       | `boolean`                 | `role="region"` у панели с именем из заголовка (по умолчанию выключено)                        |

Полный тип — **`AccordionProps`** в исходниках пакета.

## Галерея

Иконка слева / flip, состояния и disabled — как **Gallery/Accordion** в Storybook.

<ComponentDocsPreview name="accordionGallery" />

Исходники: `src/components/Accordion/`.
