import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'
import type { SelectOptionWithShortLabel } from '../SelectInput'

export type SiteInputProps = Omit<InputFieldProps, 'children' | 'startBlock'> &
  Omit<
    BaseInputProps,
    'prefix' | 'size' | 'id' | 'disabled' | 'className' | 'value' | 'defaultValue' | 'onChange'
  > & {
    /** Полный адрес: протокол + путь (например `'https://example.com'`) */
    value?: string
    defaultValue?: string
    /** Новый полный адрес (протокол + путь), не событие */
    onChange?: (value: string) => void
    /**
     * Статичный протокол-префикс. По умолчанию `'https://'`.
     * Игнорируется, если передан `protocolOptions`.
     */
    protocol?: string
    /**
     * Варианты протокола для выбора пользователем.
     * Когда задан — показывает `SelectInput variant="inline"` в начале поля.
     * Каждый option.value должен быть строкой протокола (`'https://'`, `'http://'`...).
     * Requires `shortLabel` in each option (e.g. `'https://'`).
     */
    protocolOptions?: SelectOptionWithShortLabel[]
    /**
     * Доступное имя селекта протокола (при `protocolOptions`). По умолчанию селект подписан
     * `label` поля, без `label` — подписью выбранной опции (`label`, например «HTTPS»).
     */
    protocolAriaLabel?: string
  }
