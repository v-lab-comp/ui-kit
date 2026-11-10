import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'

export type ShortcutModifierMac = 'cmd' | 'cmd+shift'
export type ShortcutModifierOther = 'ctrl' | 'ctrl+shift'

export type ShortcutConfig = {
  /** The key to press, e.g. "k", "1", "/" */
  key: string
  /** Modifier on Mac. Default: 'cmd' → ⌘K */
  mac?: ShortcutModifierMac
  /** Modifier on Windows/Linux. Default: 'ctrl+shift' → ⇧Ctrl K */
  win?: ShortcutModifierOther
}

export type SearchInputProps = Omit<InputFieldProps, 'children'> &
  Omit<BaseInputProps, 'prefix' | 'size' | 'id' | 'disabled' | 'className' | 'type'> & {
    shortcut?: ShortcutConfig
    /** When multiple SearchInputs share the same shortcut, the one with the highest priority gets focused. Default: 0 */
    shortcutPriority?: number
  }
