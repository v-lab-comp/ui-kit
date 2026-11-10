import type { ChangeEventHandler, InputHTMLAttributes } from 'react'
import type { InputFieldProps } from '../base/InputField'
import type { CalendarLocale } from '../../Calendar'

/** Формат значения в колбэках и для контролируемого `value` (см. JSDoc на `value` / `onChange` / `onAccept`). */
export type DateInputValueFormat = 'masked' | 'iso'

export type DateInputProps = Omit<InputFieldProps, 'children'> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'size' | 'id' | 'disabled' | 'className' | 'type'
  > & {
    /**
     * Контролируемое значение: строка **`YYYY-MM-DD`** или пустая строка.
     * Внутри поля по-прежнему отображается маска «DD / MM / YYYY».
     */
    value?: string
    /**
     * Нативный `onChange` от инпута с маской.
     * - `valueFormat: 'masked'` (по умолчанию): `event.target.value` — строка вида **`DD / MM / YYYY`** (как в маске).
     * - `valueFormat: 'iso'` — **`event.target.value`** — **`YYYY-MM-DD`** или **`''`**, если дата неполная/невалидна.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>
    /**
     * Вызывается, когда маска приняла полное значение или выбрана дата в календаре.
     * - `valueFormat: 'masked'`: аргумент — **`DD / MM / YYYY`**.
     * - `valueFormat: 'iso'`: аргумент — **`YYYY-MM-DD`** (пустая строка, если из маки нельзя собрать дату).
     */
    onAccept?: (value: string) => void
    /**
     * Во что переводить значение для `onChange` / `onAccept`:
     * - `'masked'` — как в поле (по умолчанию, обратная совместимость).
     * - `'iso'` — **`YYYY-MM-DD`** для формы/API; визуально маска «DD / MM / YYYY» не сбрасывается при вводе
     *   (внутреннее отображение не привязано только к `value`, пока в форме пустая строка).
     */
    valueFormat?: DateInputValueFormat
    locale?: CalendarLocale
    /**
     * Доступное имя кнопки календаря (и диалога, если у поля нет `label`).
     * Без него кнопка и диалог именуются подписью поля (`label`).
     */
    calendarButtonLabel?: string
    getDotDays?: (date: Date) => boolean
  }
